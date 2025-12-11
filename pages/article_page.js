// pages/article_page.js
export default class ArticlePage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
            <div class="container py-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bold" style="color: var(--yite-blue);">升學專欄</h2>
                    <p class="text-muted">提供最新的教育趨勢與學習心法</p>
                </div>
                
                <div id="article-list" class="row g-4">
                    <div class="text-center">載入文章中...</div>
                </div>
            </div>
        `;

        await this.loadArticles();

        // 綁定 AI 摘要按鈕事件 (Event Delegation)
        this.addEventListener('click', (e) => {
            if (e.target.closest('.btn-ai-summary')) {
                const btn = e.target.closest('.btn-ai-summary');
                this.handleAiSummary(btn);
            }
        });
    }

    async loadArticles() {
        try {
            const response = await fetch('data/articles.json');
            const articles = await response.json();
            this.renderArticles(articles);
        } catch (error) {
            console.error('Error:', error);
            this.querySelector('#article-list').innerHTML = '<p class="text-center">暫無文章</p>';
        }
    }

    renderArticles(articles) {
        const container = this.querySelector('#article-list');
        container.innerHTML = articles.map(article => `
            <div class="col-lg-4 col-md-6">
                <div class="card h-100 border-0 shadow-sm">
                    <img src="${article.image}" class="card-img-top" alt="${article.title}">
                    <div class="card-body p-4">
                        <small class="text-muted d-block mb-2">${article.date} | ${article.author}</small>
                        <h5 class="card-title fw-bold mb-3" style="color: var(--yite-blue);">${article.title}</h5>
                        <p class="card-text text-muted text-truncate-3">${article.content}</p>
                        
                        <div class="mt-4">
                            <button class="btn btn-outline-warning w-100 btn-ai-summary" data-id="${article.id}">
                                <i class="fas fa-magic me-2"></i>AI 重點摘要
                            </button>
                        </div>

                        <div id="summary-${article.id}" class="alert alert-warning mt-3 d-none fade-in">
                            <h6 class="fw-bold"><i class="fas fa-robot"></i> Gemini 摘要：</h6>
                            <ul class="mb-0 small ps-3 summary-content">
                                <li>生成中...</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 模擬 Gemini 生成摘要的功能
    handleAiSummary(button) {
        const id = button.getAttribute('data-id');
        const summaryBox = this.querySelector(`#summary-${id}`);
        const summaryContent = summaryBox.querySelector('.summary-content');

        // 1. 顯示載入狀態
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>分析中...';
        summaryBox.classList.remove('d-none');

        // 2. 模擬 API 延遲 (1.5秒)
        setTimeout(() => {
            // 這裡模擬 Gemini 回傳的 3 點摘要
            summaryContent.innerHTML = `
                <li>本篇文章分析了 ${id} 的核心觀念。</li>
                <li>提供了具體的學習建議與執行步驟。</li>
                <li>適合家長與學生共同閱讀參考。</li>
            `;

            // 3. 恢復按鈕狀態
            button.innerHTML = '<i class="fas fa-check me-2"></i>摘要完成';
            button.classList.remove('btn-outline-warning');
            button.classList.add('btn-success', 'text-white');
        }, 1500);
    }
}

customElements.define('article-page', ArticlePage);