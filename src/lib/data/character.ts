import { stripIndents } from 'common-tags';

interface Characters {
	[key: string]: {
		personality: string;
		color: `#${string}`;
	};
}

interface ElementImages {
	[key: string]: string;
}

export const characters: Characters = {
	Diluc: {
		color: '#d94121',
		personality: stripIndents`
			Kaeya and Diluc refer to themselves as "anti-heroes with attitude issues." He decided to take matters into his own hands and became the "Darknight Hero" to defend the people of Mondstadt, much to his chagrin and disgrace.

			Diluc was once a perfect young man, committed to the Knights of Favonius' cause. His confidence in the Knights was destroyed after his father died prematurely as a result of using a Delusion, as well as Inspector Eroch instructing Diluc to cover up the occurrence. Even after being expelled from the Knights for being a traitor, Eroch still retains grudges against them. He believes the Knights take too long to complete tasks, yet he still admires those that put up the effort, such as Lisa and Jean.

			He admired his father, Crepus, while he was a member of the Knights. Being commended by his father made him happier than fame or anything else, and Crepus advised Diluc to carry out his responsibilities faithfully. He has been repressing himself since his father's death. He has a soft, tender, and modest character, despite coming out as sour and gloomy in his voice. Diluc used to be a lively and pleasant person, but that is no longer the case.
		`
	},
	'Sangonomiya Kokomi': {
		color: '#faebe5',
		personality: stripIndents`
			Kokomi, as the Divine Priestess of Watatsumi Island, is in charge of practically all of the island's affairs. While she would like to remain a military advisor rather than bear such a burden, she accepts the role in order to provide her people with the hope and happiness they deserve. Kokomi, like Jean, burns herself out quickly while accomplishing her chores and attempts to keep it hidden from others so as not to concern them.

			In addition to managing a variety of situations, Kokomi is a competent strategist who considers all possible scenarios and how to manage them as a consequence of her extensive reading of military texts, but she also likes leisure reading. Kujou Sara claims that it was because of her preparation that the Tenryou Commission was unable to declare complete victory over the Watatsumi Army. This is a tendency she maintains even when she is not involved in military matters. She is immensely adored by her people as a consequence of the role she performs.

			She like Bird Egg Sushi but avoids seafood, which she keeps hidden from most people.
		`
	},
	Ganyu: {
		color: '#b2daff',
		personality: stripIndents`
			Due to her half-qilin ancestry, Ganyu is typically quiet and reclusive. She also completes whatever activities or food is assigned to her, even if she is hesitant to do so.

			For thousands of years, Ganyu has worked as the Liyue Qixing's nonstop secretary. She puts in more effort as the assignment gets more important, but she also becomes more tense and more prone to making mistakes.

			She has a hectic job schedule and frequently works overtime. Ganyu has few acquaintances outside of work as a result of this. She is forgetful due to her age, and she frequently forgets crucial things, which causes her humiliation. She sleeps a lot and is quite self-conscious about her horns and weight.
		`
	},
	'Raiden Shogun': {
		color: '#8363af',
		personality: stripIndents`
			The Raiden Shogun is a fervent believer in what she considers to be eternity—a realm where nothing changes, no matter what happens. She is respected by the residents of Inazuma for her noble behavior.

			Ei, the Raiden Shogun's actual identity, and the Shogun, a puppet made by Ei to govern Inazuma in her place while she meditates on the Plane of Euthymia, exist in two forms. This puppet is programmed with a set of instructions that are incredibly difficult to change, even by Ei herself. The Shogun has a cold, severe, and even heartless disposition; she lacks emotional expression, has no loves or dislikes, and has no desire for amusement. The Shogun sees herself as Ei's personal assistant, and she performs precisely what she wants, no more and no less; she can't act without Ei's permission, and if her normal functions are inhibited, the Shogun is rendered powerless. Outside forces may readily control the puppet due to her restricted protocols and Ei's initial apathy to everything other than her aim of eternal life. The Kujou Clan and the Fatui, for example, duped her into establishing and sustaining the Vision Hunt Decree.

			Ei is more expressive and friendly than the Shogun, but having a more austere exterior than the typical person. Ei, unlike the Shogun, has preferences, such as a sweet tooth and a love of martial arts. Ei is apprehensive of change because of her commitment to eternity. When it comes to new things, such as the appearance of the Traveler and modern world practices, she is curious rather than dismissive. Ei is driven by a fear of additional loss, wishing to protect Inazuma for all eternity, after having lost many of her loved ones over the generations. To do this, she secluded herself in the Plane of Euthymia to protect herself from erosion, while creating the puppet Shogun to be impervious to physical deterioration. Ei was apathetic to everything that did not effect her quest of eternity while on the Plane of Euthymia, and she had a low opinion of human desire since ambition leads to loss and pain, making it incompatible with eternity. Even on the Plane of Euthymia, she couldn't really escape loneliness, even if she was glad to see her friend Yae Miko again and appreciates the Traveler and Paimon's companionship.
		`
	},
	'Yae Miko': {
		color: '#ffd1e1',
		personality: stripIndents`
			Miko exudes a mysterious aura when she assumes her duties as the Guuji of the Grand Narukami Shrine. She is known to be very kind and enjoys reading books and stories when she assumes her duties as the boss of the Yae Publishing House. She's rarely seen without a smile, and she's far more light-hearted than her Guuji position would suggest. She also believes that other people's beliefs can be overly restrictive and that it is too difficult to persuade them. She has an enigmatic aura around her, which her friends have grown accustomed to and those she is acquainted with are terrified of, despite the fact that she admits she does this frequently because she enjoys watching people squirm.

			Miko, as the guuji, is always polite to everyone she meets. However, when speaking with outsiders such as the Traveler and Paimon, or close friends such as the Shogun, she maintains her affable demeanor while displaying a blunter and more cynical, even selfish side. Miko does not mince words when it comes to the Traveler and those who need to hear the truth. She tells the Traveler outright that they have no chance of defeating the Shogun on their own, and she is similarly blunt with others when necessary, including her friend and master Ei.

			She is one of Ei's only friends who has survived the ravages of time, and she is one of the few people who addresses the Raiden Shogun by her first name, Ei. Ei also refers to Miko by her first name, indicating their closeness and friendship. Miko has grown shrewd and resourceful during Ei's time in seclusion; her events generate significantly more income than usual, and she also saw the Traveler's arrival in Inazuma as an opportunity to repair the damage caused by her friend's views.

			Miko, as a kitsune, enjoys fried tofu. She despises pickled foods in general.
		`
	},
	Gorou: {
		color: '#c49356',
		personality: stripIndents`
			Gorou, like the rest of the people of Watatsumi Island, is a staunch follower of Sangonomiya Kokomi. Kokomi believes in him as the resistance's chief general because he is truthful, resolute, and daring. He has a great feeling of camaraderie and gets along well with all of the soldiers under his charge, who share the same emotion and come to him with any problems, including new recruits. Kazuha defines Gorou as someone who expresses himself without regard for the sentiments of others.

			In the midst of combat, Kokomi observes that Gorou has a propensity of allowing adrenaline to rush to his head, necessitating someone to keep him in check when he enters the battlefield. While he considers himself unskilled owing to his age, he does his best to assist with any challenges that may occur. He is not very well-versed in civilian concerns, particularly those connected to romance, because he delegated tasks such as army supply procurement to Kokomi.

			Gorou has canine blood in his veins and shares many of their characteristics, such as the capacity to grasp what they are saying from a single bark. His ears also twitch in response to the emotion elicited. When he is really delighted, his tail begins to wag, something he finds humiliating but is unable to stop and is sometimes unaware of. He would also like to be taller and more muscular so that his warriors can clearly recognise him on the battlefield.

			He loves sweets since they are scarce in military life, but he avoids onions because they are said to be toxic to him. He also enjoys climbing since it helps him grow strength and camaraderie, and he expresses a wish to climb Liyue's mountains if the opportunity arises.
		`
	},
	'Yun Jin': {
		color: '#373656',
		personality: stripIndents`
			Yun Jin is a talented director, playwright, and vocalist who is well-known across Liyue for her plays, pursuing her passion and going to great efforts to guarantee that everyone who attends her performances is happy. While she seems sophisticated and graceful in formal settings, she is also known to be quite sociable in private. She gets her ideas for her plays from a number of places; she likes a broad variety of specialty beverages as one of her hobbies, and she can write a play on any of them if she wants to.

			While she appreciates her passion, she also enjoys variety; while she gets along with the troupe on theater-related topics, she regularly fights with them on personal matters because she believes they are too conventional. She is particularly fond of rock 'n' roll, and no matter how busy she is, she visits Xinyan and watches her performances at least three times a week. Xinyan feels she comes to see her because the fine arts are "suffocating." She attempts to keep her visits to a minimum because her interest in non-traditional music would be frowned upon by her elders.
		`
	},
	'Kaedehara Kazuha': {
		color: '#eee0d7',
		personality: stripIndents`
			Kazuha is a courteous and well-spoken person. In comparison to other noble Inazuman clan members, Kazuha loves to travel rather than stay indoors, which the seizure of his clan house allowed him to do owing to a lack of riches and obligation. For the most of his life, he wandered Inazuma quietly as a simple wanderer, training himself bladework and picking up other abilities but never chasing luxury. Instead, he is readily delighted simply by lying on a sun-warmed rock. He becomes sensitive to nature and the wind as a result of his time spent outside, allowing him to "hear" and "smell" everything around him with absolute clarity. He can detect threats, read individuals, and hunt them down in a second, regardless of how well they attempt to hide it. Because of this sensitivity, he enjoys calm weather and never remains in one location for too long, since the former causes him to have difficulty sleeping while the latter causes his talents to stagnate.

			Kazuha is steadfast in his pursuit of his goals, pursuing them with thoroughness and guile, yet he also takes his time and is laid-back. He is quite contemplative and attentive about everything, and he constantly ponders many themes during his trips. He values his friendships, coming out of hiding for his pal and being eternally thankful to Beidou and Gorou for taking him in when he needed refuge. Kazuha constantly warns others of impending storms and potential disaster, and he gladly runs basic errands, provides advice, and is eager to assist others.

			In keeping with his Anemo connection, Kazuha fervently believes in the notion of freedom — that everyone is entitled to their ambitions and dreams and that no one, not even a deity, has the right to take them away. As a result, he is opposed to the Raiden Shogun and all who support her. Despite his principles, he isn't arrogant and can recognize the bravery and noble behavior of others with whom he disagrees. He regards his friend's duel as valiant and noble, but also believes that the Shogun's subsequent death was both fair and justifiable.

			He was distraught following his friend's death and refused to talk to any of his crewmates after joining the Crux, but he finally warmed up to them and is now pretty sociable, according to Beidou. Kazuha has a highly poetic side to him; he likes writing haikus in his leisure time and is readily inspired, despite the fact that he professes to be not particularly great at it. Kazuha has grown particularly fond of easily accessible grilled fish as a result of both touring many locations and sailing for extended periods of time, and he takes the time to prepare and consume his dinner carefully. While he is not particular about what he eats, he dislikes hurried meals and sloppy cooking methods. His most valued item is his sword, which he always carries with him and is a source of pride for Kazuha as both an Inazuman and a samurai. He also like red maple leaves, which he finds stunning and enjoys watching rain throughout the fall season. When he is unable to see such sites, he regularly collects and takes them as a souvenir to alleviate any homesickness.
		`
	},
	Lisa: {
		color: '#3f308e',
		personality: stripIndents`
			Lisa is a skilled witch, and as such, she is fascinated with the elements and the artifacts that might help her comprehend them. Despite her position as Librarian, Lisa appears to approach it fairly casually, since she looks to be bored with common books and prefers those in the restricted area. She still takes the work seriously, and will go out of her way to collect overdue books, although in a way that allows her to appreciate the little pleasures in life.

			Her haphazard, careless nature stems from her Vision, for while the gods provided it to her and she was satiated with everything she desired to acquire, they did not tell her the cost, and she grew to fear the reality behind them. This made her suspicious, and she left Sumeru out of worry that she was paying too much for knowledge, relegating herself to classification and library administration, typically refusing to take on any additional work until absolutely necessary.

			When Lisa gets enraged, the air around her becomes electrified, thanks in part to her Electro Vision. Depending on the degree of what has enraged her, she can be annoyed or incredibly frightening, with the latter motivating her to provide "proper" punishment.

			Lisa appears to be fond of the Traveler and occasionally behaves flirty, as she frequently refers to them as "cutie" or "darling," and she acknowledges they are precious to her.

			She adores tea and considers afternoon tea to be the most essential part of her day. She occasionally drinks tea with vegetable soup, like she used to do with Jean at the Good Hunter restaurant. She also has cucurbitophobia, or a fear of pumpkins.
		`
	},
	Sayu: {
		color: '#f2ddb2',
		personality: stripIndents`
			Sayu is a ninja who appears to be perpetually sleep-deprived and utilizes her abilities to avoid work and obligations. She is profoundly dissatisfied with her height and believes that sleeping will refill all of her energy and enable her grow taller. She developed her ninjutsu to perfection in order to live by this philosophy and have as much time to snooze as possible.

			While she is well-known for her apparent lethargy, the members of the Shuumatsuban know that she is committed to their mission since she would never go against their ideals or slack off on vitally critical topics. Ayaka feels Sayu's sloth stems from her sensei's unexpected departure, since she looked up to him and got lost and bewildered when he went.

			Of all, from Sayu's perspective, this so-called "laziness" is just superior time management that allows her to focus on things... such as sleeping and becoming taller She dislikes it when others stroke her head, claiming that it hinders her development. She tolerates headpats from both the Traveler and Yae Miko, albeit the latter is afraid of the Guuji's response.

			Sayu, although being a very skilled ninja, is generally in charge of reconnaissance and other random chores. While she has been trained in battle, the techniques she has learnt are mostly for stealth and evasion. She enjoys the Traveler's company and is eager to work more for their sake. Sayu grows enraged anytime others refer to her as a tanuki when dressed as a mujina, which she thinks are exceedingly charming, and even attacks them.
		`
	},
	Bennett: {
		color: '#917868',
		personality: stripIndents`
			Bennett has had more than his fair share of adversity as a result of his exceptionally terrible luck, yet he remains a strong and diligent member of the Adventurer's Guild. He is upbeat, well-mannered, and eager to go on adventures. Despite the lengthy and agonizing streaks of poor luck he has, he is also innovative, having devised several solutions to the challenges he confronts when exploring.

			Bennett feels his Vision is a sign from the gods: a sign that they haven't given up on him, just as the Guild's aged and/or retired veteran adventurers, whom he fondly refers to as "dads," haven't either.
		`
	},
	Xiangling: {
		color: '#465b91',
		personality: stripIndents`
			Xiangling enjoys cooking and learnt the skill from her father. She has no preference for one sort of cuisine over another, considering eating as a means to explore and experiment. She will use everything for her cuisine, including unusual things that might disgust others. Slimes and lizards are among the unusual substances used by Xiangling. Even if some of the meals do not appeal to her, Xiangling will not give up and will instead tweak or start over from scratch.

			Her out-of-the-box cuisine earned her accolades in both Mondstadt and Liyue. Xiangling, unlike other cooks, is unconcerned with mora, noting that food is meant to nourish and that the smiles on her clients' faces are more than enough for her. She dislikes having to confine herself to a set culinary style, which she regards as dull and uninteresting.

			Outside of cooking, Xiangling is easily frightened and is frequently pranked by Hu Tao. Despite her dislike for her pranks, Xiangling does not hold a grudge against her because she periodically sends her gifts in exchange for making her laugh.
		`
	},
	Fischl: {
		color: '#5d4795',
		personality: stripIndents`
			Fischl is infatuated with fairy stories and pretends to be a benign princess as a result of her upbringing as a youngster. She addresses everyone in a nice and formal tone, which significantly perplexes people who engage with her. If they are perplexed, Oz ends up interpreting the majority of her words. She is so used to speaking in this manner that breaking character confuses the individuals she speaks with just as much as keeping in character does.

			Most people have a poor opinion of her outside of guild responsibilities as a consequence of this roleplay, but she is unfazed and continues to roleplay regardless of what others think. She has few friends and values those who are willing to participate in her roleplay.

			Outside of roleplaying, she is a kind and well-mannered young lady. She gets along well with her parents, even if she doesn't spend much time with them and they disagree with some of her decisions, but they respect her enough to do everything she asks. Lisa, who gets irritated when individuals don't return books she takes from the library, said that Fischl always maintains the books she borrows in good shape and returns them on time. She prefers not to linger on the past, perceiving herself as Fischl rather than her actual identity, whom she feels to be a distinct person.

			Fischl has a talent for investigation, thanks in part to her own theories and Oz, which has helped her to swiftly rise through the ranks of the Adventurer's Guild. Even when her thoughts seem ludicrous (for example, stating that a meteor shower is the consequence of a curse), Oz is quick to remind everyone not to underestimate her intuition, since her instincts are quite sharp.

			She likes Mitternachtsbrot des Sommernachtgartens and despises Sweet Madame, alleging that it has been mangled by "unnatural bondage" and resembles torment on her homeworld.
		`
	},
	Razor: {
		color: '#9096aa',
		personality: stripIndents`
			Razor is an usually kind individual who considers his wolf pack to be his family and feels outraged when they are harmed by others. He adores his wolf family, but resents the fact that he isn't entirely like them, having been adopted as a newborn by his pack's leader, Andrius. When he seldom meets other humans while traveling through Wolvendom owing to its dreadful reputation, he considers the few humans he does see to be his friends and is prepared to risk his and his pack's supper for the night to defend them. Razor is also a sharp brain, as seen by his ability to repair Klee's mishaps whenever she visits Wolvendom to play.

			Razor is straightforward and honest as a result of his limited exposure to human existence. He is not used to speaking and only talks in short sentences and words, which he finds difficult, but he persists.

			Razor, like the rest of his wolf family, prefers meat and dislikes most vegetables, preferring mainly potatoes. Because of this, he gets along well with Bennett, and the two usually spend the majority of their time conversing.
		`
	}
};

export const list = [
	'Diluc',
	'Sangonomiya Kokomi',
	'Ganyu',
	'Raiden Shogun',
	'Yae Miko',
	'Gorou',
	'Yun Jin',
	'Kaedehara Kazuha',
	'Lisa',
	'Sayu',
	'Bennett',
	'Xiangling',
	'Fischl',
	'Razor'
];

export const elementImages: ElementImages = {
	Electro: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Electro.png',
	Pyro: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Pyro.png',
	Hydro: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Hydro.png',
	Cryo: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Cryo.png',
	Anemo: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Anemo.png',
	Geo: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Geo.png'
};
