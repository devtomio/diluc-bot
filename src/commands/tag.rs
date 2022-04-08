use crate::{ApplicationContext, Context, Error};
use chrono::Utc;
use mongodb::bson::{doc, Document};
use std::ops::Not;

#[derive(Debug, poise::Modal)]
#[name = "Create a tag"]
struct CreateTagModal {
    #[placeholder = "my-awesome-tag"]
    #[name = "Name"]
    name: String,

    #[placeholder = "Hello world!"]
    #[name = "Content"]
    #[paragraph]
    content: String,
}

async fn check_if_in_guild(ctx: Context<'_>) -> Result<bool, Error> {
    match ctx.guild_id() {
        Some(_) => Ok(true),
        None => {
            ctx.say("This command is only available in guilds.").await?;

            Ok(false)
        }
    }
}

#[poise::command(slash_command, check = "check_if_in_guild")]
pub async fn create(ctx: ApplicationContext<'_>) -> Result<(), Error> {
    let data = <CreateTagModal as poise::Modal>::execute(ctx).await?;
    let db = ctx.data.db.database("diluc-bot");
    let collection = db.collection::<Document>("tags");
    let exists = collection
        .find_one(
            doc! {
                "name": &data.name,
                "guild_id": ctx.interaction.guild_id().unwrap().to_string()
            },
            None,
        )
        .await?
        .is_none()
        .not();

    if exists {
        poise::send_application_reply(ctx, |r| {
            r.content(format!(
                "The tag \"{}\" already exists in this guild.",
                &data.name
            ))
        })
        .await?;
    } else {
        let date = Utc::now();

        collection
            .insert_one(
                doc! {
                    "name": &data.name,
                    "content": data.content,
                    "guild_id": ctx.interaction.guild_id().unwrap().to_string(),
                    "owner_id": ctx.interaction.user().id.to_string(),
                    "owner_tag": ctx.interaction.user().tag(),
                    "created_at": date.to_string()
                },
                None,
            )
            .await?;

        poise::send_application_reply(ctx, |r| {
            r.content(format!(
                "The tag \"{}\" was created successfully!",
                &data.name
            ))
        })
        .await?;
    }

    Ok(())
}
