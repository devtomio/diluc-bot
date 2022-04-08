use crate::{ApplicationContext, Context, Error};
use chrono::Utc;
use futures::{stream::StreamExt, Stream};
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

async fn autocomplete_tag(ctx: Context<'_>, partial: String) -> impl Stream<Item = String> {
    let db = ctx.data().db.database("diluc-bot");
    let collection = db.collection::<Document>("tags");
    let docs = vec![
        doc! {
            "$search": {
                "autocomplete": {
                    "query": partial,
                    "path": "name",
                    "tokenOrder": "any"
                }
            }
        },
        doc! { "$limit": 10i32 },
        doc! { "$project": { "_id": 0i32, "name": 1i32 } },
    ];

    let results = collection.aggregate(docs, None).await.unwrap();

    results.map(|d| d.unwrap().get_str("name").unwrap().to_owned())
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
                    "content": &data.content,
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

#[poise::command(slash_command)]
pub async fn show(
    ctx: Context<'_>,
    #[description = "The name of the tag"]
    #[autocomplete = "autocomplete_tag"]
    name: String,
) -> Result<(), Error> {
    ctx.defer().await?;

    let db = ctx.data().db.database("diluc-bot");
    let collection = db.collection::<Document>("tags");
    let tag = collection
        .find_one(
            doc! {
                "name": name,
                "guild_id": ctx.guild_id().unwrap().to_string()
            },
            None,
        )
        .await?;

    match tag {
        Some(t) => ctx.say(t.get_str("content")?).await?,
        None => ctx.say("Sorry, that tag doesn't exist.").await?,
    };

    Ok(())
}

/// No-op function because of how poise subcommands are designed
#[poise::command(slash_command)]
pub async fn tag(_ctx: Context<'_>) -> Result<(), Error> {
    Ok(())
}
