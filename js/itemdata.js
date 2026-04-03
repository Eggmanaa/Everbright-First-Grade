/**
 * THE LOST STAR MAP - Quest Item Flavor Text & Assignment Unlocks
 * Each mission has 5 items, one per subject:
 *   Language Arts (CKLA Skills), Listening & Learning (CKLA Knowledge),
 *   Math (CKMath), Science (CKSci), Social Studies (CKHG)
 */

(function() {
  'use strict';

  const ITEM_DATA = {
    // ========== MISSION 1: The Star Map Awakens ==========
    "Phonics Decoder Ring": {
      flavor: "A bronze ring with spinning letter wheels. Twist them to decode secret star messages hidden in ancient texts.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 1: Snap Shots",
      subject: "Language Arts"
    },
    "Fable Wisdom Token": {
      flavor: "A coin engraved with a fox and grapes on one side and the words 'Look Before You Leap' on the other. Fable wisdom made solid.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D1: Fables & Stories",
      subject: "Listening & Learning"
    },
    "Star Counting Stones": {
      flavor: "Smooth river stones painted with numbers. Ancient navigators used stones like these to count the stars in each constellation.",
      unlock: "Complete Math \u2014 CKMath U1: Adding, Subtracting & Data",
      subject: "Math"
    },
    "Phase Chart": {
      flavor: "A rotating wheel that shows the moon's eight faces - from thin crescent to full silver circle and back again.",
      unlock: "Complete Science \u2014 CKSci U1: Sun, Moon & Stars",
      subject: "Science"
    },
    "Map Scroll": {
      flavor: "An ancient scroll showing Everbright at the center, with starlight paths radiating outward to lands unknown.",
      unlock: "Complete Social Studies \u2014 CKHG U1: Continents, Countries & Maps",
      subject: "Social Studies"
    },

    // ========== MISSION 2: Rivers of Knowledge ==========
    "Clay Tablet Kit": {
      flavor: "Soft river clay and a wooden frame for pressing tablets. Kidu says the finest scribes can write 600 symbols before the clay dries.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 1: Snap Shots (cont.)",
      subject: "Language Arts"
    },
    "Cuneiform Decoder": {
      flavor: "A reference card showing common cuneiform symbols and their meanings. With this, you can read messages left by scribes 5,000 years ago.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D4: Early World Civilizations",
      subject: "Listening & Learning"
    },
    "Grain Counter": {
      flavor: "A wooden counting frame with clay beads. Mesopotamian merchants used these to keep track of grain shipments between cities.",
      unlock: "Complete Math \u2014 CKMath U1: Adding, Subtracting & Data (cont.)",
      subject: "Math"
    },
    "Irrigation Map": {
      flavor: "A detailed map showing the network of canals that carry water from the Tigris to the fields. Blue lines branch like a tree's roots.",
      unlock: "Complete Science \u2014 CKSci U1: Sun, Moon & Stars (cont.)",
      subject: "Science"
    },
    "Ziggurat Blueprint": {
      flavor: "Architectural plans for a seven-level ziggurat, complete with ramp angles and brick counts. An engineering marvel on papyrus.",
      unlock: "Complete Social Studies \u2014 CKHG U2: Mesopotamia",
      subject: "Social Studies"
    },

    // ========== MISSION 3: Gift of the Nile ==========
    "Hieroglyphic Key": {
      flavor: "A stone tablet showing the hieroglyphic alphabet beside its sounds. Nefari says once you learn these symbols, the walls of every temple become a storybook.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 2: Gran",
      subject: "Language Arts"
    },
    "Pharaoh's Riddle Scroll": {
      flavor: "A papyrus scroll filled with riddles about ancient Egypt. Each answer reveals a secret about the pharaohs and their kingdoms.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D4: Early World Civilizations (cont.)",
      subject: "Listening & Learning"
    },
    "Stone Block Counter": {
      flavor: "Miniature limestone blocks on a counting track. How many blocks to build a pyramid? Solve the story problem to find out!",
      unlock: "Complete Math \u2014 CKMath U2: Story Problems",
      subject: "Math"
    },
    "Nile Flood Gauge": {
      flavor: "A carved wooden ruler that measures the rise and fall of the Nile. When the floods come, the fields grow green with life.",
      unlock: "Complete Science \u2014 CKSci U2: Plant & Animal Survival",
      subject: "Science"
    },
    "Pyramid Protractor": {
      flavor: "A golden triangle tool that measures the exact angles of the Great Pyramid. The ancient builders needed perfect precision.",
      unlock: "Complete Social Studies \u2014 CKHG U3: Ancient Egypt",
      subject: "Social Studies"
    },

    // ========== MISSION 4: Stories Across the World ==========
    "Story Comparison Chart": {
      flavor: "A side-by-side chart showing how different cultures tell the same story in different ways. The patterns are fascinating!",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 2: Gran (cont.)",
      subject: "Language Arts"
    },
    "Folktale Map": {
      flavor: "A world map with pins marking where each folktale was first told. Lines connect stories that share the same moral lesson.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D3: Different Lands, Similar Stories",
      subject: "Listening & Learning"
    },
    "Story Pattern Wheel": {
      flavor: "A spinning wheel showing story problem patterns: add to, take from, put together, compare. Every math problem tells a story!",
      unlock: "Complete Math \u2014 CKMath U2: Story Problems (cont.)",
      subject: "Math"
    },
    "Cultural Symbol Guide": {
      flavor: "A field guide showing how different civilizations used plant and animal symbols in their stories and sacred art.",
      unlock: "Complete Science \u2014 CKSci U2: Plant & Animal Survival (cont.)",
      subject: "Science"
    },
    "Sacred Text Sampler": {
      flavor: "A beautifully bound sampler with passages from sacred texts around the world, showing how different faiths share messages of kindness.",
      unlock: "Complete Social Studies \u2014 CKHG U4: Three World Religions",
      subject: "Social Studies"
    },

    // ========== MISSION 5: The Mountain Temple ==========
    "Quipu Counting Rope": {
      flavor: "A rope with colorful knotted strings. The Inca used quipus to record stories and information - a language made of knots!",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 3: Bedtime Tales",
      subject: "Language Arts"
    },
    "Llama Guide": {
      flavor: "A carved wooden llama on a stick. Quilla says llamas guided travelers through the highest mountain passes of the Inca Empire.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D5: Early American Civilizations",
      subject: "Listening & Learning"
    },
    "Bridge Blueprint": {
      flavor: "Detailed plans for a rope bridge across a mountain gorge. Add and subtract the rope lengths to build it safely!",
      unlock: "Complete Math \u2014 CKMath U3: Add/Subtract Within 20",
      subject: "Math"
    },
    "Cloud Jar": {
      flavor: "A glass jar that captures mountain clouds. Hold it up to sunlight and watch rainbows dance through the mist inside.",
      unlock: "Complete Science \u2014 CKSci U3: Light & Sound",
      subject: "Science"
    },
    "Temple Map": {
      flavor: "A hand-drawn map showing the hidden mountain temples of the Inca, connected by the great royal road system.",
      unlock: "Complete Social Studies \u2014 CKHG U5: Early Civilizations of the Americas",
      subject: "Social Studies"
    },

    // ========== MISSION 6: Colors of the Marketplace ==========
    "Codex Pages": {
      flavor: "Pages from an Aztec codex filled with pictographic writing. Each colorful symbol tells a piece of the story.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 3: Bedtime Tales (cont.)",
      subject: "Language Arts"
    },
    "Recipe Scroll": {
      flavor: "An ancient recipe scroll showing how to make chocolate from cacao pods - the same way the Aztecs prepared their sacred drink.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D3: Different Lands, Similar Stories",
      subject: "Listening & Learning"
    },
    "Jade Counting Beads": {
      flavor: "Polished green jade beads strung on cord. Aztec merchants counted in groups of twenty using precious stones like these.",
      unlock: "Complete Math \u2014 CKMath U3: Add/Subtract Within 20 (cont.)",
      subject: "Math"
    },
    "Ramp Model": {
      flavor: "A miniature wooden ramp showing how the Aztecs moved heavy stones to build their pyramids. Simple machines, ancient wisdom!",
      unlock: "Complete Science \u2014 CKSci U3: Light & Sound (cont.)",
      subject: "Science"
    },
    "Serpent Mosaic Tile": {
      flavor: "A colorful tile piece from a feathered serpent mosaic. Tlalli says Quetzalcoatl's image decorates the greatest temples.",
      unlock: "Complete Social Studies \u2014 CKHG U6: Culture of Mexico",
      subject: "Social Studies"
    },

    // ========== MISSION 7: The Body Adventure ==========
    "Body Map": {
      flavor: "A full-body diagram with labels waiting to be filled in. Read the clues, sound out the words, and map every organ!",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 4: The Green Fern Zoo",
      subject: "Language Arts"
    },
    "Heartbeat Counter": {
      flavor: "A stethoscope charm that lets you hear the lub-dub of your own heart. Count the beats - your body's drum keeping time!",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D2: The Human Body",
      subject: "Listening & Learning"
    },
    "Bone Puzzle Set": {
      flavor: "A jigsaw puzzle of the human skeleton with numbers on each bone. There are 206 bones - can you count past 99 to find them all?",
      unlock: "Complete Math \u2014 CKMath U4: Numbers to 99",
      subject: "Math"
    },
    "Lung Balloon": {
      flavor: "A special balloon that expands and contracts like real lungs. Breathe in - it fills! Breathe out - it shrinks! That's your diaphragm at work.",
      unlock: "Complete Science \u2014 CKSci U5: Human Body Systems",
      subject: "Science"
    },
    "Skeleton Key": {
      flavor: "An ornate key shaped like a femur bone. It unlocks the chest where Columbus, the Pilgrims, and the Jamestown settlers keep their journals.",
      unlock: "Complete Social Studies \u2014 CKHG U7: Early Explorers & Settlers Pt 1",
      subject: "Social Studies"
    },

    // ========== MISSION 8: Reading the Stars ==========
    "Telescope": {
      flavor: "A brass telescope that brings the stars close enough to read their ancient names. Sound them out - Sirius, Polaris, Betelgeuse!",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 4: The Green Fern Zoo (cont.)",
      subject: "Language Arts"
    },
    "Planet Model Set": {
      flavor: "Eight painted spheres on sticks, each representing a planet. Mercury is tiny, Jupiter is huge - can you put them in order?",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D6: Astronomy",
      subject: "Listening & Learning"
    },
    "Orbit Tracker": {
      flavor: "A circular chart tracking how many days each planet takes to orbit the sun. Earth takes 365 - that's way past 99!",
      unlock: "Complete Math \u2014 CKMath U4: Numbers to 99 (cont.)",
      subject: "Math"
    },
    "Shadow Clock": {
      flavor: "A sundial that tells time by the sun's shadow. Ancient explorers used these to know when to rest their bodies and when to journey on.",
      unlock: "Complete Science \u2014 CKSci U5: Human Body Systems (cont.)",
      subject: "Science"
    },
    "Solar System Map": {
      flavor: "A grand map showing both the solar system above and the ocean routes below. The same stars guided both space and sea explorers!",
      unlock: "Complete Social Studies \u2014 CKHG U7: Early Explorers & Settlers Pt 2",
      subject: "Social Studies"
    },

    // ========== MISSION 9: Deep Below ==========
    "Rock Hammer": {
      flavor: "A sturdy hammer for cracking open rocks to find hidden crystals. Sir Gus would say it's like cracking open tricky words - tap by tap!",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 5: Sir Gus",
      subject: "Language Arts"
    },
    "Layer Diagram": {
      flavor: "A cross-section poster showing Earth's layers from crust to core. Each layer tells a chapter of our planet's 4.5 billion year story.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D7: History of the Earth",
      subject: "Listening & Learning"
    },
    "Ruler of Depths": {
      flavor: "A measuring tape that extends down, down, down. Add the depth numbers together - how far below the surface can you go?",
      unlock: "Complete Math \u2014 CKMath U5: Adding Within 100",
      subject: "Math"
    },
    "Volcano Model": {
      flavor: "A model volcano with a lever-activated eruption! Pull the simple machine lever and watch the lava flow. Science is explosive!",
      unlock: "Complete Science \u2014 CKSci U4: Simple Machines",
      subject: "Science"
    },
    "Fossil Brush": {
      flavor: "A delicate brush for uncovering ancient fossils and ancient documents. Brush away the dust of time to reveal the truth beneath.",
      unlock: "Complete Social Studies \u2014 CKHG U8: Colonies to Independence Pt 1",
      subject: "Social Studies"
    },

    // ========== MISSION 10: The Wild Kingdom ==========
    "Habitat Viewer": {
      flavor: "A viewfinder with slides showing different habitats. Read the labels - arctic, desert, ocean, forest - and match each animal to its home.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 5: Sir Gus (cont.)",
      subject: "Language Arts"
    },
    "Food Chain Cards": {
      flavor: "A deck of cards showing producers, consumers, and decomposers. Line them up to build a food chain from sunlight to apex predator!",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D8: Animals & Habitats",
      subject: "Listening & Learning"
    },
    "Wingspan Ruler": {
      flavor: "A foldable ruler for measuring wingspans. A hummingbird is 4 inches, an eagle is 80 - add them up for the total sky coverage!",
      unlock: "Complete Math \u2014 CKMath U5: Adding Within 100 (cont.)",
      subject: "Math"
    },
    "Camouflage Lens": {
      flavor: "A special lens that reveals hidden animals in their habitats. Nature's camouflage is the ultimate survival machine!",
      unlock: "Complete Science \u2014 CKSci U4: Simple Machines (cont.)",
      subject: "Science"
    },
    "Migration Map": {
      flavor: "A map showing animal migration routes alongside the paths of American colonists. Both followed the land to find freedom and home.",
      unlock: "Complete Social Studies \u2014 CKHG U8: Colonies to Independence Pt 2",
      subject: "Social Studies"
    },

    // ========== MISSION 11: Once Upon a Constellation ==========
    "Story Sorting Cards": {
      flavor: "Cards with story elements - beginning, middle, end - that snap together like puzzle pieces. Every great tale follows a pattern!",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 6: The Cave Bug Ride",
      subject: "Language Arts"
    },
    "Tale Map": {
      flavor: "A magical map showing the journey of every fairy tale hero - from once upon a time through the dark forest to happily ever after.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D9: Fairy Tales",
      subject: "Listening & Learning"
    },
    "Shape Stencil Set": {
      flavor: "Stencils of triangles, squares, circles, and hexagons. Measure their sides with a ruler - some are longer than 100 units!",
      unlock: "Complete Math \u2014 CKMath U6: Length & Numbers to 120",
      subject: "Math"
    },
    "Algorithm Scroll": {
      flavor: "A scroll with step-by-step instructions written in sparkly ink. Follow the algorithm exactly and the constellation draws itself!",
      unlock: "Complete Science \u2014 CKSci U6: Helpful Computers",
      subject: "Science"
    },
    "Enchantment Compass": {
      flavor: "A compass that points toward adventure. Lewis and Clark carried one just like it when they set out to explore the unknown West.",
      unlock: "Complete Social Studies \u2014 CKHG U9: Exploring the West Pt 1",
      subject: "Social Studies"
    },

    // ========== MISSION 12: A New Nation ==========
    "Quill and Ink Set": {
      flavor: "A feather quill and bottle of midnight-blue ink. The Founders wrote the most important words in American history with tools just like these.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 6: The Cave Bug Ride (cont.)",
      subject: "Language Arts"
    },
    "Declaration Scroll": {
      flavor: "A miniature scroll bearing the opening words: We hold these truths to be self-evident. Samuel says every citizen should know them by heart.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D10: A New Nation",
      subject: "Listening & Learning"
    },
    "Vote Counter": {
      flavor: "A clicking counter that tallies votes one by one. In a democracy, every number matters - count all the way to 120 if you must!",
      unlock: "Complete Math \u2014 CKMath U6: Length & Numbers to 120 (cont.)",
      subject: "Math"
    },
    "Printing Press Card": {
      flavor: "A card showing how a printing press works - an early computer that followed a program of movable type to spread ideas across a nation.",
      unlock: "Complete Science \u2014 CKSci U6: Helpful Computers (cont.)",
      subject: "Science"
    },
    "Liberty Bell Charm": {
      flavor: "A golden bell charm with a tiny crack, just like the real Liberty Bell. Ring it and hear the sound of freedom echoing westward.",
      unlock: "Complete Social Studies \u2014 CKHG U9: Exploring the West Pt 2",
      subject: "Social Studies"
    },

    // ========== MISSION 13: Westward Ho! ==========
    "Trail Map": {
      flavor: "A hand-drawn map of the Oregon Trail with landmarks labeled in careful handwriting. Read each place name aloud as you trace the route west.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 7: Kay & Martez",
      subject: "Language Arts"
    },
    "Campfire Journal": {
      flavor: "A leather journal filled with stories of frontier life. Clara writes by campfire light about the stars, the prairie, and the promise of tomorrow.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge D11: Frontier Explorers",
      subject: "Listening & Learning"
    },
    "Supply Ledger": {
      flavor: "A pioneer supply book tracking flour, sugar, and wagon parts. Calculate the shapes of supplies and how many days until the next trading post!",
      unlock: "Complete Math \u2014 CKMath U7: Geometry & Time",
      subject: "Math"
    },
    "Weather Vane": {
      flavor: "A rooster-topped weather vane that spins to show wind direction. Pioneer scientists observed nature every day to survive the frontier.",
      unlock: "Complete Science \u2014 CKSci U7: Science for Everyone",
      subject: "Science"
    },
    "Prairie Compass": {
      flavor: "A compass engraved with E Pluribus Unum. Even on the open prairie, the pioneers carried the rules and laws that held their communities together.",
      unlock: "Complete Social Studies \u2014 CKHG U10: Lessons in Civics Pt 1",
      subject: "Social Studies"
    },

    // ========== MISSION 14: Light, Sound & Machines ==========
    "Rule Book": {
      flavor: "A book of rules and laws written in clear, decodable language. Read every word carefully - in a republic, the rules protect everyone.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 7: Kay & Martez (cont.)",
      subject: "Language Arts"
    },
    "Rights Scroll": {
      flavor: "A scroll listing the rights of every citizen. Listen carefully - these words have echoed through courtrooms and classrooms for centuries.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge: Civics & Government",
      subject: "Listening & Learning"
    },
    "Tally Board": {
      flavor: "A wooden board with notches for counting time. Mark the hours and minutes as gears turn - machines and math keep perfect time together.",
      unlock: "Complete Math \u2014 CKMath U7: Geometry & Time (cont.)",
      subject: "Math"
    },
    "Meeting Gavel": {
      flavor: "A small wooden gavel that makes a satisfying crack - a lesson in sound vibrations AND how communities make decisions. Science meets civics!",
      unlock: "Complete Science \u2014 CKSci U7: Science for Everyone (cont.)",
      subject: "Science"
    },
    "Civic Badge": {
      flavor: "A shining badge awarded to responsible citizens. It shows the American eagle, the Constitution, and the words We the People.",
      unlock: "Complete Social Studies \u2014 CKHG U10: Lessons in Civics Pt 2",
      subject: "Social Studies"
    },

    // ========== MISSION 15: The Navigator's Crown ==========
    "Memory Book": {
      flavor: "A book containing every word Rosie learned to read this year. From CVC words to multisyllable adventures - the whole journey in one volume.",
      unlock: "Complete Language Arts \u2014 CKLA Skills Unit 7: Kay & Martez (final)",
      subject: "Language Arts"
    },
    "Gratitude Letters": {
      flavor: "Letters written to every civilization guide - Kidu, Nefari, Quilla, Tlalli, Samuel, and Clara. Each one says thank you for sharing your world.",
      unlock: "Complete Listening & Learning \u2014 CKLA Knowledge: Year Review",
      subject: "Listening & Learning"
    },
    "Constellation Album": {
      flavor: "An album with all 15 constellation patterns drawn in connect-the-dot style. Count the stars, measure the lines, calculate the angles - math mastery!",
      unlock: "Complete Math \u2014 CKMath U8: Putting It All Together",
      subject: "Math"
    },
    "Starlight Butterfly Charm": {
      flavor: "A charm showing the Shadow Moth transformed into a beautiful Starlight Butterfly. Knowledge defeated darkness - the greatest science of all.",
      unlock: "Complete Science \u2014 CKSci: Year Review",
      subject: "Science"
    },
    "Navigator's Crown": {
      flavor: "The legendary crown worn by Everbright's greatest Star Navigators. Every gem represents a civilization Rosie saved from being forgotten.",
      unlock: "Complete Social Studies \u2014 CKHG: Year Review",
      subject: "Social Studies"
    },

  };

  function applyItemData() {
    document.querySelectorAll(".quest-item-card").forEach(card => {
      const span = card.querySelector("span");
      if (!span) return;
      const name = span.textContent.trim();
      const data = ITEM_DATA[name];
      if (!data) return;

      // Add tooltip
      const tooltip = document.createElement("div");
      tooltip.className = "item-tooltip";
      tooltip.innerHTML = '<div class="item-tooltip-flavor">' + data.flavor + '</div>' +
        '<div class="item-tooltip-unlock"><strong>Earned by:</strong> ' + data.unlock + '</div>';
      card.appendChild(tooltip);
      card.style.position = "relative";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyItemData);
  } else {
    applyItemData();
  }
})();