export function Chat() {
    const html = `
      <div id="chat-window">
        <div id="chat-header">Чат</div>
        <div id="chat-messages"></div>
        <input type="text" id="chat-input" placeholder="Задайте вопрос...">
      </div>
      <div>
        <div class="yButtonWave" style="border-color: rgba(172, 142, 88, 0.849); color: rgba(172, 142, 88, 0.849);"></div>
        <div>
          <button id="btn_mainr" class="my-btn">Задать вопрос</button>
        </div>
      </div>
    `;
  
    async function loadDB() {
      const response = await fetch('./db/questions.json');
      const db = await response.json();
      return db;
    }
  
    function initializeChatScripts(container) {
      console.log("[Chat Init] 🚀 Инициализация скриптов чата...");
  
      if (!container) {
        console.error("[Chat Init] ❌ Контейнер для инициализации чата не передан!");
        return;
      }
      console.log("[Chat Init] Инициализация в контейнере:", container);
  
      const chatButton = container.querySelector('#btn_mainr');
      const chatWindow = container.querySelector('#chat-window');
      const chatInput = container.querySelector('#chat-input');
      const chatMessages = container.querySelector('#chat-messages');
  
      if (!chatButton) console.error("[Chat Init] ❌ Кнопка чата #btn_mainr не найдена ВНУТРИ контейнера!");
      if (!chatWindow) console.error("[Chat Init] ❌ Окно чата #chat-window не найдено ВНУТРИ контейнера!");
      if (!chatInput) console.error("[Chat Init] ❌ Поле ввода #chat-input не найдено ВНУТРИ контейнера!");
      if (!chatMessages) console.error("[Chat Init] ❌ Контейнер сообщений #chat-messages не найден ВНУТРИ контейнера!");
  
      if (!chatButton || !chatWindow || !chatInput || !chatMessages) {
        console.error("[Chat Init] 🛑 Инициализация чата прервана из-за отсутствия элементов.");
        return;
      }
  
      console.log("[Chat Init] ✅ Все элементы чата найдены внутри контейнера.");
  
      const storageKey = 'chatHistory';
      let messages = [];
  
      function loadChatHistory() {
        const savedHistory = localStorage.getItem(storageKey);
        console.log("[Chat Load] Сырые данные из хранилища:", savedHistory);
        if (savedHistory) {
          try {
            messages = JSON.parse(savedHistory);
            console.log("[Chat Load] Распарсенные сообщения:", JSON.stringify(messages));
            console.log(`[Chat Load] Загружено ${messages.length} сообщений.`);
  
            chatMessages.innerHTML = '';
  
            messages.forEach(msg => {
              addMessage(msg.sender, msg.text, false);
            });
          } catch (e) {
            console.error("[Chat Load] ❌ Ошибка парсинга истории чата. Данные:", savedHistory, "Ошибка:", e);
            messages = [];
            localStorage.removeItem(storageKey);
          }
        } else {
          console.log("[Chat Load] История чата в localStorage не найдена.");
        }
      }
  
      function saveChatHistory() {
        console.log(`[Chat Save] Попытка сохранить ${messages.length} сообщений. Текущий массив:`, JSON.stringify(messages));
        try {
          localStorage.setItem(storageKey, JSON.stringify(messages));
          console.log("[Chat Save] ✅ История чата успешно сохранена.");
        } catch (e) {
          console.error("[Chat Save] ❌ Ошибка сохранения истории чата в localStorage:", e);
        }
      }
  
      chatButton.addEventListener('click', () => {
        const isHidden = chatWindow.style.display === 'none' || chatWindow.style.display === '';
        chatWindow.style.display = isHidden ? 'block' : 'none';
        console.log(`[Chat Button Click] Окно чата ${isHidden ? 'открыто' : 'закрыто'}.`);
        if (isHidden) {
          chatInput.focus();
          autoScroll();
        }
      });
  
      chatInput.addEventListener('keypress', async (event) => {
        if (event.key === 'Enter') {
          const messageText = chatInput.value.trim();
          if (messageText !== '') {
            addMessage('user', messageText);
            chatInput.value = '';
            autoScroll();
  
            const aiResponse = await generateAIResponse(messageText);
            addMessage('ai', aiResponse);
            autoScroll();
          }
        }
      });
  
      function addMessage(sender, text, save = true) {
        console.log(`[Chat AddMessage] Вызвана с sender=${sender}, save=${save}, text="${text}"`);
  
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
  
        const icon = document.createElement('img');
        if (sender === 'user') {
          icon.src = '../image/user-icon.png';
          icon.className = 'user-icon chat-icon';
          icon.alt = 'User';
        } else {
          icon.src = '../image/ai-icon.png';
          icon.className = 'ai-icon chat-icon';
          icon.alt = 'AI';
        }
        messageElement.appendChild(icon);
  
        const textElement = document.createElement('div');
        textElement.className = 'message-text';
        textElement.textContent = text;
        messageElement.appendChild(textElement);
  
        if (chatMessages) {
          chatMessages.appendChild(messageElement);
  
          if (save) {
            const newMessage = { sender: sender, text: text };
            messages.push(newMessage);
            console.log("[Chat AddMessage] Сообщение добавлено в массив. Вызываю saveChatHistory...");
            saveChatHistory();
          }
        } else {
          console.error("[Chat AddMessage] ❌ Не удалось добавить сообщение: элемент chatMessages не найден.");
        }
      }
  
      function sanitizeInput(input) {
        return input.replace(/[^\w\s,.!?а-яА-ЯёЁ]/g, '');
      }
  
      async function generateAIResponse(userMessage) {
        const db = await loadDB();
        if (!db.questions || !Array.isArray(db.questions) || !db.smallTalk || !Array.isArray(db.smallTalk)) {
          console.error('Ошибка: не удалось загрузить данные');
          return 'Ошибка: не удалось загрузить данные';
        }
  
        const sanitizedMessage = sanitizeInput(userMessage);
  
        const allEntries = [...db.questions.map(q => ({ input: q.question, response: q.answer })), ...db.smallTalk];
  
        const match = allEntries.find(entry => entry.input.toLowerCase().includes(sanitizedMessage.toLowerCase()));
        if (match) {
          return match.response;
        }
  
        return 'Я пока учусь. Попробуйте переформулировать ваш вопрос.';
      }
  
      function autoScroll() {
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }
  
      loadChatHistory();
      autoScroll();
  
      console.log("[Chat Init] ✅ Инициализация скриптов чата завершена.");
    }
  
    return {
      html: html,
      init: initializeChatScripts
    };
  }
  