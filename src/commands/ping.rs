use crate::{Context, Error};
use libm::round;
use poise::serenity_prelude as serenity;
use std::time::Duration;

#[poise::command(slash_command)]
pub async fn ping(ctx: Context<'_>) -> Result<(), Error> {
    let shard_manager = ctx.framework().shard_manager();
    let manager = shard_manager.lock().await;
    let runners = manager.runners.lock().await;
    let runner = runners
        .get(&serenity::ShardId(ctx.discord().shard_id))
        .ok_or("No shard found for this guild")?;

    ctx.say(format!(
        "🏓 Pong! The ping is `{}ms`",
        round(
            runner
                .latency
                .unwrap_or_else(|| Duration::from_millis(90))
                .as_millis() as f64
        )
    ))
    .await?;

    Ok(())
}
