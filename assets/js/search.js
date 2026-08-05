// 卓云安全 · 站内搜索（search.js）
(function () {
  'use strict';

  var INDEX_URL = 'assets/data/search-index.json';
  var CAT_LABEL = { '公示': '信息公示', '服务': '服务项目', '资质': '资质荣誉', '案例': '案例客户', '新闻': '新闻公告', '招聘': '人才招聘', '关于': '关于我们' };
  var CAT_ICON = {
    '公示': '<svg viewBox="0 0 24 24"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    '服务': '<svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4 12H2M22 12h-2M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"/><circle cx="12" cy="12" r="3"/></svg>',
    '资质': '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    '案例': '<svg viewBox="0 0 24 24"><path d="M4 19V5h6l2 4h8v10z"/></svg>',
    '新闻': '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>',
    '招聘': '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>',
    '关于': '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'
  };

  var INDEX = [];
  var query = '', catFilter = 'all';
  var resultsBox = document.getElementById('searchResults');
  var emptyBox = document.getElementById('searchEmpty');
  var statBox = document.getElementById('resultStat');
  var qInput = document.getElementById('qInput');

  /* ===== 弹窗（独立实现，供结果详情预览） ===== */
  var overlay = document.getElementById('modalOverlay');
  var mTag = document.getElementById('modalTag');
  var mTitle = document.getElementById('modalTitle');
  var mBody = document.getElementById('modalBody');
  var mClose = document.getElementById('modalClose');
  if (overlay) {
    mClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });
  }
  function openModal(tag, title, html) {
    mTag.textContent = tag; mTitle.textContent = title; mBody.innerHTML = html;
    overlay.classList.add('open'); overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ===== 工具：转义 + 高亮 ===== */
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function highlight(text, kw) {
    var safe = escapeHtml(text);
    if (!kw) return safe;
    var k = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    try {
      return safe.replace(new RegExp('(' + k + ')', 'gi'), '<mark>$1</mark>');
    } catch (e) { return safe; }
  }

  /* ===== 匹配算法：加权，避免跑偏 =====
     标题命中 = 10；标签命中 = 6；摘要命中 = 3；正文命中 = 1。
     仅当关键词命中标题或标签或摘要时才计入（正文仅作兜底），按总分降序。 */
  function scoreItem(item, kw) {
    var k = kw.toLowerCase();
    var title = (item.title || '').toLowerCase();
    var tags = (item.tags || []).join(' ').toLowerCase();
    var snippet = (item.snippet || '').toLowerCase();
    var content = (item.content || '').toLowerCase();
    var score = 0;
    if (title.indexOf(k) > -1) score += 10;
    if (tags.indexOf(k) > -1) score += 6;
    if (snippet.indexOf(k) > -1) score += 3;
    if (content.indexOf(k) > -1) score += 1;
    return score;
  }

  function search(kw) {
    var k = kw.trim();
    if (!k) {
      resultsBox.innerHTML = '';
      emptyBox.hidden = true;
      statBox.textContent = '请输入关键词开始搜索';
      return;
    }
    var list = INDEX
      .map(function (it) { return { it: it, s: scoreItem(it, k) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });

    if (catFilter !== 'all') {
      list = list.filter(function (x) { return x.it.category === catFilter; });
    }

    statBox.innerHTML = '找到 <b>' + list.length + '</b> 条与「' + escapeHtml(k) + '」相关的结果' +
      (catFilter !== 'all' ? '（' + (CAT_LABEL[catFilter] || catFilter) + '）' : '');

    if (!list.length) {
      resultsBox.innerHTML = '';
      emptyBox.hidden = false;
      document.getElementById('emptyKw').textContent = k;
      return;
    }
    emptyBox.hidden = true;

    resultsBox.innerHTML = list.map(function (x) {
      var it = x.it;
      var cat = it.category;
      var label = CAT_LABEL[cat] || cat;
      return '<a class="res-item cat-' + cat + '" href="' + it.url + '">' +
        '<span class="res-ico">' + (CAT_ICON[cat] || '') + '</span>' +
        '<span class="res-main">' +
          '<span class="res-top"><span class="res-cat cat-' + cat + '">' + label + '</span>' +
            (it.snippet ? '<span class="res-date">' + escapeHtml(it.snippet) + '</span>' : '') + '</span>' +
          '<span class="res-title">' + highlight(it.title, k) + '</span>' +
          '<span class="res-sum">' + highlight(it.content || it.snippet || '', k).slice(0, 120) + '</span>' +
          (it.tags && it.tags.length ? '<span class="res-tags">' + it.tags.slice(0, 5).map(function (t) { return '<i>' + highlight(t, k) + '</i>'; }).join('') + '</span>' : '') +
        '</span>' +
        '<span class="res-arrow"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span>' +
      '</a>';
    }).join('');
  }

  /* ===== 事件绑定 ===== */
  function bindUI() {
    // 分类切换
    var catBox = document.getElementById('searchCats');
    if (catBox) {
      catBox.querySelectorAll('.sc').forEach(function (btn) {
        btn.addEventListener('click', function () {
          catBox.querySelectorAll('.sc').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          catFilter = btn.getAttribute('data-cat');
          search(query);
        });
      });
    }
    // 热门词
    document.querySelectorAll('.hw').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var kw = btn.getAttribute('data-kw');
        if (qInput) qInput.value = kw;
        query = kw;
        search(kw);
        if (qInput) qInput.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // 供头部搜索框 form 调用
  window.zhSubmitSearch = function (form) {
    var v = form.querySelector('input[name=q]').value.trim();
    if (!v) return false;
    window.location.href = 'search.html?q=' + encodeURIComponent(v);
    return false;
  };
  window.zhNavSearch = window.zhSubmitSearch;

  /* ===== 初始化 ===== */
  function init() {
    bindUI();
    var params = new URLSearchParams(location.search);
    var q = params.get('q') || '';
    if (qInput && q) qInput.value = q;
    query = q;
    search(q);
  }

  // 加载索引（轻量 json）
  fetch(INDEX_URL, { cache: 'no-cache' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      INDEX = data.data || [];
      init();
    })
    .catch(function (e) {
      if (statBox) statBox.textContent = '搜索索引加载失败，请刷新重试。';
      console.error('search index load failed', e);
    });
})();
