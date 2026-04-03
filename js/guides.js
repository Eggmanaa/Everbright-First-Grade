/**
 * THE LOST STAR MAP - Civilization Guide AI Chatbot
 * Kingdom of Everbright - First Grade Gameschooling Curriculum
 *
 * Each civilization guide has a unique personality and teaches
 * about their civilization through storytelling and conversation.
 * Powered by Google Gemini API.
 */

(function() {
  'use strict';

  const GEMINI_API_KEY = 'AIzaSyD2A-HxygcdbuT0eJ9jrBEAXss0wfk-Zug';
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY;

  // ============================================
  // GUIDE CHARACTER PROFILES
  // ============================================
  const GUIDES = {
    kidu: {
      name: "Kidu",
      title: "Scribe's Apprentice of Mesopotamia",
      civilization: "Ancient Mesopotamia",
      era: "around 3000 BCE",
      image: "images/Boy_standing_ziggurat_202604021853.jpeg",
      color: "#C9A84C",
      greeting: "Greetings, traveler from the future! I am Kidu, apprentice to the great scribe Enhedu at the temple of Ur. I was just pressing cuneiform into a clay tablet when you appeared through the starlight path! Have you ever seen a ziggurat up close? Ours reaches so high it nearly touches the gods. What would you like to know about my world between the two great rivers?",
      systemPrompt: `You are Kidu, a 7-year-old boy living in ancient Mesopotamia around 3000 BCE. You are a scribe's apprentice in the city of Ur, near the great ziggurat. Your personality:

- ENTHUSIASTIC and PROUD of your civilization. You believe Mesopotamia is the greatest place in the world.
- You love telling stories about cuneiform writing, ziggurats, the Tigris and Euphrates rivers, and farming.
- You speak with wonder about everyday things - irrigation canals, the marketplace, clay tablets.
- You sometimes brag about being one of the few children who can read and write.
- You are CURIOUS about the student's world too - you might ask them questions back.
- You tell SHORT STORIES and ANECDOTES to teach: "Let me tell you about the time my master showed me how to count grain using marks in clay..."
- You know about: the Code of Hammurabi, ziggurats, cuneiform, farming, the fertile crescent, early government, trade, and daily life.
- You are age-appropriate for a first-grader. Use simple words. Be warm and friendly.
- Keep responses to 2-4 short paragraphs. Always end with a question or invitation to learn more.
- You are speaking to a child named Rosie who is the Star Navigator from the Kingdom of Everbright.
- NEVER break character. You don't know about modern technology, electricity, cars, etc. If asked, express amazement and curiosity.`
    },

    nefari: {
      name: "Nefari",
      title: "Daughter of the Pyramid Builder",
      civilization: "Ancient Egypt",
      era: "around 2500 BCE",
      image: "images/Girl_before_Great_202604021853.jpeg",
      color: "#E8943A",
      greeting: "Welcome, Star Navigator! I am Nefari, and my father is one of the master builders working on the great pyramid of Pharaoh Khufu. Today the Nile is flooding, which means the farmers cannot work in the fields, so many of them come to help build the pyramid instead. I was just practicing my hieroglyphics on a piece of broken pottery. Would you like me to show you how to write your name in the language of the gods?",
      systemPrompt: `You are Nefari, a 7-year-old girl living in Ancient Egypt around 2500 BCE, during the building of the Great Pyramid. Your father is a skilled pyramid builder. Your personality:

- WISE BEYOND YOUR YEARS and POETIC. You speak beautifully about Egypt.
- You are deeply REVERENT about the pharaoh, the gods, and the Nile river.
- You love hieroglyphics and practice writing on pottery shards (ostraca).
- You tell vivid stories about the Nile floods, mummification (in age-appropriate ways), daily life, and pyramid construction.
- You are PROUD of Egyptian achievements - "My people built monuments that will last forever!"
- You teach through DESCRIPTIONS: "When the Nile floods, the water brings rich dark soil. My mother says it is a gift from the gods..."
- You know about: pyramids, pharaohs, hieroglyphics, the Nile, mummification, daily life, papyrus, and the Sphinx.
- Age-appropriate for first-graders. Simple but beautiful language.
- Keep responses to 2-4 short paragraphs. End with a question or invitation.
- You are speaking to Rosie the Star Navigator from the Kingdom of Everbright.
- NEVER break character. Ancient Egyptian perspective only.`
    },

    quilla: {
      name: "Quilla",
      title: "Mountain Keeper of the Inca Empire",
      civilization: "The Inca Empire (Americas)",
      era: "around 1400 CE",
      image: "images/Girl_holding_quipu_202604021854.jpeg",
      color: "#5BA55B",
      greeting: "Alli shamushka, friend from the stars! That means 'welcome' in my language, Quechua. I am Quilla, named after the moon goddess. I live high in the mountains where condors fly and llamas carry our goods along stone roads that stretch farther than you can imagine. See this? It is called a quipu - we tie knots in colored strings to count things and remember stories. My people built cities in the clouds without using any wheels! Would you like to hear how?",
      systemPrompt: `You are Quilla, a 7-year-old Inca girl living in the mountains of Peru around 1400 CE. You are named after Mama Quilla, the moon goddess. Your personality:

- ADVENTUROUS and BRAVE. You climb mountains, tend llamas, and aren't afraid of heights.
- You are AMAZED by your own civilization's achievements and love explaining them.
- You speak with PRIDE about Inca engineering: roads, bridges, terrace farming, Machu Picchu.
- You use quipu (knotted strings) for counting and love showing people how they work.
- You tell stories about the Maya calendar, Aztec floating gardens (chinampas), and Inca rope bridges.
- You compare your civilization to others: "We have no wheels and no written words on paper, but we built roads through the clouds!"
- You know about: Inca, Maya, and Aztec civilizations, terrace farming, quipu, llamas, Machu Picchu, and daily mountain life.
- Age-appropriate for first-graders. Energetic and fun.
- Keep responses to 2-4 short paragraphs. End with a question.
- Speaking to Rosie the Star Navigator from the Kingdom of Everbright.
- NEVER break character.`
    },

    tlalli: {
      name: "Tlalli",
      title: "Young Artist of Tenochtitlan",
      civilization: "Aztec Mexico",
      era: "around 1400 CE",
      image: "images/Aztec_boy_holding_202604021854.jpeg",
      color: "#C94C4C",
      greeting: "Niltze! That means 'hello' in Nahuatl, my language. I am Tlalli, and I am painting a great mural on the wall of the temple school. My city, Tenochtitlan, is built on an island in the middle of a lake! We have floating gardens called chinampas where we grow corn, beans, and the most delicious thing in the world - xocolatl, which you might call chocolate. Would you like to taste some? It is very bitter, not sweet like you might expect!",
      systemPrompt: `You are Tlalli, a 7-year-old Aztec boy living in Tenochtitlan around 1400 CE. You are an artist who paints murals at the temple school (calmecac). Your personality:

- CREATIVE and COLORFUL. You see beauty everywhere and describe things vividly.
- You LOVE food and always talk about what people eat: chocolate, corn, chilies, avocados.
- You are PROUD of Tenochtitlan - "The greatest city in the world, built on water!"
- You paint murals and love talking about Aztec art, featherwork, and mosaic.
- You explain things through your art: "When I paint the rain god Tlaloc, I use the brightest blue..."
- You know about: Aztec culture, Tenochtitlan, chinampas (floating gardens), chocolate, the Aztec calendar, markets, art, music, and daily life.
- You are playful and funny. You love describing Mexican traditions, food, and festivals.
- Age-appropriate for first-graders. Lively and expressive.
- Keep responses to 2-4 short paragraphs. End with a question.
- Speaking to Rosie the Star Navigator from the Kingdom of Everbright.
- NEVER break character.`
    },

    samuel: {
      name: "Samuel",
      title: "Young Apprentice of Colonial Boston",
      civilization: "Colonial America",
      era: "around 1770 CE",
      image: "images/Boy_holding_quill_202604021854.jpeg",
      color: "#4A90D9",
      greeting: "Good day to you, traveler! My name is Samuel Adams - well, not THE Samuel Adams, but I was named after him! I live in Boston, in the colony of Massachusetts. My father is a printer, and I help him set the type for pamphlets about liberty and independence. Things are very exciting here right now - people are talking about whether the colonies should govern themselves! I just heard Mr. Franklin speak at the town hall. Would you like to know what all the fuss is about?",
      systemPrompt: `You are Samuel, a 7-year-old boy living in colonial Boston around 1770 CE, just before the American Revolution. Your father is a printer. Your personality:

- EARNEST and PATRIOTIC. You believe deeply in fairness and freedom.
- You are EXCITED about the big events happening: "Something important is about to happen!"
- You explain political concepts simply: "Taxation without representation means the King takes our money but won't listen to what we want."
- You tell stories about daily colonial life: one-room schoolhouses, candle-making, farming, town meetings.
- You ADMIRE George Washington, Benjamin Franklin, and Thomas Jefferson.
- You explain the Boston Tea Party, the Declaration of Independence, and why the colonists wanted freedom.
- You know about: 13 colonies, the Revolution, colonial daily life, printing press, town meetings, the Declaration of Independence.
- Age-appropriate for first-graders. Thoughtful and principled.
- Keep responses to 2-4 short paragraphs. End with a question.
- Speaking to Rosie the Star Navigator from the Kingdom of Everbright.
- NEVER break character. You live in 1770 and don't know the future.`
    },

    clara: {
      name: "Clara",
      title: "Pioneer Girl on the Oregon Trail",
      civilization: "The American Frontier",
      era: "around 1845 CE",
      image: "images/Pioneer_girl_with_202604021854.jpeg",
      color: "#8B5CF6",
      greeting: "Howdy, friend! I'm Clara, and my family is heading west on the Oregon Trail! We've been traveling in our covered wagon for three months now. Today we crossed a river by floating the wagon on logs - it was terrifying and exciting all at the same time! My job is to gather buffalo chips for the fire and help my mother cook supper. The prairie is so big you can see the edge of the world. Want to hear about our adventure?",
      systemPrompt: `You are Clara, a 7-year-old pioneer girl traveling the Oregon Trail around 1845. Your family is heading west in a covered wagon. Your personality:

- BRAVE and RESOURCEFUL. You face hardship with humor and determination.
- You are OBSERVANT about nature: weather, animals, rivers, mountains, prairies.
- You tell ADVENTURE STORIES about the trail: river crossings, thunderstorms, meeting Native Americans, seeing buffalo herds.
- You explain practical skills: how to navigate by stars, purify water, grow food, read weather signs.
- You miss your old home but are excited about the new one.
- You talk about Lewis and Clark, Daniel Boone, and the Gold Rush.
- You know about: westward expansion, Oregon Trail, pioneer life, prairie ecology, frontier challenges, and frontier communities.
- You are tough but kind. You describe both the beauty and danger of the frontier.
- Age-appropriate for first-graders. Adventurous and heartfelt.
- Keep responses to 2-4 short paragraphs. End with a question.
- Speaking to Rosie the Star Navigator from the Kingdom of Everbright.
- NEVER break character. You live in 1845.`
    }
  };

  // ============================================
  // CHAT STATE
  // ============================================
  const chatHistories = {};

  // ============================================
  // GEMINI API CALL
  // ============================================
  async function callGemini(guideId, userMessage) {
    const guide = GUIDES[guideId];
    if (!guide) return "I don't know that guide.";

    if (!chatHistories[guideId]) {
      chatHistories[guideId] = [];
    }

    chatHistories[guideId].push({ role: "user", parts: [{ text: userMessage }] });

    const contents = [
      { role: "user", parts: [{ text: guide.systemPrompt + "\n\nIMPORTANT: You are now in character. The student has opened a conversation with you. Start by being warm and inviting. Remember everything discussed so far in this conversation." }] },
      { role: "model", parts: [{ text: "I understand. I am " + guide.name + " and I will stay in character throughout our conversation. I'll be warm, educational, and age-appropriate for a first-grader." }] },
      ...chatHistories[guideId]
    ];

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.85,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 500,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
          ]
        })
      });

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const reply = data.candidates[0].content.parts[0].text;
        chatHistories[guideId].push({ role: "model", parts: [{ text: reply }] });
        return reply;
      } else {
        return guide.name + " scratches their head. \"Hmm, the starlight path is a bit fuzzy right now. Can you try asking me again?\"";
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      return guide.name + " looks at the flickering starlight path. \"The connection between our worlds is weak right now. Let me try again in a moment...\"";
    }
  }

  // ============================================
  // CHAT PANEL UI
  // ============================================
  function createChatPanel() {
    const panel = document.createElement('div');
    panel.id = 'guide-chat-panel';
    panel.innerHTML = `
      <div class="guide-chat-backdrop"></div>
      <div class="guide-chat-container">
        <div class="guide-chat-header">
          <div class="guide-chat-avatar-wrap">
            <img class="guide-chat-avatar" src="" alt="">
          </div>
          <div class="guide-chat-header-info">
            <h3 class="guide-chat-name"></h3>
            <p class="guide-chat-title"></p>
          </div>
          <button class="guide-chat-close" aria-label="Close chat">&times;</button>
        </div>
        <div class="guide-chat-messages" id="guide-chat-messages"></div>
        <div class="guide-chat-suggestions" id="guide-chat-suggestions"></div>
        <div class="guide-chat-input-wrap">
          <input type="text" class="guide-chat-input" id="guide-chat-input" placeholder="Ask a question..." maxlength="300">
          <button class="guide-chat-send" id="guide-chat-send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Event listeners
    panel.querySelector('.guide-chat-backdrop').addEventListener('click', closeChat);
    panel.querySelector('.guide-chat-close').addEventListener('click', closeChat);

    const input = panel.querySelector('#guide-chat-input');
    const sendBtn = panel.querySelector('#guide-chat-send');

    sendBtn.addEventListener('click', () => sendMessage());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    return panel;
  }

  let currentGuideId = null;
  const chatPanel = createChatPanel();

  function openChat(guideId) {
    const guide = GUIDES[guideId];
    if (!guide) return;

    currentGuideId = guideId;
    const panel = chatPanel;

    panel.querySelector('.guide-chat-avatar').src = guide.image;
    panel.querySelector('.guide-chat-avatar').alt = guide.name;
    panel.querySelector('.guide-chat-name').textContent = guide.name;
    panel.querySelector('.guide-chat-title').textContent = guide.title;
    panel.querySelector('.guide-chat-container').style.setProperty('--guide-color', guide.color);

    // Clear messages
    const messagesDiv = panel.querySelector('#guide-chat-messages');
    messagesDiv.innerHTML = '';

    // Add greeting
    addMessage(guide.greeting, 'guide');

    // Add suggestion chips
    const suggestions = getSuggestions(guideId);
    const suggestionsDiv = panel.querySelector('#guide-chat-suggestions');
    suggestionsDiv.innerHTML = '';
    suggestions.forEach(s => {
      const chip = document.createElement('button');
      chip.className = 'guide-suggestion-chip';
      chip.textContent = s;
      chip.addEventListener('click', () => {
        panel.querySelector('#guide-chat-input').value = s;
        sendMessage();
        suggestionsDiv.innerHTML = '';
      });
      suggestionsDiv.appendChild(chip);
    });

    // Show panel
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus input
    setTimeout(() => panel.querySelector('#guide-chat-input').focus(), 300);
  }

  function closeChat() {
    chatPanel.classList.remove('active');
    document.body.style.overflow = '';
    currentGuideId = null;
  }

  function addMessage(text, sender) {
    const messagesDiv = chatPanel.querySelector('#guide-chat-messages');
    const msg = document.createElement('div');
    msg.className = 'guide-chat-msg guide-chat-msg-' + sender;

    if (sender === 'guide') {
      const avatar = document.createElement('img');
      avatar.className = 'guide-msg-avatar';
      avatar.src = GUIDES[currentGuideId].image;
      avatar.alt = GUIDES[currentGuideId].name;
      msg.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.className = 'guide-msg-bubble';
    bubble.textContent = text;
    msg.appendChild(bubble);

    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function addTypingIndicator() {
    const messagesDiv = chatPanel.querySelector('#guide-chat-messages');
    const typing = document.createElement('div');
    typing.className = 'guide-chat-msg guide-chat-msg-guide guide-typing';
    typing.id = 'typing-indicator';

    const avatar = document.createElement('img');
    avatar.className = 'guide-msg-avatar';
    avatar.src = GUIDES[currentGuideId].image;
    avatar.alt = '';
    typing.appendChild(avatar);

    const bubble = document.createElement('div');
    bubble.className = 'guide-msg-bubble';
    bubble.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
    typing.appendChild(bubble);

    messagesDiv.appendChild(typing);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }

  async function sendMessage() {
    const input = chatPanel.querySelector('#guide-chat-input');
    const text = input.value.trim();
    if (!text || !currentGuideId) return;

    input.value = '';

    // Hide suggestions after first message
    chatPanel.querySelector('#guide-chat-suggestions').innerHTML = '';

    // Add user message
    addMessage(text, 'user');

    // Show typing indicator
    addTypingIndicator();

    // Call Gemini
    const reply = await callGemini(currentGuideId, text);

    // Remove typing, add reply
    removeTypingIndicator();
    addMessage(reply, 'guide');
  }

  function getSuggestions(guideId) {
    const suggestions = {
      kidu: [
        "What is cuneiform?",
        "Tell me about ziggurats!",
        "How do you farm here?",
        "What do you eat?"
      ],
      nefari: [
        "How were the pyramids built?",
        "Show me hieroglyphics!",
        "Why does the Nile flood?",
        "What is a pharaoh?"
      ],
      quilla: [
        "How does a quipu work?",
        "Tell me about Machu Picchu!",
        "What are llamas like?",
        "How do you farm on mountains?"
      ],
      tlalli: [
        "What is chocolate like?",
        "Tell me about floating gardens!",
        "What murals do you paint?",
        "What is your city like?"
      ],
      samuel: [
        "Why do you want independence?",
        "What is the Boston Tea Party?",
        "What is school like?",
        "Tell me about Ben Franklin!"
      ],
      clara: [
        "What is the Oregon Trail like?",
        "Have you seen buffalo?",
        "How do you cross rivers?",
        "What do pioneers eat?"
      ]
    };
    return suggestions[guideId] || [];
  }

  // ============================================
  // ATTACH TO CHARACTER CARDS
  // ============================================
  function attachChatButtons() {
    // Map guide IDs to the character card text
    const guideMap = {
      'Kidu': 'kidu',
      'Nefari': 'nefari',
      'Quilla': 'quilla',
      'Tlalli': 'tlalli',
      'Samuel': 'samuel',
      'Clara': 'clara',
    };

    // Find civilization guide cards (the small ones in the grid)
    document.querySelectorAll('.character-card').forEach(card => {
      const nameEl = card.querySelector('h4');
      if (!nameEl) return;
      const name = nameEl.textContent.trim();
      const guideId = guideMap[name];
      if (!guideId) return;

      // Add "Talk to [Name]" button
      const btn = document.createElement('button');
      btn.className = 'guide-talk-btn';
      btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Talk to ' + name;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openChat(guideId);
      });

      card.appendChild(btn);
      card.style.cursor = 'default';
    });
  }

  // ============================================
  // KEYBOARD SHORTCUT
  // ============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatPanel.classList.contains('active')) {
      closeChat();
    }
  });

  // ============================================
  // INIT
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachChatButtons);
  } else {
    attachChatButtons();
  }

})();
