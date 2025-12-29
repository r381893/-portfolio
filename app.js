/**
 * Portfolio 主程式
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projects-container');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // 渲染專案卡片
    function renderProjects(filter = 'all') {
        container.innerHTML = '';

        const filteredProjects = filter === 'all'
            ? projects
            : projects.filter(p => p.type === filter);

        filteredProjects.forEach(project => {
            const card = createProjectCard(project);
            container.appendChild(card);
        });
    }

    // 建立單張卡片
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card ${project.isPlaceholder ? 'placeholder' : ''}`;

        if (!project.isPlaceholder && project.url) {
            card.onclick = () => window.open(project.url, '_blank');
        }

        const tagClass = project.type;
        const tagText = project.type === 'pwa' ? 'PWA'
            : project.type === 'streamlit' ? 'Streamlit'
                : '即將推出';

        card.innerHTML = `
            <div class="card-header">
                <span class="card-icon">${project.icon}</span>
                <h3 class="card-title">${project.name}</h3>
            </div>
            <p class="card-description">${project.description}</p>
            <div class="card-footer">
                <span class="card-tag ${tagClass}">${tagText}</span>
                ${project.repo && !project.isPlaceholder ? `
                    <a class="card-link" href="${project.repo}" target="_blank" onclick="event.stopPropagation()">
                        GitHub →
                    </a>
                ` : ''}
            </div>
        `;

        return card;
    }

    // 篩選按鈕事件
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });

    // 初始渲染
    renderProjects();
});
