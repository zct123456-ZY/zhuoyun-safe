<?php
session_start();
require_once __DIR__ . '/config.php';

$msg = '';
if (isset($_POST['pass'])) {
    if ($_POST['pass'] === ADMIN_PASS) {
        $_SESSION['auth'] = true;
        header('Location: ' . basename(__FILE__));
        exit;
    } else {
        $msg = '密码错误';
    }
}
if (isset($_GET['logout'])) {
    unset($_SESSION['auth']);
    header('Location: ' . basename(__FILE__));
    exit;
}

$loggedIn = !empty($_SESSION['auth']);
$jobs = [];
$news = [];
if ($loggedIn && is_file(CONTENT_FILE)) {
    $c = json_decode(file_get_contents(CONTENT_FILE), true);
    $jobs = isset($c['jobs']) ? $c['jobs'] : [];
    $news = isset($c['news']) ? $c['news'] : [];
}
?>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>卓云安全 · 内容管理后台</title>
<style>
  * { box-sizing: border-box; }
  body { margin: 0; font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
    background: #f4f7f9; color: #1f2d3a; font-size: 14px; }
  .top { background: #0F3B3A; color: #fff; padding: 14px 22px; display: flex;
    justify-content: space-between; align-items: center; }
  .top a { color: #B8C4CC; text-decoration: none; }
  main { max-width: 960px; margin: 22px auto; padding: 0 16px; }
  .sec-head { display: flex; justify-content: space-between; align-items: center; margin: 22px 0 10px; }
  .sec-head h2 { margin: 0; font-size: 17px; color: #0F3B3A; }
  .list { width: 100%; border-collapse: collapse; background: #fff; border-radius: 10px; overflow: hidden;
    box-shadow: 0 1px 3px rgba(13,43,69,.06); }
  .list th, .list td { border-bottom: 1px solid #eef2f5; padding: 10px 12px; text-align: left; vertical-align: top; }
  .list th { background: #E4EDEC; color: #1F5A55; font-weight: 600; font-size: 13px; }
  .list td.title { font-weight: 600; color: #0F3B3A; max-width: 360px; }
  .list .op a { margin-right: 10px; color: #3E8C84; cursor: pointer; text-decoration: none; }
  .list .op a.del { color: #c0392b; }
  .btn { border: none; border-radius: 8px; padding: 8px 16px; cursor: pointer; font-size: 14px; }
  .btn.add { background: #2C7A74; color: #fff; }
  .btn.save { background: #2C7A74; color: #fff; }
  .btn.cancel { background: #e2e8ed; color: #465; }
  /* 登录 */
  .login { max-width: 340px; margin: 12vh auto; background: #fff; padding: 28px; border-radius: 14px;
    box-shadow: 0 4px 20px rgba(13,43,69,.1); text-align: center; }
  .login h1 { font-size: 19px; color: #0F3B3A; margin: 0 0 16px; }
  .login input { width: 100%; padding: 11px 12px; border: 1px solid #d6dee4; border-radius: 8px; margin-bottom: 12px; font-size: 15px; }
  .login .btn { width: 100%; background: #2C7A74; color: #fff; }
  .err { color: #c0392b; margin: 0 0 10px; }
  /* 编辑抽屉 */
  .editor { position: fixed; top: 0; right: 0; width: 420px; max-width: 92vw; height: 100%; background: #fff;
    box-shadow: -4px 0 20px rgba(0,0,0,.12); padding: 20px; overflow-y: auto; display: none; }
  .editor.show { display: block; }
  .editor h3 { margin: 0 0 14px; color: #0F3B3A; }
  .editor label { display: block; font-size: 12.5px; color: #556; margin: 10px 0 4px; }
  .editor input, .editor textarea { width: 100%; padding: 9px 10px; border: 1px solid #d6dee4; border-radius: 7px;
    font-size: 13.5px; font-family: inherit; }
  .editor textarea { min-height: 90px; resize: vertical; }
  .editor .foot { margin-top: 18px; display: flex; gap: 10px; }
  .hint { font-size: 12px; color: #8a99a6; margin: 2px 0 0; }
  .status { margin: 8px 0; font-size: 13px; min-height: 18px; }
  .status.ok { color: #1e8449; }
  .status.err { color: #c0392b; }
</style>
</head>
<body>

<?php if (!$loggedIn): ?>
  <div class="login">
    <h1>内容管理后台</h1>
    <?php if ($msg): ?><p class="err"><?= htmlspecialchars($msg) ?></p><?php endif; ?>
    <form method="post">
      <input type="password" name="pass" placeholder="请输入管理密码" required autofocus>
      <button class="btn">登录</button>
    </form>
  </div>
<?php else: ?>
  <header class="top">
    <strong>卓云安全 · 内容管理后台</strong>
    <a href="?logout=1">退出登录</a>
  </header>

  <main>
    <p class="hint">提示：修改后前台刷新即生效（静态站无需重启）。招聘与动态数据由此维护；资质证书、项目公示等由技术侧管理。</p>

    <div class="sec-head">
      <h2>招聘管理</h2>
      <button class="btn add" data-add="jobs">+ 新增招聘</button>
    </div>
    <table class="list">
      <thead><tr><th>岗位</th><th>薪资</th><th>地点</th><th>操作</th></tr></thead>
      <tbody id="jobsBody"></tbody>
    </table>

    <div class="sec-head">
      <h2>公司动态 / 公告</h2>
      <button class="btn add" data-add="news">+ 新增动态</button>
    </div>
    <table class="list">
      <thead><tr><th>标题</th><th>日期</th><th>分类</th><th>操作</th></tr></thead>
      <tbody id="newsBody"></tbody>
    </table>
  </main>

  <div id="editor" class="editor">
    <h3 id="editorTitle">编辑</h3>
    <div id="editorForm"></div>
    <div class="status" id="editorStatus"></div>
    <div class="foot">
      <button class="btn save" id="editorSave">保存</button>
      <button class="btn cancel" id="editorCancel">取消</button>
    </div>
  </div>

  <script>
    var DATA = {
      jobs: <?= json_encode($jobs, JSON_UNESCAPED_UNICODE) ?>,
      news: <?= json_encode($news, JSON_UNESCAPED_UNICODE) ?>
    };
    var editing = { type: null, id: null };

    var FIELDS = {
      jobs: [
        {k:'title', label:'岗位名称', type:'text'},
        {k:'salary', label:'薪资', type:'text'},
        {k:'location', label:'工作地点', type:'text'},
        {k:'type', label:'工作类型', type:'text'},
        {k:'deadline', label:'截止/有效期', type:'text'},
        {k:'date', label:'发布日期', type:'text'},
        {k:'tags', label:'标签（逗号分隔）', type:'text'},
        {k:'summary', label:'一句话简介', type:'textarea'},
        {k:'body', label:'详细内容（支持 HTML）', type:'textarea'}
      ],
      news: [
        {k:'date', label:'发布日期', type:'text'},
        {k:'cat', label:'分类 key（announcement/company/industry）', type:'text'},
        {k:'catLabel', label:'分类名称', type:'text'},
        {k:'title', label:'标题', type:'text'},
        {k:'summary', label:'摘要', type:'textarea'},
        {k:'body', label:'正文（支持 HTML）', type:'textarea'}
      ]
    };

    function esc(s){ return (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    function render(){
      var jb = document.getElementById('jobsBody');
      jb.innerHTML = DATA.jobs.map(function(j){
        return '<tr><td class="title">'+esc(j.title)+'</td><td>'+esc(j.salary)+'</td><td>'+esc(j.location)+'</td>'
          + '<td class="op"><a data-edit="jobs" data-id="'+esc(j.id)+'">编辑</a>'
          + '<a class="del" data-del="jobs" data-id="'+esc(j.id)+'">删除</a></td></tr>';
      }).join('') || '<tr><td colspan="4" style="color:#8a99a6">暂无岗位</td></tr>';

      var nb = document.getElementById('newsBody');
      nb.innerHTML = DATA.news.map(function(n){
        return '<tr><td class="title">'+esc(n.title)+'</td><td>'+esc(n.date)+'</td><td>'+esc(n.catLabel)+'</td>'
          + '<td class="op"><a data-edit="news" data-id="'+esc(n.id)+'">编辑</a>'
          + '<a class="del" data-del="news" data-id="'+esc(n.id)+'">删除</a></td></tr>';
      }).join('') || '<tr><td colspan="4" style="color:#8a99a6">暂无动态</td></tr>';
    }

    function openEditor(type, id){
      editing = { type: type, id: id || null };
      var list = DATA[type];
      var item = id ? list.filter(function(x){ return String(x.id)===String(id); })[0] : {};
      document.getElementById('editorTitle').textContent = (id ? '编辑' : '新增') + (type==='jobs' ? '招聘' : '动态');
      var html = '';
      FIELDS[type].forEach(function(f){
        var val = item[f.k] != null ? (Array.isArray(item[f.k]) ? item[f.k].join(',') : item[f.k]) : '';
        html += '<label>'+f.label+'</label>';
        if (f.type === 'textarea') {
          html += '<textarea data-k="'+f.k+'">'+esc(val)+'</textarea>';
        } else {
          html += '<input data-k="'+f.k+'" value="'+esc(val)+'">';
        }
      });
      document.getElementById('editorForm').innerHTML = html;
      document.getElementById('editorStatus').textContent = '';
      document.getElementById('editor').classList.add('show');
    }

    function closeEditor(){ document.getElementById('editor').classList.remove('show'); }

    function collectItem(type){
      var item = {};
      document.querySelectorAll('#editorForm [data-k]').forEach(function(el){
        var k = el.getAttribute('data-k');
        var v = el.value;
        if (k === 'tags') {
          item[k] = v.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
        } else {
          item[k] = v;
        }
      });
      if (editing.id) item.id = editing.id;
      return item;
    }

    function save(){
      var type = editing.type;
      var item = collectItem(type);
      var st = document.getElementById('editorStatus');
      st.className = 'status'; st.textContent = '保存中…';
      fetch('save.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ type: type, action: 'save', item: item })
      }).then(function(r){ return r.json(); }).then(function(res){
        if (res.ok) {
          st.className = 'status ok'; st.textContent = '已保存，刷新前台即可见';
          // 本地更新
          if (editing.id) {
            DATA[type] = DATA[type].map(function(x){ return String(x.id)===String(editing.id) ? item : x; });
          } else {
            DATA[type].push(item);
          }
          render();
          setTimeout(closeEditor, 600);
        } else {
          st.className = 'status err'; st.textContent = res.msg || '保存失败';
        }
      }).catch(function(){ st.className = 'status err'; st.textContent = '网络错误'; });
    }

    function del(type, id){
      if (!confirm('确定删除该条目？')) return;
      fetch('save.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ type: type, action: 'delete', id: id })
      }).then(function(r){ return r.json(); }).then(function(res){
        if (res.ok) {
          DATA[type] = DATA[type].filter(function(x){ return String(x.id) !== String(id); });
          render();
        } else {
          alert(res.msg || '删除失败');
        }
      });
    }

    document.addEventListener('click', function(e){
      var t = e.target;
      if (t.dataset && t.dataset.add) openEditor(t.dataset.add, null);
      else if (t.dataset && t.dataset.edit) openEditor(t.dataset.edit, t.dataset.id);
      else if (t.dataset && t.dataset.del) del(t.dataset.del, t.dataset.id);
    });
    document.getElementById('editorSave').addEventListener('click', save);
    document.getElementById('editorCancel').addEventListener('click', closeEditor);

    render();
  </script>
<?php endif; ?>
</body>
</html>
