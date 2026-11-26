# RUAH科學探究教學網站

以 GitHub Pages 架設的教學入口網站，包含三個欄位：

1. **教學系統**：連到各個教學系統（Arduino、3D列印、專題研究……）
2. **消息公告**：可置頂、分類、自動標示 14 天內的新消息
3. **相關資訊連結**：依分類分欄顯示

所有內容都集中在 **`js/data.js`** 一個檔案，日後增刪、修改、重新分類，只要改這個檔案。

---

## 檔案結構

```
ruah-science/
├── index.html                 首頁（版面，一般不需要改）
├── css/style.css              樣式（想換顏色改最上面的色碼）
├── js/data.js                 ★ 網站內容：教學系統、消息、連結
├── js/main.js                 程式（一般不需要改）
├── images/
│   ├── favicon.svg            瀏覽器分頁小圖示
│   └── lab-sketches.svg       首頁背景的實驗器材線稿
├── templates/system-starter/  新教學系統的起始範本
└── .nojekyll                  讓 GitHub 直接發布檔案，不另外轉換
```

---

## 第一部分：把首頁放上 GitHub

### 步驟 1　註冊 GitHub 帳號
到 <https://github.com> 註冊。**帳號名稱會出現在網址裡**，建議取簡短、好記、全英文小寫的名稱，例如 `ruahsci`。

### 步驟 2　建立首頁用的 repository（儲存庫）
1. 登入後點右上角 **＋ → New repository**。
2. **Repository name** 填 `你的帳號.github.io`（例如 `ruahsci.github.io`）。
   - 為什麼取這個名字？這是 GitHub 保留給「個人首頁」的特殊名稱，網址會是最短的 `https://ruahsci.github.io/`。
   - 如果取其他名字（例如 `ruah`），網址就會變成 `https://ruahsci.github.io/ruah/`，也可以用。
3. 選 **Public**（免費帳號的 GitHub Pages 只支援公開的 repository）。
4. 按 **Create repository**。

### 步驟 3　上傳網站檔案
1. 先把下載的 zip 解壓縮。
2. 在新 repository 頁面點 **uploading an existing file**（或 **Add file → Upload files**）。
3. 打開解壓縮後的 `ruah-science` 資料夾，**把裡面所有檔案和資料夾**（不是 `ruah-science` 這個資料夾本身）一起拖進上傳區。
   - 用 Chrome 或 Edge 拖資料夾，資料夾結構會被保留。
   - 上傳後，repository 第一層應該直接看到 `index.html`、`css`、`js`、`images`。如果多了一層 `ruah-science/`，網址就會找不到首頁。
4. 拉到下方按 **Commit changes**。

> `.nojekyll` 是隱藏檔，有些電腦拖不進去。少了它通常也能正常運作；若要補上，可用 **Add file → Create new file**，檔名打 `.nojekyll`，內容留空後 Commit。

### 步驟 4　開啟 GitHub Pages
1. 在 repository 上方點 **Settings**。
2. 左側選單點 **Pages**。
3. **Build and deployment → Source** 選 **Deploy from a branch**。
4. **Branch** 選 `main`，資料夾選 `/ (root)`，按 **Save**。
5. 等 1～3 分鐘，重新整理這一頁，上方會出現網址與 **Visit site** 按鈕。

完成後，首頁網址就是 `https://你的帳號.github.io/`。

---

## 第二部分：日後如何編輯內容

### 在 GitHub 網頁上直接改（最簡單）
1. 進入 repository，點 `js` → `data.js`。
2. 點右上角的 **鉛筆圖示（Edit this file）**。
3. 修改內容，按右上角 **Commit changes…** → 再按一次 **Commit changes**。
4. 等 1～2 分鐘，網站重新整理即可看到（若沒變，按 `Ctrl + F5` 強制重新整理）。

### 新增一則消息
在 `news: [` 下面，複製一整段 `{ … },`，貼在最前面再修改：

```js
{
  date: "2026-12-01",
  category: "活動",
  title: "寒假科學營隊開始報名",
  content: "報名期限至 12/20。\n名額 40 人，額滿為止。",
  link: "https://forms.gle/xxxx",
  pinned: true
},
```

- `pinned: true` 會置頂；不要置頂就把這行刪掉。
- 想**刪除**消息：把整段 `{ … },` 刪掉。
- 想**新增分類**：直接寫新的 `category` 名稱，網頁上方的分類按鈕會自動出現。

### 修改教學系統或相關連結
做法一樣，在 `systems: [` 或 `links: [` 裡新增、刪除、修改。
教學系統的 `url` 留空 `""` 時，卡片會顯示「建置中」且無法點擊；填入網址後就會變成可點的卡片。

### 改壞了怎麼辦？
如果網頁出現紅框「資料檔讀取失敗」，通常是：
- 兩筆資料之間少了逗號 `,`
- 引號沒有成對，或用了中文引號「」“”
- 大括號 `{ }`、中括號 `[ ]` 少一個

修復方法：打開 `data.js`，點右上角 **History**，可以看到每次修改的紀錄，比對上一版找出差異；必要時把上一版的內容複製回來。

### 換首頁背景照片
1. 進入 `images` 資料夾 → **Add file → Upload files**，上傳照片（建議檔名用英文，例如 `hero.jpg`，寬度 1600px 左右、大小 500KB 以內）。
2. 編輯 `data.js`，把 `heroImage: ""` 改成 `heroImage: "images/hero.jpg"`。

照片會以淡淡的單色疊在藍圖背景上，不會蓋過標題。

---

## 第三部分：建立各個教學系統

### 建議做法：一個系統一個 repository
每個教學系統各自建立一個 repository，各自開啟 GitHub Pages。
這樣做的好處：各系統可以獨立更新、交給不同老師維護，某個系統出錯也不會影響首頁。

| 教學系統 | 建議 repository 名稱 | 網址會是 |
|---|---|---|
| Arduino 教學系統 | `arduino-course` | `https://帳號.github.io/arduino-course/` |
| 3D列印教學系統 | `3d-printing` | `https://帳號.github.io/3d-printing/` |
| 專題研究學習系統 | `research-project` | `https://帳號.github.io/research-project/` |
| 研究工具學習系統 | `research-tools` | `https://帳號.github.io/research-tools/` |
| 小論文檢查系統 | `paper-checker` | `https://帳號.github.io/paper-checker/` |
| 探究與實作 | `inquiry-practice` | `https://帳號.github.io/inquiry-practice/` |
| 科學營隊 | `science-camp` | `https://帳號.github.io/science-camp/` |

> repository 名稱請用英文小寫與連字號 `-`，不要用中文或空格，網址才會乾淨。

### A. 已經有 HTML 的系統（Arduino、3D列印）

**情況 1：HTML 已經在某個 GitHub repository 裡**
1. 進入那個 repository → **Settings → Pages**，照第一部分步驟 4 開啟。
2. 記下網址。如果主檔案不叫 `index.html`（例如叫 `arduino.html`），網址要加上檔名：`https://帳號.github.io/arduino-course/arduino.html`。
   建議把主檔案改名為 `index.html`，網址會比較短。

**情況 2：HTML 還在電腦裡**
1. 建立新的 repository（例如 `arduino-course`，選 Public）。
2. 上傳 HTML 和它用到的圖片、資料夾（結構要和電腦裡一樣）。
3. 開啟 GitHub Pages，取得網址。

**最後**：打開首頁 repository 的 `js/data.js`，把對應系統的 `url` 換成真正的網址（把 `YOUR-ACCOUNT` 那一串整個取代掉）。

**上傳後圖片顯示不出來？** 常見原因：
- HTML 裡寫的是電腦路徑（例如 `C:\Users\...\img.png`），要改成相對路徑 `images/img.png`。
- 大小寫不一致：GitHub 會區分 `Photo.PNG` 和 `photo.png`，Windows 不會。
- 檔名有中文或空格，建議改成英文。

### B. 還沒做好的系統（專題研究、研究工具、小論文檢查、探究與實作、科學營隊）
1. 建立新的 repository。
2. 上傳 `templates/system-starter/index.html`（這是和首頁同風格的課程頁範本，有單元目錄）。
3. 編輯檔案裡標 ①②③ 的地方：系統名稱、回首頁的網址、單元內容。
4. 開啟 GitHub Pages，把網址填回首頁的 `data.js`。

在網址填回去之前，首頁卡片會維持「建置中」，所以可以放心先上線首頁、之後再一個一個補。

### 關於「小論文檢查系統」的提醒
GitHub Pages 只能放**靜態網頁**（HTML、CSS、JavaScript），沒有伺服器。
- 如果檢查系統是「檢核清單」或在瀏覽器裡自動比對格式，可以直接放在 GitHub Pages。
- 如果需要串接 AI（例如 OpenAI、Claude、Gemini 的 API）或需要儲存學生上傳的檔案，**API 金鑰絕對不能寫在網頁程式裡**，因為公開的 repository 任何人都看得到原始碼，金鑰會被盜用。這種情況需要另外的後端服務（例如 Google Apps Script、Cloudflare Workers），網頁只負責呼叫它。

### 另一種做法：全部放在同一個 repository
也可以把各系統放在首頁 repository 的子資料夾，例如 `systems/arduino/index.html`，網址是 `https://帳號.github.io/systems/arduino/`，`data.js` 裡的 `url` 可以直接寫 `"systems/arduino/"`。
適合系統少、只有一個人維護的情況；缺點是所有東西混在一起，檔案多了比較難管理。

---

## 常見問題

**Q：改了內容但網站沒變？**
GitHub Pages 需要 1～3 分鐘重新發布。可在 repository 的 **Actions** 分頁看到進度（綠色勾勾＝完成）。完成後按 `Ctrl + F5` 強制重新整理。

**Q：開網址出現 404？**
- 確認 `index.html` 在 repository 第一層，而不是在某個資料夾裡。
- 確認 Settings → Pages 已選 `main` 與 `/ (root)`。
- 剛開啟時可能要等幾分鐘。

**Q：想用學校的網域（例如 ruah.xxx.edu.tw）？**
在 Settings → Pages → **Custom domain** 填入網域，並請學校資訊組在 DNS 加一筆 CNAME 指向 `帳號.github.io`。

**Q：可以多位老師一起維護嗎？**
可以。在 repository 的 **Settings → Collaborators** 邀請其他老師的 GitHub 帳號。
