/* ================================================================
   RUAH科學探究教學 ── 網頁程式
   一般維護不需要修改這個檔案，內容請改 js/data.js
   ================================================================ */
(function () {
  "use strict";

  /* ---------- 圖示（線條風格，24x24） ---------- */
  var ICONS = {
    arduino: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M6 5V3M9 5V3M12 5V3M15 5V3M18 5V3M6 21v-2M9 21v-2M12 21v-2"/><circle cx="8.5" cy="12" r="2.2"/><circle cx="15.5" cy="12" r="2.2"/><path d="M7.4 12h2.2M14.4 12h2.2M15.5 10.9v2.2"/>',
    printer: '<path d="M3 3h18M5 3v18M19 3v18M3 21h18"/><path d="M9.5 7h5l-1 3h-3z"/><path d="M12 10v2"/><path d="M8 18h8M9 16h6"/>',
    research: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l6 6"/><path d="M8 11.5l1.8 1.8L13.5 9"/>',
    tools: '<path d="M4 20V10M9 20V4M14 20v-7M19 20V7"/><path d="M2.5 20.5h19"/>',
    paper: '<path d="M6 2.5h8.5L19 7v14.5H6z"/><path d="M14 2.5V7h5"/><path d="M9 12h7M9 15.5h4"/><path d="M13.5 18.5l1.6 1.6 3-3"/>',
    inquiry: '<path d="M9.5 2.5h5M10.5 2.5v6L5 19a1.8 1.8 0 0 0 1.6 2.5h10.8A1.8 1.8 0 0 0 19 19l-5.5-10.5v-6"/><path d="M7.5 14.5h9"/><circle cx="10.5" cy="17.5" r=".8"/><circle cx="13.8" cy="18.5" r=".6"/>',
    camp: '<path d="M2.5 21L12 4l9.5 17z"/><path d="M12 21l-3.5-6h7z"/><path d="M12 4l-1.5-2.5M12 4l1.5-2.5"/>',
    flask: '<path d="M9 2.5h6M10 2.5v7l-5.5 9.5A1.8 1.8 0 0 0 6 21.5h12a1.8 1.8 0 0 0 1.5-2.5L14 9.5v-7"/>',
    microscope: '<path d="M6 21.5h12M9 18.5h7"/><path d="M14.5 18.5a5 5 0 0 0-2-9.5"/><path d="M8 3l4 6.5-2.5 1.5-4-6.5z"/><path d="M9.5 11l1.5 2.5"/>',
    atom: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1h5.5"/>'
  };

  function icon(name, cls) {
    var body = ICONS[name];
    if (!body) {
      // 不是內建代號，就當作 emoji 或文字顯示
      return '<span class="' + (cls || "") + ' icon-emoji" aria-hidden="true">' + esc(name || "•") + "</span>";
    }
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function $(id) { return document.getElementById(id); }

  /* 網址是否已設定（空白或含 YOUR-ACCOUNT 視為未設定） */
  function hasUrl(u) {
    return !!u && String(u).trim() !== "" && String(u).indexOf("YOUR-ACCOUNT") === -1;
  }

  /* 依出現順序取出分類 */
  function categoriesOf(list) {
    var seen = [];
    list.forEach(function (it) {
      var c = it.category || "未分類";
      if (seen.indexOf(c) === -1) seen.push(c);
    });
    return seen;
  }

  /* 分類按鈕 */
  function renderFilters(box, cats, onChange) {
    if (cats.length < 2) { box.hidden = true; return; }
    var all = ["全部"].concat(cats);
    box.innerHTML = all.map(function (c, i) {
      return '<button type="button" class="chip" aria-pressed="' + (i === 0) + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");
    box.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      box.querySelectorAll(".chip").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      onChange(btn.getAttribute("data-cat"));
    });
  }

  /* ========== 欄位一：教學系統 ========== */
  function renderSystems(systems) {
    var grid = $("systemGrid");
    function draw(cat) {
      var list = systems.filter(function (s) { return cat === "全部" || (s.category || "未分類") === cat; });
      if (!list.length) { grid.innerHTML = '<p class="empty">這個分類目前沒有系統。</p>'; return; }
      grid.innerHTML = list.map(function (s) {
        var ready = hasUrl(s.url);
        var tag = ready ? "a" : "div";
        var attrs = ready
          ? ' href="' + esc(s.url) + '" target="_blank" rel="noopener"'
          : ' aria-disabled="true"';
        return "<" + tag + ' class="sys' + (ready ? "" : " is-pending") + '"' + attrs + ">" +
          '<span class="sys-icon">' + icon(s.icon || "flask") + "</span>" +
          '<span class="sys-body">' +
            '<span class="sys-cat">' + esc(s.category || "未分類") + "</span>" +
            '<span class="sys-name">' + esc(s.name) + "</span>" +
            '<span class="sys-desc">' + esc(s.desc) + "</span>" +
          "</span>" +
          '<span class="sys-status">' + (ready ? "進入系統" + icon("external", "mini") : (s.url ? "待填入網址" : "建置中")) + "</span>" +
          "</" + tag + ">";
      }).join("");
    }
    renderFilters($("systemFilters"), categoriesOf(systems), draw);
    draw("全部");
  }

  /* ========== 欄位二：消息公告 ========== */
  function parseDate(d) {
    var p = String(d || "").split("-");
    return new Date(+p[0] || 1970, (+p[1] || 1) - 1, +p[2] || 1);
  }

  function renderNews(news, pageSize) {
    var list = $("newsList"), more = $("newsMore");
    var size = pageSize || 5, shown = size, current = "全部";
    var now = new Date();

    var sorted = news.slice().sort(function (a, b) {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return parseDate(b.date) - parseDate(a.date);
    });

    function draw() {
      var items = sorted.filter(function (n) { return current === "全部" || (n.category || "未分類") === current; });
      if (!items.length) {
        list.innerHTML = '<li class="empty">這個分類目前沒有消息。</li>';
        more.hidden = true;
        return;
      }
      list.innerHTML = items.slice(0, shown).map(function (n) {
        var d = parseDate(n.date);
        var isNew = (now - d) / 86400000 <= 14 && (now - d) >= -86400000;
        var hasBody = (n.content && String(n.content).trim()) || hasUrl(n.link);
        var body = hasBody
          ? '<div class="news-body">' +
              (n.content ? "<p>" + esc(n.content).replace(/\n/g, "<br>") + "</p>" : "") +
              (hasUrl(n.link) ? '<a class="news-link" href="' + esc(n.link) + '" target="_blank" rel="noopener">開啟相關連結' + icon("external", "mini") + "</a>" : "") +
            "</div>"
          : "";
        var head =
          '<time class="news-date" datetime="' + esc(n.date) + '">' +
            '<span class="nd-md">' + (d.getMonth() + 1) + "/" + d.getDate() + "</span>" +
            '<span class="nd-y">' + d.getFullYear() + "</span>" +
          "</time>" +
          '<span class="news-main">' +
            '<span class="news-meta">' +
              (n.pinned ? '<span class="badge badge-pin">置頂</span>' : "") +
              (isNew ? '<span class="badge badge-new">新</span>' : "") +
              '<span class="news-cat">' + esc(n.category || "未分類") + "</span>" +
            "</span>" +
            '<span class="news-title">' + esc(n.title) + "</span>" +
          "</span>";
        return '<li class="news-item' + (n.pinned ? " is-pinned" : "") + '">' +
          (hasBody
            ? '<details><summary>' + head + '<span class="news-toggle" aria-hidden="true"></span></summary>' + body + "</details>"
            : '<div class="news-row">' + head + "</div>") +
          "</li>";
      }).join("");
      more.hidden = items.length <= shown;
    }

    renderFilters($("newsFilters"), categoriesOf(news), function (cat) { current = cat; shown = size; draw(); });
    more.addEventListener("click", function () { shown += size; draw(); });
    draw();
  }

  /* ========== 欄位三：相關資訊連結 ========== */
  function renderLinks(links) {
    var box = $("linkGroups");
    box.innerHTML = categoriesOf(links).map(function (cat) {
      var items = links.filter(function (l) { return (l.category || "未分類") === cat; });
      return '<div class="link-group"><h3>' + esc(cat) + "</h3><ul>" +
        items.map(function (l) {
          return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' +
            '<span class="lk-name">' + esc(l.name) + icon("external", "mini") + "</span>" +
            (l.desc ? '<span class="lk-desc">' + esc(l.desc) + "</span>" : "") +
            "</a></li>";
        }).join("") + "</ul></div>";
    }).join("");
  }

  /* ========== 啟動 ========== */
  function showError() {
    var main = document.querySelector("main");
    main.insertAdjacentHTML("afterbegin",
      '<div class="data-error" role="alert"><strong>資料檔讀取失敗。</strong>' +
      "請檢查 js/data.js：最常見的原因是少了逗號 , 、引號沒有成對，或用了中文引號「」。" +
      "可以和上一個版本比對（GitHub 的 History 功能）找出改動的地方。</div>");
  }

  function init() {
    var D = window.RUAH;
    if (!D) { showError(); return; }

    var site = D.site || {};
    if (site.tagline) $("heroTagline").textContent = site.tagline;
    if (site.footer) $("footerText").textContent = site.footer;
    if (site.heroImage) {
      var ph = $("heroPhoto");
      ph.style.backgroundImage = 'url("' + String(site.heroImage).replace(/"/g, "") + '")';
      ph.classList.add("is-on");
    }

    renderSystems(D.systems || []);
    renderNews(D.news || [], D.newsPageSize);
    renderLinks(D.links || []);

    // 捲動後導覽列加底色
    var bar = $("topbar");
    var onScroll = function () { bar.classList.toggle("is-solid", window.scrollY > 40); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
