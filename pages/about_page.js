// pages/about_page.js
export default class AboutPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="bg-light py-5 mb-5">
                <div class="container text-center">
                    <h1 class="display-4 fw-bold" style="color: var(--yite-blue);">關於譯德</h1>
                    <p class="lead text-muted">教育不僅是知識的傳遞，更是生命的啟發</p>
                </div>
            </div>

            <div class="container mb-5">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <img src="images/2.jpg" class="img-fluid rounded shadow" alt="教學環境"
                             onerror="this.src='https://placehold.co/600x400?text=About+Image'">
                    </div>
                    <div class="col-lg-6">
                        <h3 class="fw-bold mb-3" style="color: var(--yite-blue);">我們的故事</h3>
                        <p class="text-muted">
                            譯德文理補習班成立於 2010 年，深耕在地教育十餘載。我們始終秉持著「因材施教」的理念，
                            不放棄任何一位學生。我們的創辦人相信，每個孩子都有屬於自己的光芒，
                            只要放在對的位置，就能發光發熱。
                        </p>
                        <p class="text-muted">
                            從早期的社區型家教班，發展至今成為擁有完整升學體系的專業補習班，
                            我們堅持小班制教學，確保師生之間的緊密互動。
                        </p>
                    </div>
                </div>
            </div>

            <section class="parallax-section mb-5">
                <div class="parallax-overlay"></div>
                <div class="container position-relative z-1 text-center">
                    <h2 class="fw-bold mb-3 text-white">堅持品質，成就卓越</h2>
                    <p class="lead text-white-50">每一年，我們都在刷新榜單紀錄</p>
                </div>
            </section>

            <div class="container py-5">
                <div class="row text-center g-4">
                    <div class="col-md-4">
                        <div class="p-4 bg-white shadow-sm rounded h-100 border-top border-5 border-primary">
                            <div class="fs-1 text-primary mb-3"><i class="fas fa-chalkboard-teacher"></i></div>
                            <h4 class="fw-bold">專業師資</h4>
                            <p class="text-muted">100% 本科系畢業，定期教學研討，掌握最新升學趨勢。</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-4 bg-white shadow-sm rounded h-100 border-top border-5 border-warning">
                            <div class="fs-1 text-warning mb-3"><i class="fas fa-user-graduate"></i></div>
                            <h4 class="fw-bold">分級教學</h4>
                            <p class="text-muted">依據程度分班，提供資優培訓與補救教學，讓學習更有效率。</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-4 bg-white shadow-sm rounded h-100 border-top border-5 border-success">
                            <div class="fs-1 text-success mb-3"><i class="fas fa-tablet-alt"></i></div>
                            <h4 class="fw-bold">數位輔助</h4>
                            <p class="text-muted">導入 AI 學習歷程分析與線上補課系統，學習不中斷。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('about-page', AboutPage);