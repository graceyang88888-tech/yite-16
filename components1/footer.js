// components1/footer.js
class Footer extends HTMLElement {
    connectedCallback() {
        // Light DOM [cite: 47]
        this.innerHTML = `
        <footer class="text-center text-lg-start">
            <div class="container p-4">
                <div class="row">
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 class="text-uppercase">譯德文理補習班</h5>
                        <p class="text-light">
                            專注於升學教育，提供最優質的師資與學習環境。<br>
                            地址：台北市某某區某某路123號<br>
                            電話：(02) 1234-5678
                        </p>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">快速連結</h5>
                        <ul class="list-unstyled mb-0">
                            <li><a href="#/courses">熱門課程</a></li>
                            <li><a href="#/teachers">師資陣容</a></li>
                            <li><a href="#/news">最新消息</a></li>
                            <li><a href="#/articles">升學專欄</a></li>
                            <li><a href="#/contact">聯絡我們</a></li>
                        </ul>
                    </div>

                    <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 class="text-uppercase">關注我們</h5>
                        <a href="#" class="me-4 text-reset"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="me-4 text-reset"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="me-4 text-reset"><i class="fab fa-line"></i></a>
                    </div>
                </div>
            </div>
            <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
                © 2025 Copyright: 譯德文教集團
            </div>
        </footer>
        `;
    }
}
customElements.define('app-footer', Footer);