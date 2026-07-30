// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// 导航栏滚动阴影
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.06)';
        }
    }
});

// 联系表单提交
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取表单数据（仅用于演示，实际需接入后端）
        const formData = new FormData(this);
        console.log('表单提交（演示模式）:', Object.fromEntries(formData));

        // 专业提示语
        alert('感谢您的咨询！\n\n我们的技术顾问将在1个工作日内与您联系。\n所有信息严格保密，仅用于本次服务对接。');

        this.reset();
    });
}

// 平滑滚动（可选）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});