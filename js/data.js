/* ================================================================
   RUAH科學探究教學 ── 網站內容設定檔
   ----------------------------------------------------------------
   網站上所有「文字、連結、分類」都在這個檔案裡。
   想新增、刪除、修改內容，只要改這裡，其他檔案都不用動。

   編輯規則（很重要）：
   1. 每一筆資料用 { } 包起來，資料和資料之間用逗號 , 隔開。
   2. 文字要放在英文雙引號 " " 裡面（不是中文引號「」或“”）。
   3. 以 // 開頭的是說明文字（註解），不會出現在網頁上。
   4. 改完存檔（GitHub 上按 Commit changes）後，等 1～2 分鐘再重新整理網頁。
   5. 如果網頁出現「資料檔讀取失敗」，多半是少了逗號或引號，請對照範例檢查。
   ================================================================ */

window.RUAH = {

  /* ---------- 網站基本設定 ---------- */
  site: {
    tagline: "從一個好問題開始，動手做、仔細看、說清楚。",

    // 首頁背景照片（可留空 ""）。
    // 把照片上傳到 images 資料夾後，填入例如 "images/hero.jpg"
    heroImage: "",

    // 頁尾文字，可填學校、單位或聯絡方式
    footer: "版權所有 © RUAH科學探究教學｜聯絡信箱：請改成你的信箱"
  },

  /* ================================================================
     欄位一：教學系統（外連的各個教學系統）
     ----------------------------------------------------------------
     name     系統名稱
     desc     一兩句簡介
     url      系統網址。還沒建好就保留 "" 或含 YOUR-ACCOUNT 的網址，
              卡片會自動顯示「建置中」且不能點。
     category 分類名稱，可自己取。同名的會被歸在一起，
              網頁上方會自動出現分類按鈕。
     icon     圖示代號，可用：arduino、printer、research、tools、
              paper、inquiry、camp、flask、microscope、atom
              也可以直接放一個 emoji，例如 "🔭"
     ================================================================ */
  systems: [
    {
      name: "Arduino 教學系統",
      desc: "從點亮 LED 到感測器與資料記錄，一步步完成自己的量測裝置。",
      url: "https://aronruah-steam.github.io/arduino-course/",
      category: "數位製作",
      icon: "arduino"
    },
    {
      name: "3D列印教學系統",
      desc: "建模、切片到列印，把實驗需要的器材自己做出來。",
      url: "https://aronruah-steam.github.io/3d-printing/",
      category: "數位製作",
      icon: "printer"
    },
    {
      name: "專題研究學習系統",
      desc: "訂題目、寫計畫、做研究到成果發表的完整歷程。",
      url: "https://script.google.com/macros/s/AKfycbwhem74Aj_m4IOiftuwQwIwwfIRj0CoRTn4ZFFvWbc2FX7sE5OI7aVP5xobiWn4uk3t/exec",
      category: "研究方法",
      icon: "research"
    },
    {
      name: "研究工具學習系統",
      desc: "文獻搜尋、問卷、統計與圖表工具的操作練習。",
      url: "",
      category: "研究方法",
      icon: "tools"
    },
    {
      name: "小論文檢查系統",
      desc: "投稿前逐項檢查格式、引用與結構。",
      url: "",
      category: "研究方法",
      icon: "paper"
    },
    {
      name: "探究與實作",
      desc: "課程單元、學習單與實作紀錄。",
      url: "",
      category: "課程與活動",
      icon: "inquiry"
    },
    {
      name: "科學營隊",
      desc: "營隊課程、活動資訊與報名。",
      url: "",
      category: "課程與活動",
      icon: "camp"
    }
  ],

  /* ================================================================
     欄位二：消息公告
     ----------------------------------------------------------------
     date     日期，格式固定為 "年-月-日"，例如 "2026-11-25"
     category 分類，例如 "公告"、"活動"、"競賽"、"課程"
     title    標題
     content  內容（可留空 ""）。要換行請打 \n
     link     相關連結（可留空 ""）
     pinned   true = 置頂；不需要置頂可以整行刪掉
     14 天內的消息會自動加上「新」標籤。
     ================================================================ */
  news: [
    {
      date: "2026-11-25",
      category: "公告",
      title: "RUAH科學探究教學網站上線",
      content: "本站整合各教學系統的入口、最新消息與常用研究資源。\n這是範例消息，請改成你自己的內容。",
      link: "",
      pinned: true
    },
    {
      date: "2026-11-20",
      category: "課程",
      title: "（範例）Arduino 教學系統新增感測器單元",
      content: "新增溫濕度與光度感測器的接線與程式範例。",
      link: ""
    },
    {
      date: "2026-11-10",
      category: "活動",
      title: "（範例）寒假科學營隊報名資訊",
      content: "活動日期、對象與報名方式將另行公告。",
      link: ""
    },
    {
      date: "2026-10-28",
      category: "競賽",
      title: "（範例）小論文投稿前檢查提醒",
      content: "投稿前請先用小論文檢查系統逐項確認格式。",
      link: ""
    }
  ],

  // 消息一開始顯示幾則，其餘按「顯示更多」才出現
  newsPageSize: 5,

  /* ================================================================
     欄位三：相關資訊連結
     ----------------------------------------------------------------
     name     網站名稱
     url      網址
     category 分類（同名的會排在同一欄）
     desc     簡短說明（可留空 ""）
     ================================================================ */
  links: [
    { name: "國立臺灣科學教育館",           url: "https://www.ntsec.gov.tw/",       category: "競賽與展覽", desc: "全國科展主辦單位" },
    { name: "臺灣國際科學展覽會／全國科展", url: "https://twsf.ntsec.gov.tw/",      category: "競賽與展覽", desc: "歷屆作品與說明書查詢" },
    { name: "中學生網站（小論文）",         url: "https://www.shs.edu.tw/",         category: "競賽與展覽", desc: "全國高級中等學校小論文寫作比賽" },

    { name: "臺灣博碩士論文知識加值系統",   url: "https://ndltd.ncl.edu.tw/",       category: "文獻搜尋", desc: "國內學位論文" },
    { name: "Google Scholar",               url: "https://scholar.google.com/",     category: "文獻搜尋", desc: "跨領域學術文獻搜尋" },

    { name: "Arduino 官方網站",             url: "https://www.arduino.cc/",         category: "工具與軟體", desc: "IDE 下載與官方文件" },
    { name: "Tinkercad",                    url: "https://www.tinkercad.com/",      category: "工具與軟體", desc: "線上 3D 建模與電路模擬" },
    
    { name: "Arduino入門",        url: "https://learn-arduino-red.vercel.app/zh-tw/",      category: "教學網站", desc: "線上Arduino互動教學" }
  ]
};
