use redis::{AsyncCommands, Client};
use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Constellation {
    pub name: String,
    pub c1: C1,
    pub c2: C2,
    pub c3: C3,
    pub c4: C4,
    pub c5: C5,
    pub c6: C6,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct C1 {
    pub name: String,
    pub effect: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct C2 {
    pub name: String,
    pub effect: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct C3 {
    pub name: String,
    pub effect: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct C4 {
    pub name: String,
    pub effect: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct C5 {
    pub name: String,
    pub effect: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct C6 {
    pub name: String,
    pub effect: String,
}

pub async fn get_constellation(name: &str, redis: &Client) -> Constellation {
    let mut con = redis.get_async_connection().await.unwrap();
    let cached: Option<String> = match con.get(format!("{name}-constellation")).await {
        Ok(v) => Some(v),
        Err(_) => None,
    };

    match cached {
        Some(raw) => {
            let val: Constellation = from_str(&raw).unwrap();

            val
        }
        None => {
            let url = format!("https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/English/constellations/{name}.json");
            let json = reqwest::get(url)
                .await
                .unwrap()
                .json::<Constellation>()
                .await
                .unwrap();

            let _: String = con
                .set_ex(
                    format!("{name}-weapon"),
                    to_string::<Constellation>(&json).unwrap(),
                    604800,
                )
                .await
                .unwrap();

            json
        }
    }
}
