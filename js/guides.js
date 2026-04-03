/**
 * THE LOST STAR MAP - Civilization Guide Interactive Dialogue System
 * Kingdom of Everbright - First Grade Gameschooling Curriculum
 *
 * Choose-your-own-adventure style branching dialogues for each
 * civilization guide. Educational storytelling with choices.
 * Falls back to Gemini API for freeform chat if available.
 */

(function() {
  'use strict';

  const GEMINI_API_KEY = 'AIzaSyD2A-HxygcdbuT0eJ9jrBEAXss0wfk-Zug';
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY;

  // ============================================
  // DIALOGUE TREES - Choose Your Own Adventure
  // Each node has: text (guide speaks), choices (player picks)
  // Choices lead to next node IDs
  // ============================================

  const DIALOGUES = {
    kidu: {
      name: "Kidu", title: "Scribe's Apprentice of Mesopotamia",
      image: "images/Boy_standing_ziggurat_202604021853.jpeg", color: "#C9A84C",
      nodes: {
        start: {
          text: "Greetings, traveler from the stars! I am Kidu, apprentice to the great scribe Enhedu at the temple of Ur. *brushes clay dust from his hands* I was just finishing a tablet when you appeared through the starlight path! Welcome to Mesopotamia, the land between two great rivers. What would you like to explore first?",
          choices: [
            { text: "Tell me about those giant buildings!", next: "ziggurat" },
            { text: "What are you writing on that clay?", next: "cuneiform" },
            { text: "I'm hungry! What do people eat here?", next: "food" }
          ]
        },
        ziggurat: {
          text: "Ah, you mean the ziggurat! *points up proudly* It is the tallest building in all the world! We built it to be closer to the gods. It has seven levels, each one smaller than the last, like stacking blocks. Thousands of workers carried mud bricks up the ramps. My uncle helped build the third level! From the top, you can see all the way to the Euphrates River. The priests climb up there every night to read the stars - just like you, Star Navigator!",
          choices: [
            { text: "How did you build it without machines?", next: "building" },
            { text: "Tell me about the rivers!", next: "rivers" },
            { text: "What do the priests see in the stars?", next: "stars" }
          ]
        },
        cuneiform: {
          text: "*holds up a soft clay tablet* This is cuneiform - the very first writing in all the world! See these little wedge shapes? I press them into wet clay with this reed stylus. Each shape means a different word or sound. Most children cannot read or write, but I am very lucky - my master chose me to learn! Right now I am writing a list of grain for the temple storehouse. Would you believe we even write down stories and laws?",
          choices: [
            { text: "What stories do you write?", next: "stories" },
            { text: "What are these laws you mentioned?", next: "hammurabi" },
            { text: "Can you teach me to write my name?", next: "writing_lesson" }
          ]
        },
        food: {
          text: "*eyes light up* Oh, the market is wonderful today! We eat barley bread, dates, figs, and sometimes fish from the river. My mother makes the best lentil stew in all of Ur! We also drink beer - even children drink a little, because the river water is not always clean. The farmers grow wheat and barley in fields near the river. When the river floods, it leaves rich dark mud that makes everything grow. That is why we call this the Fertile Crescent!",
          choices: [
            { text: "Tell me about the farming!", next: "farming" },
            { text: "What is the market like?", next: "market" },
            { text: "I want to see the river!", next: "rivers" }
          ]
        },
        rivers: {
          text: "*walks toward the water* These are the Tigris and Euphrates rivers - the two most important rivers in the world! Everything we have comes from them. We drink the water, catch fish, water our crops, and travel by boat. But sometimes the rivers flood and wash everything away! That is why we built canals - long ditches that carry water to our fields when we need it, and drain it away when there is too much. My father says controlling water is the smartest thing humans ever learned.",
          choices: [
            { text: "What are canals? Show me!", next: "irrigation" },
            { text: "Tell me about the boats!", next: "boats" },
            { text: "Take me back to the city.", next: "city" }
          ]
        },
        building: {
          text: "We use mud bricks! We mix clay from the river with straw, press it into wooden molds, and let the sun bake them hard. Then thousands of workers carry them up ramps made of packed earth. No wheels on the ramps - just strong backs and determination! For the ziggurat, we used millions of bricks. The builders even put layers of reed mats between the levels so the building can flex when the ground shakes. My people are very clever, yes?",
          choices: [
            { text: "Millions of bricks?! That's amazing!", next: "end_building" },
            { text: "Tell me more about daily life here.", next: "city" }
          ]
        },
        stars: {
          text: "*whispers with awe* The priests say the gods placed messages in the stars for us to read. They watch the sky every single night and write down what they see on clay tablets. They noticed that certain stars return at the same time each year, and that helps us know when to plant crops and when the floods will come. We even divided the sky into twelve sections - like a great circle. Some people far in the future might use that same idea! *winks*",
          choices: [
            { text: "That sounds like what I do as Star Navigator!", next: "end_stars" },
            { text: "Tell me something else about Mesopotamia.", next: "city" }
          ]
        },
        stories: {
          text: "Oh, the best story is the Epic of Gilgamesh! It is about a great king who was very strong but also very proud. He went on a long journey to find the secret of living forever. Along the way, he fought monsters and crossed dangerous waters. But in the end, he learned that the real treasure is the good things you do for your people while you are alive. My master says it is the oldest story ever written down!",
          choices: [
            { text: "That's a great lesson! What else was written?", next: "hammurabi" },
            { text: "Tell me about something else!", next: "start" }
          ]
        },
        hammurabi: {
          text: "*speaks very seriously* King Hammurabi wrote 282 laws on a giant stone pillar for everyone to see. Before that, powerful people could make up rules whenever they wanted! But Hammurabi said the laws must be written down so they are the same for everyone. One of the laws says if a builder makes a house that falls down, the builder must fix it. Fair, right? My master says this was one of the most important ideas in all of history - that laws should protect everyone, not just the rich.",
          choices: [
            { text: "Written laws for everyone - that IS important!", next: "end_laws" },
            { text: "Tell me about something fun!", next: "market" }
          ]
        },
        writing_lesson: {
          text: "*hands you a soft clay tablet and a reed* Okay, hold the stylus like this - at an angle. Now press down and twist slightly. See the little triangle shape? That is a wedge! Now try making three wedges in a row pointing right, then two pointing down. Congratulations, you just wrote the word 'AN' which means 'sky'! How fitting for a Star Navigator! My master says anyone who can write holds the world's knowledge in their hands.",
          choices: [
            { text: "I wrote 'sky'! This is incredible!", next: "end_writing" },
            { text: "What else can you teach me?", next: "start" }
          ]
        },
        farming: {
          text: "Our farmers are the cleverest in the world! They built irrigation canals to bring river water to the fields. They invented the plow to break up the hard ground. And they learned to grow wheat, barley, dates, and many vegetables. Because of irrigation, we can grow enough food to feed the whole city - which means not everyone has to be a farmer! Some people can be scribes like me, or builders, or priests, or artists. My master says farming is what made cities possible.",
          choices: [
            { text: "So farming changed everything?", next: "end_farming" },
            { text: "Tell me about the city!", next: "city" }
          ]
        },
        market: {
          text: "*grabs your hand and runs* Come, come! The market is this way! Look - that woman is selling colorful cloth woven on a loom. Over there, a potter is spinning clay into beautiful bowls. You can smell the fresh bread from the bakery! People trade goods instead of using money - my mother might trade five loaves of bread for a jar of honey. Everyone is shouting their prices! Oh, and see that man with the scale? He weighs silver to make sure trades are fair.",
          choices: [
            { text: "No money? How does trading work?", next: "end_trade" },
            { text: "This city is amazing! Tell me more.", next: "city" }
          ]
        },
        irrigation: {
          text: "*walks along a canal* See this ditch? It carries water from the Euphrates River all the way to the barley fields over there. We built gates that open and close to control the water flow. When the fields are dry, we open the gates. When there is too much water, we close them. Some canals are so big you could float a boat in them! The whole system took hundreds of years to build. Everyone works together to keep the canals clean - because if one person's canal breaks, everyone's fields could flood.",
          choices: [
            { text: "Working together - that's teamwork!", next: "end_farming" },
            { text: "Show me something else!", next: "start" }
          ]
        },
        boats: {
          text: "We make round boats called coracles from reeds and animal skins! They look like big baskets floating on the water. The river is our highway - merchants float goods up and down between cities. Some boats carry wool, some carry grain, and some carry beautiful stones from far-away mountains. My favorite are the reed boats that fishermen use. They are so light you can carry them on your back!",
          choices: [
            { text: "Round boats! That's so cool!", next: "end_boats" },
            { text: "Tell me about the city.", next: "city" }
          ]
        },
        city: {
          text: "Ur is one of the greatest cities in the world! About 65,000 people live here. We have two-story houses made of mud brick, narrow streets to keep the sun out, and a great wall around the city for protection. There is the temple, the palace, the market, and even schools where children like me learn to read and write. People come from far away to trade with us. My master says cities like ours are where civilization began - the very first time humans lived together in such large numbers!",
          choices: [
            { text: "The FIRST cities? That's history-making!", next: "end_city" },
            { text: "Start over - I want to learn more!", next: "start" }
          ]
        },
        // Ending nodes (educational summaries)
        end_building: { text: "You know what amazes me most? We built the ziggurat without wheels, without metal tools, and without machines. Just human cleverness, teamwork, and mud bricks! My master says that when people work together toward a big goal, they can build anything. Remember that when you look at the stars tonight, Star Navigator. The same determination that built the ziggurat can light up your constellation! Come visit me again soon!", choices: [{ text: "Thank you, Kidu! Goodbye for now.", next: "farewell" }] },
        end_stars: { text: "We are connected through the stars, you and I! My priests watch the sky from the ziggurat, and you navigate by starlight from your kingdom. Maybe the same constellations that guide you once guided my people too. I will look for your star tonight, Star Navigator. May your constellation shine bright!", choices: [{ text: "I'll look for yours too! Goodbye!", next: "farewell" }] },
        end_laws: { text: "Hammurabi's laws taught the world that fairness must be written down where everyone can see it. Before writing, the powerful could change the rules whenever they wanted. But carved in stone? Those rules last forever. You are a Star Navigator, and you carry knowledge too. Promise me you will always stand up for what is fair!", choices: [{ text: "I promise, Kidu! Thank you!", next: "farewell" }] },
        end_writing: { text: "You are a natural scribe! Remember, before cuneiform, all knowledge lived only in people's memories. If they forgot, the knowledge was lost forever. But writing means ideas can travel across time - from my clay tablet to your Star Map! Keep writing, keep learning. The world needs people who can capture knowledge and share it.", choices: [{ text: "Writing is like starlight - it travels through time!", next: "farewell" }] },
        end_farming: { text: "Without farming, there would be no cities, no scribes, no ziggurats. When people learned to grow their own food, everything changed. They could stay in one place, build homes, and create amazing things. Irrigation was the key - controlling water meant controlling our future. Remember, Star Navigator: the biggest adventures sometimes start with planting a seed!", choices: [{ text: "From seeds to stars! Thank you, Kidu!", next: "farewell" }] },
        end_trade: { text: "Trading teaches you to be fair and to value what other people make. That woman's cloth took days to weave. The baker's bread feeds a family. When we trade honestly, everyone wins! Some day, people will invent coins to make trading easier. But here in Ur, we still use the old way - and we always shake hands to seal the deal. *extends hand*", choices: [{ text: "*shakes hand* Deal! Goodbye, Kidu!", next: "farewell" }] },
        end_boats: { text: "The rivers connect us to the whole world! Goods, ideas, and people all flow along the water. My master says that rivers are like the blood of civilization - they carry life everywhere they go. Just like your starlight paths connect kingdoms, our rivers connect cities. Safe travels, Star Navigator!", choices: [{ text: "Rivers and starlight - both connect us! Bye!", next: "farewell" }] },
        end_city: { text: "The first cities were where humans learned to live together, solve problems together, and dream together. Every great thing in the world started because someone in a city had an idea and shared it with their neighbors. You carry that same spirit, Star Navigator. When you restore the constellations, you are connecting people across time - just like our city connects people across the land.", choices: [{ text: "Thank you for everything, Kidu!", next: "farewell" }] },
        farewell: { text: "*waves as starlight swirls around you* Come back soon, Star Navigator! I will keep writing your adventures on my clay tablets so that people thousands of years from now will know what you did here today. May the stars guide your path! *presses a small clay tablet into your hand as a gift*", choices: [{ text: "Close", next: "_close" }] }
      }
    },

    nefari: {
      name: "Nefari", title: "Daughter of the Pyramid Builder",
      image: "images/Girl_before_Great_202604021853.jpeg", color: "#E8943A",
      nodes: {
        start: {
          text: "Welcome to the land of the Nile, Star Navigator! I am Nefari. *bows gracefully* My father is helping build the great pyramid of Pharaoh Khufu - the biggest building the world has ever seen! The sun is setting behind the pyramids right now, turning everything gold. What would you like to discover first in my beautiful Egypt?",
          choices: [
            { text: "How do you build something THAT big?!", next: "pyramids" },
            { text: "What are those picture-writings on the wall?", next: "hieroglyphics" },
            { text: "Tell me about the great river!", next: "nile" }
          ]
        },
        pyramids: {
          text: "*gazes up in wonder* The Great Pyramid will have over two MILLION stone blocks when it is finished! Each block weighs as much as a hippopotamus! Workers cut the stones from quarries far away, then float them down the Nile on boats. They drag them up ramps made of sand and mud using ropes and wooden sleds. My father says it takes twenty years and thousands of workers. But the workers are not slaves - they are proud Egyptians who believe they are building a stairway to the stars for their pharaoh!",
          choices: [
            { text: "Two million blocks?! How do they lift them?", next: "engineering" },
            { text: "A stairway to the stars... like my Star Map!", next: "afterlife" },
            { text: "Tell me about the Pharaoh!", next: "pharaoh" }
          ]
        },
        hieroglyphics: {
          text: "*traces the wall carvings with her finger* These are hieroglyphics - sacred carvings! Each little picture tells a story. See this bird? It makes the sound 'ah.' This wavy line means 'water.' This eye means 'to see.' We have over 700 different symbols! Only scribes know them all - it takes years to learn. I practice every day on pieces of broken pottery. When I grow up, I want to write the stories of the pharaohs on temple walls so they will last forever!",
          choices: [
            { text: "Can you write my name in hieroglyphics?", next: "write_name" },
            { text: "What stories do the walls tell?", next: "wall_stories" },
            { text: "What else do you write on?", next: "papyrus" }
          ]
        },
        nile: {
          text: "*leads you to the riverbank* The Nile is the heart of Egypt! Every year, it floods and covers the farmland with rich, dark soil. We call it the 'gift of the Nile' because without the flood, nothing would grow in this desert. Look - you can see farmers planting wheat in the dark soil the flood left behind. And there! A fisherman casting his net. Boats carry stones for the pyramids, grain for the temples, and people to the markets. The Nile gives us everything.",
          choices: [
            { text: "What happens when the flood comes?", next: "flood" },
            { text: "I see animals! What lives in the river?", next: "animals" },
            { text: "What do Egyptian families do for fun?", next: "daily_life" }
          ]
        },
        engineering: {
          text: "My father showed me the secret! They pour water on the sand in front of the sleds - wet sand is much easier to slide on than dry sand! They also use wooden rollers under the heaviest blocks. And the ramps wrap around the pyramid as it gets taller, spiraling up like a road. The most amazing part? The corners of the pyramid point exactly north, south, east, and west. They line them up using the stars! Without your stars, Star Navigator, our pyramids would be crooked!",
          choices: [
            { text: "Stars helped build the pyramids? Amazing!", next: "end_engineering" },
            { text: "What else can you show me?", next: "start" }
          ]
        },
        afterlife: {
          text: "*speaks softly with reverence* Egyptians believe that when a pharaoh dies, his spirit climbs the pyramid like a staircase into the sky to join the stars and live forever. That is why we fill the pyramids with treasures - food, gold, furniture - everything the pharaoh will need in the afterlife. We even put model boats inside so he can sail across the sky! My father says building the pyramid is the most important job in the world because it helps the pharaoh live forever among the stars.",
          choices: [
            { text: "Living forever among the stars...", next: "end_afterlife" },
            { text: "What treasures go inside?", next: "treasures" }
          ]
        },
        pharaoh: {
          text: "Pharaoh Khufu is like a god to us! He wears a golden crown with a cobra on the front to protect him. He rules all of Egypt - from the delta in the north to the cataracts in the south. When he speaks, everyone listens. When he commands, everyone obeys. But a good pharaoh also takes care of his people. He makes sure the grain is stored for when the flood is bad, and he keeps Egypt safe from enemies. My father has actually seen him! He says Pharaoh's eyes shine like the sun.",
          choices: [
            { text: "A crown with a cobra! Tell me more!", next: "end_pharaoh" },
            { text: "What else can you show me?", next: "start" }
          ]
        },
        write_name: {
          text: "*picks up a piece of broken pottery and a reed brush* Your name is Rosie, yes? In hieroglyphics, I would use: the mouth symbol for 'R', the lasso for 'O', the folded cloth for 'S', the reed for 'I', and the two reed leaves for 'E'. *carefully draws the symbols* There! Now you have your name in the language of the pharaohs! I will put a cartouche around it - that is the oval that shows it is a royal name. After all, you ARE a princess!",
          choices: [
            { text: "My name in hieroglyphics! I love it!", next: "end_hieroglyphics" },
            { text: "What else is special about Egyptian writing?", next: "papyrus" }
          ]
        },
        wall_stories: {
          text: "The temple walls tell stories of the pharaoh's great deeds - battles won, temples built, offerings to the gods. But my favorite are the paintings in the tombs! They show everyday life: farmers harvesting wheat, fishermen on the Nile, children playing with toy animals, musicians playing harps and flutes. The colors are so bright - red, blue, green, yellow - made from ground-up minerals. These paintings will still be bright thousands of years from now!",
          choices: [
            { text: "Paintings that last forever? Wow!", next: "end_wall_stories" },
            { text: "Tell me something else!", next: "start" }
          ]
        },
        papyrus: {
          text: "*pulls out a thin sheet* This is papyrus - we make it from reeds that grow along the Nile! You cut the reeds into thin strips, lay them in a criss-cross pattern, and press them flat under heavy stones. When it dries, it is smooth enough to write on! It is much lighter than clay tablets. We can roll it up into scrolls and store thousands of them in our libraries. My dream is to write a scroll that people will still read long after I am gone.",
          choices: [
            { text: "Paper from reeds - that's genius!", next: "end_papyrus" },
            { text: "I want to learn more!", next: "start" }
          ]
        },
        flood: {
          text: "Every year when the star Sirius appears on the horizon, we know the flood is coming! The water rises for months, covering all the farmland. At first it seems scary - everything is underwater! But when the water goes back down, it leaves the most wonderful dark, rich soil. My mother calls it 'the black land.' We plant seeds right in that soil and they grow so fast! Without the flood, Egypt would be nothing but desert. The Nile's flood is the greatest gift the gods give us.",
          choices: [
            { text: "A star tells you when the flood comes?!", next: "end_flood" },
            { text: "Tell me more about Egypt!", next: "start" }
          ]
        },
        animals: {
          text: "*points excitedly* See that hippo? They are very dangerous! And look, a crocodile sunning on the bank - stay away from those! In the marshes you can see beautiful ibis birds and herons. We also have cats - oh, how Egyptians love cats! We believe they are sacred to the goddess Bastet. My family has a cat named Miu who catches mice in our grain storage. And of course there are camels and donkeys to carry heavy loads through the desert.",
          choices: [
            { text: "Sacred cats! That's adorable!", next: "end_animals" },
            { text: "What else is special about Egypt?", next: "start" }
          ]
        },
        daily_life: {
          text: "Egyptian children play many games! We play with spinning tops, dolls made of wood and cloth, and balls made of papyrus. My brother and I race along the Nile and wrestle in the sand. We also play a board game called Senet - it is a race game with strategy, like your games! For food, we eat bread, beer, fish, dates, and honey cakes. My mother braids my hair and puts cone-shaped perfume on top of my head for festivals - it melts slowly and makes me smell like lotus flowers!",
          choices: [
            { text: "Perfume cones on your head?! That's funny!", next: "end_daily" },
            { text: "What about festivals?", next: "end_daily" }
          ]
        },
        treasures: {
          text: "*whispers* I should not tell you this, but my father has seen inside the pyramid chambers! Golden furniture, jeweled necklaces, jars of precious oils, model boats, and even a golden death mask for the pharaoh's face. There are magical spells written on the walls to protect the pharaoh's spirit. And traps to keep out thieves! Secret passages, false doors, and heavy stone blocks that drop from the ceiling. No one will ever steal from our pharaoh!",
          choices: [
            { text: "Golden masks and secret traps! Incredible!", next: "end_treasures" },
            { text: "I want to explore more!", next: "start" }
          ]
        },
        end_engineering: { text: "The stars guide the builders, and the builders honor the stars! When you look up at your Star Map tonight, remember that my father and his workers used those same stars to build the greatest structure on Earth. Knowledge connects us across time, Star Navigator. Carry that knowledge well!", choices: [{ text: "I will! Thank you, Nefari!", next: "farewell" }] },
        end_afterlife: { text: "Perhaps when you complete your Star Map, you will see the pharaoh's spirit sailing among the constellations! He is up there right now, in a golden boat, traveling across the sky. And now you have a friend in Egypt who will wave to you every time she sees a shooting star. *smiles*", choices: [{ text: "I'll wave back! Goodbye, Nefari!", next: "farewell" }] },
        end_pharaoh: { text: "The pharaoh's crown represents the unity of Upper and Lower Egypt - two lands, one ruler. Just like your Star Map connects many constellations into one sky! Leadership means bringing people together. Remember that, Princess Rosie.", choices: [{ text: "Two lands, one sky. Thank you!", next: "farewell" }] },
        end_hieroglyphics: { text: "Now your name is written in the oldest picture-writing in the world! Hieroglyphics have lasted thousands of years carved in stone. Words are powerful, Star Navigator. They carry ideas across time and space - just like starlight. Keep writing, keep learning!", choices: [{ text: "Words are starlight! Goodbye, Nefari!", next: "farewell" }] },
        end_papyrus: { text: "From river reeds to written words - that is the magic of human invention! Every time you write in your Star Navigator's Journal, you are continuing a tradition that started right here on the banks of the Nile. Write your story well, Rosie!", choices: [{ text: "I will! Thank you!", next: "farewell" }] },
        end_wall_stories: { text: "Art tells the stories that words cannot. The paintings on our tomb walls will still be bright when the stars themselves have changed position. Create something beautiful, Star Navigator, and it will outlast even the pyramids!", choices: [{ text: "Art outlasts everything! Goodbye!", next: "farewell" }] },
        end_flood: { text: "A star in the sky tells farmers when to prepare for the flood! The universe is all connected - the stars, the river, the soil, the grain, and the people. As Star Navigator, you understand this better than anyone. Everything is connected through light.", choices: [{ text: "Everything connected through light! Bye!", next: "farewell" }] },
        end_animals: { text: "Egyptians respect all living creatures because we believe the gods live in many forms. The ibis represents Thoth, god of wisdom. The cat protects the home. Even the scarab beetle, who rolls balls of mud, reminds us of the sun rolling across the sky! Nature is full of lessons, Star Navigator.", choices: [{ text: "Nature teaches us everything! Thank you!", next: "farewell" }] },
        end_daily: { text: "Life in Egypt is full of joy! We work hard, but we also play, sing, and celebrate. My father says that a life without laughter is like the Nile without water - empty. Remember to have fun on your journey, Star Navigator. The best adventures include both learning AND laughing!", choices: [{ text: "Learning AND laughing! Goodbye, Nefari!", next: "farewell" }] },
        end_treasures: { text: "The greatest treasure in the pyramid is not the gold - it is the knowledge of how to build it. Gold can be stolen, but knowledge lives forever in the minds of those who learn. You are collecting the greatest treasure of all on your Star Map journey, Rosie!", choices: [{ text: "Knowledge is the real treasure! Bye!", next: "farewell" }] },
        farewell: { text: "*places a small papyrus scroll in your hand* This scroll has your name in hieroglyphics and a blessing from the goddess Isis. Keep it safe on your journey, Star Navigator. Whenever you see the stars, remember your friend Nefari by the Nile. May Thoth, god of wisdom, guide your path! *waves as golden starlight surrounds you*", choices: [{ text: "Close", next: "_close" }] }
      }
    },

    quilla: {
      name: "Quilla", title: "Mountain Keeper of the Inca Empire",
      image: "images/Girl_holding_quipu_202604021854.jpeg", color: "#5BA55B",
      nodes: {
        start: {
          text: "Alli shamushka! That means 'welcome' in Quechua, my language! I am Quilla, named after Mama Quilla, the moon goddess. *spreads her arms wide* Look around you, Star Navigator! We are high in the Andes mountains, above the clouds! My people, the Inca, built cities up here where condors fly. See those green steps carved into the mountainside? Those are our farms! What amazes you most?",
          choices: [
            { text: "Farms on the side of a mountain?!", next: "terrace" },
            { text: "What is that colorful knotted string you're holding?", next: "quipu" },
            { text: "How did you build a city this high up?", next: "machu_picchu" }
          ]
        },
        terrace: {
          text: "*runs to the edge of a terrace* These are our terrace farms! We carved flat steps into the steep mountain, then filled them with soil carried up in baskets. Different crops grow at different heights - potatoes at the top where it is cold, corn lower down where it is warm, and quinoa in between. We even built tiny channels to carry water from mountain streams down through each terrace. It is like a giant green staircase feeding our whole empire!",
          choices: [
            { text: "Different crops at different heights - clever!", next: "crops" },
            { text: "How do you carry water uphill?", next: "water" },
            { text: "Tell me about the llamas!", next: "llamas" }
          ]
        },
        quipu: {
          text: "*holds up a bundle of colorful knotted strings* This is a quipu! We do not have writing like some civilizations, but we have something just as clever. Each color string represents something different - red for soldiers, yellow for gold, white for silver. The knots tell the numbers. One knot means one, two knots means two, and the position of the knot shows if it is ones, tens, or hundreds! I can count to thousands with just this string! My job is to count the llamas for our village.",
          choices: [
            { text: "Counting with knots! Can you teach me?", next: "count_lesson" },
            { text: "No writing at all? How do you remember things?", next: "memory" },
            { text: "What are llamas like?", next: "llamas" }
          ]
        },
        machu_picchu: {
          text: "*proudly gestures at the stone buildings* Our builders are the best in the world! They cut stones so perfectly that they fit together without any glue or mortar - you cannot even fit a blade of grass between them! And we did all of this without wheels, without iron tools, and without horses. Just bronze chisels, ropes, and human strength! The roads connect our whole empire - you could walk from one end to the other on smooth stone paths. Even our rope bridges stretch across deep valleys!",
          choices: [
            { text: "No wheels?! How is that possible?", next: "no_wheels" },
            { text: "Tell me about the rope bridges!", next: "bridges" },
            { text: "How big is the Inca Empire?", next: "empire" }
          ]
        },
        crops: {
          text: "We grow over 200 different kinds of potatoes! Big ones, small ones, purple ones, yellow ones. My favorite is the freeze-dried potato called chuño - we leave potatoes out in the cold mountain air at night, then stomp on them with our feet to squeeze out the water. They last for years! We also grow corn, quinoa, tomatoes, and peppers. Did you know that potatoes and tomatoes come from our land? Someday, people all over the world will eat them!",
          choices: [
            { text: "200 kinds of potatoes?! I love potatoes!", next: "end_crops" },
            { text: "Show me something else!", next: "start" }
          ]
        },
        llamas: {
          text: "*hugs a fluffy llama* This is Chaska - her name means 'star!' Llamas carry our goods along the mountain roads. They are strong and sure-footed, perfect for narrow mountain paths. We also use their wool for warm blankets and clothing. They are gentle but stubborn - if you put too much weight on a llama, she will sit down and refuse to move! *laughs* Chaska once spit on my brother when he tried to make her carry too many potatoes!",
          choices: [
            { text: "She SPIT on him?! Ha! What else about llamas?", next: "end_llamas" },
            { text: "Tell me about something else!", next: "start" }
          ]
        },
        count_lesson: {
          text: "*hands you a practice quipu* Okay! Let us count your quest items. Take the yellow string - that will be for golden items. Now tie one knot at the bottom for ones, and if you have ten, tie a knot higher up. See? If you have 13 items, you tie three knots at the bottom and one knot above. Now try the red string for how many missions you have completed! This is how the Inca ran an entire empire without a single written word!",
          choices: [
            { text: "I can track my quest items with knots!", next: "end_quipu" },
            { text: "Show me more amazing Inca things!", next: "start" }
          ]
        },
        memory: {
          text: "We have special people called quipu kamayuq - the keepers of the knots. They memorize thousands of facts and stories, passing them down from parent to child. We also have runners called chasqui who carry quipu messages along the roads from village to village. A message can travel 250 miles in a single day by passing from runner to runner! Faster than any horse!",
          choices: [
            { text: "Human relay runners! Like a living telephone!", next: "end_runners" },
            { text: "Tell me about the Maya and Aztec too!", next: "maya_aztec" }
          ]
        },
        no_wheels: {
          text: "*shrugs with a smile* Why would we need wheels? Our roads go up and down steep mountains - wheels would just roll away! Llamas are much better than carts on mountain paths. And our builders carry stones on their backs and with ropes - they are incredibly strong! My grandfather says the wheel is a good idea for flat land, but in the mountains, you need something better. We use our brains and our hands, and look what we built!",
          choices: [
            { text: "Different problems need different solutions!", next: "end_nowheel" },
            { text: "What about the Maya and Aztec?", next: "maya_aztec" }
          ]
        },
        bridges: {
          text: "*walks carefully to the edge* See that bridge? It stretches across a valley so deep you cannot see the bottom! It is made entirely of twisted grass ropes - thousands of braided strands woven together into cables thick as your body! Every year, the whole village comes together to rebuild it. Each family makes their section of rope, and then we weave them all together. It sways in the wind, but it is incredibly strong. I have crossed it a hundred times!",
          choices: [
            { text: "A bridge made of GRASS over a canyon?!", next: "end_bridges" },
            { text: "What else amazes visitors?", next: "start" }
          ]
        },
        empire: {
          text: "The Inca Empire stretches along the mountains for thousands of miles - from cold highlands to steaming jungles! We call it Tawantinsuyu, 'The Four Quarters.' Our great ruler, the Sapa Inca, keeps it all connected with roads, runners, and laws. Everyone works together - farmers grow food for the empire, builders make roads, and weavers make cloth. Nobody goes hungry because we share everything. My mother says sharing is the Inca way.",
          choices: [
            { text: "Sharing everything - that's beautiful!", next: "end_empire" },
            { text: "Tell me more!", next: "start" }
          ]
        },
        water: {
          text: "Gravity is our friend! Mountain streams flow downhill, so we build channels that guide the water from stream to terrace to terrace, all the way down. Some channels are carved right into the rock! We even built fountains in our cities. The water engineers are some of the most respected people in our empire - because without water, nothing grows, and without food, there is no empire. Water is life!",
          choices: [
            { text: "Water is life - I'll remember that!", next: "end_water" },
            { text: "Show me more!", next: "start" }
          ]
        },
        maya_aztec: {
          text: "We are not the only great civilization in the Americas! Far to the north, the Maya built incredible cities in the jungle. They created a calendar more accurate than anyone else's and could predict eclipses! And the Aztec built a city called Tenochtitlan ON A LAKE - with floating gardens and causeways. Three great civilizations, three different solutions to three different landscapes. But we all share one thing: we built wonders without the tools that other lands had!",
          choices: [
            { text: "Three amazing civilizations! Incredible!", next: "end_maya_aztec" },
            { text: "Tell me more!", next: "start" }
          ]
        },
        end_crops: { text: "Remember: 200 kinds of potatoes and they ALL started here! When people far away eat potatoes someday, they will be tasting a piece of the Inca Empire. Food connects the world, Star Navigator, just like your starlight paths. Carry the taste of the mountains with you!", choices: [{ text: "Thank you, Quilla!", next: "farewell" }] },
        end_llamas: { text: "Llamas are our partners in everything. They carry our goods, give us wool, and make us laugh when they spit! A good partnership means respecting each other's limits. Remember that, Star Navigator - even on your grand quest, know when to rest and when to push forward!", choices: [{ text: "Even llamas know when to rest! Bye!", next: "farewell" }] },
        end_quipu: { text: "You learned to count the Inca way! A knot may seem simple, but it can hold the records of an entire empire. Never underestimate simple tools, Star Navigator. Your Star Map is like a giant quipu in the sky - each constellation is a knot that holds a world of knowledge!", choices: [{ text: "My Star Map IS a quipu in the sky!", next: "farewell" }] },
        end_runners: { text: "The chasqui runners prove that humans working together can outrun even the fastest horse! When you carry knowledge from one constellation to the next, you are a chasqui of the stars. Run fast, Star Navigator!", choices: [{ text: "A star runner! I love it! Goodbye!", next: "farewell" }] },
        end_nowheel: { text: "Not every problem has the same answer. In flat lands, wheels are brilliant. In mountains, llamas and strong backs work better. The smartest people find the right tool for THEIR challenge. That is true wisdom, Star Navigator!", choices: [{ text: "Right tools for the right challenge! Thanks!", next: "farewell" }] },
        end_bridges: { text: "A grass bridge across a bottomless canyon! It proves that when a whole community works together, they can connect anything - even two sides of an impossible gap. Your Star Map does the same thing, Rosie. It connects worlds that seem impossibly far apart!", choices: [{ text: "Connecting worlds! Thank you, Quilla!", next: "farewell" }] },
        end_empire: { text: "Sharing is the foundation of the Inca way. When everyone contributes and everyone benefits, the empire thrives. Your Kingdom of Everbright works the same way - every constellation you restore shares its light with the whole sky!", choices: [{ text: "Sharing light! Goodbye, Quilla!", next: "farewell" }] },
        end_water: { text: "Water flows downhill, always seeking the path of least resistance. But with clever engineering, it can climb mountains and feed nations! Be like water, Star Navigator - find a way, even when the path seems impossible!", choices: [{ text: "Be like water! Thank you!", next: "farewell" }] },
        end_maya_aztec: { text: "Three civilizations, three different landscapes, three different kinds of genius. The Maya mastered time, the Aztec mastered water, and we Inca mastered mountains. Together, the Americas prove that human creativity knows no limits!", choices: [{ text: "No limits! Goodbye, Quilla!", next: "farewell" }] },
        farewell: { text: "*ties a small knot in a colorful string and places it in your hand* This quipu knot represents our friendship. Whenever you feel lost on your journey, hold it tight and remember: you have a friend in the mountains who is cheering for you! Tupananchikkama - until we meet again! *the condor overhead cries as starlight carries you home*", choices: [{ text: "Close", next: "_close" }] }
      }
    },

    tlalli: {
      name: "Tlalli", title: "Young Artist of Tenochtitlan",
      image: "images/Aztec_boy_holding_202604021854.jpeg", color: "#C94C4C",
      nodes: {
        start: {
          text: "Niltze! That means 'hello' in Nahuatl, my language! I am Tlalli, and you are standing in the most beautiful city in the world - Tenochtitlan! *spins around with paint-stained hands* It is built on an island in the middle of a great lake! See the pyramids? The canals? The floating gardens? And smell that? That is xocolatl - chocolate! What calls to you first, Star Navigator?",
          choices: [
            { text: "A city on a LAKE? How?!", next: "city" },
            { text: "Did you say chocolate?! Tell me more!", next: "chocolate" },
            { text: "What are those floating gardens?", next: "chinampas" }
          ]
        },
        city: {
          text: "*points across the shimmering lake* Tenochtitlan sits on an island connected to the mainland by three great causeways - stone bridges so wide that eight people can walk side by side! We have canals instead of streets, and people paddle canoes everywhere. There are 200,000 people living here - bigger than most cities in the world! The great pyramid temple rises in the center, covered in bright paint and carvings. Spanish visitors who come here say they have never seen anything so magnificent!",
          choices: [
            { text: "200,000 people! What is the market like?", next: "market" },
            { text: "Tell me about the pyramid temple!", next: "temple" },
            { text: "What happens on the canals?", next: "canals" }
          ]
        },
        chocolate: {
          text: "*grinds cacao beans with a stone* Xocolatl is the drink of the gods! We grind these cacao beans into a paste, mix it with water, chili peppers, and vanilla, then pour it back and forth between cups to make it foamy. It is bitter and spicy - not sweet like you might expect! Only nobles and warriors are supposed to drink it, but... *looks around and whispers* ...my mother lets me have a little sip sometimes. Cacao beans are so valuable we even use them as money! Imagine paying for your lunch with chocolate!",
          choices: [
            { text: "Chocolate money?! That's the best currency ever!", next: "end_chocolate" },
            { text: "What else do you eat?", next: "food" },
            { text: "Show me the market!", next: "market" }
          ]
        },
        chinampas: {
          text: "*paddles a canoe to a floating garden* These are chinampas - floating gardens! Well, they do not really float anymore. We built them by piling layers of mud, lake weeds, and soil onto wooden frames, then anchored them to the lake bottom with willow trees. The roots hold everything together. Now they are like little islands of super-rich soil! We grow corn, tomatoes, squash, beans, chilies, and flowers on them. My favorite part? You can paddle your canoe right between the gardens!",
          choices: [
            { text: "Gardens ON the water! Genius!", next: "end_chinampas" },
            { text: "What else grows here?", next: "food" },
            { text: "What else is cool about Tenochtitlan?", next: "city" }
          ]
        },
        market: {
          text: "*eyes go wide* The market at Tlatelolco has SIXTY THOUSAND people in it every day! You can buy anything - jaguar skins, parrot feathers, turquoise jewelry, pottery, obsidian knives so sharp they can cut a hair in half, rubber balls for the ball game, cacao beans, vanilla, and hundreds of kinds of food. There are judges who walk around making sure all the trades are fair. My mother sells the beautiful cloth she weaves, and I sometimes sell my paintings!",
          choices: [
            { text: "60,000 people?! What a market!", next: "end_market" },
            { text: "Tell me about the ball game!", next: "ball_game" },
            { text: "What paintings do you make?", next: "art" }
          ]
        },
        temple: {
          text: "The Templo Mayor is the heart of our city! It rises seven stories high, with two shrines at the top - one for Tlaloc, the rain god, painted blue, and one for Huitzilopochtli, the sun god, painted red. Priests climb the steep steps to make offerings and watch the stars. During festivals, the whole city gathers at the base while music, drums, and singing fill the air. The temple is so tall you can see the whole lake from the top!",
          choices: [
            { text: "Blue for rain, red for sun - beautiful!", next: "end_temple" },
            { text: "Tell me about festivals!", next: "festivals" }
          ]
        },
        food: {
          text: "We eat like kings! Tortillas made from corn, beans cooked with chilies, tamales wrapped in corn husks, squash, avocados, and tomatoes. My mother makes the best mole sauce - she grinds together chocolate, chilies, and spices into a rich, dark sauce that goes over turkey. We also eat insects! Grasshoppers taste crunchy and salty, like a snack. And we make a drink called pulque from the agave plant. Food is art in Tenochtitlan!",
          choices: [
            { text: "Grasshoppers as snacks? Ew... but cool!", next: "end_food" },
            { text: "Tell me about your art!", next: "art" }
          ]
        },
        art: {
          text: "*shows his paint-stained hands proudly* I am studying to be a tlacuilo - a painter of codex books! We paint pictures that tell stories of the gods, the stars, and the history of our people on long folded books made from bark paper. I use natural pigments - red from cochineal bugs, blue from indigo plants, yellow from marigolds, and black from soot. Every color has meaning! Blue means water and sacrifice. Red means blood and life. I want my paintings to last a thousand years!",
          choices: [
            { text: "Colors from bugs and flowers! Amazing!", next: "end_art" },
            { text: "Tell me about something else!", next: "start" }
          ]
        },
        ball_game: {
          text: "Ullamaliztli! It is the greatest game ever invented! Players use their hips, knees, and elbows to hit a heavy rubber ball through a stone ring high on the wall. No hands allowed! The ball is as heavy as your head, so it really hurts! But the crowds go wild cheering. Sometimes whole cities play against each other. The game represents the battle between day and night, light and darkness. My brother is one of the best players in our neighborhood!",
          choices: [
            { text: "A ball game about light vs. darkness!", next: "end_ball" },
            { text: "What else can you show me?", next: "start" }
          ]
        },
        canals: {
          text: "Our canals are like streets made of water! Families paddle their canoes to the market, to the temple, to visit friends. Some canals are wide enough for ten canoes side by side! We also have aqueducts that bring fresh drinking water from springs on the mainland through stone pipes right into the city. Clean water for 200,000 people! My father says our engineers are the smartest in the world.",
          choices: [
            { text: "Water streets and clean drinking water!", next: "end_canals" },
            { text: "What else is amazing here?", next: "start" }
          ]
        },
        festivals: {
          text: "Oh, festivals are the BEST! Drums thunder, flutes sing, dancers wear costumes of jaguar skins and quetzal feathers so bright they look like they are on fire! We have festivals for planting, for rain, for the harvest, for the new fire ceremony. Everyone dresses in their finest clothes and paints their faces. Children get special honey treats. The whole city celebrates together! Music and dancing can last for days!",
          choices: [
            { text: "Days of dancing and honey treats! Wow!", next: "end_festivals" },
            { text: "This city is incredible!", next: "start" }
          ]
        },
        end_chocolate: { text: "Cacao beans as money, chocolate as a drink of the gods! The Aztec knew that the sweetest things in life have deep roots. Someday, people all over the world will love chocolate - and it all started here! Take a cacao bean with you, Star Navigator. It is worth more than gold!", choices: [{ text: "Chocolate is priceless! Thank you, Tlalli!", next: "farewell" }] },
        end_chinampas: { text: "Gardens on the water! When the land is not big enough, make more land. When the problem seems impossible, get creative! That is the Aztec spirit, Star Navigator. Never let a problem stop you - just find a way around it!", choices: [{ text: "Find a way around it! Goodbye, Tlalli!", next: "farewell" }] },
        end_market: { text: "Sixty thousand people trading, talking, and sharing. A market is not just about buying things - it is where ideas flow, cultures mix, and friendships form. Your Star Map connects worlds the same way, Rosie!", choices: [{ text: "Markets connect people! Thank you!", next: "farewell" }] },
        end_temple: { text: "Blue for water, red for sun - the two things that make life possible. The Aztec understood that nature's forces must be balanced. Light needs darkness, rain needs sun, and knowledge needs curiosity. Balance your own forces well, Star Navigator!", choices: [{ text: "Balance! I'll remember! Goodbye!", next: "farewell" }] },
        end_food: { text: "Food is culture! Every meal tells the story of a people - where they live, what they grow, what they celebrate. The tomatoes, chocolate, and corn of Tenochtitlan will someday feed the whole world. Food connects us all, Star Navigator!", choices: [{ text: "Food connects the world! Bye, Tlalli!", next: "farewell" }] },
        end_art: { text: "Every painting tells a story, and every color holds meaning. When you fill in your Star Map, you are painting with light itself! Be an artist of knowledge, Star Navigator. Make your work so beautiful it lasts a thousand years!", choices: [{ text: "Painting with starlight! Thank you!", next: "farewell" }] },
        end_ball: { text: "The ball game is about the eternal struggle between light and darkness! Sound familiar, Star Navigator? You are playing the biggest game of all - pushing back The Dimming with knowledge and courage. Keep playing! The crowd of constellations is cheering for you!", choices: [{ text: "Light vs. darkness! I'll win! Goodbye!", next: "farewell" }] },
        end_canals: { text: "Water streets bring people together, just like your starlight paths. The Aztec engineers solved problems that seemed impossible. When you face The Dimming, remember: there is always a way to bring the water to the garden!", choices: [{ text: "There's always a way! Thanks, Tlalli!", next: "farewell" }] },
        end_festivals: { text: "Life without celebration is like a painting without color! When you complete your missions, CELEBRATE! Dance, sing, feast! The Aztec knew that joy is not a break from learning - it IS learning. Carry joy with you, Star Navigator!", choices: [{ text: "Joy IS learning! Goodbye, Tlalli!", next: "farewell" }] },
        farewell: { text: "*presses a small painted tile into your hand* I painted this for you - it shows a quetzal bird flying toward the stars. Quetzal feathers are the most precious thing in Tenochtitlan, and friendship is the most precious thing in the world. Mochihuica, Star Navigator! That means 'be strong!' *dips his brush in blue paint and waves goodbye*", choices: [{ text: "Close", next: "_close" }] }
      }
    },

    samuel: {
      name: "Samuel", title: "Young Apprentice of Colonial Boston",
      image: "images/Boy_holding_quill_202604021854.jpeg", color: "#4A90D9",
      nodes: {
        start: {
          text: "Good day to you, traveler! *adjusts ink-stained apron* My name is Samuel, and I am an apprentice at my father's print shop here in Boston. Things are very exciting in the colonies right now! Everyone is talking about whether we should be free from King George's rule. My father prints pamphlets about liberty, and I help set the type. What would you like to know about our colonies?",
          choices: [
            { text: "Why does everyone want freedom?", next: "freedom" },
            { text: "What is your life like in Boston?", next: "daily_life" },
            { text: "Tell me about the printing press!", next: "printing" }
          ]
        },
        freedom: {
          text: "*speaks passionately* The King makes us pay taxes on everything - tea, paper, stamps, glass! But we have no say in the laws. We cannot vote, we cannot speak to Parliament. 'No taxation without representation!' - that is what the people shout in the streets. My father says it is not just about money. It is about the right to govern ourselves. Every person deserves a voice. That is what liberty means!",
          choices: [
            { text: "What is the Boston Tea Party I've heard about?", next: "tea_party" },
            { text: "Who are the leaders of this fight?", next: "leaders" },
            { text: "What are the thirteen colonies?", next: "colonies" }
          ]
        },
        daily_life: {
          text: "I wake up before dawn to start the fire. Then I go to my father's print shop where I clean the press, mix the ink, and arrange the tiny metal letters one by one. After work, I have lessons - reading, writing, arithmetic, and the Bible. My sister helps my mother make candles and soap. We grow vegetables in our garden and keep chickens for eggs. At night, we read by candlelight. Life is simple but good. The town meeting is my favorite - that is where all the adults vote on important decisions!",
          choices: [
            { text: "Town meetings where everyone votes? Cool!", next: "town_meeting" },
            { text: "What is school like?", next: "school" },
            { text: "Tell me about the fight for freedom!", next: "freedom" }
          ]
        },
        printing: {
          text: "*shows the wooden printing press* This is the most powerful machine in the colonies! See these tiny metal letters? I arrange them backwards on this plate, spread ink on top, then press a sheet of paper down hard. When I lift the paper - words! My father says the printing press is mightier than any sword because ideas travel faster than armies. We print newspapers, pamphlets, and even the Declaration of Independence will be printed on a press just like this one!",
          choices: [
            { text: "Words are mightier than swords! Wow!", next: "end_printing" },
            { text: "What is the Declaration of Independence?", next: "declaration" },
            { text: "Tell me more about colonial life.", next: "daily_life" }
          ]
        },
        tea_party: {
          text: "*looks around and whispers* One night, brave colonists dressed up as Mohawk Indians and sneaked onto British ships in Boston Harbor. They dumped 342 chests of tea into the water! The whole harbor smelled like tea for days! They did it because King George put a tax on tea without asking us. It was not really about tea - it was about the principle. Nobody should have to pay taxes if they have no say in the government. The King was furious! He sent soldiers. But we will not back down!",
          choices: [
            { text: "342 chests of tea! That's brave!", next: "end_tea" },
            { text: "What happened after?", next: "revolution" },
            { text: "Who were these brave colonists?", next: "leaders" }
          ]
        },
        leaders: {
          text: "Oh, there are so many great people! Mr. Benjamin Franklin is the wisest man in the colonies - he invented a stove, proved that lightning is electricity, and started the first public library! Mr. George Washington is tall as a tree and brave as a lion - he will lead our army. Mr. Thomas Jefferson writes the most beautiful words about freedom you have ever read. And there is a woman named Abigail Adams who reminds everyone that liberty must include ALL people!",
          choices: [
            { text: "Franklin sounds amazing! Tell me more!", next: "franklin" },
            { text: "What did Jefferson write?", next: "declaration" },
            { text: "What about George Washington?", next: "washington" }
          ]
        },
        colonies: {
          text: "*pulls out a hand-drawn map* There are thirteen colonies stretching along the Atlantic coast! Massachusetts, where we are, is in the north. Virginia, where tobacco grows, is in the south. Pennsylvania, founded by Quakers who believe in peace. Each colony is a little different - some have big farms, some have busy ports, some are deeply religious. But we all share one thing: we are tired of being ruled by a king across the ocean who does not understand our lives!",
          choices: [
            { text: "Thirteen colonies becoming one nation!", next: "end_colonies" },
            { text: "Tell me about the fight for freedom!", next: "revolution" }
          ]
        },
        revolution: {
          text: "*voice trembles with excitement* The Continental Congress met in Philadelphia and decided - we are going to declare our independence! Mr. Jefferson is writing a document that says all people are created equal, that everyone has the right to life, liberty, and the pursuit of happiness. When it is finished, my father's press will print copies for every colony. People will read it aloud in town squares. It will change the world forever, I am certain of it!",
          choices: [
            { text: "All people created equal! That's powerful!", next: "end_revolution" },
            { text: "What does the Declaration say?", next: "declaration" }
          ]
        },
        declaration: {
          text: "*carefully holds a printed sheet* Listen to these words: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty, and the pursuit of Happiness.' Mr. Jefferson wrote this! It means that freedom is not something a king gives you - it is something you are born with! Every person, everywhere, deserves these rights!",
          choices: [
            { text: "Rights you are BORN with! Beautiful!", next: "end_declaration" },
            { text: "What happens when the King reads this?", next: "end_revolution" }
          ]
        },
        town_meeting: {
          text: "In our town meeting, EVERY adult man can stand up and speak his mind! Rich or poor, it does not matter. We vote on everything - taxes, roads, schools, laws. My father says this is democracy in action - the people governing themselves. I cannot wait until I am old enough to vote! Last week, we voted to repair the bridge over the creek. Everyone disagreed at first, but after talking it through, we found a solution everyone could accept. That is how it should work!",
          choices: [
            { text: "Everyone gets a voice! That's democracy!", next: "end_democracy" },
            { text: "What else about colonial life?", next: "daily_life" }
          ]
        },
        school: {
          text: "I go to a one-room schoolhouse where children of all ages learn together! We sit on hard wooden benches and share hornbooks - wooden paddles with the alphabet printed on them. We practice our letters, do arithmetic on slates, and read from the Bible and the New England Primer. The schoolmaster is very strict - he raps your knuckles with a ruler if you misbehave! But I love learning. My father says education is the key to liberty - an educated people can never be enslaved.",
          choices: [
            { text: "Education is the key to liberty!", next: "end_school" },
            { text: "Tell me about the revolution!", next: "freedom" }
          ]
        },
        franklin: {
          text: "Mr. Franklin is incredible! He flew a kite in a thunderstorm to prove that lightning is electricity. He invented a special stove that heats a room better. He started the first lending library so everyone could read books, not just the rich. He wears tiny glasses called bifocals that he invented himself! And he is funny too - he says things like 'Early to bed, early to rise, makes a man healthy, wealthy, and wise.' I want to be an inventor like him someday!",
          choices: [
            { text: "A kite in a thunderstorm! What a genius!", next: "end_franklin" },
            { text: "Tell me about something else!", next: "start" }
          ]
        },
        washington: {
          text: "Mr. Washington is the tallest, bravest man I have ever seen! He does not talk much, but when he speaks, everyone listens. He was a farmer in Virginia who loves his land. But when the colonies needed a leader for the army, he said yes without hesitation. My father says he will be the first leader of our new nation someday. A man who gives up his farm to fight for others' freedom - that is the definition of a hero!",
          choices: [
            { text: "A farmer who became a hero! Inspiring!", next: "end_washington" },
            { text: "Tell me more!", next: "start" }
          ]
        },
        end_printing: { text: "The printing press spreads ideas faster than any messenger on horseback. Ideas about freedom, science, and justice. Your Star Map is like a printing press of light - it spreads knowledge across the sky for everyone to read! Keep printing your stories in the stars, Star Navigator!", choices: [{ text: "Stars are stories! Thank you, Samuel!", next: "farewell" }] },
        end_tea: { text: "Sometimes standing up for what is right means making a big splash - literally! The brave colonists risked everything to make their voices heard. When you face The Dimming, remember the tea in the harbor. Sometimes the boldest action lights the biggest fire of change!", choices: [{ text: "Bold action! I'll remember! Bye!", next: "farewell" }] },
        end_revolution: { text: "A new nation is being born! Not through kings or conquest, but through ideas written on paper. The idea that everyone deserves freedom will echo through the centuries. Your quest to restore the Star Map carries that same spirit - bringing light and knowledge to all!", choices: [{ text: "Freedom echoes forever! Thank you!", next: "farewell" }] },
        end_declaration: { text: "Rights that are born with you, not given by a king. These words will change the world, Star Navigator. When you light up constellations, you are declaring that knowledge belongs to everyone. Never let anyone dim your stars!", choices: [{ text: "Knowledge for everyone! Goodbye!", next: "farewell" }] },
        end_colonies: { text: "Thirteen different colonies learning to work as one. That is not easy! But when people unite around shared values - freedom, fairness, and courage - they can overcome any challenge. Your 15 constellations are like our 13 colonies. Together, they form something greater than any one alone!", choices: [{ text: "Together we shine! Thank you, Samuel!", next: "farewell" }] },
        end_democracy: { text: "Democracy means every voice matters. When you hold a town meeting in Meadowbrook Village, remember: the best ideas come from listening to everyone. Even the quietest voice might have the brightest idea!", choices: [{ text: "Every voice matters! Goodbye!", next: "farewell" }] },
        end_school: { text: "Education is the key that unlocks every door. An educated citizen can think for themselves, stand up for what is right, and build a better world. Keep learning, Star Navigator - every fact you discover is another key on your ring!", choices: [{ text: "Every fact is a key! Thank you!", next: "farewell" }] },
        end_franklin: { text: "Mr. Franklin proves that curiosity and courage can change the world! A kite, a key, and a thunderstorm - that is all it took. Your journey is the same, Star Navigator. Curiosity is your kite, courage is your key, and The Dimming is your thunderstorm. Fly high!", choices: [{ text: "Curiosity and courage! Bye, Samuel!", next: "farewell" }] },
        end_washington: { text: "True leadership means serving others, not ruling them. Washington left his farm to fight for strangers' freedom. You left your castle to restore strangers' knowledge. That makes you a hero too, Star Navigator!", choices: [{ text: "Serving others! Thank you, Samuel!", next: "farewell" }] },
        farewell: { text: "*carefully folds a freshly printed pamphlet and places it in your hands* This is the first copy off the press today - a poem about liberty that my father wrote. Keep it close to your heart, Star Navigator. And remember: the pen is mightier than the sword, and the press is mightier than both! Long live liberty! *tips his tricorn hat as starlight swirls around you*", choices: [{ text: "Close", next: "_close" }] }
      }
    },

    clara: {
      name: "Clara", title: "Pioneer Girl on the Oregon Trail",
      image: "images/Pioneer_girl_with_202604021854.jpeg", color: "#8B5CF6",
      nodes: {
        start: {
          text: "Howdy, friend from the stars! *pushes bonnet out of eyes* I'm Clara, and my family is heading west on the Oregon Trail! We have been in this covered wagon for three months now. The prairie is so big you can see the edge of the world in every direction! Today we spotted a herd of buffalo - must have been a thousand of them! What would you like to know about our adventure?",
          choices: [
            { text: "What is it like inside the wagon?", next: "wagon" },
            { text: "Tell me about the buffalo!", next: "buffalo" },
            { text: "Why is your family going west?", next: "why_west" }
          ]
        },
        wagon: {
          text: "*pats the canvas cover* We call it a prairie schooner because the white cover looks like a ship's sail from far away! Inside, there is barely room for our supplies: flour, bacon, coffee, sugar, a rifle, tools, seeds, and Ma's rocking chair that Pa promised she could bring. My brother and I sleep underneath the wagon on a bedroll. It is crowded, dusty, and bumpy - but every morning when I climb out and see the sunrise over the prairie, I know we are going somewhere wonderful!",
          choices: [
            { text: "What do you eat on the trail?", next: "food" },
            { text: "Is the journey dangerous?", next: "dangers" },
            { text: "How do you know where to go?", next: "navigation" }
          ]
        },
        buffalo: {
          text: "*eyes go wide* You have never seen anything like it! The ground shakes before you even see them. Then the horizon turns brown and moves! Thousands of buffalo running together, their hooves thundering like a storm. The dust cloud rises so high it blocks the sun! The scouts say we must never get in front of a stampede. We use buffalo for everything - meat for food, hides for blankets, bones for tools, even buffalo chips for fuel when there is no wood on the prairie! *wrinkles nose*",
          choices: [
            { text: "Buffalo chips for fire? You mean... poop?!", next: "end_buffalo" },
            { text: "What other animals do you see?", next: "animals" },
            { text: "Tell me about the dangers!", next: "dangers" }
          ]
        },
        why_west: {
          text: "*gazes toward the horizon* Pa heard about the Oregon Territory - green valleys with rich soil, tall trees, and rivers full of salmon. Free land for anyone brave enough to make the journey! Back in Missouri, our farm was too small for our growing family. Pa says out west, a man can plant his dreams and watch them grow. Ma is nervous but excited. My little sister was born on the trail, so we named her Prairie! Someday I will have my own farm under the biggest sky you have ever seen.",
          choices: [
            { text: "Free land and big dreams! How far is it?", next: "distance" },
            { text: "Who else is going west?", next: "wagon_train" },
            { text: "What will you do when you get there?", next: "end_newlife" }
          ]
        },
        food: {
          text: "We eat a lot of beans, bacon, and biscuits! Ma makes sourdough bread in a Dutch oven over the campfire. When we can, we hunt deer or rabbit. We pick wild berries along the trail. My favorite is when Pa catches a fish from the river and Ma fries it up with cornmeal. The worst part? We have to drink water from rivers and streams, and sometimes it makes people sick. Pa always boils it first now. Coffee is the most important thing - even the children get a little sip to keep our spirits up!",
          choices: [
            { text: "Campfire cooking! Sounds adventurous!", next: "end_food" },
            { text: "What are the dangers?", next: "dangers" }
          ]
        },
        dangers: {
          text: "*speaks seriously* River crossings are the scariest. We have to float the wagon across on logs or find a shallow ford. Two families in our train lost wagons in the river last month. There are also rattlesnakes, sudden thunderstorms, and sometimes the axle breaks and we have to fix it with whatever we can find. But the biggest danger is getting sick - there is no doctor out here. We all look out for each other. That is the rule of the trail: help your neighbor, because tomorrow you might need their help.",
          choices: [
            { text: "Help your neighbor - that's a good rule!", next: "end_dangers" },
            { text: "How do you cross rivers?", next: "river_crossing" },
            { text: "Tell me something happier!", next: "happy" }
          ]
        },
        navigation: {
          text: "*points at the sky* Pa navigates by the stars! The North Star is the most important - it always points the same direction. During the day, he watches the sun and uses landmarks the scouts told us about - Chimney Rock, Independence Rock, the Blue Mountains. We also follow the ruts in the ground left by wagons that came before us. And you know what? The same stars you study as Star Navigator are the ones guiding my family west! We are connected through the sky!",
          choices: [
            { text: "We share the same stars! That's beautiful!", next: "end_navigation" },
            { text: "What is it like at night on the trail?", next: "campfire" }
          ]
        },
        animals: {
          text: "Oh, the prairie is full of life! Prairie dogs pop up from underground cities and bark at us. Coyotes howl at night - it is spooky but beautiful. Antelope race alongside the wagon train, so fast they seem to fly! Eagles circle overhead looking for rabbits. And once we saw a grizzly bear from a safe distance - Pa kept his rifle ready. My favorite are the prairie dogs though. They have whole underground towns with tunnels and rooms!",
          choices: [
            { text: "Underground prairie dog towns! How cute!", next: "end_animals" },
            { text: "Tell me about campfire nights!", next: "campfire" }
          ]
        },
        distance: {
          text: "Two thousand miles! *holds up fingers* It takes about five months if nothing goes wrong. We walk fifteen miles a day, which does not sound like much, but try doing it every single day through rain, heat, mountains, and rivers! We started in Independence, Missouri and we are headed to the Willamette Valley in Oregon. We have crossed the Great Plains, and soon we will face the Rocky Mountains. Pa says the hardest part is still ahead, but so is the most beautiful.",
          choices: [
            { text: "2,000 miles on foot! You're so brave!", next: "end_distance" },
            { text: "What about the mountains?", next: "mountains" }
          ]
        },
        wagon_train: {
          text: "We travel with twenty other families in a wagon train! There is the Johnson family who sing hymns every evening, the O'Briens from Ireland who tell the funniest stories, and old Mr. Henderson who knows every plant that is safe to eat. We circle the wagons at night for protection and take turns standing watch. The children all play together - tag, marbles, and I am teaching them to play the fiddle! We have become like one big family out here.",
          choices: [
            { text: "A big family of travelers! That's wonderful!", next: "end_wagontrain" },
            { text: "What do you do around the campfire?", next: "campfire" }
          ]
        },
        river_crossing: {
          text: "*takes a deep breath* Yesterday we crossed the Platte River. Pa tied logs together under the wagon to make it float. The oxen had to swim! My brother and I rode in the wagon, holding tight while the current pushed us. The water came up through the floor and soaked everything. One family's wagon tipped and all their supplies floated away. Everyone helped them recover what they could. After we made it across, we all cheered and hugged each other. Nobody crosses alone.",
          choices: [
            { text: "Nobody crosses alone! What a lesson!", next: "end_river" },
            { text: "Tell me something fun!", next: "happy" }
          ]
        },
        campfire: {
          text: "*sits close to the fire* Evenings around the campfire are my favorite time! Pa plays the fiddle, Ma tells stories from back home, and the whole wagon train gathers around to sing. We tell tall tales about the wild west, count shooting stars, and the children catch fireflies in jars. Mr. Henderson teaches us which constellations are which - that is how I know about the North Star! The fire crackles, the stars come out one by one, and for a few hours, the trail does not seem so hard.",
          choices: [
            { text: "Campfire under the stars - perfect!", next: "end_campfire" },
            { text: "Start over, I want to learn more!", next: "start" }
          ]
        },
        happy: {
          text: "*laughs and spins* The good times are the best times! Finding a field of wildflowers that stretches to the horizon. Splashing in a cool creek after a hot day of walking. Ma making apple pie from dried apples. My little sister Prairie saying her first word (it was 'horsey'!). And sunsets - oh, the sunsets on the prairie! The sky turns pink, orange, purple, and gold, and you feel like you are standing inside a painting. Beauty is everywhere if you look for it!",
          choices: [
            { text: "Beauty everywhere! I love that!", next: "end_happy" },
            { text: "Tell me about the mountains ahead.", next: "mountains" }
          ]
        },
        mountains: {
          text: "*points toward snow-capped peaks* The Rocky Mountains are the biggest thing I have ever seen! They touch the sky! We have to find passes through them - narrow paths between the peaks. Sometimes we have to lower the wagons down cliffs with ropes. The air gets thin and cold, and snow falls even in summer. But the view from the top! Star Navigator, you can see forever. The whole world spread out below you like a map. I think this must be what the stars look like from above.",
          choices: [
            { text: "The world like a map from above! Wow!", next: "end_mountains" },
            { text: "I want to hear more trail stories!", next: "start" }
          ]
        },
        end_buffalo: { text: "Everything the land gives us, we use! Nothing is wasted. The buffalo teach us to be grateful for what nature provides. When you collect your quest items, Star Navigator, remember: every item is a gift from the land of knowledge. Use it wisely!", choices: [{ text: "Use everything wisely! Thanks, Clara!", next: "farewell" }] },
        end_food: { text: "Campfire cooking is about making the best of what you have! Ma can turn flour, water, and a little bacon grease into something that tastes like home. The secret ingredient? Gratitude. Appreciate what you have, and everything tastes better!", choices: [{ text: "Gratitude makes everything better! Bye!", next: "farewell" }] },
        end_dangers: { text: "The most important supply on the Oregon Trail is not food or water - it is the friends who travel with you. Together, we can face any river, any storm, any mountain. Your journey through the constellations is the same, Star Navigator. You do not travel alone - you have Copernicus, Stellara, and all the friends you have made along the way!", choices: [{ text: "Never alone! Thank you, Clara!", next: "farewell" }] },
        end_navigation: { text: "My Pa follows the North Star, and you are the Star Navigator! We are both using the same ancient sky to find our way to something new. When you look up tonight, know that somewhere on the prairie, I am looking at the same stars and thinking of you, friend!", choices: [{ text: "Same stars, different journeys! Goodbye!", next: "farewell" }] },
        end_animals: { text: "Even prairie dogs build community! Their little underground cities have nurseries, food storage, and lookout posts. Every creature can teach us something about living together. Keep your eyes open on your journey, Star Navigator - lessons are hiding everywhere!", choices: [{ text: "Lessons everywhere! Thanks, Clara!", next: "farewell" }] },
        end_distance: { text: "Two thousand miles, one step at a time. That is the secret, Star Navigator. You do not have to see the whole path - just the next step. Fifteen miles today. Fifteen more tomorrow. Before you know it, you are looking at the Pacific Ocean! Your fifteen constellations work the same way. One at a time!", choices: [{ text: "One step at a time! I can do this! Bye!", next: "farewell" }] },
        end_wagontrain: { text: "Twenty families became one family on the trail. That is what shared challenges do - they bring people together. Every civilization you visit on your Star Map journey adds to your family of friends. By the time you finish, you will have friends across all of time!", choices: [{ text: "Friends across time! Thank you, Clara!", next: "farewell" }] },
        end_river: { text: "Nobody crosses alone. That might be the most important lesson on the whole Oregon Trail. When the current is strong and the water is deep, reach out your hand. Someone will grab it. That is how we get to the other side - together!", choices: [{ text: "Together! Always! Goodbye, Clara!", next: "farewell" }] },
        end_campfire: { text: "Under the stars, around the fire, sharing stories - that is where the magic happens. Not in the walking, but in the gathering. When you finish restoring the Star Map, gather everyone around and tell the story of your journey. That is how legends are born!", choices: [{ text: "Tell the story! Goodnight, Clara!", next: "farewell" }] },
        end_happy: { text: "Beauty is everywhere if you look for it! Even on the hardest days of the trail, there is a sunset waiting. Even in The Dimming, there are stars trying to break through. Be the one who notices the beauty, Star Navigator. The world needs people who see the light!", choices: [{ text: "See the light! Thank you, Clara!", next: "farewell" }] },
        end_mountains: { text: "From the top of the mountain, the world looks like a map. And from the stars, the world looks like a single beautiful home. The higher you climb, the more you see how everything is connected. Keep climbing, Star Navigator!", choices: [{ text: "Keep climbing! Goodbye, Clara!", next: "farewell" }] },
        end_newlife: { text: "Out west, we will build a cabin, plant an orchard, and watch our children grow up free. That is the pioneer dream - to create something new from nothing but hope and hard work. Your Star Map is the same dream - building something beautiful from knowledge and courage!", choices: [{ text: "Building from hope! Farewell, Clara!", next: "farewell" }] },
        farewell: { text: "*unties a small wildflower from her bonnet and places it in your hand* This prairie sunflower survived the whole journey in my bonnet. It reminds me that beautiful things can survive anything. Take it with you, Star Navigator. And if you ever see a covered wagon crossing the prairie under the stars, wave! It might be me! *climbs back into the wagon as starlight wraps around you like a warm blanket*", choices: [{ text: "Close", next: "_close" }] }
      }
    }
  };

  // ============================================
  // DIALOGUE ENGINE
  // ============================================
  let currentGuide = null;
  let currentNode = null;

  function createChatPanel() {
    const panel = document.createElement('div');
    panel.id = 'guide-chat-panel';
    panel.innerHTML = `
      <div class="guide-chat-backdrop"></div>
      <div class="guide-chat-container">
        <div class="guide-chat-header">
          <div class="guide-chat-avatar-wrap"><img class="guide-chat-avatar" src="" alt=""></div>
          <div class="guide-chat-header-info"><h3 class="guide-chat-name"></h3><p class="guide-chat-title"></p></div>
          <button class="guide-chat-close" aria-label="Close chat">&times;</button>
        </div>
        <div class="guide-chat-messages" id="guide-chat-messages"></div>
        <div class="guide-chat-choices" id="guide-chat-choices"></div>
      </div>
    `;
    document.body.appendChild(panel);
    panel.querySelector('.guide-chat-backdrop').addEventListener('click', closeChat);
    panel.querySelector('.guide-chat-close').addEventListener('click', closeChat);
    return panel;
  }

  const chatPanel = createChatPanel();

  function openChat(guideId) {
    const guide = DIALOGUES[guideId];
    if (!guide) return;

    currentGuide = guide;
    currentNode = 'start';

    chatPanel.querySelector('.guide-chat-avatar').src = guide.image;
    chatPanel.querySelector('.guide-chat-name').textContent = guide.name;
    chatPanel.querySelector('.guide-chat-title').textContent = guide.title;
    chatPanel.querySelector('.guide-chat-container').style.setProperty('--guide-color', guide.color);

    const msgs = chatPanel.querySelector('#guide-chat-messages');
    msgs.innerHTML = '';

    chatPanel.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Show first node with slight delay for animation
    setTimeout(function() { showNode('start'); }, 300);
  }

  function closeChat() {
    chatPanel.classList.remove('active');
    document.body.style.overflow = '';
    currentGuide = null;
    currentNode = null;
  }

  function showNode(nodeId) {
    if (nodeId === '_close') { closeChat(); return; }

    const node = currentGuide.nodes[nodeId];
    if (!node) return;
    currentNode = nodeId;

    // Add guide message with typing delay
    const msgs = chatPanel.querySelector('#guide-chat-messages');
    const choicesDiv = chatPanel.querySelector('#guide-chat-choices');
    choicesDiv.innerHTML = '';

    // Typing indicator
    const typing = document.createElement('div');
    typing.className = 'guide-chat-msg guide-chat-msg-guide';
    typing.innerHTML = '<img class="guide-msg-avatar" src="' + currentGuide.image + '" alt=""><div class="guide-msg-bubble"><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></div>';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    // Replace typing with actual message after delay
    setTimeout(function() {
      typing.querySelector('.guide-msg-bubble').textContent = node.text;
      msgs.scrollTop = msgs.scrollHeight;

      // Show choices after message appears
      setTimeout(function() {
        node.choices.forEach(function(choice) {
          const btn = document.createElement('button');
          btn.className = 'guide-choice-btn';
          btn.textContent = choice.text;
          btn.addEventListener('click', function() {
            // Add user's choice as a message
            const userMsg = document.createElement('div');
            userMsg.className = 'guide-chat-msg guide-chat-msg-user';
            userMsg.innerHTML = '<div class="guide-msg-bubble">' + choice.text + '</div>';
            msgs.appendChild(userMsg);
            msgs.scrollTop = msgs.scrollHeight;

            choicesDiv.innerHTML = '';
            setTimeout(function() { showNode(choice.next); }, 400);
          });
          choicesDiv.appendChild(btn);
        });
      }, 300);
    }, 800 + Math.random() * 400);
  }

  // ============================================
  // ATTACH TALK BUTTONS
  // ============================================
  function attachChatButtons() {
    const guideMap = { 'Kidu':'kidu', 'Nefari':'nefari', 'Quilla':'quilla', 'Tlalli':'tlalli', 'Samuel':'samuel', 'Clara':'clara' };

    document.querySelectorAll('.character-card').forEach(function(card) {
      const nameEl = card.querySelector('h4');
      if (!nameEl) return;
      const guideId = guideMap[nameEl.textContent.trim()];
      if (!guideId) return;

      // Remove old talk button if any
      var old = card.querySelector('.guide-talk-btn');
      if (old) old.remove();

      var btn = document.createElement('button');
      btn.className = 'guide-talk-btn';
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Talk to ' + nameEl.textContent.trim();
      btn.addEventListener('click', function(e) { e.stopPropagation(); openChat(guideId); });
      card.appendChild(btn);
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && chatPanel.classList.contains('active')) closeChat();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachChatButtons);
  } else {
    attachChatButtons();
  }

})();
