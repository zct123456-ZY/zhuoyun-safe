/* ============================================================
   卓云安全 · 商用密码检测有限公司  —  交互脚本（原生 JS，无依赖）
   ============================================================ */
(function () {
  'use strict';

  /* 移动端导航 */
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      var s = burger.querySelectorAll('span');
      links.classList.contains('open')
        ? (s[0].style.transform = 'translateY(7px) rotate(45deg)', s[1].style.opacity = '0', s[2].style.transform = 'translateY(-7px) rotate(-45deg)')
        : (s[0].style.transform = '', s[1].style.opacity = '', s[2].style.transform = '');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* 滚动入场动画 */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* 导航高亮当前页 */
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) a.classList.add('active');
  });

  /* 返回顶部 */
  var toTop = document.querySelector('.totop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 480);
    });
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* 新闻 / 服务 标签页筛选 */
  var tabs = document.querySelectorAll('.tab');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var f = tab.getAttribute('data-filter');
        document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('[data-cat]').forEach(function (card) {
          var show = (f === 'all' || card.getAttribute('data-cat') === f);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* 表单校验 + 提交（GitHub Pages 无后端，默认走 Formspree；未配置时演示成功） */
  var form = document.getElementById('contactForm');
  if (form) {
    var alertBox = document.getElementById('formAlert');
    var endpoint = form.getAttribute('data-formspree') || '';
    var realEndpoint = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint) && endpoint.indexOf('YOUR_FORM_ID') === -1;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var msg = form.message.value.trim();
      var email = form.email ? form.email.value.trim() : '';
      var errs = [];
      if (name.length < 2) errs.push('请填写正确的联系人姓名');
      if (!/^1[3-9]\d{9}$/.test(phone)) errs.push('请填写有效的 11 位手机号');
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.push('邮箱格式不正确');
      if (msg.length < 5) errs.push('请简单描述您的需求（至少 5 个字）');

      if (errs.length) {
        alertBox.className = 'alert err';
        alertBox.textContent = '⚠ ' + errs[0];
        return;
      }

      /* 未配置真实 Formspree ID：仅前端演示 */
      if (!realEndpoint) {
        alertBox.className = 'alert ok';
        alertBox.textContent = '✓ 演示提交成功！（已将 Formspree ID 填入后才会真正发送，详见 README）';
        form.reset();
        return;
      }

      /* 已配置：发送到 Formspree */
      alertBox.className = 'alert';
      alertBox.textContent = '正在提交…';
      fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          alertBox.className = 'alert ok';
          alertBox.textContent = '✓ 提交成功！我们的密评顾问会在 1 个工作日内与您联系。';
          form.reset();
        } else {
          alertBox.className = 'alert err';
          alertBox.textContent = '⚠ 提交失败，请稍后重试或直接邮件联系我们。';
        }
      }).catch(function () {
        alertBox.className = 'alert err';
        alertBox.textContent = '⚠ 网络异常，请稍后重试或直接邮件联系我们。';
      });
    });
  }

  /* 年份 */
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
