use redis::{AsyncCommands, Client};
use serde::{Deserialize, Serialize};
use serde_json::{from_str, to_string};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Artifact {
    pub name: String,
    pub rarity: Vec<String>,
    #[serde(rename = "1pc")]
    pub n1pc: Option<String>,
    #[serde(rename = "2pc")]
    pub n2pc: String,
    #[serde(rename = "4pc")]
    pub n4pc: String,
    pub flower: Flower,
    pub plume: Plume,
    pub sands: Sands,
    pub goblet: Goblet,
    pub circlet: Circlet,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Flower {
    pub name: String,
    pub relictype: String,
    pub description: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Plume {
    pub name: String,
    pub relictype: String,
    pub description: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Sands {
    pub name: String,
    pub relictype: String,
    pub description: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Goblet {
    pub name: String,
    pub relictype: String,
    pub description: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Circlet {
    pub name: String,
    pub relictype: String,
    pub description: String,
}

pub async fn get_artifact(name: String, redis: &Client) -> Artifact {
    let mut con = redis.get_async_connection().await.unwrap();
    let cached: Option<String> = match con.get(format!("{}-artifact", name.clone())).await {
        Ok(v) => Some(v),
        Err(_) => None,
    };

    match cached {
        Some(raw) => {
            let val: Artifact = from_str(&raw).unwrap();

            val
        },
        None => {
            let url = format!("https://raw.githubusercontent.com/theBowja/genshin-db/main/src/data/English/artifacts/{name}.json");
            let json = reqwest::get(url).await.unwrap().json::<Artifact>().await.unwrap();

            let _: String = con
                .set_ex(format!("{name}-artifact"), to_string::<Artifact>(&json).unwrap(), 604800)
                .await
                .unwrap();

            json
        },
    }
}
