use crate::{
    data::{
        artifact::get_artifact,
        character::{get_additional_info, get_build_info, get_info, Character, CHARACTER_LIST},
        constellation::get_constellation,
        talent::get_talent,
        weapon::get_weapon,
    },
    Context, Error,
};
use fuse_rust::Fuse;
use futures::{Stream, StreamExt};
use num_format::{Buffer, Locale};
use poise::serenity_prelude as serenity;
use std::{str::FromStr, time::Duration};

fn format_number(n: &i64) -> String {
    let mut buf = Buffer::default();

    buf.write_formatted(n, &Locale::en);
    buf.to_string()
}

async fn autocomplete_character(_ctx: Context<'_>, partial: String) -> impl Stream<Item = String> {
    let fuse = Fuse::default();
    let results = fuse.search_text_in_iterable(&partial, CHARACTER_LIST.iter());

    futures::stream::iter(results).map(|res| CHARACTER_LIST[res.index].to_string())
}

/// Shows information about a specific character.
#[poise::command(slash_command)]
pub async fn character(
    ctx: Context<'_>,
    #[description = "The name of the character"]
    #[autocomplete = "autocomplete_character"]
    name: String,
) -> Result<(), Error> {
    ctx.defer().await?;

    let data = ctx.data();
    let additional_info = get_additional_info(Character::from_str(&name).unwrap());
    let info = get_info(&additional_info.rawname, &data.redis).await;
    let build = get_build_info(&name, &data.redis).await;
    let talents = get_talent(&additional_info.rawname, &data.redis).await;
    let cons = get_constellation(&additional_info.rawname, &data.redis).await;

    let mut pg1 = serenity::CreateEmbed::default();

    pg1.title("General Information")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .description(info.description)
        .field("Gender", info.gender, true)
        .field("Birthday", info.birthday, true)
        .field("Region", info.region, true)
        .field("Weapon", info.weapontype, true)
        .field("Affiliation", info.affiliation, true)
        .field("Title", info.title, true)
        .color(additional_info.color)
        .thumbnail(&additional_info.image);

    let mut pg2 = serenity::CreateEmbed::default();

    pg2.title("Personality")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .color(additional_info.color)
        .thumbnail(&additional_info.image)
        .description(additional_info.personality);

    let mut pg3 = serenity::CreateEmbed::default();
    let mut talent_text = format!(
        "\
    *Priority: {}*

    ***{}***
    {}

    ***{}***
    {}
    ",
        build.talent_priority.join(" → "),
        talents.combat1.name,
        talents.combat1.info,
        talents.combat2.name,
        talents.combat2.info
    );

    match talents.combatsp {
        Some(sp) => talent_text.push_str(&format!(
            "\n\
                ***{}***
                {}
            ",
            sp.name, sp.info
        )),
        None => (),
    };

    talent_text.push_str(&format!(
        "\n\
            ***{}***
            {}

            ***{}***
            {}

            ***{}***
            {}
        ",
        talents.combat3.name,
        talents.combat3.info,
        talents.passive1.name,
        talents.passive1.info,
        talents.passive2.name,
        talents.passive2.info
    ));

    match talents.passive3 {
        Some(t) => talent_text.push_str(&format!(
            "\n\
                ***{}***
                {}
            ",
            t.name, t.info
        )),
        None => (),
    };

    match talents.passive4 {
        Some(t) => talent_text.push_str(&format!(
            "\n\
                ***{}***
                {}
            ",
            t.name, t.info
        )),
        None => (),
    };

    pg3.title("Talents")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .color(additional_info.color)
        .thumbnail(&additional_info.image)
        .description(talent_text);

    let mut pg4 = serenity::CreateEmbed::default();
    let mut artifact_text = format!(
        "\
        **Main Stats**
        Flower of Life: {}
        Plume of Death: {}
        Sands of Eon: {}
        Goblet of Eonothem: {}
        Circlet of Logos: {}

        **Sub-stats**
        {}

        **Artifact Sets**
    ",
        build.stats.flower.join(" / "),
        build.stats.plume.join(" / "),
        build.stats.sands.join(" / "),
        build.stats.goblet.join(" / "),
        build.stats.circlet.join(" / "),
        build.stats_priority.join(" / ")
    );

    println!("{:?}", build.sets);

    for recommended_artifact in build.sets {
        let set1_info =
            get_artifact(recommended_artifact.set_1.replace('_', ""), &data.redis).await;

        if recommended_artifact.set_2.is_none() {
            artifact_text.push_str(&format!("__4pc {}__\n", set1_info.name));
        } else {
            let set2_info = get_artifact(
                recommended_artifact.set_2.unwrap().replace('_', ""),
                &data.redis,
            )
            .await;

            artifact_text.push_str(&format!(
                "__2pc {} & 2pc {}__\n",
                set1_info.name, set2_info.name
            ));
        }
    }

    pg4.title("Artifacts")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .color(additional_info.color)
        .thumbnail(&additional_info.image)
        .description(artifact_text);

    let mut pg5 = serenity::CreateEmbed::default();
    let mut weapon_text = String::new();

    for weapon in build.weapons {
        let id = weapon.id.replace('_', "");
        let weapon_info = get_weapon(&id, &data.redis).await;

        weapon_text.push_str(&format!(
            "**{}**\nSub-stat: {}\n",
            weapon_info.name, weapon_info.substat
        ));
    }

    pg5.title("Weapons")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .color(additional_info.color)
        .thumbnail(&additional_info.image)
        .description(weapon_text);

    let mut pg6 = serenity::CreateEmbed::default();
    let constellation_text = format!(
        "\
        **{} (C1)**
        {}

        **{} (C2)**
        {}

        **{} (C3)**
        {}

        **{} (C4)**
        {}

        **{} (C5)**
        {}

        **{} (C6)**
        {}
    ",
        cons.c1.name,
        cons.c1.effect,
        cons.c2.name,
        cons.c2.effect,
        cons.c3.name,
        cons.c3.effect,
        cons.c4.name,
        cons.c4.effect,
        cons.c5.name,
        cons.c5.effect,
        cons.c6.name,
        cons.c6.effect
    );

    pg6.title("Constellations")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .color(additional_info.color)
        .thumbnail(&additional_info.image)
        .description(constellation_text);

    let mut pg7 = serenity::CreateEmbed::default();
    let ascension_materials_text = format!(
        "\
        **Ascension Level 1:** {}
        **Ascension Level 2:** {}
        **Ascension Level 3:** {}
        **Ascension Level 4:** {}
        **Ascension Level 5:** {}
        **Ascension Level 6:** {}
    ",
        info.costs
            .ascend1
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        info.costs
            .ascend2
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        info.costs
            .ascend3
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        info.costs
            .ascend4
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        info.costs
            .ascend5
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        info.costs
            .ascend6
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", ")
    );

    pg7.title("Ascension Materials")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .color(additional_info.color)
        .thumbnail(&additional_info.image)
        .description(ascension_materials_text);

    let mut pg8 = serenity::CreateEmbed::default();
    let talent_materials_text = format!(
        "\
        **Talent Level 2:** {}
        **Talent Level 3:** {}
        **Talent Level 4:** {}
        **Talent Level 5:** {}
        **Talent Level 6:** {}
        **Talent Level 7:** {}
        **Talent Level 8:** {}
        **Talent Level 9:** {}
        **Talent Level 10:** {}
    ",
        talents
            .costs
            .lvl2
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl3
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl4
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl5
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl6
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl7
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl8
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl9
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", "),
        talents
            .costs
            .lvl10
            .iter()
            .map(|c| format!("{} {}", format_number(&c.count), c.name))
            .collect::<Vec<_>>()
            .join(", ")
    );

    pg8.title("Talent Materials")
        .author(|a| {
            a.name(format!("{} | {}★", info.name, info.rarity))
                .icon_url(&additional_info.element)
        })
        .color(additional_info.color)
        .thumbnail(&additional_info.image)
        .description(talent_materials_text);

    let mut index = 0;
    let pages: Vec<serenity::CreateEmbed> = vec![
        pg1.clone(),
        pg2.clone(),
        pg3.clone(),
        pg4.clone(),
        pg5.clone(),
        pg6.clone(),
        pg7.clone(),
        pg8.clone(),
    ];

    let msg = ctx
        .send(|m| {
            m.embed(|e| {
                *e = pg1.clone();

                e.footer(|f| {
                    f.text(format!(
                        "{} | {}/{}",
                        info.constellation,
                        index + 1,
                        pages.len()
                    ))
                });

                e
            })
            .components(|c| {
                c.create_action_row(|r| {
                    r.create_button(|b| {
                        b.custom_id("first_page")
                            .style(serenity::ButtonStyle::Primary)
                            .emoji(serenity::ReactionType::Unicode("⏪".to_owned()))
                    })
                    .create_button(|b| {
                        b.custom_id("previous_page")
                            .style(serenity::ButtonStyle::Primary)
                            .emoji(serenity::ReactionType::Unicode("◀️".to_owned()))
                    })
                    .create_button(|b| {
                        b.custom_id("next_page")
                            .style(serenity::ButtonStyle::Primary)
                            .emoji(serenity::ReactionType::Unicode("▶️".to_owned()))
                    })
                    .create_button(|b| {
                        b.custom_id("last_page")
                            .style(serenity::ButtonStyle::Primary)
                            .emoji(serenity::ReactionType::Unicode("⏩".to_owned()))
                    })
                    .create_button(|b| {
                        b.custom_id("stop")
                            .style(serenity::ButtonStyle::Danger)
                            .emoji(serenity::ReactionType::Unicode("⏹️".to_owned()))
                    })
                })
                .create_action_row(|r| {
                    r.create_select_menu(|m| {
                        m.custom_id("go_to_page").options(|o| {
                            o.create_option(|os| {
                                os.label("General Information").value("General Information")
                            })
                            .create_option(|os| os.label("Personality").value("Personality"))
                            .create_option(|os| os.label("Talents").value("Talents"))
                            .create_option(|os| os.label("Artifacts").value("Artifacts"))
                            .create_option(|os| os.label("Weapons").value("Weapons"))
                            .create_option(|os| os.label("Constellations").value("Constellations"))
                            .create_option(|os| {
                                os.label("Ascension Materials").value("Ascension Materials")
                            })
                            .create_option(|os| {
                                os.label("Talent Materials").value("Talent Materials")
                            })
                        })
                    })
                })
            })
        })
        .await?;

    let mut message = msg.message().await?;

    loop {
        let collector = serenity::CollectComponentInteraction::new(ctx.discord())
            .author_id(ctx.author().id)
            .collect_limit(1)
            .timeout(Duration::from_secs(360));

        let interaction = match collector.await {
            Some(i) => i,
            None => {
                message
                    .edit(ctx.discord(), |m| {
                        m.embed(|e| {
                            *e = pages[index].clone();

                            e.footer(|f| {
                                f.text(format!(
                                    "{} | {}/{}",
                                    info.constellation,
                                    index + 1,
                                    pages.len()
                                ))
                            });

                            e
                        })
                        .components(|c| c)
                    })
                    .await?;

                break;
            }
        };

        interaction.defer(ctx.discord()).await?;

        let data = &interaction.data;

        match data.component_type {
            serenity::ComponentType::SelectMenu => match &data.custom_id[..] {
                "go_to_page" => match &data.values[0][..] {
                    "General Information" => {
                        index = 1;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg1.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    "Personality" => {
                        index = 2;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg2.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    "Talents" => {
                        index = 3;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg3.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    "Artifacts" => {
                        index = 4;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg4.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    "Weapons" => {
                        index = 5;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg5.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    "Constellations" => {
                        index = 6;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg6.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    "Ascension Materials" => {
                        index = 7;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg7.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    "Talent Materials" => {
                        index = 8;

                        message
                            .edit(ctx.discord(), |m| {
                                m.embed(|e| {
                                    *e = pg8.clone();

                                    e.footer(|f| {
                                        f.text(format!(
                                            "{} | {}/{}",
                                            info.constellation,
                                            index + 1,
                                            pages.len()
                                        ))
                                    });

                                    e
                                })
                            })
                            .await?
                    }
                    _ => unreachable!(),
                },
                _ => unreachable!(),
            },
            serenity::ComponentType::Button => match &data.custom_id[..] {
                "first_page" => {
                    index = 0;

                    message
                        .edit(ctx.discord(), |m| {
                            m.embed(|e| {
                                *e = pages[index].clone();

                                e.footer(|f| {
                                    f.text(format!(
                                        "{} | {}/{}",
                                        info.constellation,
                                        index + 1,
                                        pages.len()
                                    ))
                                });

                                e
                            })
                        })
                        .await?;
                }
                "previous_page" => {
                    if index == 0 {
                        index = pages.len() - 1;
                    } else {
                        index -= 1;
                    }

                    message
                        .edit(ctx.discord(), |m| {
                            m.embed(|e| {
                                *e = pages[index].clone();

                                e.footer(|f| {
                                    f.text(format!(
                                        "{} | {}/{}",
                                        info.constellation,
                                        index + 1,
                                        pages.len()
                                    ))
                                });

                                e
                            })
                        })
                        .await?;
                }
                "next_page" => {
                    if index == pages.len() - 1 {
                        index = 0
                    } else {
                        index += 1;
                    }

                    message
                        .edit(ctx.discord(), |m| {
                            m.embed(|e| {
                                *e = pages[index].clone();

                                e.footer(|f| {
                                    f.text(format!(
                                        "{} | {}/{}",
                                        info.constellation,
                                        index + 1,
                                        pages.len()
                                    ))
                                });

                                e
                            })
                        })
                        .await?;
                }
                "last_page" => {
                    index = pages.len() - 1;

                    message
                        .edit(ctx.discord(), |m| {
                            m.embed(|e| {
                                *e = pages[index].clone();

                                e.footer(|f| {
                                    f.text(format!(
                                        "{} | {}/{}",
                                        info.constellation,
                                        index + 1,
                                        pages.len()
                                    ))
                                });

                                e
                            })
                        })
                        .await?;
                }
                "stop" => {
                    message
                        .edit(ctx.discord(), |m| {
                            m.embed(|e| {
                                *e = pages[index].clone();

                                e.footer(|f| {
                                    f.text(format!(
                                        "{} | {}/{}",
                                        info.constellation,
                                        index + 1,
                                        pages.len()
                                    ))
                                });

                                e
                            })
                            .components(|c| c)
                        })
                        .await?;
                }
                _ => unreachable!(),
            },
            _ => unreachable!(),
        };
    }

    Ok(())
}
