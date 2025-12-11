// components2/sidebar.js
class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // 開啟 Shadow DOM
    }

    connectedCallback() {
        // 1. 取得外部傳入的屬性，決定要抓哪個 JSON
        // 用法: <app-sidebar data-source="courses"></app-sidebar>
        const sourceType = this.getAttribute('data-source') || 'courses';
        this.renderStyles();
        this.init(sourceType);
    }

    renderStyles() {
        // 由於 Shadow DOM 隔離了外部 CSS (Bootstrap)，我們需要在這裡寫入側邊欄專用的基本樣式
        // 或者匯入 Bootstrap (較耗效能)，這裡採用手寫輕量樣式以模擬 Bootstrap 風格
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .card {
                    border: 1px solid rgba(0,0,0,.125);
                    border-radius: 0.25rem;
                    background-color: #fff;
                    overflow: hidden;
                }
                .card-header {
                    padding: 0.75rem 1.25rem;
                    margin-bottom: 0;
                    background-color: #162B4E; /* 譯德深藍 */
                    color: white;
                    font-weight: bold;
                    border-bottom: 1px solid rgba(0,0,0,.125);
                }
                .list-group {
                    display: flex;
                    flex-direction: column;
                    padding-left: 0;
                    margin-bottom: 0;
                }
                .list-group-item {
                    position: relative;
                    display: block;
                    padding: 0.75rem 1.25rem;
                    color: #212529;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid rgba(0,0,0,.125);
                    border-top: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .list-group-item:hover {
                    background-color: #f8f9fa;
                    color: #F2AC3E; /* 譯德金黃 */
                    padding-left: 1.5rem; /* 滑動效果 */
                }
                .list-group-item.active {
                    z-index: 2;
                    color: #fff;
                    background-color: #F2AC3E;
                    border-color: #F2AC3E;
                }
            </style>
            <div class="card">
                <div class="card-header">
                    分類篩選
                </div>
                <div class="list-group" id="category-list">
                    <div style="padding:20px; text-align:center; color:#999;">載入中...</div>
                </div>
            </div>
        `;
    }

    async init(sourceType) {
        // 2. 根據類型決定要讀取的檔案與欄位 [cite: 53-57]
        let jsonPath = '';
        let categoryField = '';

        switch (sourceType) {
            case 'courses':
                jsonPath = 'data/courses.json';
                categoryField = 'category'; // courses.json 用 category 分類
                break;
            case 'teachers':
                jsonPath = 'data/teachers.json';
                categoryField = 'subject';  // teachers.json 用 subject 分類
                break;
            case 'news':
                jsonPath = 'data/news.json';
                categoryField = 'category';
                break;
            default:
                console.error('Unknown source type');
                return;
        }

        try {
            // 3. 抓取資料
            const response = await fetch(jsonPath);
            const data = await response.json();

            // 4. 提煉分類 (使用 Set 過濾重複) 
            const categories = new Set(data.map(item => item[categoryField]));

            // 5. 渲染按鈕
            this.renderCategories(['全部', ...categories]); // 前面補一個「全部」

        } catch (error) {
            console.error('Sidebar load error:', error);
            this.shadowRoot.getElementById('category-list').innerHTML =
                '<div style="padding:10px; color:red;">載入失敗</div>';
        }
    }

    renderCategories(categories) {
        const listContainer = this.shadowRoot.getElementById('category-list');
        listContainer.innerHTML = '';

        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `list-group-item list-group-item-action ${index === 0 ? 'active' : ''}`; // 預設第一個(全部)為啟用
            btn.textContent = cat;

            // 6. 綁定點擊事件 [cite: 59-60]
            btn.addEventListener('click', (e) => {
                // 移除其他人的 active
                this.shadowRoot.querySelectorAll('.list-group-item').forEach(b => b.classList.remove('active'));
                // 自己加上 active
                e.target.classList.add('active');

                // ★ 發送 CustomEvent 給父層
                // composed: true 讓事件能穿透 Shadow DOM 冒泡出去
                this.dispatchEvent(new CustomEvent('filter-select', {
                    detail: { category: cat },
                    bubbles: true,
                    composed: true
                }));
            });

            listContainer.appendChild(btn);
        });
    }
}

customElements.define('app-sidebar', Sidebar);