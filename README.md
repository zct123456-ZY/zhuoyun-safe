# 云密安 · 商用密码检测有限公司 官网（纯静态站点）

一个**零依赖、纯静态**的企业官网，用于展示商用密码检测（密评 / 密改 / 密码咨询 / 跨境数据合规 / AI 安全测评）机构的服务能力。
所有页面、样式、脚本、图标均为本地文件，**不依赖任何外部 CDN**，可直接用 VS Code 编辑、用 GitHub Pages 免费上线。

---

## 一、目录结构（整套代码文件）

```
website/
├── index.html              首页（Hero / 核心业务 / 区位优势 / 数据 / 流程 / 新闻 / CTA）
├── about.html              关于我们（使命愿景 / 发展历程 / 团队）
├── services.html           服务业务（6 大能力 + 标签页筛选）
├── solutions.html          行业解决方案（政务 / 金融 / 医疗 / 能源 / 工控 / 跨境）
├── cases.html              资质与案例（脱敏示例 + 资质体系）
├── contact.html            联系我们（带前端校验的表单，可对接 Formspree 收件）
├── assets/
│   ├── css/style.css       全局样式（简洁大气商务蓝视觉系统）
│   ├── js/main.js          交互脚本（导航 / 滚动动画 / 表单 / 返回顶部）
│   └── img/
│       ├── logo.svg        品牌 logo
│       └── favicon.svg     站点图标
├── .nojekyll               告诉 GitHub Pages 不要走 Jekyll 处理（保证所有文件原样发布）
└── README.md               本说明文件
```

> 所有页面间使用**相对路径**（如 `assets/css/style.css`、`services.html`），因此整个 `website/` 文件夹可整体拷贝、打包、部署，无需改代码 —— 也正是"格式可适应上传"的关键。

---

## 二、用 VS Code 打开并修改（本地编辑）

1. 安装 [VS Code](https://code.visualstudio.com/)（免费）。
2. 打开 VS Code → `文件 / 打开文件夹` → 选择本目录 `website/`。
3. 左侧文件树点击任意 `.html` 即可编辑文字；`assets/css/style.css` 改样式。
4. 想要"边改边看"：安装扩展 **Live Server** → 右键 `index.html` → `Open with Live Server`，浏览器自动刷新预览。
5. 中文排版已用系统字体（微软雅黑 / PingFang），无需额外装字体。

---

## 三、上传到 GitHub Pages（完整 6 步）

> 前提：注册一个 [GitHub](https://github.com) 账号（免费）。

**第 1 步｜在 GitHub 新建仓库**
- 右上角 `+` → `New repository`。
- 仓库名建议用 `<你的用户名>.github.io`（这是"用户页"，访问地址就是 `https://<用户名>.github.io`）；
  也可以用任意名字（这是"项目页"，地址为 `https://<用户名>.github.io/<仓库名>/`）。
- 选 **Public**（私有仓库 Pages 需付费），其余默认，点 `Create repository`。

**第 2 步｜把 website/ 内的文件放进去**
两种方式任选其一：

- **方式 A（最简单，无需 Git 命令）**：进入新建的仓库 → `Add file` → `Upload files` → 把 `website/` 目录下**所有文件和文件夹**拖进去（含隐藏的 `.nojekyll`）→ 写提交说明 `init site` → `Commit changes`。
- **方式 B（VS Code + Git）**：在 VS Code 终端执行
  ```bash
  cd website
  git init
  git add .
  git commit -m "init site"
  git branch -M main
  git remote add origin https://github.com/<你的用户名>/<仓库名>.git
  git push -u origin main
  ```

**第 3 步｜开启 GitHub Pages**
- 仓库页 → `Settings`（右上角）→ 左侧 `Pages`。
- `Build and deployment` → `Source` 选 **Deploy from a branch**。
- `Branch` 选 `main`（或你推送的分支），目录选 **/ (root)**（因为我们把文件放在仓库根；若放在 `docs/` 则选 `/docs`）→ `Save`。

**第 4 步｜等待发布**
- 约 1–2 分钟后，页面顶部会出现绿色提示 `Your site is published at https://...`。
- 浏览器打开该地址即可访问。如为"项目页"，注意地址带仓库名，例如 `https://用户名.github.io/website/`。

**第 5 步｜（可选）绑定自己的域名**
- 在 `Pages` 设置里的 `Custom domain` 填入你的域名（如 `www.yuncrypt.com`），按提示去域名解析商添加 `CNAME` / `A` 记录。
- GitHub 会自动签发 HTTPS 证书，约数十分钟生效。

**第 6 步｜后续更新**
- 改完文件后，方式 A 直接重新 `Upload files`；方式 B 重新 `git add . && git commit -m "update" && git push`。
- GitHub Pages 会自动重新构建发布（通常 < 1 分钟）。

---

## 四、让"联系我们"表单真正收件（GitHub Pages 无后端）

GitHub Pages 只能托管静态文件，**表单本身不会把数据发到你邮箱**。本站已预留 Formspree 对接：

1. 打开 https://formspree.io ，免费注册并 `New form`，得到形如 `https://formspree.io/f/abcdwxyz` 的地址。
2. 用 VS Code 打开 `contact.html`，把两处 `YOUR_FORM_ID` 替换成你真实的 ID（即把 `https://formspree.io/f/YOUR_FORM_ID` 改成 `https://formspree.io/f/abcdwxyz`）。
3. 保存、按第三步上传。**未替换时表单走"演示成功"逻辑，不会真正发送**（页面会提示），不影响站点展示。
4. 其他可选方案：Getform、Web3Forms，或自建 Serverless 函数（Vercel/Netlify Functions）。

---

## 五、改成你自己的内容（5 处必改）

1. **公司名 / 品牌**：全局搜索 `云密安` 与 `YUNCRYPT` 替换为实际名称；替换 `assets/img/logo.svg` 与 `favicon.svg`（用任意 SVG 编辑器或让 AI 生成）。
2. **联系方式**：编辑各页 `<footer>` 与 `contact.html` 中的地址、电话 `400-XXX-XXXX`、邮箱 `contact@yuncrypt.example`。
3. **配色**：修改 `assets/css/style.css` 顶部 `:root` 的 CSS 变量（`--navy` / `--blue` / `--sky` 等）即可整体换色，无需动 HTML。
4. **文案与案例**：直接在对应 `.html` 中改中文；案例数字为脱敏示例，请替换为真实可公开数据。
5. **新增页面**：复制任一 `.html`，改 `<title>` 与内容，并在各页 `<nav class="nav-links">` 中补一条 `<a>` 链接。

---

## 六、技术说明 & 常见问题

- 前端栈：原生 HTML5 + CSS3 + 原生 JavaScript，**无框架、无构建步骤、无第三方依赖**，上传即用。
- 响应式：桌面 / 平板 / 手机自适应；移动端含汉堡菜单。
- 页面空白 / 样式丢失？多半是路径问题 —— 确保 `style.css`、`main.js`、`img` 都随 `index.html` 一起上传，且保持相对路径结构不变。
- 想本地先预览？在 `website/` 目录执行 `python -m http.server 8080`，浏览器开 `http://localhost:8080` 即可。
- 合规声明：示例站引用的《密码法》《商用密码管理条例》《GB/T 39786 / 43206》等均为公开标准；正式上线前请确保资质、案例、数据表述真实合规。

---

© 云密安商用密码检测有限公司（示例网站，可自由替换为实际信息）
