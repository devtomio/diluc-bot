import { stripIndents } from 'common-tags';

interface Characters {
	[key: string]: {
		story: string;
		color: `#${string}`;
	};
}

interface ElementImages {
	[key: string]: string;
}

export const characters: Characters = {
	Diluc: {
		color: '#d94121',
		story: stripIndents`
			Kaeya and Diluc refer to themselves as "anti-heroes with attitude issues." He decided to take matters into his own hands and became the "Darknight Hero" to defend the people of Mondstadt, much to his chagrin and disgrace.

			Diluc was once a perfect young man, committed to the Knights of Favonius' cause. His confidence in the Knights was destroyed after his father died prematurely as a result of using a Delusion, as well as Inspector Eroch instructing Diluc to cover up the occurrence. Even after being expelled from the Knights for being a traitor, Eroch still retains grudges against them. He believes the Knights take too long to complete tasks, yet he still admires those that put up the effort, such as Lisa and Jean.

			He admired his father, Crepus, while he was a member of the Knights. Being commended by his father made him happier than fame or anything else, and Crepus advised Diluc to carry out his responsibilities faithfully. He has been repressing himself since his father's death. He has a soft, tender, and modest character, despite coming out as sour and gloomy in his voice. Diluc used to be a lively and pleasant person, but that is no longer the case.
		`
	},
	'Sangonomiya Kokomi': {
		color: '#faebe5',
		story: stripIndents`
			Kokomi, as the Divine Priestess of Watatsumi Island, is in charge of practically all of the island's affairs. While she would like to remain a military advisor rather than bear such a burden, she accepts the role in order to provide her people with the hope and happiness they deserve. Kokomi, like Jean, burns herself out quickly while accomplishing her chores and attempts to keep it hidden from others so as not to concern them.

			In addition to managing a variety of situations, Kokomi is a competent strategist who considers all possible scenarios and how to manage them as a consequence of her extensive reading of military texts, but she also likes leisure reading. Kujou Sara claims that it was because of her preparation that the Tenryou Commission was unable to declare complete victory over the Watatsumi Army. This is a tendency she maintains even when she is not involved in military matters. She is immensely adored by her people as a consequence of the role she performs.

			She like Bird Egg Sushi but avoids seafood, which she keeps hidden from most people.
		`
	},
	Ganyu: {
		color: '#b2daff',
		story: stripIndents`
			Due to her half-qilin ancestry, Ganyu is typically quiet and reclusive. She also completes whatever activities or food is assigned to her, even if she is hesitant to do so.

			For thousands of years, Ganyu has worked as the Liyue Qixing's nonstop secretary. She puts in more effort as the assignment gets more important, but she also becomes more tense and more prone to making mistakes.

			She has a hectic job schedule and frequently works overtime. Ganyu has few acquaintances outside of work as a result of this. She is forgetful due to her age, and she frequently forgets crucial things, which causes her humiliation. She sleeps a lot and is quite self-conscious about her horns and weight.
		`
	},
	'Raiden Shogun': {
		color: '#8363af',
		story: stripIndents`
			The Raiden Shogun is a fervent believer in what she considers to be eternity—a realm where nothing changes, no matter what happens. She is respected by the residents of Inazuma for her noble behavior.

			Ei, the Raiden Shogun's actual identity, and the Shogun, a puppet made by Ei to govern Inazuma in her place while she meditates on the Plane of Euthymia, exist in two forms. This puppet is programmed with a set of instructions that are incredibly difficult to change, even by Ei herself. The Shogun has a cold, severe, and even heartless disposition; she lacks emotional expression, has no loves or dislikes, and has no desire for amusement. The Shogun sees herself as Ei's personal assistant, and she performs precisely what she wants, no more and no less; she can't act without Ei's permission, and if her normal functions are inhibited, the Shogun is rendered powerless. Outside forces may readily control the puppet due to her restricted protocols and Ei's initial apathy to everything other than her aim of eternal life. The Kujou Clan and the Fatui, for example, duped her into establishing and sustaining the Vision Hunt Decree.

			Ei is more expressive and friendly than the Shogun, but having a more austere exterior than the typical person. Ei, unlike the Shogun, has preferences, such as a sweet tooth and a love of martial arts. Ei is apprehensive of change because of her commitment to eternity. When it comes to new things, such as the appearance of the Traveler and modern world practices, she is curious rather than dismissive. Ei is driven by a fear of additional loss, wishing to protect Inazuma for all eternity, after having lost many of her loved ones over the generations. To do this, she secluded herself in the Plane of Euthymia to protect herself from erosion, while creating the puppet Shogun to be impervious to physical deterioration. Ei was apathetic to everything that did not effect her quest of eternity while on the Plane of Euthymia, and she had a low opinion of human desire since ambition leads to loss and pain, making it incompatible with eternity. Even on the Plane of Euthymia, she couldn't really escape loneliness, even if she was glad to see her friend Yae Miko again and appreciates the Traveler and Paimon's companionship.
		`
	},
	'Yae Miko': {
		color: '#ffd1e1',
		story: stripIndents`
			Miko exudes a mysterious aura when she assumes her duties as the Guuji of the Grand Narukami Shrine. She is known to be very kind and enjoys reading books and stories when she assumes her duties as the boss of the Yae Publishing House. She's rarely seen without a smile, and she's far more light-hearted than her Guuji position would suggest. She also believes that other people's beliefs can be overly restrictive and that it is too difficult to persuade them. She has an enigmatic aura around her, which her friends have grown accustomed to and those she is acquainted with are terrified of, despite the fact that she admits she does this frequently because she enjoys watching people squirm.

			Miko, as the guuji, is always polite to everyone she meets. However, when speaking with outsiders such as the Traveler and Paimon, or close friends such as the Shogun, she maintains her affable demeanor while displaying a blunter and more cynical, even selfish side. Miko does not mince words when it comes to the Traveler and those who need to hear the truth. She tells the Traveler outright that they have no chance of defeating the Shogun on their own, and she is similarly blunt with others when necessary, including her friend and master Ei.

			She is one of Ei's only friends who has survived the ravages of time, and she is one of the few people who addresses the Raiden Shogun by her first name, Ei. Ei also refers to Miko by her first name, indicating their closeness and friendship. Miko has grown shrewd and resourceful during Ei's time in seclusion; her events generate significantly more income than usual, and she also saw the Traveler's arrival in Inazuma as an opportunity to repair the damage caused by her friend's views.

			Miko, as a kitsune, enjoys fried tofu. She despises pickled foods in general.
		`
	},
	Gorou: {
		color: '#c49356',
		story: stripIndents`
			Gorou, like the rest of the people of Watatsumi Island, is a staunch follower of Sangonomiya Kokomi. Kokomi believes in him as the resistance's chief general because he is truthful, resolute, and daring. He has a great feeling of camaraderie and gets along well with all of the soldiers under his charge, who share the same emotion and come to him with any problems, including new recruits. Kazuha defines Gorou as someone who expresses himself without regard for the sentiments of others.

			In the midst of combat, Kokomi observes that Gorou has a propensity of allowing adrenaline to rush to his head, necessitating someone to keep him in check when he enters the battlefield. While he considers himself unskilled owing to his age, he does his best to assist with any challenges that may occur. He is not very well-versed in civilian concerns, particularly those connected to romance, because he delegated tasks such as army supply procurement to Kokomi.

			Gorou has canine blood in his veins and shares many of their characteristics, such as the capacity to grasp what they are saying from a single bark. His ears also twitch in response to the emotion elicited. When he is really delighted, his tail begins to wag, something he finds humiliating but is unable to stop and is sometimes unaware of. He would also like to be taller and more muscular so that his warriors can clearly recognise him on the battlefield.

			He loves sweets since they are scarce in military life, but he avoids onions because they are said to be toxic to him. He also enjoys climbing since it helps him grow strength and camaraderie, and he expresses a wish to climb Liyue's mountains if the opportunity arises.
		`
	},
	'Yun Jin': {
		color: '#373656',
		story: stripIndents`
			Yun Jin is a talented director, playwright, and vocalist who is well-known across Liyue for her plays, pursuing her passion and going to great efforts to guarantee that everyone who attends her performances is happy. While she seems sophisticated and graceful in formal settings, she is also known to be quite sociable in private. She gets her ideas for her plays from a number of places; she likes a broad variety of specialty beverages as one of her hobbies, and she can write a play on any of them if she wants to.

			While she appreciates her passion, she also enjoys variety; while she gets along with the troupe on theater-related topics, she regularly fights with them on personal matters because she believes they are too conventional. She is particularly fond of rock 'n' roll, and no matter how busy she is, she visits Xinyan and watches her performances at least three times a week. Xinyan feels she comes to see her because the fine arts are "suffocating." She attempts to keep her visits to a minimum because her interest in non-traditional music would be frowned upon by her elders.
		`
	},
	'Kaedehara Kazuha': {
		color: '#eee0d7',
		story: stripIndents`
			Kazuha is a courteous and well-spoken person. In comparison to other noble Inazuman clan members, Kazuha loves to travel rather than stay indoors, which the seizure of his clan house allowed him to do owing to a lack of riches and obligation. For the most of his life, he wandered Inazuma quietly as a simple wanderer, training himself bladework and picking up other abilities but never chasing luxury. Instead, he is readily delighted simply by lying on a sun-warmed rock. He becomes sensitive to nature and the wind as a result of his time spent outside, allowing him to "hear" and "smell" everything around him with absolute clarity. He can detect threats, read individuals, and hunt them down in a second, regardless of how well they attempt to hide it. Because of this sensitivity, he enjoys calm weather and never remains in one location for too long, since the former causes him to have difficulty sleeping while the latter causes his talents to stagnate.

			Kazuha is steadfast in his pursuit of his goals, pursuing them with thoroughness and guile, yet he also takes his time and is laid-back. He is quite contemplative and attentive about everything, and he constantly ponders many themes during his trips. He values his friendships, coming out of hiding for his pal and being eternally thankful to Beidou and Gorou for taking him in when he needed refuge. Kazuha constantly warns others of impending storms and potential disaster, and he gladly runs basic errands, provides advice, and is eager to assist others.

			In keeping with his Anemo connection, Kazuha fervently believes in the notion of freedom — that everyone is entitled to their ambitions and dreams and that no one, not even a deity, has the right to take them away. As a result, he is opposed to the Raiden Shogun and all who support her. Despite his principles, he isn't arrogant and can recognize the bravery and noble behavior of others with whom he disagrees. He regards his friend's duel as valiant and noble, but also believes that the Shogun's subsequent death was both fair and justifiable.

			He was distraught following his friend's death and refused to talk to any of his crewmates after joining the Crux, but he finally warmed up to them and is now pretty sociable, according to Beidou. Kazuha has a highly poetic side to him; he likes writing haikus in his leisure time and is readily inspired, despite the fact that he professes to be not particularly great at it. Kazuha has grown particularly fond of easily accessible grilled fish as a result of both touring many locations and sailing for extended periods of time, and he takes the time to prepare and consume his dinner carefully. While he is not particular about what he eats, he dislikes hurried meals and sloppy cooking methods. His most valued item is his sword, which he always carries with him and is a source of pride for Kazuha as both an Inazuman and a samurai. He also like red maple leaves, which he finds stunning and enjoys watching rain throughout the fall season. When he is unable to see such sites, he regularly collects and takes them as a souvenir to alleviate any homesickness.
		`
	}
};

export const list = ['Diluc', 'Sangonomiya Kokomi', 'Ganyu', 'Raiden Shogun', 'Yae Miko', 'Gorou', 'Yun Jin', 'Kaedehara Kazuha'];

export const elementImages: ElementImages = {
	Electro: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Electro.png',
	Pyro: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Pyro.png',
	Hydro: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Hydro.png',
	Cryo: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Cryo.png',
	Anemo: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Anemo.png',
	Geo: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Geo.png'
};
