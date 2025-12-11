// components1/header.js - 最終完整版
class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header id="main-header">
            <div class="container" style="background: #fff;">
                <div class="row align-items-center">
                    
                    <div class="col-6 col-lg-3">
                        <a class="navbar-brand" href="#/">
                            <img src="images/yite_logo.png" alt="譯德補習班" class="img-fluid logo-img">
                        </a>
                    </div>

                    <div class="col-6 col-lg-9">
                        
                        <div class="d-flex justify-content-end d-lg-none">
                            <button class="navbar-toggler btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                                <i class="fas fa-bars"></i>
                            </button>
                        </div>

                        <div class="header-right-stack d-none d-lg-flex flex-column align-items-end justify-content-center">
                            
                            <div class="header-search-box mb-2">
                                <form class="d-flex">
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-sm" placeholder="搜尋課程...">
                                        <button class="btn btn-warning btn-sm text-white" type="button"><i class="fas fa-search"></i></button>
                                    </div>
                                </form>
                            </div>

                            <nav class="main-nav">
                                <ul class="nav">
                                    <li class="nav-item"><a class="nav-link" href="#/">首頁</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#/about">關於我們</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#/news">最新消息</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#/courses">熱門課程</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#/teachers">師資介紹</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#/articles">升學專欄</a></li>
                                    <li class="nav-item"><a class="nav-link" href="#/contact">聯絡我們</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">選單</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                         <li class="nav-item"><a class="nav-link" href="#/">首頁</a></li>
                         <li class="nav-item"><a class="nav-link" href="#/about">關於我們</a></li>
                         <li class="nav-item"><a class="nav-link" href="#/news">最新消息</a></li>
                         <li class="nav-item"><a class="nav-link" href="#/courses">熱門課程</a></li>
                         <li class="nav-item"><a class="nav-link" href="#/teachers">師資介紹</a></li>
                         <li class="nav-item"><a class="nav-link" href="#/contact">聯絡我們</a></li>
                    </ul>
                </div>
            </div>
        </header>
        `;

        this.initStickyEffect();
        this.initAutoCloseMenu();
    }

    // 滾動偵測
    initStickyEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        });
    }

    // 手機版選單自動關閉
    initAutoCloseMenu() {
        const offcanvasEl = this.querySelector('#offcanvasNavbar');
        const navLinks = offcanvasEl ? offcanvasEl.querySelectorAll('.nav-link') : [];

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (bsOffcanvas) bsOffcanvas.hide();
            });
        });
    }
}
customElements.define('app-header', Header);