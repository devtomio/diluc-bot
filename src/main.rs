#[macro_use]
extern crate tracing;

#[cfg(target_os = "windows")]
use mongodb::options::ResolverConfig;

use mongodb::{options::ClientOptions, Client as MongoClient};
use redis::{Client, Script};
use std::{env::var, fs::read_to_string};
use tracing::Level;
use tracing_subscriber::FmtSubscriber;

mod commands;
pub mod data;

pub type Error = Box<dyn std::error::Error + Send + Sync>;
pub type Context<'a> = poise::Context<'a, Data, Error>;
pub type ApplicationContext<'a> = poise::ApplicationContext<'a, Data, Error>;

#[allow(dead_code)]
pub struct Data {
    db: MongoClient,
    redis: Client,
    redis_fuzzy: Script,
}

async fn on_error(error: poise::FrameworkError<'_, Data, Error>) {
    match error {
        poise::FrameworkError::Setup { error } => panic!("Failed to start bot: {:?}", error),
        poise::FrameworkError::Command { error, ctx } => {
            error!("Error in command `{}`: {:?}", ctx.command().name, error,);
        }
        error => {
            if let Err(e) = poise::builtins::on_error(error).await {
                error!("Error while handling error: {}", e)
            }
        }
    }
}

#[tokio::main]
async fn main() {
    let subscriber = FmtSubscriber::builder()
        .with_max_level(Level::INFO)
        .finish();

    tracing::subscriber::set_global_default(subscriber).unwrap();

    #[cfg(target_os = "windows")]
    let mongo_options = ClientOptions::parse_with_resolver_config(
        var("MONGO_URL").unwrap(),
        ResolverConfig::cloudflare(),
    )
    .await
    .unwrap();

    #[cfg(not(target_os = "windows"))]
    let mongo_options = ClientOptions::parse(var("MONGO_URL").unwrap())
        .await
        .unwrap();

    let mongo = MongoClient::with_options(mongo_options).unwrap();
    let redis = Client::open(var("REDIS_URL").unwrap()).unwrap();
    let lua_script = read_to_string("redis/fuzzySearch.lua").unwrap();
    let options = poise::FrameworkOptions {
        commands: vec![
            commands::ping(),
            commands::character(),
            poise::Command {
                subcommands: vec![commands::tag::create(), commands::tag::tag()],
                ..commands::tag::tag()
            },
        ],
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

    poise::Framework::build()
        .token(var("DISCORD_TOKEN").unwrap())
        .user_data_setup(move |_ctx, _ready, _framework| {
            Box::pin(async move {
                Ok(Data {
                    redis,
                    db: mongo,
                    redis_fuzzy: Script::new(&lua_script),
                })
            })
        })
        .options(options)
        .run()
        .await
        .unwrap()
}
