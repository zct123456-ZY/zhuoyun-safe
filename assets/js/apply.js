(function(){
  'use strict';

  var form=document.getElementById('applyForm');
  var alertBox=document.getElementById('applyAlert');
  var fileInput=document.getElementById('resumeFile');
  var fileDrop=document.getElementById('fileDrop');
  var fileNameEl=document.getElementById('fileName');
  var jobInput=document.getElementById('applyJob');

  /* 从 URL 参数读取应聘岗位 */
  var params=new URLSearchParams(location.search);
  var jobFromUrl=params.get('job');
  if(jobFromUrl){
    jobInput.value=decodeURIComponent(jobFromUrl);
  }

  function showAlert(ok, text){
    alertBox.className='alert '+(ok?'ok':'err');
    alertBox.textContent=(ok?'✓ ':'⚠ ')+text;
  }

  function clearAlert(){
    alertBox.className='alert';
    alertBox.textContent='';
  }

  /* 文件选择/拖拽交互 */
  function setFileName(file){
    if(!file){
      fileNameEl.textContent='';
      fileDrop.classList.remove('has-file');
      return;
    }
    fileNameEl.textContent='已选择：'+file.name+'（'+(file.size/1024/1024).toFixed(2)+' MB）';
    fileDrop.classList.add('has-file');
  }

  if(fileInput){
    fileInput.addEventListener('change',function(){
      setFileName(fileInput.files[0]);
      clearAlert();
    });
  }

  if(fileDrop){
    ['dragenter','dragover','dragleave','drop'].forEach(function(evt){
      fileDrop.addEventListener(evt,function(e){e.preventDefault();e.stopPropagation();},false);
    });
    ['dragenter','dragover'].forEach(function(evt){
      fileDrop.addEventListener(evt,function(){fileDrop.classList.add('drag-over');},false);
    });
    ['dragleave','drop'].forEach(function(evt){
      fileDrop.addEventListener(evt,function(){fileDrop.classList.remove('drag-over');},false);
    });
    fileDrop.addEventListener('drop',function(e){
      var files=e.dataTransfer.files;
      if(files.length){
        fileInput.files=files;
        setFileName(files[0]);
        clearAlert();
      }
    },false);
  }

  if(!form) return;

  form.addEventListener('submit',function(e){
    e.preventDefault();
    clearAlert();

    var fd=new FormData(form);
    var job=(fd.get('job')||'').trim();
    var name=(fd.get('name')||'').trim();
    var phone=(fd.get('phone')||'').trim();
    var email=(fd.get('email')||'').trim();
    var salary=(fd.get('salary')||'').trim();
    var intro=(fd.get('intro')||'').trim();
    var file=fileInput && fileInput.files[0];

    var errs=[];
    if(!job) errs.push('请填写应聘岗位');
    if(name.length<2) errs.push('请填写正确的姓名');
    if(!/^1[3-9]\d{9}$/.test(phone)) errs.push('请填写有效的11位手机号');
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.push('邮箱格式不正确');
    if(!file) errs.push('请上传简历附件');
    if(file && file.size>10*1024*1024) errs.push('简历附件大小不能超过 10 MB');

    if(errs.length){
      showAlert(false, errs[0]);
      return;
    }

    /* 组装邮件内容（mailto 方式，静态站无后端时最实用） */
    var subject='应聘 '+job+' — '+name;
    var body='尊敬的卓云安全招聘负责人：\n\n'
           + '我想应聘贵公司「'+job+'」岗位，个人信息如下：\n\n'
           + '姓名：'+name+'\n'
           + '手机号：'+phone+'\n'
           + '邮箱：'+email+'\n'
           + (salary?'期望薪资：'+salary+'\n':'')
           + '\n自我介绍 / 求职意向：\n'+(intro||'（详见简历附件）')+'\n\n'
           + '简历附件：'+file.name+'\n\n'
           + '请查收附件，期待您的回复。\n';

    var mailto='mailto:contact@zhuoyunkeji.com?subject='+encodeURIComponent(subject)
             +'&body='+encodeURIComponent(body);

    showAlert(true, '已生成邮件，请在新打开的邮件窗口中确认「'+file.name+'」已作为附件添加后发送。');

    /* 延迟唤起邮件客户端，让用户看到提示 */
    setTimeout(function(){
      window.location.href=mailto;
    }, 400);
  });
})();
