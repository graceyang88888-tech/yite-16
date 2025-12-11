// pages/home_page.js
export default class HomePage extends HTMLElement {
    async connectedCallback() {
        // 1. 建立基本 HTML 結構 (Hero + About + News)
        this.innerHTML = `
            <section class="hero-section">
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <h1 class="display-3 fw-bold mb-4">譯德文理補習班</h1>
                    <p class="lead mb-4 fs-4">專注升學．精緻教學．成就未來</p>
                    <a href="#/courses" class="btn btn-warning btn-lg px-5 py-3 fw-bold">查看熱門課程</a>
                </div>
            </section>

            <section class="py-5">
                <div class="container py-5">
                    <div class="row align-items-center">
                        <div class="col-lg-6 mb-4 mb-lg-0">
                            <img src="images/2.jpg" class="img-fluid rounded shadow" alt="關於我們" 
                                 onerror="this.src='https://placehold.co/600x400?text=About+Image'">
                        </div>
                        <div class="col-lg-6">
                            <h2 class="fw-bold mb-4" style="color: var(--yite-blue);">關於譯德</h2>
                            <p class="lead text-muted">我們擁有超過十年的辦學經驗，堅持小班制教學，確保每一位學生都能獲得最充分的關注。</p>
                            <p class="mb-4">從國小基礎班到高中衝刺班，譯德擁有完整的升學輔導體系...</p>
                            <a href="#/about" class="btn btn-outline-primary">了解更多 <i class="fas fa-arrow-right ms-2"></i></a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="parallax-section">
                <div class="parallax-overlay"></div>
                <div class="container position-relative z-1 text-center">
                    <h2 class="fw-bold mb-3">加入譯德，預約成功</h2>
                    <p class="lead mb-4">現在報名試聽，即可獲得免費學力檢測乙次</p>
                    <a href="#/contact" class="btn btn-light btn-lg text-primary fw-bold">立即預約試聽</a>
                </div>
            </section>

            <section class="py-5 bg-light">
                <div class="container py-5">
                    <div class="text-center mb-5">
                        <h2 class="fw-bold" style="color: var(--yite-blue);">最新消息</h2>
                        <div style="width: 60px; height: 3px; background: var(--yite-gold); margin: 20px auto;"></div>
                    </div>
                    
                    <div id="news-container" class="row g-4">
                        <div class="text-center py-5">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center mt-5">
                        <a href="#/news" class="btn btn-primary px-4">查看所有消息</a>
                    </div>
                </div>
            </section>
        `;

        // 2. 執行資料抓取
        await this.loadNews();
    }

    // 使用 fetch 抓取資料 [cite: 100, 106]
    async loadNews() {
        try {
            const response = await fetch('data/news.json');
            const data = await response.json();

            // 只取前 3 筆 [cite: 100]
            const latestNews = data.slice(0, 3);

            const container = this.querySelector('#news-container');
            if (latestNews.length === 0) {
                container.innerHTML = '<p class="text-center">目前沒有最新消息</p>';
                return;
            }

            // 產生 HTML
            container.innerHTML = latestNews.map(item => `
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm hover-top">
                        <div class="card-body p-4">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge bg-warning text-dark">${item.category}</span>
                                <small class="text-muted">${item.date}</small>
                            </div>
                            <h5 class="card-title fw-bold mb-3">
                                <a href="#/news" class="text-decoration-none text-dark stretched-link">${item.title}</a>
                            </h5>
                            <p class="card-text text-muted text-truncate-2">${item.summary}</p>
                        </div>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Error loading news:', error);
            this.querySelector('#news-container').innerHTML =
                '<p class="text-center text-danger">無法載入最新消息，請稍後再試。</p>';
        }
    }
}

// 定義 Web Component
customElements.define('home-page', HomePage);