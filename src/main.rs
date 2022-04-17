#[macro_use]
extern crate tracing;

use std::env::var;
use std::sync::Arc;

use mongodb::options::ClientOptions;
#[cfg(target_os = "windows")]
use mongodb::options::ResolverConfig;
use mongodb::Client as MongoClient;
use poise::serenity_prelude as serenity;
use redis::Client;
use tracing::Level;
use tracing_subscriber::FmtSubscriber;

mod commands;
pub mod data;
pub mod util;

pub type Error = Box<dyn std::error::Error + Send + Sync>;
pub type Result<T, E = Error> = anyhow::Result<T, E>;
pub type Context<'a> = poise::Context<'a, Data, Error>;
pub type ApplicationContext<'a> = poise::ApplicationContext<'a, Data, Error>;

#[derive(Debug)]
pub struct Data {
    db: Arc<MongoClient>,
    redis: Arc<Client>,
}

#[tracing::instrument]
async fn on_error(error: poise::FrameworkError<'_, Data, Error>) {
    match error {
        poise::FrameworkError::Setup {
            error,
        } => panic!("Failed to start bot: {:?}", error),
        poise::FrameworkError::Command {
            error,
            ctx,
        } => {
            error!("Error in command `{}`: {:?}", ctx.command().name, error,);
        },
        error => {
            if let Err(e) = poise::builtins::on_error(error).await {
                error!("Error while handling error: {}", e)
            }
        },
    }
}

#[tokio::main]
async fn main() {
    let subscriber = FmtSubscriber::builder().with_max_level(Level::INFO).finish();

    tracing::subscriber::set_global_default(subscriber).unwrap();

    #[cfg(target_os = "windows")]
    let mongo_options = ClientOptions::parse_with_resolver_config(
        var("MONGO_URL").unwrap(),
        ResolverConfig::cloudflare(),
    )
    .await
    .unwrap();

    #[cfg(not(target_os = "windows"))]
    let mongo_options = ClientOptions::parse(var("MONGO_URL").unwrap()).await.unwrap();

    let mongo = MongoClient::with_options(mongo_options).unwrap();
    let redis = Client::open(var("REDIS_URL").unwrap()).unwrap();
    let options = poise::FrameworkOptions {
        commands: vec![commands::ping(), commands::character(), commands::exec(), poise::Command {
            subcommands: vec![
                commands::tag::create(),
                commands::tag::show(),
                commands::tag::delete(),
                commands::tag::edit(),
                commands::tag::info(),
            ],
            ..commands::tag::tag()
        }],
        prefix_options: poise::PrefixFrameworkOptions {
            prefix: None,
            mention_as_prefix: true,
            ..Default::default()
        },
        on_error: |error| Box::pin(on_error(error)),
        post_command: |ctx| {
            Box::pin(async move {
                info!(
                    "Command \"{}\" was executed by {} [{}]",
                    ctx.command().qualified_name,
                    ctx.author().tag(),
                    ctx.author().id
                );
            })
        },
        ..Default::default()
    };

    let framework = poise::Framework::build()
        .token(var("DISCORD_TOKEN").unwrap())
        .intents(serenity::GatewayIntents::GUILDS)
        .user_data_setup(move |ctx, _ready, framework| {
            Box::pin(async move {
                let commands = &framework.options().commands;
                let commands_builder = poise::builtins::create_application_commands(commands);

                serenity::ApplicationCommand::set_global_application_commands(&ctx.http, |b| {
                    *b = commands_builder;

                    b
                })
                .await?;

                Ok(Data {
                    redis: Arc::new(redis),
                    db: Arc::new(mongo),
                })
            })
        })
        .options(options)
        .build()
        .await
        .unwrap();

    let framework_2 = framework.clone();

    // Ctrl-C handler
    tokio::spawn(async move {
        #[cfg(unix)]
        {
            use tokio::signal::unix as signal;

            let [mut s1, mut s2, mut s3] = [
                signal::signal(signal::SignalKind::hangup()).unwrap(),
                signal::signal(signal::SignalKind::interrupt()).unwrap(),
                signal::signal(signal::SignalKind::terminate()).unwrap(),
            ];

            tokio::select!(
                v = s1.recv() => v.unwrap(),
                v = s2.recv() => v.unwrap(),
                v = s3.recv() => v.unwrap(),
            );
        }

        #[cfg(windows)]
        {
            let (mut s1, mut s2) = (
                tokio::signal::windows::ctrl_c().unwrap(),
                tokio::signal::windows::ctrl_break().unwrap(),
            );

            tokio::select!(
                v = s1.recv() => v.unwrap(),
                v = s2.recv() => v.unwrap(),
            );
        }

        warn!("Received Ctrl-C and will be shutting down.");
        framework_2.shard_manager().lock().await.shutdown_all().await;
    });

    framework.start().await.unwrap();
}
