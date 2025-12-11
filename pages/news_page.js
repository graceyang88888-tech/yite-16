// pages/news_page.js
import '../components2/sidebar.js';

export default class NewsPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
            <div class="container py-5">
                <h2 class="text-center mb-5 fw-bold" style="color: var(--yite-blue);">最新消息</h2>
                
                <div class="page-grid">
                    <aside class="sidebar-area">
                        <app-sidebar data-source="news"></app-sidebar>
                    </aside>

                    <main class="content-area">
                        <div id="news-list" class="d-flex flex-column gap-4">
                            <div class="text-center">載入消息中...</div>
                        </div>
                    </main>
                </div>
            </div>
            
            <style>
                @media (min-width: 992px) {
                    .page-grid {
                        display: grid;
                        grid-template-columns: 280px minmax(0, 1fr);
                        gap: 30px;
                        align-items: start;
                    }
                }
                @media (max-width: 991px) {
                    .page-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                }
            </style>
        `;

        this.allNews = [];
        await this.loadNews();

        this.addEventListener('filter-select', (e) => {
            this.filterNews(e.detail.category);
        });

        // 綁定 AI 摘要按鈕事件 (使用事件委派)
        this.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-ai-summary')) {
                this.handleAiSummary(e.target);
            }
        });
    }

    async loadNews() {
        try {
            const response = await fetch('data/news.json');
            this.allNews = await response.json();
            this.renderNews(this.allNews);
        } catch (error) {
            console.error('Loading news failed:', error);
        }
    }

    filterNews(category) {
        if (category === '全部') {
            this.renderNews(this.allNews);
        } else {
            const filtered = this.allNews.filter(n => n.category === category);
            this.renderNews(filtered);
        }
    }

    renderNews(newsList) {
        const container = this.querySelector('#news-list');
        if (newsList.length === 0) {
            container.innerHTML = '<div class="text-center text-muted">無相關消息</div>';
            return;
        }

        // 使用列表式佈局 (List View)
        container.innerHTML = newsList.map(item => `
            <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-2">
                        <span class="badge bg-primary me-2">${item.category}</span>
                        <small class="text-muted">${item.date}</small>
                    </div>
                    <h4 class="card-title fw-bold mb-3">${item.title}</h4>
                    <p class="card-text">${item.summary}</p>
                    
                    <div class="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                        <button class="btn btn-outline-warning btn-sm btn-ai-summary" data-id="${item.id}">
                            <i class="fas fa-magic me-1"></i> AI 重點摘要
                        </button>
                        <button class="btn btn-link text-decoration-none p-0">閱讀更多 &rarr;</button>
                    </div>

                    <div id="summary-result-${item.id}" class="alert alert-warning mt-3 d-none">
                        <h6 class="alert-heading"><i class="fas fa-robot"></i> Gemini 摘要：</h6>
                        <ul class="mb-0 ps-3 small">
                            <li>正在生成摘要中...</li>
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 模擬 AI 摘要功能 (之後會換成真 API)
    handleAiSummary(button) {
        const id = button.getAttribute('data-id');
        const resultBox = this.querySelector(`#summary-result-${id}`);

        // 顯示結果區塊
        resultBox.classList.remove('d-none');

        // 模擬 Loading
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成中...';

        setTimeout(() => {
            // 這裡未來會接 Gemini API，目前先顯示假資料
            resultBox.querySelector('ul').innerHTML = `
                <li>重點一：本活動是針對 ${id} 號新聞的重點分析。</li>
                <li>重點二：透過 AI 快速抓取關鍵資訊。</li>
                <li>重點三：節省家長閱讀時間。</li>
            `;
            button.innerHTML = '<i class="fas fa-check"></i> 生成完畢';
        }, 1500);
    }
}

customElements.define('news-page', NewsPage);