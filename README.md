
````markdown
# FinancialNewsSearch

簡短說明：  
一個使用 React + TypeScript + Vite 建置的前端應用，目標是提供財經新聞的搜尋 / 篩選 / 檢視介面（Financial News Search UI）。

---

## 主要功能
- 輸入關鍵字進行新聞搜尋（全文或標題）。  
- 篩選選項（分類、時間區間、來源）。  
- 新聞清單與詳細內文檢視。  
- 響應式介面，支援桌機與行動裝置。

---

## 專案結構
- `src/` — 前端程式碼。  
- `package.json`、`vite.config.ts`、`index.html` 等（Vite + React 範本結構）。

---

## 快速上手

1. 先 clone repo
```bash
git clone https://github.com/fishstar2023/FinancialNewsSearch.git
cd FinancialNewsSearch
````

2. 安裝相依套件

```bash
npm install
```

3. 設定環境變數（若有後端 API）

* 在專案根目錄建立 `.env` 或 `.env.local`，範例：

```
VITE_API_BASE_URL=https://your-api.example.com/api
```

4. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器並前往 `http://localhost:5173`

5. 建置與預覽

```bash
npm run build
npm run preview
```

---

## 腳本

* `npm run dev` — 本機開發（HMR）
* `npm run build` — 建置靜態資源
* `npm run preview` — 本地預覽已建置的產物

---

## 開發建議

* 若遇到 CORS，開發時可在 `vite.config.ts` 加 `server.proxy` 指向後端路由，或在後端加入 `Access-Control-Allow-Origin`。
* ESLint / TypeScript：建議開啟 type-aware lint。
* 撰寫單元測試可使用 Vitest + Testing Library。

---

## 如何貢獻

1. Fork 專案並切分支

```bash
git checkout -b feat/your-feature
```

2. 提交程式碼並推到 fork，發送 Pull Request 到 `fishstar2023/FinancialNewsSearch`
3. PR 說明中包含：變更目的、主要檔案、如何在本機測試

---

## 常見問題（FAQ）

* **如何設定 API URL？**
  將後端基本 URL 設在 `.env`（例如 `VITE_API_BASE_URL`），並重啟 dev server。

* **遇到 CORS 錯誤？**
  優先在後端設定 CORS，開發時可使用 Vite proxy 作為權宜之計。

* **部署到 GitHub Pages / Netlify / Vercel？**
  Vite 建置後產出 `dist/`，大多數靜態主機直接部署即可；GH Pages 需要設定 repo 的 pages 分支或使用 action。

---


## 致謝與資源

* 本專案基於 Vite + React + TypeScript 範本開發。

---

## 聯絡

若有問題或建議，可在 GitHub Repo 發送 Issue。

```

