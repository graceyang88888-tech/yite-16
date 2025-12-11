// pages/course_page.js
import '../components2/sidebar.js'; // 引入 Sidebar 元件

export default class CoursePage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
            <div class="container py-5">
                <h2 class="text-center mb-5 fw-bold" style="color: var(--yite-blue);">熱門課程</h2>
                
                <div class="page-grid">
                    
                    <aside class="sidebar-area">
                        <app-sidebar data-source="courses"></app-sidebar>
                    </aside>

                    <main class="content-area">
                        <div id="course-list" class="row g-4">
                            <div class="text-center">載入課程中...</div>
                        </div>
                    </main>

                </div>
            </div>
            
            <style>
                /* Desktop: 左側固定 280px，右側自適應 */
                @media (min-width: 992px) {
                    .page-grid {
                        display: grid;
                        grid-template-columns: 280px minmax(0, 1fr); /* [cite: 62] */
                        gap: 30px;
                        align-items: start;
                    }
                }
                
                /* Mobile: 上下排列 */
                @media (max-width: 991px) {
                    .page-grid {
                        display: grid;
                        grid-template-columns: 1fr; /* [cite: 63] */
                        gap: 30px;
                    }
                }
            </style>
        `;

        // 載入所有課程資料
        this.allCourses = [];
        await this.loadCourses();

        // ★ 監聽側邊欄的篩選事件 
        this.addEventListener('filter-select', (e) => {
            const selectedCategory = e.detail.category;
            this.filterCourses(selectedCategory);
        });
    }

    async loadCourses() {
        try {
            const response = await fetch('data/courses.json'); // [cite: 105]
            this.allCourses = await response.json();
            this.renderCourses(this.allCourses); // 預設顯示全部
        } catch (error) {
            console.error('Loading courses failed:', error);
        }
    }

    filterCourses(category) {
        if (category === '全部') {
            this.renderCourses(this.allCourses);
        } else {
            const filtered = this.allCourses.filter(c => c.category === category);
            this.renderCourses(filtered);
        }
    }

    renderCourses(courses) {
        const container = this.querySelector('#course-list');
        if (courses.length === 0) {
            container.innerHTML = '<div class="col-12 text-center text-muted">此分類尚無課程</div>';
            return;
        }

        container.innerHTML = courses.map(course => `
            <div class="col-md-6 col-lg-6 fade-in">
                <div class="card h-100 shadow-sm border-0">
                    <div style="height: 200px; overflow: hidden;">
                        <img src="${course.image}" class="card-img-top" alt="${course.name}" 
                             style="object-fit: cover; height: 100%; width: 100%;"
                             onerror="this.src='https://placehold.co/600x400?text=Course'">
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-warning text-dark">${course.category}</span>
                            <small class="text-muted">${course.teacher}</small>
                        </div>
                        <h5 class="card-title fw-bold" style="color: var(--yite-blue);">${course.name}</h5>
                        <p class="card-text text-muted small">${course.desc}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0 pb-3">
                        <button class="btn btn-outline-primary w-100">課程詳情</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

customElements.define('course-page', CoursePage);