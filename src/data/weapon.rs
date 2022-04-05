use redis::{AsyncCommands, Client};
use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Weapon {
    pub name: String,
    pub description: String,
    pub weapontype: String,
    pub rarity: String,
    pub baseatk: i64,
    pub substat: String,
    pub subvalue: String,
    pub effectname: String,
    pub effect: String,
    pub r1: Vec<String>,
    pub r2: Vec<String>,
    pub r3: Vec<String>,
    pub r4: Vec<String>,
    pub r5: Vec<String>,
    pub weaponmaterialtype: String,
    pub costs: Costs,
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

pub async fn get_weapon(name: &str, redis: &Client) -> Weapon {
    let mut con = redis.get_async_connection().await.unwrap();
    let cached: Option<String> = match con.get(format!("{name}-weapon")).await {
        Ok(v) => Some(v),
        Err(_) => None,
    };

    match cached {
        Some(raw) => {
            let val: Weapon = from_str(&raw).unwrap();

            val
        }
        None => {
            let url = format!("https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/English/weapons/{name}.json");
            let json = reqwest::get(url)
                .await
                .unwrap()
                .json::<Weapon>()
                .await
                .unwrap();

            let _: String = con
                .set_ex(
                    format!("{name}-weapon"),
                    to_string::<Weapon>(&json).unwrap(),
                    604800,
                )
                .await
                .unwrap();

            json
        }
    }
}
