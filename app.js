/**
 * Portfolio 主程式 - Firebase 版本
 */

// 預設專案資料（首次使用時匯入）
const defaultProjects = [
    {
        name: "00631L 避險系統",
        description: "選擇權避險計算、情境分析、OCR 圖片辨識快速匯入部位",
        icon: "📊",
        type: "pwa",
        url: "https://r381893.github.io/00631L-Op-Pwa/",
        repo: "https://github.com/r381893/00631L-Op-Pwa",
        order: 1
    },
    {
        name: "蜘蛛網策略回測",
        description: "多條件交易策略回測系統，支援 RSI、MA、結構過濾器",
        icon: "🕸️",
        type: "pwa",
        url: "https://r381893.github.io/strategy-backtest-pwa/",
        repo: "https://github.com/r381893/strategy-backtest-pwa",
        order: 2
    },
    {
        name: "台50+2 80/20投資",
        description: "ETF 再平衡投資策略模擬，80/20 資產配置",
        icon: "💰",
        type: "pwa",
        url: "https://r381893.github.io/tw50-plus2-8020-pwa/",
        repo: "https://github.com/r381893/tw50-plus2-8020-pwa",
        order: 3
    },
    {
        name: "動火作業表單",
        description: "動火作業申請表單快速生成與匯出",
        icon: "🔥",
        type: "pwa",
        url: "https://r381893.github.io/hot-work-form/",
        repo: "https://github.com/r381893/hot-work-form",
        order: 4
    },
    {
        name: "高級回測系統 Pro",
        description: "支持現貨/期貨/加密貨幣、手續費與滑價模擬、每月再平衡",
        icon: "🚀",
        type: "local",
        url: "http://localhost:5173/strategy-backtest-pro/",
        repo: "https://github.com/r381893/strategy-backtest-pro",
        order: 5
    },
    {
        name: "ETF / 期貨策略回測平台",
        description: "ETF+期貨=各種模擬策略 (Streamlit Cloud)",
        icon: "⚖️",
        type: "streamlit",
        url: "https://etf-futures-strategy-backtesting-platform-v2-a6nsjvqgp3mq9u57p.streamlit.app/",
        repo: "https://github.com/r381893/ETF-Futures-Strategy-Backtesting-Platform-V2",
        order: 6
    }
];

let projects = [];
let currentFilter = 'all';
let isAdminOpen = false;
let editingId = null;

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projects-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const adminToggle = document.getElementById('adminToggle');
    const adminPanel = document.getElementById('adminPanel');
    const clearFormBtn = document.getElementById('clearForm');
    const projectIconSelect = document.getElementById('projectIcon');

    // 監聽 Firebase 資料變化
    projectsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            projects = Object.entries(data).map(([id, project]) => ({
                id,
                ...project
            })).sort((a, b) => (a.order || 999) - (b.order || 999));
        } else {
            // 首次使用，匯入預設資料
            initializeDefaultProjects();
            return;
        }
        renderProjects();
        renderAdminList();
    });

    // 初始化預設專案
    function initializeDefaultProjects() {
        defaultProjects.forEach((project, index) => {
            projectsRef.push({
                ...project,
                order: index + 1
            });
        });
    }

    // 渲染專案卡片
    function renderProjects() {
        container.innerHTML = '';

        const filteredProjects = currentFilter === 'all'
            ? projects
            : projects.filter(p => p.type === currentFilter);

        if (filteredProjects.length === 0) {
            container.innerHTML = '<div class="loading">尚無專案</div>';
            return;
        }

        filteredProjects.forEach(project => {
            const card = createProjectCard(project);
            container.appendChild(card);
        });
    }

    // 建立專案卡片
    function createProjectCard(project) {
        const card = document.createElement('div');
        const isPlaceholder = project.type === 'future' || !project.url;
        card.className = `project-card ${isPlaceholder ? 'placeholder' : ''}`;

        if (!isPlaceholder && project.url) {
            // 如果是本機專案，點擊時只提示，不跳轉 (除非有特定網址)
            if (project.type === 'local') {
                card.onclick = () => {
                    if (project.url.includes('localhost') || project.url.includes('127.0.0.1')) {
                        // 嘗試開啟，但也許會失敗如果服務沒開
                        alert('這是本機專案，請確保您已執行「啟動.bat」！\n\n系統將嘗試連接到：' + project.url);
                        window.open(project.url, '_blank');
                    } else {
                        alert('📌 此專案為本機執行 (Local Host)\n\n請在您的電腦資料夾中找到該專案，並點擊「啟動.bat」來執行。');
                    }
                };
            } else {
                card.onclick = () => window.open(project.url, '_blank');
            }
        }

        const tagClass = project.type;
        let tagText = '';
        switch (project.type) {
            case 'pwa': tagText = 'PWA'; break;
            case 'streamlit': tagText = 'Streamlit'; break;
            case 'local': tagText = 'Local (本機)'; break;
            case 'cloud': tagText = 'Cloud (雲端)'; break;
            default: tagText = '即將推出';
        }

        // 從 Repo URL 提取資料夾名稱
        let folderName = '';
        if (project.repo) {
            const parts = project.repo.split('/');
            folderName = parts[parts.length - 1];
        }

        card.innerHTML = `
            <div class="card-header">
                <span class="card-icon">${project.icon || '📁'}</span>
                <div class="card-title-group">
                    <h3 class="card-title">${project.name}</h3>
                    ${folderName ? `<span class="card-repo-name">📂 ${folderName}</span>` : ''}
                </div>
            </div>
            <p class="card-description">${project.description || ''}</p>
            <div class="card-footer">
                <span class="card-tag ${tagClass}">${tagText}</span>
                ${project.repo && !isPlaceholder ? `
                    <a class="card-link" href="${project.repo}" target="_blank" onclick="event.stopPropagation()">
                        GitHub →
                    </a>
                ` : ''}
            </div>
        `;

        return card;
    }

    // 渲染管理列表
    function renderAdminList() {
        const adminList = document.getElementById('adminList');
        adminList.innerHTML = '<h3>現有專案</h3>';

        projects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'admin-item';
            item.innerHTML = `
                <span class="admin-item-icon">${project.icon || '📁'}</span>
                <span class="admin-item-name">${project.name}</span>
                <div class="admin-item-actions">
                    <button class="btn-edit" onclick="editProject('${project.id}')">✏️</button>
                    <button class="btn-delete" onclick="deleteProject('${project.id}')">🗑️</button>
                </div>
            `;
            adminList.appendChild(item);
        });
    }

    // 篩選按鈕
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProjects();
        });
    });

    // 管理面板開關
    adminToggle.addEventListener('click', () => {
        isAdminOpen = !isAdminOpen;
        adminPanel.classList.toggle('open', isAdminOpen);
    });

    closeAdmin.addEventListener('click', () => {
        isAdminOpen = false;
        adminPanel.classList.remove('open');
    });

    // 表單提交
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectData = {
            name: document.getElementById('projectName').value,
            description: document.getElementById('projectDesc').value,
            icon: document.getElementById('projectIcon').value || '📁',
            type: document.getElementById('projectType').value,
            url: document.getElementById('projectUrl').value,
            repo: document.getElementById('projectRepo').value,
            order: editingId ? projects.find(p => p.id === editingId)?.order : projects.length + 1
        };

        if (editingId) {
            projectsRef.child(editingId).update(projectData);
        } else {
            projectsRef.push(projectData);
        }

        clearForm();
    });

    // 清除表單
    clearFormBtn.addEventListener('click', clearForm);

    function clearForm() {
        projectForm.reset();
        editingId = null;
        document.getElementById('projectId').value = '';
    }

    // 全域函數
    window.editProject = function (id) {
        const project = projects.find(p => p.id === id);
        if (!project) return;

        editingId = id;
        document.getElementById('projectId').value = id;
        document.getElementById('projectName').value = project.name || '';
        document.getElementById('projectDesc').value = project.description || '';
        document.getElementById('projectIcon').value = project.icon || '';
        document.getElementById('projectType').value = project.type || 'pwa';
        document.getElementById('projectUrl').value = project.url || '';
        document.getElementById('projectRepo').value = project.repo || '';

        // 滾動到表單
        document.getElementById('projectForm').scrollIntoView({ behavior: 'smooth' });
    };

    window.deleteProject = function (id) {
        if (confirm('確定要刪除這個專案嗎？')) {
            projectsRef.child(id).remove();
        }
    };
});
