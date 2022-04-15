use std::process::Stdio;

use execute::{command as execute, Execute};

use crate::{Context, Result};

/// Execute a command in the shell. (Owner-only)
#[poise::command(slash_command, owners_only)]
pub async fn exec(
    ctx: Context<'_>,
    #[description = "The command to execute"] command: String,
) -> Result<()> {
    let mut cmd = execute(command);

    cmd.stdout(Stdio::piped());

    let output = cmd.execute_output()?;

    ctx.say(format!("```sh\n{}\n```", unsafe { String::from_utf8_unchecked(output.stdout) }))
        .await?;

    Ok(())
}
