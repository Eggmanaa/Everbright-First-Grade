/**
 * THE LOST STAR MAP - Quest Item Flavor Text & Assignment Unlocks
 * Each item has: flavor (story description) and unlock (which assignment earns it)
 * Items appear in order: Day 1 through Day 11 of each mission cycle
 */

(function() {
  'use strict';

  const ITEM_DATA = {
    // ========== MISSION 1: The Star Map Awakens ==========
    "Star Compass": {
      flavor: "A golden compass that always points toward the brightest constellation. Stellara says it was forged from the first starlight that ever touched Everbright.",
      unlock: "Day 1 \u2014 Complete all four subjects: phonics review, Fables read-aloud, star counting math, and continent map coloring.",
      day: 1
    },
    "Observation Lens": {
      flavor: "A crystal lens that makes faraway stars look close enough to touch. Copernicus polished it with moonbeam dust.",
      unlock: "Day 2 \u2014 Complete vocabulary work from Fables & Stories, addition practice, sky observation journal, and map labeling.",
      day: 2
    },
    "Night Journal": {
      flavor: "A leather-bound journal that glows faintly in the dark, so you can write even when the stars are your only light.",
      unlock: "Day 3 \u2014 Write a journal entry about the night sky, practice tricky spellings, solve star data problems, and identify moon phases.",
      day: 3
    },
    "Phase Chart": {
      flavor: "A rotating wheel that shows the moon's eight faces \u2014 from thin crescent to full silver circle and back again.",
      unlock: "Day 4 \u2014 Complete phonics decoding, retell The Boy Who Cried Wolf, chart moon phases in math, and label ocean continents.",
      day: 4
    },
    "Constellation Template": {
      flavor: "A dark velvet sheet pricked with tiny holes. Hold it up to a lantern and constellations appear on the ceiling!",
      unlock: "Day 5 \u2014 Practice CVC word reading, discuss fable morals, organize constellation data into bar graphs, and draw the sun's path.",
      day: 5
    },
    "Star Counting Stones": {
      flavor: "Smooth river stones painted with numbers. Ancient navigators used stones like these to count the stars in each constellation.",
      unlock: "Day 6 \u2014 Sentence writing practice, vocabulary from The Maid and the Milk Pail, addition within 10, and identify day/night patterns.",
      day: 6
    },
    "Map Scroll": {
      flavor: "An ancient scroll showing Everbright at the center, with starlight paths radiating outward to lands unknown.",
      unlock: "Day 7 \u2014 Complete spelling assessment, oral retelling of a fable, data chart reading, and world map compass directions.",
      day: 7
    },
    "Fable Wisdom Token": {
      flavor: "A coin engraved with a fox and grapes on one side and the words 'Look Before You Leap' on the other. Fable wisdom made solid.",
      unlock: "Day 8 \u2014 Read decodable text, discuss patience and honesty themes, subtraction story problems, and seasons observation.",
      day: 8
    },
    "Phonics Decoder Ring": {
      flavor: "A bronze ring with spinning letter wheels. Twist them to decode secret star messages hidden in ancient texts.",
      unlock: "Day 9 \u2014 Phonics review assessment, compare two fable morals in writing, tally chart creation, and star movement tracking.",
      day: 9
    },
    "Data Chart Board": {
      flavor: "A wooden board with pegs and colored strings for organizing information. Copernicus uses one just like it to track star positions.",
      unlock: "Day 10 \u2014 Tricky spelling words, vocabulary review game, picture graph interpretation, and continent quiz.",
      day: 10
    },
    "Star Lantern": {
      flavor: "A lantern that burns with captured starlight instead of fire. It never goes out and casts constellation patterns on nearby walls.",
      unlock: "Day 11 \u2014 Complete unit review: reading fluency check, fable storytelling, math fact assessment, and map skills demonstration.",
      day: 11
    },

    // ========== MISSION 2: Rivers of Knowledge (Mesopotamia) ==========
    "Clay Tablet Kit": {
      flavor: "Soft river clay and a wooden frame for pressing tablets. Kidu says the finest scribes can write 600 symbols before the clay dries.",
      unlock: "Day 1 \u2014 Phonics continuation, Mesopotamia read-aloud introduction, addition review, and Fertile Crescent map.",
      day: 1
    },
    "Reed Stylus": {
      flavor: "A sharpened reed from the banks of the Euphrates. Press it into clay at just the right angle to make the wedge-shaped marks of cuneiform.",
      unlock: "Day 2 \u2014 Snap Shots spelling, vocabulary from Early Civilizations, trade story problems, and ziggurat diagram.",
      day: 2
    },
    "Irrigation Map": {
      flavor: "A detailed map showing the network of canals that carry water from the Tigris to the fields. Blue lines branch like a tree's roots.",
      unlock: "Day 3 \u2014 Decodable reading, discuss invention of writing, counting cuneiform marks, and irrigation canal diagram.",
      day: 3
    },
    "Grain Counter": {
      flavor: "A wooden counting frame with clay beads. Mesopotamian merchants used these to keep track of grain shipments between cities.",
      unlock: "Day 4 \u2014 Sentence writing, Tigris & Euphrates geography lesson, addition to 10 with manipulatives, and early farming discussion.",
      day: 4
    },
    "Cuneiform Decoder": {
      flavor: "A reference card showing common cuneiform symbols and their meanings. With this, you can read messages left by scribes 5,000 years ago.",
      unlock: "Day 5 \u2014 Phonics assessment, oral retelling of civilization origins, story problems about trade, and Code of Hammurabi introduction.",
      day: 5
    },
    "Trade Scale": {
      flavor: "A small bronze balance scale with stone weights. Honest merchants always check that both sides are perfectly level.",
      unlock: "Day 6 \u2014 Spelling practice, discuss why writing was invented, subtraction within 10, and compare ancient/modern governments.",
      day: 6
    },
    "Ziggurat Blueprint": {
      flavor: "Architectural plans for a seven-level ziggurat, complete with ramp angles and brick counts. An engineering marvel on papyrus.",
      unlock: "Day 7 \u2014 Read decodable text fluently, vocabulary review, data organization with tally marks, and ziggurat construction lesson.",
      day: 7
    },
    "Farmer\u2019s Almanac": {
      flavor: "A clay tablet recording the best times to plant barley, wheat, and dates based on the river's flood cycle. Ancient agricultural wisdom.",
      unlock: "Day 8 \u2014 Writing response about Mesopotamia, discuss daily life, bar graph of crop yields, and farming techniques study.",
      day: 8
    },
    "River Guide": {
      flavor: "A waterproof scroll describing safe crossing points, dangerous currents, and the best fishing spots along the Euphrates.",
      unlock: "Day 9 \u2014 Phonics review, compare Mesopotamian and modern cities, addition story problems, and river geography.",
      day: 9
    },
    "Scribe\u2019s Scroll": {
      flavor: "A rolled leather document certifying the holder as an apprentice scribe. Kidu is very proud of his \u2014 it took two years to earn.",
      unlock: "Day 10 \u2014 Spelling test, retell the story of early civilization, math fact fluency, and timeline of Mesopotamian achievements.",
      day: 10
    },
    "Civilization Seal": {
      flavor: "A carved stone cylinder that rolls across wet clay to leave an official mark. Every important document in Ur bears a seal like this.",
      unlock: "Day 11 \u2014 Unit review: reading check, civilization summary writing, math assessment, and Mesopotamia knowledge quiz.",
      day: 11
    },

    // ========== MISSION 3: Gift of the Nile (Egypt) ==========
    "Hieroglyphic Key": {
      flavor: "A rosetta-stone style card showing hieroglyphic symbols matched to sounds. Nefari says only 3% of Egyptians could read these sacred carvings.",
      unlock: "Day 1 \u2014 Begin Gran phonics unit, Ancient Egypt read-aloud, story problems introduction, and Nile River map.",
      day: 1
    },
    "Pyramid Protractor": {
      flavor: "A triangular measuring tool used to check that pyramid angles are exactly right. One degree off and the whole structure could lean!",
      unlock: "Day 2 \u2014 Separated digraphs practice, pharaoh vocabulary, counting pyramid blocks, and pyramid construction lesson.",
      day: 2
    },
    "Nile Flood Gauge": {
      flavor: "A graduated stick marked with water levels. When the Nile rises past the golden line, farmers know the flood will be good this year.",
      unlock: "Day 3 \u2014 Long vowels with silent e, discuss why the Nile floods, addition groups of workers, and daily life in Egypt.",
      day: 3
    },
    "Shadow Stick": {
      flavor: "A simple stick that casts shadows to tell time. Egyptian builders used shadow sticks to align the pyramids with the cardinal directions.",
      unlock: "Day 4 \u2014 Noun identification, hieroglyphics lesson, subtraction story problems, and early farming/domestication.",
      day: 4
    },
    "Echo Horn": {
      flavor: "A curved horn that amplifies sound in the pyramid's echo chambers. Shout into it and your voice bounces back three times!",
      unlock: "Day 5 \u2014 Proper nouns practice, mummification discussion (age-appropriate), resource counting problems, and light/shadow science.",
      day: 5
    },
    "Sand Timer": {
      flavor: "An hourglass filled with golden Sahara sand. Each grain represents one second of the 4,500 years since the pyramids were built.",
      unlock: "Day 6 \u2014 Plural nouns, Sphinx and temple vocabulary, addition within 20, and plant survival in the desert.",
      day: 6
    },
    "Pharaoh\u2019s Riddle Scroll": {
      flavor: "A scroll containing riddles that Egyptian children solved for fun. 'I have a face but no eyes, a bed but never sleep. What am I?' (The Nile River!)",
      unlock: "Day 7 \u2014 Spelling assessment, oral summary of Egyptian achievements, story problem review, and compare Egyptian/modern farming.",
      day: 7
    },
    "Stone Block Counter": {
      flavor: "An abacus-like device for counting the 2.3 million blocks in the Great Pyramid. Slide one bead for every block hauled up the ramp.",
      unlock: "Day 8 \u2014 Decodable reading, discuss Egyptian engineering, two-digit addition introduction, and sound echo experiments.",
      day: 8
    },
    "Papyrus Sheet": {
      flavor: "A smooth sheet made from pressed river reeds \u2014 the world's first paper! Nefari wrote your name on it in hieroglyphics.",
      unlock: "Day 9 \u2014 Writing response about Egypt, vocabulary game, compare/contrast math problems, and papyrus-making lesson.",
      day: 9
    },
    "Light Reflector": {
      flavor: "A polished copper mirror that Egyptian builders used to bounce sunlight into dark pyramid passages. Pure ingenuity!",
      unlock: "Day 10 \u2014 Gran phonics review, retell pyramid-building process, math fact practice, and light reflection experiment.",
      day: 10
    },
    "Builder\u2019s Level": {
      flavor: "A wooden A-frame with a hanging plumb line. If the line hangs straight through the center mark, the surface is perfectly flat.",
      unlock: "Day 11 \u2014 Unit review: reading fluency, Egypt summary essay, math assessment, and Ancient Egypt knowledge check.",
      day: 11
    },

    // ========== MISSION 4: Stories Across the World ==========
    "Story Comparison Chart": {
      flavor: "A two-column scroll for comparing folktales side by side. Different cultures, same lessons \u2014 the chart reveals hidden connections.",
      unlock: "Day 1 \u2014 Gran continued, folktales read-aloud begins, story problem practice, and world religions introduction.",
      day: 1
    },
    "Folktale Map": {
      flavor: "A world map with golden pins marking where each folktale originated. Stories travel farther than any explorer!",
      unlock: "Day 2 \u2014 Vowel sounds practice, compare a European and African folktale, addition/subtraction mix, and Judaism introduction.",
      day: 2
    },
    "Character Archetype Cards": {
      flavor: "Illustrated cards showing story character types: the Trickster, the Wise Elder, the Brave Child, the Talking Animal. Every culture has them!",
      unlock: "Day 3 \u2014 Noun review, identify character types across stories, within-20 math introduction, and Christianity introduction.",
      day: 3
    },
    "Moral Lesson Scroll": {
      flavor: "A golden scroll that magically reveals the moral of any story when you hold it up to the tale. 'Slow and steady wins the race!'",
      unlock: "Day 4 \u2014 Decodable reading, discuss shared morals across cultures, subtraction story problems, and Islam introduction.",
      day: 4
    },
    "Sacred Text Sampler": {
      flavor: "A beautifully bound book showing pages from sacred texts of different faiths, each teaching kindness and compassion in its own way.",
      unlock: "Day 5 \u2014 Spelling practice, compare three religions' teachings on kindness, addition within 20, and plant survival continued.",
      day: 5
    },
    "Prayer Bead String": {
      flavor: "A string of wooden beads in three colors \u2014 one for each world religion studied. Each bead represents a shared value: peace, love, hope.",
      unlock: "Day 6 \u2014 Writing response comparing stories, vocabulary from world religions, math fact fluency, and animal survival needs.",
      day: 6
    },
    "Cultural Symbol Guide": {
      flavor: "An illustrated reference showing meaningful symbols from cultures around the world: the Star of David, the Cross, the Crescent Moon, and more.",
      unlock: "Day 7 \u2014 Phonics assessment, oral retelling of favorite folktale, bar graph of story elements, and compare religious celebrations.",
      day: 7
    },
    "Story Pattern Wheel": {
      flavor: "A spinning wheel showing the universal story pattern: Beginning \u2192 Problem \u2192 Journey \u2192 Solution \u2192 Lesson. Every great story follows this path!",
      unlock: "Day 8 \u2014 Read decodable text, discuss story structure patterns, addition/subtraction within 20, and shared values discussion.",
      day: 8
    },
    "Tale Retelling Cards": {
      flavor: "Sequencing cards for retelling stories in order: First, Next, Then, Finally. Shuffle them and try to put the story back together!",
      unlock: "Day 9 \u2014 Spelling review, retell a folktale using sequencing, math word problems, and compare religious art/architecture.",
      day: 9
    },
    "World Story Atlas": {
      flavor: "A magnificent atlas showing folktale routes around the globe. Open any page and hear whispers of the story that lives there.",
      unlock: "Day 10 \u2014 Grammar practice, compare trickster tales from 3 continents, mental math strategies, and draw a world religions map.",
      day: 10
    },
    "Wisdom Lantern": {
      flavor: "A lantern that burns with a gentle flame of every color \u2014 representing the light of wisdom found in stories from every culture on Earth.",
      unlock: "Day 11 \u2014 Unit review: reading check, folktale comparison essay, math assessment, and world religions summary.",
      day: 11
    },

    // ========== MISSION 5: The Mountain Temple (Americas) ==========
    "Quipu Counting Rope": {
      flavor: "A bundle of colorful knotted strings used by the Inca to count everything from llamas to soldiers. Each knot position means ones, tens, or hundreds.",
      unlock: "Day 1 \u2014 Begin Bedtime Tales phonics, Early American Civilizations read-aloud, add/subtract within 20, and Maya introduction.",
      day: 1
    },
    "Terrace Garden Kit": {
      flavor: "A miniature model of Inca terrace farms, complete with tiny irrigation channels. Quilla says the real ones feed entire mountain cities.",
      unlock: "Day 2 \u2014 Consonant clusters practice, Aztec floating gardens lesson, doubles strategy in math, and Inca road system.",
      day: 2
    },
    "Mountain Compass": {
      flavor: "A compass carved from mountain stone that works even at extreme altitudes. The needle is magnetized with lightning-struck iron.",
      unlock: "Day 3 \u2014 Verb identification, Maya calendar discussion, making-10 strategy, and light sources in ancient temples.",
      day: 3
    },
    "Temple Map": {
      flavor: "An architect's plan of a stepped pyramid temple, showing hidden rooms, sacred pools, and astronomical observation platforms.",
      unlock: "Day 4 \u2014 Past tense verbs, compare Maya/Aztec/Inca achievements, subtraction within 20, and shadow experiments.",
      day: 4
    },
    "Weaving Loom Card": {
      flavor: "An instruction card for the backstrap loom used by Inca weavers. Their textiles are so intricate they contain coded messages in the patterns!",
      unlock: "Day 5 \u2014 Sequencing practice, Inca weaving and textile lesson, mental math practice, and vibration/sound introduction.",
      day: 5
    },
    "Llama Guide": {
      flavor: "A field guide to llama care: feeding, loading, and the all-important rule \u2014 never overload a llama, or she WILL spit on you.",
      unlock: "Day 6 \u2014 Spelling assessment, discuss achievements without the wheel, addition word problems, and pitch/volume experiments.",
      day: 6
    },
    "Calendar Stone Rubbing": {
      flavor: "A charcoal rubbing of the Maya calendar stone showing 365 days arranged in an intricate circular pattern more accurate than European calendars.",
      unlock: "Day 7 \u2014 Decodable reading, Maya calendar explanation, compare numbers using >, <, =, and early American map work.",
      day: 7
    },
    "Floating Garden Model": {
      flavor: "A palm-sized replica of an Aztec chinampa \u2014 a floating garden anchored by willow roots. Shake it and tiny corn stalks wobble!",
      unlock: "Day 8 \u2014 Writing response about American civilizations, vocabulary review, subtraction strategies, and compare terrace/chinampa farming.",
      day: 8
    },
    "Bridge Blueprint": {
      flavor: "Engineering plans for an Inca rope bridge spanning a 150-foot canyon. Braided grass cables as thick as your body hold it together.",
      unlock: "Day 9 \u2014 Consonant cluster review, retell Inca bridge-building, addition/subtraction mix, and sound traveling experiments.",
      day: 9
    },
    "Cloud Jar": {
      flavor: "A sealed glass jar containing a tiny cloud captured at 12,000 feet elevation. Quilla says the clouds taste like rain and dreams.",
      unlock: "Day 10 \u2014 Grammar review, compare three American civilizations, math fact fluency, and altitude/adaptation science.",
      day: 10
    },
    "Altitude Marker": {
      flavor: "A carved stone post showing elevation markers. At this height, water boils at a lower temperature and the air tastes thin and sweet.",
      unlock: "Day 11 \u2014 Unit review: reading fluency, Americas civilization essay, math assessment, and Early Americas knowledge check.",
      day: 11
    },

    // ========== MISSION 6: Colors of the Marketplace (Mexico) ==========
    "Mural Paint Set": {
      flavor: "Natural pigments in clay pots: cochineal red from beetles, indigo blue from plants, marigold yellow, and jaguar-black soot. Tlalli's favorite tools.",
      unlock: "Day 1 \u2014 Bedtime Tales continued, Latin American folktales, place value introduction, and Mexican traditions read-aloud.",
      day: 1
    },
    "Jade Counting Beads": {
      flavor: "Smooth green jade beads on a golden wire. Aztec merchants used jade as currency \u2014 each bead is worth twenty cacao beans.",
      unlock: "Day 2 \u2014 Verb practice, trickster tale discussion, tens and ones with beads, and Mexican food/culture lesson.",
      day: 2
    },
    "Ramp Model": {
      flavor: "A wooden model demonstrating how ramps help move heavy stones. Push a block up the ramp \u2014 easier than lifting it straight up!",
      unlock: "Day 3 \u2014 Sequencing writing, compare trickster tales across cultures, two-digit numbers, and light/sound continued.",
      day: 3
    },
    "Lever Stick": {
      flavor: "A sturdy stick balanced on a stone fulcrum. Place a heavy object on one end, push down on the other \u2014 simple machine magic!",
      unlock: "Day 4 \u2014 Spelling practice, Mexican art and music lesson, market trading math problems, and simple machines introduction.",
      day: 4
    },
    "Recipe Scroll": {
      flavor: "Tlalli's mother's recipe for mole sauce: chocolate, chilies, spices, and patience. The scroll smells faintly of cinnamon and cacao.",
      unlock: "Day 5 \u2014 Past tense review, discuss Mexican holiday traditions, adding ingredient quantities, and ramp experiments.",
      day: 5
    },
    "Market Scale": {
      flavor: "A brass balance scale from the great Tlatelolco market. Sixty thousand people shop here daily \u2014 fair scales keep everyone honest.",
      unlock: "Day 6 \u2014 Decodable reading, vocabulary from Culture of Mexico, comparing two-digit numbers, and lever experiments.",
      day: 6
    },
    "Codex Pages": {
      flavor: "Folded bark-paper pages painted with Aztec picture-writing. Each page tells a chapter of history in vivid color and symbol.",
      unlock: "Day 7 \u2014 Writing about Mexican culture, oral retelling of a trickster tale, numbers to 99 practice, and pulley introduction.",
      day: 7
    },
    "Feather Quill": {
      flavor: "A magnificent quetzal feather quill \u2014 the most precious writing tool in Mesoamerica. Its iridescent green shimmers like liquid emerald.",
      unlock: "Day 8 \u2014 Grammar assessment, discuss art across cultures, place value word problems, and Mexico geography.",
      day: 8
    },
    "Chocolate Pod Counter": {
      flavor: "A cacao pod split open to reveal 40 beans inside. In the Aztec market, ten beans buy a rabbit and 100 buy a fine cloak!",
      unlock: "Day 9 \u2014 Phonics review, compare folktale morals, mental math with two-digit numbers, and connection to ancient civilizations.",
      day: 9
    },
    "Pottery Wheel Card": {
      flavor: "Step-by-step instructions for making pottery on a wheel: center the clay, open the form, pull the walls, shape the rim. Ancient art, timeless technique.",
      unlock: "Day 10 \u2014 Spelling test, Mexican festival discussion, skip counting by 5s and 10s, and simple machines review.",
      day: 10
    },
    "Serpent Mosaic Tile": {
      flavor: "A turquoise and gold mosaic tile depicting Quetzalcoatl, the feathered serpent. Each tiny stone was placed by hand with obsidian tweezers.",
      unlock: "Day 11 \u2014 Unit review: reading check, Culture of Mexico essay, math assessment, and Mexico knowledge quiz.",
      day: 11
    },

    // ========== MISSION 7: The Body Adventure ==========
    "Body Map": {
      flavor: "An anatomical chart showing the human body's major systems in glowing starlight colors. Stellara says the body IS a star map in miniature.",
      unlock: "Day 1 \u2014 Begin Green Fern Zoo phonics, Human Body read-aloud, place value practice, and body systems overview.",
      day: 1
    },
    "Heartbeat Counter": {
      flavor: "A magical stethoscope that displays your heartbeats as tiny stars. Rest: 70 beats per minute. Running: 150! Your heart is a star engine!",
      unlock: "Day 2 \u2014 R-controlled vowels (ar), circulatory system lesson, counting heartbeats per minute, and Columbus introduction.",
      day: 2
    },
    "Bone Puzzle Set": {
      flavor: "206 tiny puzzle pieces that snap together to form a complete human skeleton. Femur connects to hip bone, hip bone connects to spine...",
      unlock: "Day 3 \u2014 R-controlled vowels (or), skeletal system discussion, measuring bone lengths, and Pilgrim/Jamestown lesson.",
      day: 3
    },
    "Muscle Flex Band": {
      flavor: "An enchanted elastic band that glows when you flex your muscles, showing which muscle groups activate for each movement.",
      unlock: "Day 4 \u2014 Adjective introduction, muscular system lesson, comparing body measurements, and early settler daily life.",
      day: 4
    },
    "Lung Balloon": {
      flavor: "A model showing how lungs work: squeeze the bottom and the balloon-lungs inside inflate! Breathe in, breathe out \u2014 your body's air pump.",
      unlock: "Day 5 \u2014 Descriptive writing, respiratory system lesson, two-digit number comparison, and human body systems science.",
      day: 5
    },
    "Nerve Signal Flags": {
      flavor: "Tiny flags in red and blue that demonstrate how nerve signals race from your brain to your toes at 250 miles per hour!",
      unlock: "Day 6 \u2014 Spelling assessment, nervous system discussion, skip counting by 2s, and explorer navigation methods.",
      day: 6
    },
    "Digestive Tube Model": {
      flavor: "A long, twisty tube model showing the 30-foot journey food takes from mouth to... well, the end. Copernicus finds this one fascinating.",
      unlock: "Day 7 \u2014 Decodable reading, digestive system lesson, addition within 100 introduction, and settler/Native American encounters.",
      day: 7
    },
    "Brain Maze Card": {
      flavor: "A maze shaped like a brain, with paths representing neural pathways. Solve it and you've traced the route a thought takes!",
      unlock: "Day 8 \u2014 Adjective practice, brain and senses discussion, place value to 99, and early American settlement map.",
      day: 8
    },
    "Nutrition Chart": {
      flavor: "A color-coded chart showing which foods fuel which body systems: orange for energy, green for growth, blue for brain power.",
      unlock: "Day 9 \u2014 Writing about the human body, vocabulary review, mental math strategies, and compare ancient/modern medicine.",
      day: 9
    },
    "Skeleton Key": {
      flavor: "Not a key FOR skeletons, but a key SHAPED like a skeleton! It unlocks the deepest understanding of how bones support everything we do.",
      unlock: "Day 10 \u2014 Grammar review, retell how body systems work together, math fact fluency, and Explorers & Settlers timeline.",
      day: 10
    },
    "Pulse Watch": {
      flavor: "A wristwatch that displays your pulse as a constellation pattern. When your heart beats steady, the stars align perfectly.",
      unlock: "Day 11 \u2014 Unit review: reading fluency, Human Body essay, math assessment, and body systems knowledge check.",
      day: 11
    },

    // ========== MISSION 8: Reading the Stars ==========
    "Telescope": {
      flavor: "A brass telescope engraved with constellation patterns. Look through it and even the dimmest stars blaze like diamonds.",
      unlock: "Day 1 \u2014 Green Fern Zoo continued, Astronomy read-aloud begins, adding within 100, and Explorers & Settlers continued.",
      day: 1
    },
    "Planet Model Set": {
      flavor: "Eight painted wooden spheres on sticks, sized proportionally. Jupiter is a baseball; Earth is a pea. Mercury is barely a grain of sand!",
      unlock: "Day 2 \u2014 R-controlled vowels review, solar system lesson, planet ordering by size, and celestial navigation discussion.",
      day: 2
    },
    "Season Wheel": {
      flavor: "A four-part wheel showing Earth's tilt during each season. Spin it and watch the sunlight angle change from summer warmth to winter chill.",
      unlock: "Day 3 \u2014 Adjective review, why we have seasons, two-digit addition practice, and how explorers used star navigation.",
      day: 3
    },
    "Orbit Tracker": {
      flavor: "A mechanical model where tiny planet beads slide along wire orbits around a golden sun. Wind the key and watch a year pass in seconds!",
      unlock: "Day 4 \u2014 Descriptive writing about space, Earth's rotation/revolution, mental math, and star-guided ocean voyages.",
      day: 4
    },
    "Moon Phase Cards": {
      flavor: "Eight cards showing the moon's journey from new to full and back. Flip them in order \u2014 can you predict tomorrow's moon shape?",
      unlock: "Day 5 \u2014 Spelling practice, moon phases deep dive, estimation strategies, and human body systems continued.",
      day: 5
    },
    "Star Finder Dial": {
      flavor: "Rotate the outer ring to match tonight's date, and windows reveal which constellations are visible in the sky right now.",
      unlock: "Day 6 \u2014 Decodable reading, constellation identification lesson, adding two-digit numbers, and settler community structures.",
      day: 6
    },
    "Solar System Map": {
      flavor: "A poster-sized map of our solar system with distance markers. If Earth is one inch from the Sun, Neptune is 30 inches away!",
      unlock: "Day 7 \u2014 Grammar assessment, discuss what makes Earth special, number comparison to 100, and star-guided exploration.",
      day: 7
    },
    "Rotation Spinner": {
      flavor: "A top painted half-blue, half-black. Spin it and watch day and night alternate \u2014 just like Earth spinning on its axis!",
      unlock: "Day 8 \u2014 Writing about the solar system, day/night cycle review, math word problems, and why stars appear to move.",
      day: 8
    },
    "Shadow Clock": {
      flavor: "A sundial that tells time using the sun's shadow. Ancient people read these like we read watches \u2014 nature's original clock.",
      unlock: "Day 9 \u2014 Phonics review, vocabulary from Astronomy domain, mental math assessment, and connect astronomy across civilizations.",
      day: 9
    },
    "Comet Tail Streamer": {
      flavor: "A ribbon that trails behind you as you run, mimicking a comet's glowing tail. The faster you go, the longer it streams!",
      unlock: "Day 10 \u2014 Spelling test, compare how different civilizations studied the sky, math fact fluency, and Explorers timeline.",
      day: 10
    },
    "Galaxy Viewer": {
      flavor: "A ViewMaster-style device loaded with images of distant galaxies. Each click reveals a new cosmic wonder billions of light-years away.",
      unlock: "Day 11 \u2014 Unit review: reading fluency, Astronomy essay, math assessment, and night sky knowledge check.",
      day: 11
    },

    // ========== MISSION 9: Deep Below ==========
    "Rock Hammer": { flavor: "A geologist's hammer with a pick on one end for chipping rock samples. Every tap might reveal a crystal or a fossil hidden for millions of years.", unlock: "Day 1 \u2014 Begin Sir Gus phonics, History of Earth read-aloud, two-digit addition, and colonial life introduction.", day: 1 },
    "Fossil Brush": { flavor: "A soft-bristled brush for gently sweeping away dirt from ancient fossils without damaging them. Patience is a paleontologist's best tool.", unlock: "Day 2 \u2014 Suffixes (-er, -est), fossil identification lesson, mental math strategies, and ramp/lever simple machines.", day: 2 },
    "Layer Diagram": { flavor: "A cross-section poster of Earth showing crust, mantle, outer core, and inner core in vivid colors. We live on the thinnest layer!", unlock: "Day 3 \u2014 Comparative adjectives, Earth's layers lesson, estimation practice, and colonial taxation discussion.", day: 3 },
    "Ruler of Depths": { flavor: "A special ruler marked in miles downward instead of inches upward. The crust is 25 miles thick; the core is 4,000 miles deep!", unlock: "Day 4 \u2014 Spelling practice, volcano formation discussion, adding within 100, and wedge/screw simple machines.", day: 4 },
    "Crystal Jar": { flavor: "A glass jar containing crystals formed deep underground over millions of years: amethyst purple, quartz clear, and pyrite gold (fool's gold!).", unlock: "Day 5 \u2014 Decodable reading, rock and mineral classification, subtraction strategies, and early colonial government.", day: 5 },
    "Volcano Model": { flavor: "A model volcano with removable layers showing the magma chamber, vent, and crater. Add baking soda and vinegar for a mini eruption!", unlock: "Day 6 \u2014 Adverb introduction (-ly suffix), dinosaur era discussion, two-digit subtraction, and pulley/wheel machines.", day: 6 },
    "Dinosaur Scale Card": { flavor: "A card comparing dinosaur sizes to modern objects: T-Rex was as long as a school bus! Brachiosaurus was as tall as a 4-story building!", unlock: "Day 7 \u2014 Writing about Earth's history, vocabulary review, math word problems, and Colonies to Independence intro.", day: 7 },
    "Mineral ID Guide": { flavor: "A field guide for identifying minerals by color, hardness, and luster. Scratch it, hold it to light, check the streak \u2014 now you know what it is!", unlock: "Day 8 \u2014 Grammar review, rock cycle lesson, estimation and rounding, and Boston Tea Party introduction.", day: 8 },
    "Cave Lantern": { flavor: "A lantern designed for cave exploration that casts warm light without heat \u2014 important because some cave formations melt in warmth!", unlock: "Day 9 \u2014 Phonics assessment, discuss fossils as evidence, mental math practice, and simple machines in colonial life.", day: 9 },
    "Core Sample Tube": { flavor: "A clear tube showing layers of rock drilled from the earth. Each stripe is a different era \u2014 millions of years compressed into inches.", unlock: "Day 10 \u2014 Spelling review, retell Earth's geological history, math fact fluency, and colonial economy discussion.", day: 10 },
    "Echo Mapper": { flavor: "A device that sends sound waves into caves and maps the shape of hidden chambers by listening to the echoes. Bat-style navigation!", unlock: "Day 11 \u2014 Unit review: reading check, Earth history essay, math assessment, and geology knowledge quiz.", day: 11 },

    // ========== MISSION 10: The Wild Kingdom ==========
    "Habitat Viewer": { flavor: "Binoculars with four interchangeable lenses, each tinted to simulate a different habitat: green for forest, gold for desert, blue for ocean, white for arctic.", unlock: "Day 1 \u2014 Sir Gus continued, Animals & Habitats read-aloud, length measurement intro, and Revolution/Declaration intro.", day: 1 },
    "Animal Track Stamps": { flavor: "Rubber stamps of animal footprints: deer hooves, bear paws, bird claws, and snake belly trails. Press them in mud to practice tracking!", unlock: "Day 2 \u2014 Suffix review, forest habitat lesson, measuring with nonstandard units, and colonial printing press/machines.", day: 2 },
    "Food Chain Cards": { flavor: "Linked cards showing who eats whom: sun \u2192 grass \u2192 rabbit \u2192 fox \u2192 eagle. Remove one link and the whole chain wobbles!", unlock: "Day 3 \u2014 Comparative adjectives, food web discussion, comparing lengths, and George Washington introduction.", day: 3 },
    "Migration Map": { flavor: "A map with dotted lines showing animal migration routes. Arctic terns fly from pole to pole \u2014 44,000 miles round trip every year!", unlock: "Day 4 \u2014 Spelling practice, migration and hibernation lesson, ordering animals by length, and Declaration of Independence.", day: 4 },
    "Camouflage Lens": { flavor: "Special glasses that highlight camouflaged animals. Put them on in the forest and suddenly you can see the hidden owl, the blended moth, the invisible stick bug!", unlock: "Day 5 \u2014 Decodable reading, adaptation and camouflage lesson, estimating distances, and well/pulley colonial machines.", day: 5 },
    "Wingspan Ruler": { flavor: "A flexible ruler that stretches to measure wingspans. A hummingbird: 4 inches. An eagle: 7 feet. An albatross: 11 feet!", unlock: "Day 6 \u2014 Adverb practice, desert habitat lesson, standard measurement units, and wagon wheel/axle machines.", day: 6 },
    "Arctic Thermometer": { flavor: "A thermometer built to measure extreme cold. At the South Pole, it reads -128\u00b0F \u2014 so cold that boiling water freezes before hitting the ground!", unlock: "Day 7 \u2014 Grammar assessment, arctic habitat and adaptation, numbers to 120, and colonial daily life comparison.", day: 7 },
    "Desert Water Gauge": { flavor: "A gauge showing how little rainfall deserts get: less than 10 inches per year! A cactus stores water inside its thick skin for months.", unlock: "Day 8 \u2014 Writing about animal habitats, ocean habitat lesson, length word problems, and Founding Fathers discussion.", day: 8 },
    "Ocean Depth Chart": { flavor: "A vertical chart showing ocean zones from sunny surface to pitch-black abyss. Strange glowing creatures live where no sunlight reaches!", unlock: "Day 9 \u2014 Phonics review, vocabulary from habitats, mental math with measurements, and 13 colonies map exercise.", day: 9 },
    "Forest Canopy Card": { flavor: "A layered pop-up card showing four forest levels: floor, understory, canopy, and emergent. Different animals live at each level!", unlock: "Day 10 \u2014 Spelling test, which animals live on which continents, math fact fluency, and Revolution timeline.", day: 10 },
    "Classification Key": { flavor: "A branching decision tree for identifying any animal: Does it have fur? \u2192 Does it lay eggs? \u2192 Is it warm-blooded? Follow the branches to find your answer!", unlock: "Day 11 \u2014 Unit review: reading fluency, habitats essay, math assessment, and animals knowledge check.", day: 11 },

    // ========== MISSION 11: Once Upon a Constellation ==========
    "Story Sorting Cards": { flavor: "Cards with fairy tale scenes that got all mixed up by the Shadow Moth! Sort Cinderella's slipper away from Rapunzel's tower to untangle the tales.", unlock: "Day 1 \u2014 Begin Cave Bug Ride phonics, Fairy Tales read-aloud, measurement with rulers, and Lewis & Clark introduction.", day: 1 },
    "Character Tokens": { flavor: "Wooden tokens carved with fairy tale characters: a princess, a wolf, a fairy godmother, a giant. Place them on the tale map to rebuild each story!", unlock: "Day 2 \u2014 Long vowel teams, Cinderella discussion, standard vs nonstandard units, and Oregon Trail introduction.", day: 2 },
    "Shape Stencil Set": { flavor: "Stencils of shapes found in fairy tale architecture: circles for tower windows, rectangles for doors, triangles for turret roofs, hexagons for tile floors.", unlock: "Day 3 \u2014 Diphthong practice, Sleeping Beauty lesson, identifying shapes in pictures, and algorithm introduction.", day: 3 },
    "Clock Face": { flavor: "A fairy tale clock frozen at 11:59 \u2014 one minute before midnight when Cinderella's magic ends! Practice telling time before the spell breaks.", unlock: "Day 4 \u2014 Spelling practice, Jack and the Beanstalk, telling time to the hour, and coding basics (input/output).", day: 4 },
    "Symmetry Mirror": { flavor: "A mirror that shows if a shape or design is perfectly symmetrical. Hold it against a butterfly wing \u2014 both halves match exactly!", unlock: "Day 5 \u2014 Predictive reading, Rapunzel discussion, symmetry in crowns and castles, and step-by-step procedures.", day: 5 },
    "Algorithm Scroll": { flavor: "A scroll with step-by-step instructions that even Copernicus follows: IF the wolf knocks, THEN don't open the door. ELSE invite friends in!", unlock: "Day 6 \u2014 Decodable reading, Rumpelstiltskin lesson, numbers to 120, and how computers follow instructions.", day: 6 },
    "Tale Map": { flavor: "A map of Fairy Tale Land showing the locations of every story: Cinderella's castle, Rapunzel's tower, Jack's beanstalk, the Three Bears' cottage.", unlock: "Day 7 \u2014 Grammar practice, compare fairy tale heroes, length measurement review, and Gold Rush introduction.", day: 7 },
    "Magic Key": { flavor: "A golden key that unlocks the logic behind every fairy tale. Turn it and see: Problem \u2192 Courage \u2192 Cleverness \u2192 Victory. The formula never fails!", unlock: "Day 8 \u2014 Writing a fairy tale retelling, vocabulary review, time word problems ('before midnight'), and Oregon Trail challenges.", day: 8 },
    "Villain/Hero Chart": { flavor: "A comparison chart listing fairy tale villains and heroes side by side. Every villain has a weakness; every hero has a strength they didn't know about.", unlock: "Day 9 \u2014 Phonics assessment, discuss fairy tale morals, partition shapes into halves/quarters, and technology in daily life.", day: 9 },
    "Fairy Dust Timer": { flavor: "An hourglass filled with glittering fairy dust instead of sand. When it runs out, the magic spell ends \u2014 better hurry!", unlock: "Day 10 \u2014 Spelling review, retell three fairy tales in sequence, math fact fluency, and Westward Expansion map.", day: 10 },
    "Enchantment Compass": { flavor: "A compass that points not north, but toward the nearest magical lesson. In the fairy tale realm, knowledge IS magic.", unlock: "Day 11 \u2014 Unit review: reading fluency, fairy tale comparison essay, math assessment, and fairy tales knowledge check.", day: 11 },

    // ========== MISSION 12: A New Nation ==========
    "Liberty Bell Charm": { flavor: "A tiny bronze bell that rings with a clear, pure tone \u2014 the sound of freedom! Samuel says the real one cracked because liberty is fragile and must be protected.", unlock: "Day 1 \u2014 Cave Bug Ride continued, A New Nation read-aloud, geometry intro, and Gold Rush/pioneer life.", day: 1 },
    "Colonial Map": { flavor: "A hand-drawn map of the 13 colonies stretching from Massachusetts to Georgia. Each colony has its own character \u2014 and its own grievances with the King.", unlock: "Day 2 \u2014 Long vowel review, colonial life discussion, identifying 2D shapes, and frontier community discussion.", day: 2 },
    "Quill and Ink Set": { flavor: "A goose-feather quill and jar of iron-gall ink. Samuel's father uses one just like this to print pamphlets about liberty.", unlock: "Day 3 \u2014 Diphthong review, Boston Tea Party lesson, 3D shapes (cubes, spheres), and helpful computers continued.", day: 3 },
    "Vote Counter": { flavor: "A wooden tally board for counting votes. In Samuel's town meeting, every adult man gets one vote \u2014 democracy in action!", unlock: "Day 4 \u2014 Spelling practice, discuss taxation without representation, telling time to half-hour, and coding/algorithms.", day: 4 },
    "Tea Chest Model": { flavor: "A miniature replica of the tea chests dumped in Boston Harbor. 342 chests of tea! The harbor smelled like the world's biggest teapot for weeks.", unlock: "Day 5 \u2014 Decodable reading, Declaration of Independence introduction, symmetry practice, and Lewis & Clark continued.", day: 5 },
    "Declaration Scroll": { flavor: "A scroll bearing the opening words: 'We hold these truths to be self-evident, that all men are created equal.' The most powerful sentence ever written.", unlock: "Day 6 \u2014 Writing about liberty, key figures (Washington, Jefferson, Franklin), measurement with ruler, and pioneer challenges.", day: 6 },
    "Printing Press Card": { flavor: "An illustrated card showing how a printing press works: set type, ink the plate, press the paper. Ideas travel at the speed of printing!", unlock: "Day 7 \u2014 Grammar assessment, discuss the printing press as a simple machine, partition circles into halves, and Oregon Trail completion.", day: 7 },
    "Freedom Eagle Token": { flavor: "A carved wooden eagle with spread wings \u2014 the symbol of the new nation. Its eyes look toward the future with fierce hope.", unlock: "Day 8 \u2014 Predictive reading, American symbols discussion, time word problems, and Westward Expansion review.", day: 8 },
    "Colony Flags Set": { flavor: "Thirteen miniature flags, one for each colony. Together they form one nation \u2014 proof that unity comes from diversity.", unlock: "Day 9 \u2014 Phonics review, vocabulary from A New Nation, geometry review, and technology helping pioneers.", day: 9 },
    "Independence Timeline": { flavor: "A scroll showing key dates: 1620 Pilgrims, 1773 Tea Party, 1776 Declaration, 1783 Victory. History unfolds one brave step at a time.", unlock: "Day 10 \u2014 Spelling test, retell the story of independence, math fact fluency, and colonial-to-modern comparison.", day: 10 },
    "Patriot\u2019s Badge": { flavor: "A star-shaped badge awarded to those who stand up for what is right. Samuel says the real patriots are people who believe in freedom for ALL.", unlock: "Day 11 \u2014 Unit review: reading fluency, A New Nation essay, math assessment, and independence knowledge check.", day: 11 },

    // ========== MISSION 13: Westward Ho! ==========
    "Wagon Wheel Model": { flavor: "A hand-carved wagon wheel with 14 spokes. Clara says you can tell how far you've traveled by counting wheel rotations \u2014 pioneer odometer!", unlock: "Day 1 \u2014 Begin Kay & Martez phonics, Frontier Explorers read-aloud, geometry & time, and civics introduction.", day: 1 },
    "Trail Map": { flavor: "A map of the Oregon Trail showing 2,000 miles of prairies, rivers, and mountains from Independence, Missouri to the Willamette Valley.", unlock: "Day 2 \u2014 Multi-syllable words, Lewis & Clark expedition, 2D shape properties, and rules vs. laws discussion.", day: 2 },
    "Supply Ledger": { flavor: "A leather-bound book listing everything a pioneer family needs: 200 lbs flour, 150 lbs bacon, 10 lbs coffee, 2 lbs salt. Running out means disaster.", unlock: "Day 3 \u2014 Prefix introduction, Daniel Boone lesson, telling time to 5 minutes, and citizenship discussion.", day: 3 },
    "River Crossing Guide": { flavor: "Illustrated instructions for crossing rivers: float the wagon on logs, swim the oxen, waterproof the supplies. Clara has crossed twelve rivers so far.", unlock: "Day 4 \u2014 Spelling practice, Davy Crockett stories, symmetry in nature, and scientific method introduction.", day: 4 },
    "Prairie Compass": { flavor: "A reliable compass for the open prairie where there are no landmarks for miles. The needle always finds north \u2014 even in a thunderstorm.", unlock: "Day 5 \u2014 Contraction introduction, westward expansion reasons, 3D shape identification, and real-world problem solving.", day: 5 },
    "Weather Vane": { flavor: "A rooster-shaped weather vane that predicts prairie storms by spinning toward the incoming wind. Red sky at morning, pioneer take warning!", unlock: "Day 6 \u2014 Decodable reading, pioneer daily life discussion, calendar/schedule reading, and voting/elections lesson.", day: 6 },
    "Seed Pouch": { flavor: "A leather pouch full of seeds: corn, wheat, beans, and sunflowers. Clara's family will plant these when they reach their new homestead.", unlock: "Day 7 \u2014 Paragraph writing introduction, Gold Rush discussion, time elapsed problems, and community roles.", day: 7 },
    "Trading Post Tokens": { flavor: "Brass tokens accepted at frontier trading posts. Exchange them for supplies, tools, or news from back east. Information is the most valuable trade good.", unlock: "Day 8 \u2014 Grammar review, Trail of Tears discussion (age-appropriate), money problems, and rights & responsibilities.", day: 8 },
    "Mountain Pass Chart": { flavor: "A topographic chart showing the safest passes through the Rocky Mountains. One wrong turn and you're stuck until spring thaw.", unlock: "Day 9 \u2014 Fluency practice, compare pioneer and modern travel, shape partitioning, and science tools classification.", day: 9 },
    "Campfire Journal": { flavor: "Clara's personal journal, written by firelight every evening. 'Day 87: Crossed the Platte River today. Lost a barrel of flour but everyone is safe.'", unlock: "Day 10 \u2014 Spelling assessment, retell a frontier adventure, math fact fluency, and American symbols review.", day: 10 },
    "Pioneer\u2019s Lantern": { flavor: "A tin lantern with star-shaped holes punched in the sides. At night, it casts constellation patterns on the wagon canvas \u2014 pioneer planetarium!", unlock: "Day 11 \u2014 Unit review: reading fluency, Frontier Explorers essay, math assessment, and Westward expansion quiz.", day: 11 },

    // ========== MISSION 14: Light, Sound & Machines ==========
    "Community Charter": { flavor: "A document written by the citizens of Meadowbrook Village outlining fair rules for everyone. Democracy starts at home!", unlock: "Day 1 \u2014 Kay & Martez continued, Fables/Folktales/Fairy Tales review, time & geometry review, and government introduction.", day: 1 },
    "Voting Box": { flavor: "A wooden box with a slot on top for paper ballots. Every citizen gets one vote, and every vote counts equally.", unlock: "Day 2 \u2014 Fluency building, compare morals across story types, geometry practice, and Constitution introduction.", day: 2 },
    "Tally Board": { flavor: "A slate board for tallying votes with chalk marks. Five tallies make a gate: ||||. The fairest way to count!", unlock: "Day 3 \u2014 Paragraph writing, discuss justice in fairy tales, putting-it-all-together math, and American symbols lesson.", day: 3 },
    "Rights Scroll": { flavor: "A scroll listing the rights every citizen of Everbright holds: the right to learn, to speak, to be treated fairly, and to help their community.", unlock: "Day 4 \u2014 Spelling practice, vocabulary synthesis from all story domains, comprehensive math review, and science for everyone.", day: 4 },
    "Rule Book": { flavor: "A handbook of Meadowbrook's rules, each one voted on by the community. Rule #1: Be kind. Rule #2: Listen to each other. Rule #3: Share what you know.", unlock: "Day 5 \u2014 Decodable reading, retell favorite story across all domains, estimation review, and community helpers.", day: 5 },
    "Budget Ledger": { flavor: "A ledger for planning community projects: bridge repair costs 50 coins, new school costs 200, park cleanup is free (just needs volunteers!).", unlock: "Day 6 \u2014 Grammar review, discuss how stories carry values across cultures, addition/subtraction review, and famous scientists.", day: 6 },
    "Civic Badge": { flavor: "A badge awarded to active citizens who participate in their community. Wearing it means you've voted, volunteered, or stood up for someone.", unlock: "Day 7 \u2014 Writing about citizenship, compare folktale wisdom to civic values, measurement review, and scientific classification.", day: 7 },
    "Flag Design Kit": { flavor: "Art supplies for designing a flag that represents your community's values. What colors and symbols would YOUR community choose?", unlock: "Day 8 \u2014 Fluency assessment, oral presentations about story themes, geometry assessment, and tools of science.", day: 8 },
    "Meeting Gavel": { flavor: "A small wooden gavel for calling the town meeting to order. Three taps and everyone listens. The gavel gives authority to the people, not to power.", unlock: "Day 9 \u2014 Phonics review, synthesize lessons from fables/folktales/fairy tales, comprehensive math practice, and scientific method review.", day: 9 },
    "Town Map": { flavor: "A detailed map of Meadowbrook Village showing the school, library, town hall, park, and market. Every building was decided on by community vote.", unlock: "Day 10 \u2014 Spelling review, final story domain vocabulary test, math fact mastery, and civic responsibilities quiz.", day: 10 },
    "Responsibility Cards": { flavor: "Cards listing civic responsibilities: vote, follow rules, help neighbors, protect the environment, be honest, and always keep learning.", unlock: "Day 11 \u2014 Unit review: reading fluency, citizenship essay, math assessment, and civics knowledge check.", day: 11 },

    // ========== MISSION 15: The Navigator's Crown ==========
    "The Star Map": { flavor: "The complete Star Map, reassembled from 14 constellation fragments! Every star represents a lesson learned, every path a journey taken.", unlock: "Day 1 \u2014 Skills wrap-up, Grand Review storytelling begins, comprehensive math, and all-subjects synthesis.", day: 1 },
    "Celebration Banner": { flavor: "A magnificent banner embroidered with all 15 constellation crests. When unfurled, it shimmers with captured starlight from every mission.", unlock: "Day 2 \u2014 Fluency showcase preparation, retell Missions 1-3, math word problems from all units, and civilization timeline.", day: 2 },
    "Gratitude Letters": { flavor: "Letters written to each civilization guide thanking them for their wisdom: Dear Kidu, Dear Nefari, Dear Quilla, Dear Tlalli, Dear Samuel, Dear Clara.", unlock: "Day 3 \u2014 Letter writing to guides (writing practice), retell Missions 4-6, measurement review, and scientific achievements.", day: 3 },
    "Memory Book": { flavor: "A scrapbook of the entire journey: pressed flowers from the prairie, sand from Egypt, a quipu knot from the mountains, an oak leaf from colonial Boston.", unlock: "Day 4 \u2014 Paragraph writing showcase, retell Missions 7-9, geometry review, and compare all civilizations.", day: 4 },
    "Navigator\u2019s Crown": { flavor: "A golden crown with 15 constellation gems, one for each mission completed. When all gems glow, the crown proves you are a true Star Navigator.", unlock: "Day 5 \u2014 Reading fluency final, retell Missions 10-12, comprehensive operations review, and civic values reflection.", day: 5 },
    "Starlight Butterfly Charm": { flavor: "A delicate charm of the Shadow Moth's true form \u2014 a radiant Starlight Butterfly. It proves that ignorance can be transformed through knowledge and courage.", unlock: "Day 6 \u2014 Spelling mastery demonstration, retell Missions 13-14, mental math championship, and science method showcase.", day: 6 },
    "Kingdom Flag": { flavor: "The flag of Everbright, now blazing with restored starlight. The Shadow Moth's darkness has been replaced by the brilliance of knowledge.", unlock: "Day 7 \u2014 Grammar mastery check, storytelling festival preparation, data analysis review, and history connections map.", day: 7 },
    "Star Forge Ember": { flavor: "A glowing ember from Elara's Star Forge, kept in a crystal vial. It represents the fire of curiosity that fueled the entire journey.", unlock: "Day 8 \u2014 Creative writing showcase, practice festival presentations, comprehensive review, and geography mastery.", day: 8 },
    "Constellation Album": { flavor: "An album with a page for each of the 15 constellations, showing when they were restored and what knowledge they hold. Your journey, documented in stars.", unlock: "Day 9 \u2014 Oral presentation preparation, vocabulary from all domains, estimation and strategy review, and body of knowledge recap.", day: 9 },
    "Hero\u2019s Medal": { flavor: "A medal awarded by Stellara herself, engraved with the words: 'Knowledge is the light that never dims.' Only true Star Navigators earn this honor.", unlock: "Day 10 \u2014 Final reading assessment, storytelling festival rehearsal, math fact celebration, and complete knowledge review.", day: 10 },
    "Everbright Compass": { flavor: "A compass that no longer points north \u2014 it points toward whatever knowledge you need next. Your journey never truly ends, Star Navigator.", unlock: "Day 11 \u2014 Celebration Day preparation: final writing piece, final math challenge, final science demonstration, final knowledge showcase.", day: 11 },
  };

  // ============================================
  // APPLY TOOLTIPS TO QUEST ITEM CARDS
  // ============================================
  function applyItemData() {
    document.querySelectorAll('.quest-item-card').forEach(function(card) {
      var nameEl = card.querySelector('span');
      if (!nameEl) return;
      var name = nameEl.textContent.trim();
      var data = ITEM_DATA[name];
      if (!data) return;

      // Create tooltip
      var tooltip = document.createElement('div');
      tooltip.className = 'item-tooltip';
      tooltip.innerHTML = '<div class="item-tooltip-flavor">' + data.flavor + '</div><div class="item-tooltip-unlock"><strong>Unlocked:</strong> ' + data.unlock + '</div>';
      card.appendChild(tooltip);
      card.style.position = 'relative';

      // Add day badge
      var badge = document.createElement('div');
      badge.className = 'item-day-badge';
      badge.textContent = 'D' + data.day;
      card.appendChild(badge);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyItemData);
  } else {
    applyItemData();
  }

})();
