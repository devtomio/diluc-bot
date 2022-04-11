use crate::{util::get_member, ApplicationContext, Context, Error};
use chrono::{DateTime, NaiveDateTime, Utc};
use futures::{stream::StreamExt, Stream};
use mongodb::bson::{doc, Document};
use poise::{serenity_prelude as serenity, Modal};
use std::ops::Not;

async fn autocomplete_tag(ctx: Context<'_>, partial: String) -> impl Stream<Item = String> {
    let db = ctx.data().db.database("diluc-bot");
    let collection = db.collection::<Document>("tags");
    let docs = vec![
        doc! {
            "$search": {
                "index": "default",
                "autocomplete": {
                    "query": match partial.len() {
                        // Special character because mongo autocomplete doesn't support empty strings
                        0 => "「",
                        _ => &partial
                    },
                    "path": "name",
                    "tokenOrder": "any"
                }
            }
        },
        doc! { "$limit": 10_i32 },
        doc! { "$project": { "_id": 0_i32, "name": 1_i32 } },
    ];

    let results = collection.aggregate(docs, None).await.unwrap();

    results.map(|d| d.unwrap().get_str("name").unwrap().to_owned())
}

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

#[poise::command(slash_command, guild_only)]
pub async fn create(ctx: ApplicationContext<'_>) -> Result<(), Error> {
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
        .is_some();

    if exists {
        poise::send_application_reply(ctx, |r| {
            r.content(format!(
                "The tag \"{}\" already exists in this guild.",
                &data.name
            ))
            .ephemeral(true)
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
                    "created_at": date.timestamp()
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

#[poise::command(slash_command, guild_only)]
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

#[poise::command(slash_command, guild_only)]
pub async fn delete(
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
        Some(t) => {
            let member =
                get_member(ctx, ctx.guild_id().unwrap(), t.get_i64("owner_id")? as u64).await?;

            if ctx.author().id != member.user.id || member.permissions.unwrap().manage_guild().not()
            {
                ctx.say("You don't have enough permissions to delete this tag.")
                    .await?;

                return Ok(());
            }

            collection.delete_one(t.clone(), None).await?;

            ctx.say(format!(
                "The tag \"{}\" was deleted successfully!",
                t.get_str("name")?
            ))
            .await?
        }
        None => ctx.say("Sorry, that tag doesn't exist.").await?,
    };

    Ok(())
}

#[derive(Debug, Modal)]
#[name = "Edit a tag"]
struct EditTagModal {
    #[placeholder = "Hello world #2!"]
    #[name = "New Content"]
    #[paragraph]
    content: String,
}

#[poise::command(slash_command, guild_only)]
pub async fn edit(
    ctx: ApplicationContext<'_>,
    #[description = "The name of the tag"]
    #[autocomplete = "autocomplete_tag"]
    name: String,
) -> Result<(), Error> {
    let data = EditTagModal::execute(ctx).await?;
    let db = ctx.data.db.database("diluc-bot");
    let collection = db.collection::<Document>("tags");
    let tag = collection
        .find_one(
            doc! {
                "name": name,
                "guild_id": ctx.interaction.guild_id().unwrap().to_string()
            },
            None,
        )
        .await?;

    match tag {
        Some(t) => {
            let member = get_member(
                poise::Context::Application(ctx),
                ctx.interaction.guild_id().unwrap(),
                t.get_i64("owner_id")? as u64,
            )
            .await?;

            if ctx.interaction.user().id != member.user.id
                || member.permissions.unwrap().manage_guild().not()
            {
                poise::send_application_reply(ctx, |m| {
                    m.content("You don't have enough permissions to edit this tag.")
                        .ephemeral(true)
                })
                .await?;

                return Ok(());
            }

            collection
                .update_one(
                    t.clone(),
                    doc! {
                        "$set": {
                            "content": data.content
                        }
                    },
                    None,
                )
                .await?;

            poise::send_application_reply(ctx, |m| {
                m.content(format!(
                    "The tag \"{}\" was edited successfully!",
                    t.get_str("name").unwrap()
                ))
            })
            .await?
        }
        None => {
            poise::send_application_reply(ctx, |m| {
                m.content("Sorry, that tag doesn't exist.").ephemeral(true)
            })
            .await?
        }
    };

    Ok(())
}

#[poise::command(slash_command, guild_only)]
pub async fn info(
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
        Some(t) => {
            ctx.send(|m| {
                m.embed(|e| {
                    e.title(format!("**Tag __{}__**", t.get_str("name").unwrap()))
                        .thumbnail(ctx.author().face())
                        .description(t.get_str("content").unwrap())
                        .timestamp(DateTime::<Utc>::from_utc(
                            NaiveDateTime::from_timestamp(t.get_i64("created_at").unwrap(), 0),
                            Utc,
                        ))
                        .colour(serenity::Colour::RED)
                })
            })
            .await?
        }
        None => ctx.say("Sorry, that tag doesn't exist.").await?,
    };

    Ok(())
}

/// No-op function because of how poise subcommands are designed
#[poise::command(slash_command, guild_only)]
pub async fn tag(_ctx: Context<'_>) -> Result<(), Error> {
    Ok(())
}