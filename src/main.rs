#[macro_use]
extern crate tracing;

use redis::{Client, Script};
use std::{env::var, fs::read_to_string};
use tracing::Level;
use tracing_subscriber::FmtSubscriber;

mod commands;
pub mod data;

pub type Error = Box<dyn std::error::Error + Send + Sync>;
pub type Context<'a> = poise::Context<'a, Data, Error>;

#[allow(dead_code)]
pub struct Data {
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

    let redis = Client::open(var("REDIS_URL").unwrap()).unwrap();
    let lua_script = read_to_string("redis/fuzzySearch.lua").unwrap();
    let options = poise::FrameworkOptions {
        commands: vec![commands::ping(), commands::character()],
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
                    redis_fuzzy: Script::new(&lua_script),
                })
            })
        })
        .options(options)
        .run()
        .await
        .unwrap()
}
