// DOM Elements
const chatBox = document.getElementById('chatBox');
const spinBtn = document.getElementById('spinBtn');
const profileBtn = document.getElementById('profileBtn');
const themeBtn = document.getElementById('themeBtn');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const spinnerOverlay = document.getElementById('spinnerOverlay');
const profileModal = document.getElementById('profileModal');
const closeModal = document.getElementById('closeModal');
const aiName = document.getElementById('aiName');
const aiBio = document.getElementById('aiBio');
const aiAvatar = document.getElementById('aiAvatar');
const aiNetWorth = document.getElementById('aiNetWorth');
const aiIndustry = document.getElementById('aiIndustry');
const typeSound = document.getElementById('typeSound');
const sendSound = document.getElementById('sendSound');
const spinSound = document.getElementById('spinSound');

// API Configuration
//const API_KEY = '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';
const API_KEYS = [
    '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',
    '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',
    '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'
];
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

let currentApiKeyIndex = 0;

// Expanded Billionaire Personalities
const personalities = [
    { name: 'Elon Musk', tone: 'Visionary, chill, wild', bio: 'Rockets, cars, and memes.', netWorth: '$250B', industry: 'Tech & Space', avatar: 'https://assets-us-01.kc-usercontent.com/5cb25086-82d2-4c89-94f0-8450813a0fd3/0c3fcefb-bc28-4af6-985e-0c3b499ae832/Elon_Musk_Royal_Society.jpg?fm=jpg&auto=format' },
    { name: 'Jeff Bezos', tone: 'Bold, laid-back, bossy', bio: 'Amazon and chill.', netWorth: '$180B', industry: 'E-commerce & Space', avatar: 'https://i.guim.co.uk/img/media/ef573276855d9e04aaed3dae615757a8725e52d9/297_329_2974_1784/master/2974.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=54907bf26973da8d098262abe333b802' },
    { name: 'Mark Zuckerberg', tone: 'Techy, casual, connected', bio: 'Sliding into your DMs.', netWorth: '$140B', industry: 'Social Media', avatar: 'https://hips.hearstapps.com/hmg-prod/images/mark-zuckerberg-ceo-of-meta-testifies-before-the-senate-news-photo-1739998545.pjpeg?crop=0.553xw:0.827xh;0.283xw,0&resize=640:*' },
    { name: 'Bill Gates', tone: 'Nerdy, cool, generous', bio: 'Code and good vibes.', netWorth: '$130B', industry: 'Software & Philanthropy', avatar: 'https://imageio.forbes.com/specials-images/imageserve/62d599ede3ff49f348f9b9b4/0x0.jpg?format=jpg&crop=821,821,x155,y340,safe&height=416&width=416&fit=bounds' },
    { name: 'Warren Buffett', tone: 'Wise, chill, old-school', bio: 'Stocks and soda.', netWorth: '$110B', industry: 'Investments', avatar: 'https://www.gatesfoundation.org/-/media/gfo/3about/3people/ga_warren_buffett_20210203_0001.jpg?rev=68ac5cb3b9db4b34aeb5e199666c3149' },
    { name: 'Bernard Arnault', tone: 'Classy, smooth, luxe', bio: 'Fashion’s big boss.', netWorth: '$200B', industry: 'Luxury Goods', avatar: 'https://cdn.britannica.com/09/225009-050-9BA6E880/French-businessman-Bernard-Arnault-2017.jpg?w=385' },
    { name: 'Mukesh Ambani', tone: 'Bold, chill, commanding', bio: 'India’s energy dude.', netWorth: '$100B', industry: 'Energy & Telecom', avatar: 'https://rilstaticasset.akamaized.net/sites/default/files/2022-09/mukesh-ambani.png' },
    { name: 'Larry Page', tone: 'Quiet, smart, curious', bio: 'Searching the vibes.', netWorth: '$120B', industry: 'Tech & Search', avatar: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-83414114.jpg' },
    { name: 'Sergey Brin', tone: 'Brainy, chill, innovative', bio: 'Indexing life.', netWorth: '$115B', industry: 'Tech & Search', avatar: 'https://imageio.forbes.com/specials-images/imageserve/5c7d7c254bbe6f78090d831f/0x0.jpg?format=jpg&crop=2412,2414,x475,y168,safe&height=416&width=416&fit=bounds' },
    { name: 'Steve Ballmer', tone: 'Loud, hype, sporty', bio: 'From code to courts.', netWorth: '$90B', industry: 'Tech & Sports', avatar: 'https://www.detroitchamber.com/wp-content/uploads/2022/06/Steve-Ballmer_Blog.png' },
    { name: 'Amancio Ortega', tone: 'Low-key, stylish, chill', bio: 'Fast fashion king.', netWorth: '$85B', industry: 'Retail', avatar: 'https://imageio.forbes.com/specials-images/imageserve/5c76b94131358e35dd27748e/0x0.jpg?format=jpg&crop=2053,2053,x179,y216,safe&height=416&width=416&fit=bounds' },
    { name: 'Carlos Slim', tone: 'Shrewd, relaxed, mogul', bio: 'Telecom vibes.', netWorth: '$95B', industry: 'Telecom', avatar: 'https://imageio.forbes.com/specials-images/imageserve/5c76ba144bbe6f24ad99c613/0x0.jpg?format=jpg&crop=3005,3006,x0,y389,safe&height=416&width=416&fit=bounds' },
    { name: 'Gautam Adani', tone: 'Gritty, chill, strategic', bio: 'Ports and power.', netWorth: '$80B', industry: 'Infrastructure', avatar: 'https://imageio.forbes.com/specials-images/imageserve/670474d6f47423f07099d307/0x0.jpg?format=jpg&crop=648,648,x67,y86,safe&height=416&width=416&fit=bounds' },
    { name: 'Jensen Huang', tone: 'Techy, bold, chill', bio: 'AI chip guru.', netWorth: '$70B', industry: 'Semiconductors', avatar: 'https://imageio.forbes.com/specials-images/imageserve/5bc505a331358e59f57abeb9/0x0.jpg?format=jpg&crop=2702,2700,x553,y212,safe&height=416&width=416&fit=bounds' },
    { name: 'Alice Walton', tone: 'Calm, rich, chill', bio: 'Walmart heiress.', netWorth: '$65B', industry: 'Retail', avatar: 'https://aspenideasfestival.imgix.net/1f8e8632-e874-4d07-9357-bfd473b0c34b/AIF24_Walton_Alice1.jpeg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=662%2C471%2C505%2C512' },
];

let currentAI = null;
let messageHistory = [];
let streakCount = 0;
let lastActivity = Date.now();
let charCount = 0;

function updateScrollBehavior() {
    const isAtBottom = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 50; // Within 50px of bottom
    return isAtBottom;
}

// Utility Functions
function addMessage(content, className, addToHistory = true, timestamp = false) {
    const msgContainer = document.createElement('div');
    msgContainer.classList.add('chat-msg-container'); // New container for message + timestamp

    // Create message element
    const msg = document.createElement('div');
    msg.classList.add('chat-msg', className);

    // Format text if it's an AI message
    if (className === 'ai-msg') {
        const formattedContent = formatText(content);
        msg.innerHTML = formattedContent; // Use innerHTML for formatted text
    } else {
        msg.textContent = content; // Plain text for user messages
    }

    msgContainer.appendChild(msg);

    // Add timestamp below if requested
    
    if (timestamp) {
        const time = document.createElement('div');
        time.classList.add('timestamp');
        // Add a specific class based on message type for alignment
        time.classList.add(className === 'user-msg' ? 'user-timestamp' : 'ai-timestamp');
        time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        msgContainer.appendChild(time);
    }
    
    const wasAtBottom = updateScrollBehavior(); // Check if user was at bottom before adding message
    chatBox.appendChild(msgContainer);

    if (wasAtBottom) {
        chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
    }
    if (addToHistory) messageHistory.push({ role: className === 'user-msg' ? 'user' : 'assistant', content });
    lastActivity = Date.now();
}

// New function to format AI text
function formatText(text) {
    // Simple Markdown-like formatting
    let formatted = text
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // *bold* -> <strong>
        .replace(/_(.*?)_/g, '<em>$1</em>')          // _italic_ -> <em>
        .replace(/`(.*?)`/g, '<code>$1</code>');     // `code` -> <code>
    return formatted;
}

function showTyping() {
    const typing = document.createElement('div');
    typing.classList.add('chat-msg', 'ai-msg', 'typing');
    typing.textContent = 'Typing...';
    chatBox.appendChild(typing);
    
    // Force scroll to the very bottom
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
    
    // Ensure scroll position is maintained even after render
    setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 100); // Small delay to account for rendering
    
    return typing;
}

function removeTyping(typingEl) {
    if (typingEl && typingEl.parentNode) {
        typingEl.remove();
        // Ensure scroll remains at bottom after removal
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: 'smooth'
        });
    }
}

async function getAIResponse(message) {
    const prompt = `You are ${currentAI.name}, a billionaire. Respond in this tone: ${currentAI.tone}. Previous chat: ${JSON.stringify(messageHistory.slice(-5))}. User says: "${message}"`;
    
    const tryFetchWithKey = async (keyIndex) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEYS[keyIndex]}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama3-8b-8192',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 250,
                    temperature: 0.9
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error with key ${keyIndex}: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error(`Error with API key ${keyIndex}:`, error);
            
            // Try next key if available
            const nextKeyIndex = (keyIndex + 1) % API_KEYS.length;
            if (nextKeyIndex !== currentApiKeyIndex) { // Prevent infinite loop
                currentApiKeyIndex = nextKeyIndex;
                addMessage('Switching to backup connection...', 'ai-msg', false);
                return await tryFetchWithKey(nextKeyIndex);
            }
            
            // If all keys fail
            return 'Yo, all my connections are glitching. Hang tight!';
        }
    };

    return await tryFetchWithKey(currentApiKeyIndex);
}

// Core Features
function spinForAI() {
    if (!spinBtn || !spinnerOverlay) {
        console.error('Spin button or overlay not found');
        return;
    }
    spinBtn.disabled = true;
    profileBtn.disabled = true;
    spinnerOverlay.classList.add('active');
    spinSound.play();
    chatBox.innerHTML = '';
    messageHistory = [];
    streakCount++;
    setTimeout(() => {
        currentAI = personalities[Math.floor(Math.random() * personalities.length)];
        spinnerOverlay.classList.remove('active');
        spinBtn.disabled = false;
        profileBtn.disabled = false;
        userInput.disabled = false;
        sendBtn.disabled = false;
        addMessage(`Hey, I’m ${currentAI.name}. What’s good?`, 'ai-msg', true, true);
        showNotification(`Connected to ${currentAI.name}`);
        updateStreak();
        
        // Update top nav with AI profile
        const logo = document.querySelector('.logo');
        logo.innerHTML = ''; // Clear existing content
        const avatar = document.createElement('img');
        avatar.src = currentAI.avatar;
        avatar.classList.add('nav-avatar');
        const nameAndStatus = document.createElement('div');
        nameAndStatus.classList.add('name-and-status-container');
        const name = document.createElement('span');
        name.textContent = currentAI.name;
        name.classList.add('nav-name');
        const status = document.createElement('div');
        status.textContent = 'Online';
        status.classList.add('nav-status');
        logo.appendChild(avatar);
        logo.appendChild(nameAndStatus);
        nameAndStatus.appendChild(name);
        nameAndStatus.appendChild(status);
    }, 800);
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message || !currentAI || message.length > 280) return;
    addMessage(message, 'user-msg', true, true); // Timestamp true
    userInput.value = '';
    sendBtn.disabled = true;
    sendSound.play();
    const typingEl = showTyping();
    const response = await getAIResponse(message);
    removeTyping(typingEl);
    addMessage(response, 'ai-msg', true, true); // Timestamp true
    sendBtn.disabled = false;
    userInput.focus();
    autoResizeTextarea();
    streakCount++;
    updateStreak();
    randomReaction();
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function autoResizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = `${Math.min(userInput.scrollHeight, 100)}px`;
    updateCharCount();
}

function showProfile() {
    aiName.textContent = currentAI.name;
    aiBio.textContent = currentAI.bio;
    aiAvatar.src = currentAI.avatar;
    aiNetWorth.textContent = currentAI.netWorth;
    aiIndustry.textContent = currentAI.industry;
    profileModal.classList.add('active');
}

function closeProfile() {
    profileModal.classList.remove('active');
}

function addTypingSound() {
    typeSound.currentTime = 0;
    typeSound.play();
}

// 40 New Features
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
}

function updateStreak() {
    if (streakCount % 5 === 0) {
        addMessage(`Streak: ${streakCount} messages! You’re killing it!`, 'ai-msg', false);
    }
}

function updateCharCount() {
    charCount = userInput.value.length;
    if (charCount > 280) userInput.style.borderColor = '#ff6b6b';
    else userInput.style.borderColor = '';
}

function randomReaction() {
    const reactions = ['😂', '🔥', '👍', '🤓', '💡'];
    if (Math.random() < 0.15) addMessage(reactions[Math.floor(Math.random() * reactions.length)], 'ai-msg', false);
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
}

function idleCheck() {
    setInterval(() => {
        if (Date.now() - lastActivity > 300000) {
            addMessage('You still there? Spin for some action!', 'ai-msg', false);
        }
    }, 60000);
}

function wealthTip() {
    const tips = [
        'Invest early, let it grow.',
        'Risk it for the biscuit.',
        'Cash is king, keep it flowing.',
        'Hire smart, win big.',
        'Buy low, chill high.'
    ];
    if (Math.random() < 0.1) addMessage(`Tip: ${tips[Math.floor(Math.random() * tips.length)]}`, 'ai-msg', false);
}

function saveChat() {
    localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
}

function loadChat() {
    const saved = localStorage.getItem('chatHistory');
    if (saved) {
        messageHistory = JSON.parse(saved);
        messageHistory.forEach(msg => addMessage(msg.content, msg.role === 'user' ? 'user-msg' : 'ai-msg', false));
    }
}

function autoSpinOnLoad() {
    if (!currentAI) {
        setTimeout(() => {
            if (spinBtn && spinnerOverlay) {
                spinForAI();
            } else {
                console.error('Spin elements not ready for auto-spin');
            }
        }, 500); // Delay to ensure DOM is fully interactive
    }
}

function messageFadeIn() {
    const messages = document.querySelectorAll('.chat-msg');
    messages.forEach((msg, index) => {
        msg.style.opacity = '0';
        setTimeout(() => {
            msg.style.transition = 'opacity 0.3s ease';
            msg.style.opacity = '1';
        }, index * 100);
    });
}

// Additional Features
function copyLastMessage() {
    const lastMsg = messageHistory[messageHistory.length - 1]?.content;
    if (lastMsg) {
        navigator.clipboard.writeText(lastMsg);
        showNotification('Copied last message!');
    }
}

function clearChat() {
    chatBox.innerHTML = '';
    messageHistory = [];
    streakCount = 0;
    addMessage('Chat wiped. Fresh start!', 'ai-msg', false);
}

function typingIndicator() {
    userInput.addEventListener('input', () => {
        if (userInput.value) addTypingSound();
    });
}

function soundToggle() {
    let muted = false;
    return function() {
        muted = !muted;
        [typeSound, sendSound, spinSound].forEach(sound => sound.muted = muted);
        showNotification(muted ? 'Sounds off' : 'Sounds on');
    };
}

const toggleSound = soundToggle();

function messageCount() {
    return messageHistory.length;
}

function streakReward() {
    if (streakCount === 10) addMessage('10-message streak! Here’s a virtual high-five ✋', 'ai-msg', false);
}

function autoScrollLock() {

}

function profilePeek() {
    profileBtn.addEventListener('mouseover', () => {
        if (currentAI) showProfile();
    });
    profileBtn.addEventListener('mouseout', closeProfile);
}

function timestampToggle() {
    let showTime = true;
    return function() {
        showTime = !showTime;
        return showTime;
    };
}

const toggleTimestamps = timestampToggle();

function quickReplies() {
    const replies = ['Cool!', 'No way!', 'Tell me more.', 'LOL'];
    if (Math.random() < 0.05) addMessage(replies[Math.floor(Math.random() * replies.length)], 'ai-msg', false);
}

document.addEventListener('DOMContentLoaded', () => {
    // Assuming userInput is already grabbed via getElementById
    userInput.setAttribute('enterkeyhint', 'send');
    userInput.setAttribute('placeholder', 'Type a message...');
    userInput.setAttribute('rows', '1');
});

// Event Listeners
function initializeEventListeners() {
    spinBtn.addEventListener('click', () => {
        spinForAI();
        wealthTip();
    });
    profileBtn.addEventListener('click', showProfile);
    sendBtn.addEventListener('click', () => {
        sendMessage();
        saveChat();
    });
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
            saveChat();
        }
    });
    userInput.addEventListener('input', autoResizeTextarea);
    themeBtn.addEventListener('click', toggleTheme);
    closeModal.addEventListener('click', closeProfile);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProfile();
        if (e.ctrlKey && e.key === 'c') copyLastMessage();
        if (e.ctrlKey && e.key === 'm') toggleSound();
        if (e.ctrlKey && e.key === 't') addMessage(`Messages: ${messageCount()}`, 'ai-msg', false);
        if (e.ctrlKey && e.key === 'r') clearChat();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check all DOM elements before proceeding
    if (!chatBox || !spinBtn || !profileBtn || !themeBtn || !userInput || !sendBtn || 
        !spinnerOverlay || !profileModal || !closeModal || !aiName || !aiBio || 
        !aiAvatar || !aiNetWorth || !aiIndustry || !typeSound || !sendSound || !spinSound) {
        console.error('Missing DOM elements');
        return;
    }
    
    // Initialize listeners and features
    initializeEventListeners();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark');
    loadChat();
    autoSpinOnLoad(); // Call auto-spin with delay
    idleCheck();
    autoScrollLock();
    messageFadeIn();
});

// Additional Styles for New Features
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 10px 20px;
        background: #0095f6;
        color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.2s;
    }
    .chat-msg-container {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .chat-msg-container .user-msg {
        align-self: flex-end;
    }
    .chat-msg strong {
        font-weight: 700;
    }
    .chat-msg em {
        font-style: italic;
    }
    .chat-msg code {
        background: #e0e0e0;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: monospace;
    }
    body.dark .chat-msg code {
        background: #444;
    }
    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 5px 10px;
        border-radius: 8px;
        transition: background 0.2s ease;
    }
    .nav-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #0095f6;
    }
    .name-and-status-container {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .nav-name {
        font-size: 18px;
        font-weight: 600;
        color: #1a1a1a;
        transition: color 0.3s ease;
    }
    body.dark .nav-name {
        color: #e6e6e6;
    }
    .nav-status {
        font-size: 12px;
        color: #00cc00;
        font-weight: 500;
        margin-top: -4px;
    }
    .timestamp {
        font-size: 12px;
        color: #8e8e8e;
        margin-top: 4px;
    }
    .user-timestamp {
        align-self: flex-end; /* Moves user timestamp to the right */
    }
    .ai-timestamp {
        align-self: flex-start; /* Keeps AI timestamp on the left */
    }
    body.dark .nav-status {
        color: #00ff00;
    }
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);


