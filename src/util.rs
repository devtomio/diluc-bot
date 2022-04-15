use dashmap::mapref::entry::Entry;
use poise::serenity_prelude as serenity;

use crate::{Context, Result};

pub async fn get_member<G, U>(ctx: Context<'_>, guild_id: G, user_id: U) -> Result<serenity::Member>
where
    G: Clone + Into<serenity::GuildId>,
    U: Clone + Into<serenity::UserId>,
{
    let cached = ctx.discord().cache.member(guild_id.clone().into(), user_id.clone().into());

    match cached {
        Some(mem) => Ok(mem),
        None => {
            let member = ctx
                .discord()
                .http
                .get_member(guild_id.into().as_u64().to_owned(), user_id.into().as_u64().to_owned())
                .await?;

            match ctx.discord().cache.users.entry(member.user.id) {
                Entry::Vacant(e) => {
                    e.insert(member.user.clone());
                },
                Entry::Occupied(mut e) => {
                    e.get_mut().clone_from(&member.user);
                },
            };

            Ok(member)
        },
    }
}
