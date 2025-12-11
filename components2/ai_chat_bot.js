// components2/ai_chat_bot.js
class AiChatBot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            /* 引入 Font Awesome (需要從外部透過 @import 引入，或直接使用 SVG) 
               由於 Shadow DOM 特性，外部 CSS 進不來，這裡簡單用 CSS 畫一個圓形按鈕代替圖示
            */
            :host {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 9999;
                font-family: "Microsoft JhengHei", sans-serif;
            }

            /* 懸浮按鈕 (Toggle Button) */
            .chat-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #F2AC3E; /* 譯德金黃 */
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.3s;
            }
            .chat-btn:hover {
                transform: scale(1.1);
            }
            .chat-btn img {
                width: 35px;
                height: 35px;
            }

            /* 對話視窗 (Chat Window) */
            .chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 450px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                display: none; /* 預設隱藏 */
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #ddd;
            }
            
            /* 顯示狀態 */
            .chat-window.show {
                display: flex;
                animation: popUp 0.3s ease-out;
            }

            /* 標題列 */
            .chat-header {
                background-color: #162B4E; /* 譯德深藍 */
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
            }

            /* 訊息內容區 */
            .chat-body {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                background-color: #f8f9fa;
            }
            .message {
                margin-bottom: 10px;
                max-width: 80%;
                padding: 10px 15px;
                border-radius: 15px;
                font-size: 0.95rem;
                line-height: 1.4;
            }
            .message.bot {
                background-color: #e9ecef;
                color: #333;
                align-self: flex-start;
                border-bottom-left-radius: 2px;
            }
            .message.user {
                background-color: #162B4E;
                color: white;
                align-self: flex-end;
                margin-left: auto; /* 靠右對齊關鍵 */
                border-bottom-right-radius: 2px;
            }

            /* 輸入區 */
            .chat-footer {
                padding: 10px;
                border-top: 1px solid #eee;
                display: flex;
                gap: 5px;
            }
            input {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 20px;
                outline: none;
            }
            button.send-btn {
                background-color: #162B4E;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 20px;
                cursor: pointer;
            }

            @keyframes popUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>

        <button class="chat-btn" id="toggleBtn">
            <span style="font-size:24px; color:#fff;">💬</span>
        </button>

        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <span>譯德 AI 助教</span>
                <button class="close-btn" id="closeBtn">✕</button>
            </div>
            <div class="chat-body" id="chatBody">
                <div class="message bot">
                    您好！我是譯德補習班的 AI 助教。請問有什麼關於課程或升學的問題可以幫您嗎？
                </div>
            </div>
            <div class="chat-footer">
                <input type="text" id="chatInput" placeholder="請輸入問題...">
                <button class="send-btn" id="sendBtn">送出</button>
            </div>
        </div>
        `;
    }

    setupEvents() {
        const toggleBtn = this.shadowRoot.getElementById('toggleBtn');
        const closeBtn = this.shadowRoot.getElementById('closeBtn');
        const sendBtn = this.shadowRoot.getElementById('sendBtn');
        const input = this.shadowRoot.getElementById('chatInput');
        const windowEl = this.shadowRoot.getElementById('chatWindow');

        // 開關視窗
        const toggleChat = () => {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                windowEl.classList.add('show');
            } else {
                windowEl.classList.remove('show');
            }
        };

        toggleBtn.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        // 發送訊息
        const sendMessage = async () => {
            const text = input.value.trim();
            if (!text) return;

            // 1. 顯示使用者訊息
            this.addMessage(text, 'user');
            input.value = '';

            // 2. 顯示 Loading
            const loadingId = this.addMessage('AI 正在思考中...', 'bot');

            // 3. 呼叫模擬 API
            const response = await this.mockGeminiAPI(text);

            // 4. 更新回應
            this.updateMessage(loadingId, response);
        };

        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    addMessage(text, type) {
        const chatBody = this.shadowRoot.getElementById('chatBody');
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.textContent = text;

        // 給一個隨機 ID 方便之後更新 (針對 Loading)
        const id = 'msg-' + Date.now();
        div.id = id;

        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight; // 捲動到底部
        return id;
    }

    updateMessage(id, newText) {
        const el = this.shadowRoot.getElementById(id);
        if (el) el.textContent = newText;
    }

    // 模擬 Gemini API 回應 [cite: 67]
    async mockGeminiAPI(prompt) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (prompt.includes('課程')) return resolve('我們提供國高中全科輔導，您可以參考「熱門課程」頁面喔！');
                if (prompt.includes('費用')) return resolve('課程費用依年級與科目不同，建議您直接預約試聽，會有專人為您說明。');
                if (prompt.includes('地址')) return resolve('我們位於台北市某某區某某路123號。');
                resolve(`關於「${prompt}」，我建議您直接聯繫我們的行政櫃台 (02) 1234-5678 以獲得最準確的資訊。`);
            }, 1000);
        });
    }
}
customElements.define('ai-chat-bot', AiChatBot);