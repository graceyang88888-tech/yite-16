// pages/contact_page.js
export default class ContactPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="container py-5">
                <h2 class="text-center mb-5 fw-bold" style="color: var(--yite-blue);">聯絡我們</h2>

                <div class="row g-5">
                    <div class="col-lg-6">
                        <div class="mb-4">
                            <h4 class="fw-bold mb-3">聯絡資訊</h4>
                            <p><i class="fas fa-map-marker-alt text-warning me-2"></i> 地址：台北市某某區某某路123號</p>
                            <p><i class="fas fa-phone text-warning me-2"></i> 電話：(02) 1234-5678</p>
                            <p><i class="fas fa-envelope text-warning me-2"></i> 信箱：info@yite.edu.tw</p>
                            <p><i class="fas fa-clock text-warning me-2"></i> 時間：週一至週五 14:00 - 22:00</p>
                        </div>

                        <div class="ratio ratio-16x9 shadow-sm border">
                            <iframe src="https://maps.google.com/maps?q=Taipei+101&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                                    style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="card border-0 shadow p-4">
                            <h4 class="fw-bold mb-4">預約試聽 / 諮詢</h4>
                            <form onsubmit="event.preventDefault(); alert('感謝您的填寫，我們將盡快聯繫您！');">
                                <div class="mb-3">
                                    <label for="name" class="form-label">學生姓名</label>
                                    <input type="text" class="form-control" id="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="phone" class="form-label">聯絡電話</label>
                                    <input type="tel" class="form-control" id="phone" required>
                                </div>
                                <div class="mb-3">
                                    <label for="grade" class="form-label">就讀年級</label>
                                    <select class="form-select" id="grade">
                                        <option selected>請選擇...</option>
                                        <option value="1">國一</option>
                                        <option value="2">國二</option>
                                        <option value="3">國三</option>
                                        <option value="4">高一</option>
                                        <option value="5">高二</option>
                                        <option value="6">高三</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="message" class="form-label">諮詢內容</label>
                                    <textarea class="form-control" id="message" rows="4"></textarea>
                                </div>
                                <button type="submit" class="btn btn-warning w-100 fw-bold text-white">送出表單</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('contact-page', ContactPage);