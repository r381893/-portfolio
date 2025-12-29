/**
 * 專案資料
 * 新增專案只需要在這個陣列中加入新項目即可
 */
const projects = [
    // ========== PWA 專案 ==========
    {
        id: 1,
        name: "00631L 避險系統",
        description: "選擇權避險計算、情境分析、OCR 圖片辨識快速匯入部位",
        icon: "📊",
        type: "pwa",
        url: "https://r381893.github.io/00631L-Op-Pwa/",
        repo: "https://github.com/r381893/00631L-Op-Pwa"
    },
    {
        id: 2,
        name: "蜘蛛網策略回測",
        description: "多條件交易策略回測系統，支援 RSI、MA、結構過濾器",
        icon: "🕸️",
        type: "pwa",
        url: "https://r381893.github.io/strategy-backtest-pwa/",
        repo: "https://github.com/r381893/strategy-backtest-pwa"
    },
    {
        id: 3,
        name: "台50+2 80/20投資",
        description: "ETF 再平衡投資策略模擬，80/20 資產配置",
        icon: "💰",
        type: "pwa",
        url: "https://r381893.github.io/tw50-plus2-8020-pwa/",
        repo: "https://github.com/r381893/tw50-plus2-8020-pwa"
    },
    {
        id: 4,
        name: "動火作業表單",
        description: "動火作業申請表單快速生成與匯出",
        icon: "🔥",
        type: "pwa",
        url: "https://r381893.github.io/hot-work-form/",
        repo: "https://github.com/r381893/hot-work-form"
    },

    // ========== Streamlit 專案 ==========
    {
        id: 5,
        name: "策略回測平台",
        description: "完整版回測系統，參數優化、Firebase 儲存策略",
        icon: "📈",
        type: "streamlit",
        url: "https://strategy-backtest.streamlit.app/",
        repo: "https://github.com/r381893/strategy_backtest"
    },
    {
        id: 6,
        name: "長期再平衡模擬",
        description: "長期投資再平衡策略分析與視覺化",
        icon: "⚖️",
        type: "streamlit",
        url: "https://long-term-rebalancing.streamlit.app/",
        repo: "https://github.com/r381893/Long-term-rebalancing"
    },

    // ========== 預留位置（未來新增） ==========
    {
        id: 7,
        name: "新專案 #1",
        description: "即將推出...",
        icon: "🔮",
        type: "future",
        url: null,
        isPlaceholder: true
    },
    {
        id: 8,
        name: "新專案 #2",
        description: "即將推出...",
        icon: "🔮",
        type: "future",
        url: null,
        isPlaceholder: true
    },
    {
        id: 9,
        name: "新專案 #3",
        description: "即將推出...",
        icon: "🔮",
        type: "future",
        url: null,
        isPlaceholder: true
    },
    {
        id: 10,
        name: "新專案 #4",
        description: "即將推出...",
        icon: "🔮",
        type: "future",
        url: null,
        isPlaceholder: true
    }
];

/**
 * 新增專案範例：
 * 複製以下模板，填入資訊後加到 projects 陣列中
 * 
 * {
 *     id: 11,
 *     name: "專案名稱",
 *     description: "專案描述",
 *     icon: "🎯",
 *     type: "pwa",  // pwa 或 streamlit
 *     url: "https://your-url.com",
 *     repo: "https://github.com/r381893/your-repo"
 * }
 */
