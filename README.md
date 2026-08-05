# 卓云安全官网（重建版）

纯静态、响应式企业官网，**零依赖、无框架、无外部 CDN**，可直接部署到现有 `zhuoyunkeji.com` 服务器，替换旧的 Vue SPA 站点。

## 目录结构
```
zhuoyun-website/
├── index.html          首页
├── about.html          关于我们
├── services.html       服务项目（A–F 六类）
├── qualifications.html 资质荣誉
├── cases.html          案例客户
├── contact.html        联系我们（含咨询表单）
├── assets/
│   ├── css/style.css   设计系统（蓝+青绿科技风）
│   ├── js/main.js      导航/滚动动画/表单校验
│   └── img/
│       ├── logo.svg          原创品牌 logo（盾+锁/密钥+ZH）
│       ├── favicon.svg       浏览器标签图标
│       └── qr-placeholder.svg 公众号二维码占位
└── README.md
```

## 本地预览
```bash
python -m http.server 8080 --directory zhuoyun-website
# 浏览器访问 http://localhost:8080
```

## 部署到 zhuoyunkeji.com（现有为 nginx + Vue SPA）
现有站点由 nginx 托管 Vue 打包产物。新站为纯静态多页，替换方式如下：

### 方式一：整站替换（推荐）
1. 备份服务器旧目录（如 `/usr/share/nginx/html` 或站点 root）
2. 将本目录**全部文件**上传到站点 web root（建议新建 `/var/www/zhuoyun`）
3. 修改 nginx 站点配置，将 `root` 指向新目录
4. 校验并重载：`nginx -t && nginx -s reload`

nginx 配置片段：
```nginx
server {
    listen 80;
    server_name www.zhuoyunkeji.com zhuoyunkeji.com;
    root /var/www/zhuoyun;        # 指向新站目录
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
    # 建议启用 HTTPS（腾讯云/Let's Encrypt 免费证书）
}
```

### 方式二：子目录灰度验证
上传到 `/var/www/zhuoyun-new`，先访问 `www.zhuoyunkeji.com/new/` 验证，再切换 root。

## 上线前需替换的占位
| 占位 | 处理 |
|---|---|
| 页脚「滇ICP备（备案号待填）」 | 填入 `zhuoyunkeji.com` 真实备案号（该域名已备案，查号填入） |
| `assets/img/qr-placeholder.svg` | 替换为真实公众号二维码图片 |
| 电话 `0871-00000000` | 原为传真号，请确认对外联系电话 |
| 邮箱 `contact@zhuoyunkeji.com` | 真实邮箱，无需改 |

## 技术说明
- 纯 HTML + CSS + JS，无构建步骤，离线可开
- 自包含样式与脚本，**不依赖任何外部 CDN**（规避旧站 bootcdn 抖动风险）
- 相对路径，整目录拷贝即部署
- 响应式，移动端含汉堡菜单；URL 为干净的多页（`/about.html`），利于 SEO 与分享

## 极简内容后台（招聘 / 公司动态自助维护）
> 目标：非技术人员也能发招聘、发动态，无需改代码；前台仍是纯静态、快稳便。

### 原理
- 招聘（JOBS）、动态（NEWS）已从 `main.js` 抽成独立文件 `assets/data/content.json`。
- 前端加载时优先 `fetch('assets/data/content.json')`，成功则用远程数据渲染；失败自动回退 `main.js` 内置静态快照（页面照常可用）。
- 后台 `admin/` 是一个**单文件 PHP 极简后台**，登录后填表即可增删改，保存即写回 `content.json`，前台刷新生效。

### 部署前提
- 服务器需支持 **PHP**（阿里云 LNMP 通常自带；若只有 Node，请告知改 Node 版）。
- `assets/data/` 目录需**可写**（`chmod 755` 或保证 PHP 进程用户有写权限）。
- `admin/` 目录**不要**上传到公网临时预览（如 CloudStudio 静态托管会把 `.php` 当静态文件下载，暴露密码）；仅部署到自有服务器 `zhuoyunkeji.com`。

### 上线步骤
1. 上传整站到 `/var/www/zhuoyun`（含 `admin/`）。
2. 打开 `admin/config.php`，把 `ADMIN_PASS` 改成强密码。
3. 确保 `assets/data/content.json` 可写：`chmod 664 assets/data/content.json`（或相应目录权限）。
4. 浏览器访问 `https://www.zhuoyunkeji.com/admin/index.php` → 输入密码登录。
5. 在「招聘管理 / 公司动态」中点新增或编辑，填表保存，前台刷新即更新。

### 文件清单
- `assets/data/content.json` —— 招聘 + 动态数据（后台读写）
- `admin/config.php` —— 密码与路径配置（**部署必改密码**）
- `admin/index.php` —— 登录 + 管理界面
- `admin/save.php` —— 保存接口（含登录校验与文件写锁）

### 备注
- 资质证书、项目公示（zw_projects.json）等由技术侧维护，不在后台范围内。
- 若 `content.json` 损坏：删掉该文件，前端会自动回退到 `main.js` 内置静态数据，不影响浏览。
