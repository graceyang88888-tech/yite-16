// pages/teacher_page.js
import '../components2/sidebar.js';

export default class TeacherPage extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
            <div class="container py-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bold" style="color: var(--yite-blue);">師資陣容</h2>
                    <p class="text-muted">嚴選頂尖名師，引領學子邁向成功</p>
                </div>
                
                <div class="page-grid">
                    
                    <aside class="sidebar-area">
                        <app-sidebar data-source="teachers"></app-sidebar>
                    </aside>

                    <main class="content-area">
                        <div id="teacher-list" class="row g-4">
                            <div class="text-center">載入師資中...</div>
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

        this.allTeachers = [];
        await this.loadTeachers();

        // 監聽側邊欄篩選
        this.addEventListener('filter-select', (e) => {
            this.filterTeachers(e.detail.category);
        });
    }

    async loadTeachers() {
        try {
            const response = await fetch('data/teachers.json');
            this.allTeachers = await response.json();
            this.renderTeachers(this.allTeachers);
        } catch (error) {
            console.error('Loading teachers failed:', error);
        }
    }

    filterTeachers(category) {
        if (category === '全部') {
            this.renderTeachers(this.allTeachers);
        } else {
            const filtered = this.allTeachers.filter(t => t.subject === category);
            this.renderTeachers(filtered);
        }
    }

    renderTeachers(teachers) {
        const container = this.querySelector('#teacher-list');
        if (teachers.length === 0) {
            container.innerHTML = '<div class="col-12 text-center text-muted">此分類尚無教師資料</div>';
            return;
        }

        container.innerHTML = teachers.map(t => `
            <div class="col-md-6 fade-in">
                <div class="card border-0 shadow-sm h-100 text-center p-3">
                    <div class="card-body">
                        <img src="${t.image}" class="rounded-circle mb-3 border border-3 border-light shadow-sm" 
                             alt="${t.name}" 
                             style="width: 150px; height: 150px; object-fit: cover;"
                             onerror="this.src='https://placehold.co/150x150?text=Teacher'">
                        
                        <h5 class="card-title fw-bold mb-1" style="color: var(--yite-blue);">${t.name} <small class="text-muted fs-6">${t.title}</small></h5>
                        <div class="badge bg-warning text-dark mb-3">${t.subject}</div>
                        <p class="card-text text-muted small">${t.intro}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

customElements.define('teacher-page', TeacherPage);