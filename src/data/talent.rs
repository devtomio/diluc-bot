use redis::{AsyncCommands, Client};
use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Talent {
    pub name: String,
    pub combat1: Combat1,
    pub combat2: Combat2,
    pub combatsp: Option<CombatSp>,
    pub combat3: Combat3,
    pub passive1: Passive1,
    pub passive2: Passive2,
    pub passive3: Option<Passive3>,
    pub passive4: Option<Passive4>,
    pub costs: Costs,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Combat1 {
    pub name: String,
    pub info: String,
    pub attributes: Attributes,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Attributes {
    pub labels: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Combat2 {
    pub name: String,
    pub info: String,
    pub description: String,
    pub attributes: Attributes2,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CombatSp {
    pub name: String,
    pub info: String,
    pub description: String,
    pub attributes: Attributes2,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Attributes2 {
    pub labels: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Combat3 {
    pub name: String,
    pub info: String,
    pub description: String,
    pub attributes: Attributes3,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Attributes3 {
    pub labels: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Passive1 {
    pub name: String,
    pub info: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Passive2 {
    pub name: String,
    pub info: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Passive3 {
    pub name: String,
    pub info: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Passive4 {
    pub name: String,
    pub info: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Costs {
    pub lvl2: Vec<Lvl2>,
    pub lvl3: Vec<Lvl3>,
    pub lvl4: Vec<Lvl4>,
    pub lvl5: Vec<Lvl5>,
    pub lvl6: Vec<Lvl6>,
    pub lvl7: Vec<Lvl7>,
    pub lvl8: Vec<Lvl8>,
    pub lvl9: Vec<Lvl9>,
    pub lvl10: Vec<Lvl10>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl2 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl3 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl4 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl5 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl6 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl7 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl8 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl9 {
    pub name: String,
    pub count: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Lvl10 {
    pub name: String,
    pub count: i64,
}

pub async fn get_talent(name: &str, redis: &Client) -> Talent {
    let mut con = redis.get_async_connection().await.unwrap();
    let cached: Option<String> = match con.get(format!("{}-talents", name)).await {
        Ok(v) => Some(v),
        Err(_) => None,
    };

    match cached {
        Some(raw) => {
            let val: Talent = from_str(&raw).unwrap();

            val
        }
        None => {
            let url = format!("https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/English/talents/{name}.json");
            let json = reqwest::get(url)
                .await
                .unwrap()
                .json::<Talent>()
                .await
                .unwrap();

            let _: String = con
                .set_ex(
                    format!("{name}-talents"),
                    to_string::<Talent>(&json).unwrap(),
                    604800,
                )
                .await
                .unwrap();

            json
        }
    }
}
