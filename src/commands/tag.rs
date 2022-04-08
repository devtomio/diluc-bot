use crate::{ApplicationContext, Error};
use chrono::Utc;
use mongodb::bson::{doc, Document};
use poise::Modal;
use std::ops::Not;

#[derive(Debug, Modal)]
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

#[poise::command(slash_command)]
pub async fn create(ctx: ApplicationContext<'_>) -> Result<(), Error> {
    if ctx.interaction.guild_id().is_none() {
        poise::send_application_reply(ctx, |r| {
            r.content("This command is only available in guilds.")
        })
        .await?;

        return Ok(());
    }

    let data = CreateTagModal::execute(ctx).await?;
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
