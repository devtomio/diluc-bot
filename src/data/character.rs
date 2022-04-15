use std::ops::Index;
use std::str::FromStr;

use redis::{AsyncCommands, Client};
use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};
use strum_macros::Display;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CharacterInfo {
    pub name: String,
    pub fullname: String,
    pub title: String,
    pub description: String,
    pub rarity: String,
    pub element: String,
    pub weapontype: String,
    pub substat: String,
    pub gender: String,
    pub body: String,
    pub association: String,
    pub region: String,
    pub affiliation: String,
    pub birthdaymmdd: String,
    pub birthday: String,
    pub constellation: String,
    pub cv: Cv,
    pub costs: Costs,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Cv {
    pub english: String,
    pub chinese: String,
    pub japanese: String,
    pub korean: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Costs {
    pub ascend1: Vec<Ascend1>,
    pub ascend2: Vec<Ascend2>,
    pub ascend3: Vec<Ascend3>,
    pub ascend4: Vec<Ascend4>,
    pub ascend5: Vec<Ascend5>,
    pub ascend6: Vec<Ascend6>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Ascend1 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Ascend2 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Ascend3 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Ascend4 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Ascend5 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Ascend6 {
    pub name: String,
    pub count: i64,
}

#[derive(Display, Debug)]
pub enum Element {
    #[strum(serialize = "https://gi-builds.sfo3.digitaloceanspaces.com/elements/Geo.png")]
    Geo,

    #[strum(serialize = "https://gi-builds.sfo3.digitaloceanspaces.com/elements/Cryo.png")]
    Cryo,

    #[strum(serialize = "https://gi-builds.sfo3.digitaloceanspaces.com/elements/Pyro.png")]
    Pyro,

    #[strum(serialize = "https://gi-builds.sfo3.digitaloceanspaces.com/elements/Hydro.png")]
    Hydro,

    #[strum(serialize = "https://gi-builds.sfo3.digitaloceanspaces.com/elements/Electro.png")]
    Electro,

    #[strum(serialize = "https://gi-builds.sfo3.digitaloceanspaces.com/elements/Anemo.png")]
    Anemo,
}

#[derive(Debug)]
pub enum Character {
    Diluc,
}

impl FromStr for Character {
    type Err = ();

    fn from_str(input: &str) -> std::result::Result<Character, Self::Err> {
        match input {
            "Diluc" => Ok(Character::Diluc),
            _ => Err(()),
        }
    }
}

pub const CHARACTER_LIST: &[&str] = &["Diluc"];

pub struct Info {
    pub personality: String,
    pub colour: (u8, u8, u8),
    pub rawname: String,
    pub image: String,
    pub element: Element,
}

pub fn get_additional_info(name: Character) -> Info {
    match name {
        Character::Diluc => Info {
            colour: (217, 65, 33),
            rawname: "diluc".to_owned(),
            element: Element::Pyro,
            image: "https://static.wikia.nocookie.net/gensin-impact/images/0/02/Character_Diluc_Thumb.png".to_owned(),
            personality: "\
            Kaeya and Diluc refer to themselves as \"anti-heroes with attitude issues.\" He decided to take matters into his own hands and became the \"Darknight Hero\" to defend the people of Mondstadt, much to his chagrin and disgrace.

			Diluc was once a perfect young man, committed to the Knights of Favonius' cause. His confidence in the Knights was destroyed after his father died prematurely as a result of using a Delusion, as well as Inspector Eroch instructing Diluc to cover up the occurrence. Even after being expelled from the Knights for being a traitor, Eroch still retains grudges against them. He believes the Knights take too long to complete tasks, yet he still admires those that put up the effort, such as Lisa and Jean.

			He admired his father, Crepus, while he was a member of the Knights. Being commended by his father made him happier than fame or anything else, and Crepus advised Diluc to carry out his responsibilities faithfully. He has been repressing himself since his father's death. He has a soft, tender, and modest character, despite coming out as sour and gloomy in his voice. Diluc used to be a lively and pleasant person, but that is no longer the case.
            ".to_owned()
        }
    }
}

pub async fn get_info(name: &str, redis: &Client) -> CharacterInfo {
    let mut con = redis.get_async_connection().await.unwrap();
    let cached: Option<String> = match con.get(name).await {
        Ok(v) => Some(v),
        Err(_) => None,
    };

    match cached {
        Some(raw) => {
            let val: CharacterInfo = from_str(&raw).unwrap();

            val
        },
        None => {
            let url = format!("https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/English/characters/{name}.json");
            let json = reqwest::get(url).await.unwrap().json::<CharacterInfo>().await.unwrap();

            let _: String =
                con.set_ex(name, to_string::<CharacterInfo>(&json).unwrap(), 604800).await.unwrap();

            json
        },
    }
}

pub async fn get_build_info(name: &str, redis: &Client) -> Build {
    let mut con = redis.get_async_connection().await.unwrap();
    let cached: Option<String> = match con.get("character_build_info").await {
        Ok(v) => Some(v),
        Err(_) => None,
    };

    match cached {
        Some(raw) => {
            let val: OtherInfo = from_str(&raw).unwrap();
            let build: &Vec<Build> = &val[name];

            build.get(0).unwrap().to_owned()
        },
        None => {
            let url = "https://raw.githubusercontent.com/dvaJi/genshin-builds/18df6fb6dfc1397151549c27a740b83137a31d88/_content/data/builds.json";
            let json = reqwest::get(url).await.unwrap().json::<OtherInfo>().await.unwrap();

            let _: String = con
                .set_ex("character_build_info", to_string::<OtherInfo>(&json).unwrap(), 604800)
                .await
                .unwrap();

            let build: &Vec<Build> = &json[name];

            build.get(0).unwrap().to_owned()
        },
    }
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct OtherInfo {
    pub albedo: Vec<Build>,
    pub amber: Vec<Build>,
    pub barbara: Vec<Build>,
    pub beidou: Vec<Build>,
    pub bennett: Vec<Build>,
    pub chongyun: Vec<Build>,
    pub diluc: Vec<Build>,
    pub diona: Vec<Build>,
    pub fischl: Vec<Build>,
    pub ganyu: Vec<Build>,
    #[serde(rename = "hu_tao")]
    pub hu_tao: Vec<Build>,
    pub jean: Vec<Build>,
    pub kaeya: Vec<Build>,
    pub keqing: Vec<Build>,
    pub klee: Vec<Build>,
    pub lisa: Vec<Build>,
    pub mona: Vec<Build>,
    pub ningguang: Vec<Build>,
    pub noelle: Vec<Build>,
    pub qiqi: Vec<Build>,
    pub razor: Vec<Build>,
    pub rosaria: Vec<Build>,
    pub sucrose: Vec<Build>,
    pub tartaglia: Vec<Build>,
    #[serde(rename = "traveler_anemo")]
    pub traveler_anemo: Vec<Build>,
    #[serde(rename = "traveler_geo")]
    pub traveler_geo: Vec<Build>,
    pub venti: Vec<Build>,
    pub xiangling: Vec<Build>,
    pub xiao: Vec<Build>,
    pub xingqiu: Vec<Build>,
    pub xinyan: Vec<Build>,
    pub yanfei: Vec<Build>,
    pub zhongli: Vec<Build>,
    pub eula: Vec<Build>,
    #[serde(rename = "kaedehara_kazuha")]
    pub kaedehara_kazuha: Vec<Build>,
    #[serde(rename = "kamisato_ayaka")]
    pub kamisato_ayaka: Vec<Build>,
    #[serde(rename = "kamisato_ayato")]
    pub kamisato_ayato: Vec<Build>,
    #[serde(rename = "traveler_electro")]
    pub traveler_electro: Vec<Build>,
    pub sayu: Vec<Build>,
    pub yoimiya: Vec<Build>,
    #[serde(rename = "raiden_shogun")]
    pub raiden_shogun: Vec<Build>,
    #[serde(rename = "kujou_sara")]
    pub kujou_sara: Vec<Build>,
    pub aloy: Vec<Build>,
    #[serde(rename = "sangonomiya_kokomi")]
    pub sangonomiya_kokomi: Vec<Build>,
    pub thoma: Vec<Build>,
    #[serde(rename = "arataki_itto")]
    pub arataki_itto: Vec<Build>,
    pub gorou: Vec<Build>,
    pub shenhe: Vec<Build>,
    #[serde(rename = "yun_jin")]
    pub yun_jin: Vec<Build>,
    #[serde(rename = "yae_miko")]
    pub yae_miko: Vec<Build>,
}

impl Index<&'_ str> for OtherInfo {
    type Output = Vec<Build>;

    fn index(&self, s: &str) -> &Vec<Build> {
        match s {
            "Diluc" => &self.diluc,
            _ => unreachable!(),
        }
    }
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Build {
    pub id: String,
    pub name: String,
    pub description: String,
    pub recommended: bool,
    pub role: String,
    pub sets: Vec<Set2>,
    pub stats: Stats2,
    #[serde(rename = "stats_priority")]
    pub stats_priority: Vec<String>,
    #[serde(rename = "talent_priority")]
    pub talent_priority: Vec<String>,
    pub weapons: Vec<Weapon2>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Set2 {
    #[serde(rename = "set_1")]
    pub set_1: String,
    #[serde(rename = "set_2")]
    pub set_2: Option<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Stats2 {
    pub flower: Vec<String>,
    pub plume: Vec<String>,
    pub sands: Vec<String>,
    pub goblet: Vec<String>,
    pub circlet: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Weapon2 {
    pub id: String,
    pub r: i64,
}
