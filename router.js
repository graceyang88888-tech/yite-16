// router.js
import './pages/home_page.js';
import './pages/about_page.js';
import './pages/news_page.js';
import './pages/course_page.js';
import './pages/teacher_page.js';
import './pages/article_page.js'; // ★ 新增引入
import './pages/contact_page.js';

const routes = {
    '/': { title: '首頁', component: '<home-page></home-page>' },
    '/about': { title: '關於我們', component: '<about-page></about-page>' },
    '/news': { title: '最新消息', component: '<news-page></news-page>' },
    '/courses': { title: '熱門課程', component: '<course-page></course-page>' },
    '/teachers': { title: '師資介紹', component: '<teacher-page></teacher-page>' },
    '/articles': { title: '升學專欄', component: '<article-page></article-page>' },
    '/contact': { title: '聯絡我們', component: '<contact-page></contact-page>' }
};

function router() {
    let path = location.hash.slice(1) || '/';
    const route = routes[path] || { title: '404', component: '<h1 class="text-center mt-5">404 找不到頁面</h1>' };

    document.getElementById('app').innerHTML = route.component;
    document.title = `譯德補習班 | ${route.title}`;
    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);