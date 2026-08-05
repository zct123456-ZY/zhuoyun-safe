// 卓云安全 · 交互（高端简约版）
(function(){
  'use strict';

  /* ===== 业务详情数据 ===== */
  var SERVICES = {
    A:{tag:'A 类 · 商用密码应用安全性评估', title:'商用密码应用安全性评估（密评）',
      desc:'依据 GB/T 39786-2021《信息安全技术 信息系统密码应用基本要求》等标准，对信息系统密码应用进行合规性、正确性与有效性评估，出具密评报告。',
      items:['密码应用合规性评估（物理环境、通信网络、计算环境、应用与数据）','密码应用正确性评估（密码技术实现、密钥管理）','密码应用有效性评估（抗攻击能力、防护成效）','密评方案编制、现场测评与密评报告出具'],
      std:['GB/T 39786-2021','GB/T 43206-2023','GM/T 0116-2021','密码法 / 商用密码管理条例']},
    B:{tag:'B 类 · 密码应用方案设计与咨询', title:'密码应用方案设计与咨询',
      desc:'协助客户编制密码应用方案，开展密码应用合规性差距分析、整改设计与技术咨询，支撑密评顺利通过。',
      items:['密码应用方案（建设 / 改造）编制与评审支撑','密码应用合规性差距分析与整改设计','密码产品选型与密钥管理体系设计','密评前预评估与整改咨询'],
      std:['GB/T 39786-2021','GB/T 43206-2023','信息系统密码应用设计指南']},
    C:{tag:'C 类 · 信息系统等保测评', title:'信息系统安全等级保护测评',
      desc:'依据网络安全等级保护制度，对云计算、移动互联网、物联网等信息系统开展等保定级、测评与整改咨询。',
      items:['等保定级备案咨询与协助','等级保护测评（安全物理环境至安全建设管理）','等保整改方案设计与落地支撑','关键信息基础设施安全保护咨询'],
      std:['GB/T 22239-2019','GB/T 28448-2019','网络安全等级保护条例']},
    D:{tag:'D 类 · 商用密码产品检测', title:'商用密码产品（模组）检测',
      desc:'面向商用密码产品、安全模组及密码应用系统，提供功能性、安全性与合规性检测服务，支撑产品上市与合规。',
      items:['商用密码产品功能与安全性检测','密码模组 / 软件密码模块合规性检测','密码应用系统安全性检测','商密产品检测报告出具'],
      std:['GM/T 0028','GB/T 37092','商用密码产品检测规范']},
    E:{tag:'E 类 · 合规咨询与培训', title:'密码安全合规咨询与培训',
      desc:'面向关基运营者、政务与行业客户，提供密码安全合规体系建设咨询、密评政策解读与专业技术培训。',
      items:['密码安全合规体系规划与建设咨询','密评 / 等保政策解读与迎评辅导','密码技术人员专项培训与认证辅导','行业密码应用最佳实践分享'],
      std:['密码法','商用密码管理条例','关基密码使用管理规定']},
    F:{tag:'F 类 · 行业专项密评', title:'政务 / 金融 / 医疗 / 工控 / 云专项密评',
      desc:'面向重点行业信息系统，提供贴合业务场景的密码应用安全性评估专项服务，覆盖政务云、金融科技、智慧医疗、工业互联网等。',
      items:['政务云 / 政务信息系统密评','金融核心系统与支付密评','医疗 HIS / 影像云密评','工业互联网与工控系统密评','云平台与租户密评'],
      std:['GB/T 39786-2021','行业密码应用指引','云计算 / 工控密码应用要求']}
  };

  /* ===== 公告数据 =====
     字段对齐老站后台「报告系统 CMS」接口 index/get_article_list：
       id      <- 后台 article.id
       date    <- 后台 fb_dt（发布日期，如 2026-07）
       cat     <- 栏目：announcement 资质公告 / company 公司动态 / industry 行业资讯
                  （对应老站 lmid 4 / 2 / 1）
       catLabel<- 栏目中文名
       title   <- 后台 title
       summary <- 后台 zhaiy（摘要）
       body    <- 正文 HTML（后台详情，可含 pic 配图）
     等后台恢复/导出真实数据后，把下面数组替换为真实公告即可；
     或调用 fetchNews() 直接拉取后台接口（见下方预留函数）。
  */
  var NEWS = [
    {id:1, date:'2026-07', cat:'announcement', catLabel:'资质公告',
     title:'卓云安全顺利通过商用密码检测机构资质评审',
     summary:'2026 年 7 月，公司商用密码检测相关资质能力通过评审，可正式开展商用密码应用安全性评估与密码产品检测业务。',
     body:'<p>2026 年 7 月，公司商用密码检测相关资质能力顺利通过评审，检测与服务范围覆盖商用密码应用安全性评估、密码应用方案设计咨询及商用密码产品检测等方向，资质持续有效。</p><p>此次评审进一步验证了公司质量管理体系的合规性与密码技术能力的专业性，可继续为政务、金融、医疗等行业客户提供合规、可信的密评服务。</p>'},
    {id:2, date:'2026-05', cat:'announcement', catLabel:'资质公告',
     title:'入选商用密码应用安全性评估服务机构名录',
     summary:'2026 年 5 月，公司入选商用密码应用安全性评估服务机构名录，具备面向社会开展密评业务的法定资格。',
     body:'<p>2026 年 5 月，公司正式入选商用密码应用安全性评估服务机构名录。</p><p>作为云南省重要的商用密码检测服务机构，公司将依据《密码法》《商用密码管理条例》及 GB/T 39786-2021 等标准，为关键信息基础设施运营者及重要信息系统提供规范的密码应用安全性评估服务。</p>'},
    {id:3, date:'2026-03', cat:'company', catLabel:'公司动态',
     title:'密评技术团队完成 GB/T 39786-2021 专项能力升级',
     summary:'2026 年 3 月，公司密评技术团队完成新一轮标准培训与实操能力建设，覆盖政务云、金融、医疗等场景。',
     body:'<p>2026 年 3 月，公司密评技术团队完成 GB/T 39786-2021《信息系统密码应用基本要求》及 GB/T 43206-2023 等配套标准的专项培训与实操能力建设。</p><p>至此，公司已具备覆盖政务云、金融科技、智慧医疗、工业互联网等多场景的密评交付能力，进一步完善“一站式”密码安全服务体系。</p>'},
    {id:4, date:'2026-01', cat:'company', catLabel:'公司动态',
     title:'2026 年春节假期密评项目交付与应急响应安排通知',
     summary:'2026 年春节期间安排专人值班，保障密评报告交付与密码应用应急咨询。',
     body:'<p>2026 年春节期间，公司安排专人值班，保障密评报告交付、密码应用方案咨询等紧急项目的应急响应。</p><p>常规密评项目可提前预约排期，具体请联系业务咨询电话 <strong>0871-00000000</strong>。</p>'},
    {id:5, date:'2023-03-07', cat:'company', catLabel:'公司动态',
     title:'承诺书',
     summary:'公司就密评活动的公正性、独立性及服务质量向社会作出公开承诺。',
     body:'<p>为确保商用密码应用安全性评估活动的公正性、独立性和科学性，公司向社会各界作出如下公开承诺：</p><ul><li>严格遵守《密码法》《商用密码管理条例》及相关标准，独立开展密评活动，不受任何行政、商业、财务或其他方面的不当压力与影响；</li><li>坚持科学、公正、准确、及时的质量方针，确保密评数据与结论的真实、客观、可追溯；</li><li>保护客户秘密和所有权，对密评过程中获取的信息严格保密；</li><li>持续改进质量管理体系，不断提升技术能力与服务质量。</li></ul><p>欢迎客户及社会各界监督。</p>'},
    {id:6, date:'2023-01-03', cat:'company', catLabel:'公司动态',
     title:'公正性声明',
     summary:'公司发布公正性声明，重申密评工作的独立性、客观性与社会责任。',
     body:'<p>云南卓云信息安全科技有限公司郑重声明：</p><p>本公司及其人员在从事商用密码应用安全性评估活动时，恪守第三方公正立场，不与所从事的密评活动及出具的数据和结果存在利益关系；不参与任何有损于密评判断的独立性和诚信度的活动；不发表任何有损密评结果公正性的言论。</p><p>公司建立并持续运行完善的管理体系，确保密评活动的客观、公正、科学、准确，并承担相应的社会责任。</p>'}
  ];

  /* ===== 招聘信息数据 ===== */
  var JOBS = [
    /* —— 密评岗位（示例占位，后续替换为真实招聘） —— */
    {id:'j1', title:'密码测评工程师', salary:'8000–15000 元/月', date:'2026-08-04', deadline:'招满即止',
     location:'昆明', type:'全职',
     tags:['密评','密码应用','GB/T 39786','测评报告'],
     summary:'负责信息系统商用密码应用安全性评估，编制密评方案与报告，熟悉 GB/T 39786-2021 等标准。',
     body:'<h4>岗位职责</h4><ul><li>负责信息系统商用密码应用安全性评估（密评）项目实施；</li><li>编制密评方案、开展现场测评、撰写密评报告；</li><li>协助客户开展密码应用差距分析与整改设计；</li><li>跟踪密评相关标准与政策动态。</li></ul><h4>任职要求</h4><ul><li>本科及以上学历，密码学、信息安全、计算机相关专业；</li><li>熟悉 GB/T 39786-2021、GM/T 0116-2021 等标准；</li><li>持有商用密码应用安全性评估从业人员考核证书者优先；</li><li>具备等保测评、安全咨询经验者优先。</li></ul><h4>薪酬福利</h4><p>月薪 8000–15000 元，五险一金，带薪年假，项目奖金，专业培训与晋升通道。</p>'},
    {id:'j2', title:'网络安全 / 等保测评工程师', salary:'7000–13000 元/月', date:'2026-08-04', deadline:'招满即止',
     location:'昆明', type:'全职',
     tags:['等保测评','网络安全','GB/T 22239'],
     summary:'负责信息系统等级保护测评与网络安全评估，熟悉等保 2.0 标准与测评流程。',
     body:'<h4>岗位职责</h4><ul><li>负责信息系统网络安全等级保护测评实施；</li><li>编制等保测评报告、差距分析与整改建议；</li><li>开展网络安全风险评估与合规咨询；</li><li>配合密评项目协同交付。</li></ul><h4>任职要求</h4><ul><li>本科及以上学历，信息安全、网络工程相关专业；</li><li>熟悉 GB/T 22239-2019、GB/T 28448-2019 等标准；</li><li>持有 CISP、CISAW 或等保测评相关证书者优先；</li><li>具备安全服务经验者优先。</li></ul><h4>薪酬福利</h4><p>月薪 7000–13000 元，五险一金，带薪年假，项目奖金。</p>'},
    {id:'j3', title:'专职业务员（密码安全业务）', salary:'底薪+提成（12%）+补贴，业务稳定后 8000 元以上/月', date:'2026-08-04', deadline:'长期有效',
     location:'云南省内', type:'全职',
     tags:['市场销售','密评业务','等保业务'],
     summary:'负责商用密码应用安全性评估、等保测评等业务的市场开拓与客户维护。',
     body:'<h4>岗位职责</h4><ul><li>负责云南区域内密评、等保测评、密码咨询等业务的市场开拓；</li><li>开发并维护政务、金融、医疗、工业企业等客户资源；</li><li>跟进项目投标、合同签订、回款及客户回访；</li><li>收集市场信息，反馈客户需求，协助优化服务方案。</li></ul><h4>任职要求</h4><ul><li>大专及以上学历，专业不限，有信息安全、检测、咨询行业销售经验者优先；</li><li>具备良好的商务谈判能力、抗压能力及客户服务意识；</li><li>能适应云南省内出差，持有 C1 驾照者优先；</li><li>结果导向，勇于挑战高薪。</li></ul><h4>薪酬福利</h4><p>底薪+提成（12%）+补贴，业务稳定后月收入 8000 元以上；五险一金，带薪年假，业绩奖金，晋升空间广阔。</p>'}
  ];

  /* ===== 公正性声明数据（迁移自老站「公正性声明」栏目） =====
     老站原址：http://www.zhuoyunkeji.com/#/impartiality 或「公正性声明」栏目
     因原站点已暂停，正文依据检测机构通用公正性声明及公司公开信息整理；
     如需替换为法务审定原文，直接修改下方 body 字段即可。
  */
  var IMPARTIALITY=[
    {id:'imp1', date:'2025-05-06', company:'云南卓云信息安全科技有限公司',
     summary:'本公司及其人员独立、公正地开展检验检测活动，不受任何行政、商业、财务及其他不当因素影响，确保检测数据和结果客观、准确、可追溯。',
     body:'<p>为确保检验检测活动的公正性、独立性和科学性，云南卓云信息安全科技有限公司郑重声明：</p>'
        +'<ul><li>本公司及其人员在从事检验检测活动时，恪守第三方公正立场，不与所从事的检测活动及出具的数据和结果存在利益关系；</li>'
        +'<li>不受任何可能干扰技术判断因素的行政、商业、财务或其他方面的不当压力和影响；</li>'
        +'<li>不参与任何有损于检测判断独立性和诚信度的活动，不发表任何有损检测结果公正性的言论；</li>'
        +'<li>严格遵守国家法律法规、标准规范及资质认定要求，保证检测方法科学、数据准确、结论可靠；</li>'
        +'<li>保护客户秘密和所有权，对在检测活动中获取的国家秘密、商业秘密和技术资料严格保密；</li>'
        +'<li>持续改进管理体系，不断提升技术能力，承担相应的社会责任，诚恳接受社会各界的监督。</li></ul>'
        +'<p>本声明自发布之日起生效。</p>'},
    {id:'imp2', date:'2023-12-04', company:'云南卓云信息安全科技有限公司',
     summary:'云南卓云信息安全科技有限公司承诺以科学、公正、准确、及时为原则，独立开展商用密码应用安全性评估等密码安全服务，保障客户权益。',
     body:'<p>云南卓云信息安全科技有限公司就密码安全服务的公正性作出如下声明：</p>'
        +'<ul><li>本公司作为独立第三方技术服务机构，严格遵守《密码法》《商用密码管理条例》《检验检测机构资质认定管理办法》等法律法规，独立、客观地开展商用密码应用安全性评估等密码安全服务；</li>'
        +'<li>在技术服务过程中不受任何行政、商业、经济及其他外部因素的不当干预，确保评价与检测结论的真实、公正、科学；</li>'
        +'<li>技术服务人员不得参与与自身有利害关系的项目，不得利用客户技术资料从事有损公正性的活动；</li>'
        +'<li>对客户的技术资料、经营信息和检测结果严格保密，切实保护客户知识产权和商业秘密；</li>'
        +'<li>建立并持续运行公正性风险识别机制，主动识别、分析和消除可能影响公正性的因素；</li>'
        +'<li>诚恳接受客户、监管部门及社会各界的监督与投诉。</li></ul>'
        +'<p>本声明自发布之日起生效。</p>'}
  ];

  /* ===== 项目公示数据 =====
     来源：密评项目占位数据（示例），接入后台后替换
     截图中可见的条目已录入；完整数据待后台恢复后替换或启用 fetchProjects()。
  */
  /* 密评项目公示占位数据（示例，用于展示框架功能）
     待真实项目数据就绪后，替换本数组，或启用 fetchProjects() 对接后台。 */
  var PROJECTS = [
    {id:'p1', date:'2026-07-15', cat:'zx-a', catLabel:'密评项目 · 卓云', title:'某省级政务云平台密码应用安全性评估',
     summary:'政务云信息系统商用密码应用安全性评估示例，覆盖物理环境、通信网络、计算环境、应用与数据。',
     body:'<p>该项目为某省级政务云平台开展商用密码应用安全性评估（密评），依据 GB/T 39786-2021 等标准，完成密码应用合规性、正确性与有效性评估，出具密评报告。</p><p>如需了解具体服务，请联系业务电话 <strong>0871-00000000</strong>。</p>'},
    {id:'p2', date:'2026-06-20', cat:'zx-a', catLabel:'密评项目 · 卓云', title:'某商业银行核心系统密码应用评估',
     summary:'金融核心系统密评示例，覆盖支付清算、密钥管理与商用密码产品检测。',
     body:'<p>该项目为某商业银行核心系统开展密评，重点评估支付清算链路的密码应用合规性与密钥管理体系，并配套商用密码产品检测。</p>'},
    {id:'p3', date:'2026-05-18', cat:'zx-a', catLabel:'密评项目 · 卓云', title:'某市人民医院 HIS 系统密评',
     summary:'医疗 HIS 系统密码应用评估示例，关注医疗数据加密与身份认证合规。',
     body:'<p>该项目为某市人民医院 HIS 系统开展密评，评估患者隐私数据加密、统一身份认证与影像云传输的密码应用合规性。</p>'},
    {id:'p4', date:'2026-04-22', cat:'zx-a', catLabel:'密评项目 · 卓云', title:'某工业互联网平台密码应用评估',
     summary:'工控 / 工业互联网密码应用评估示例，覆盖生产设备可信接入与控制网络安全。',
     body:'<p>该项目为某工业互联网平台开展密码应用评估，针对生产设备可信接入、控制网络数据安全与边缘节点身份鉴别给出整改方案。</p>'},
    {id:'p5', date:'2026-03-12', cat:'zx-a', catLabel:'密评项目 · 卓云', title:'某行业云租户侧密码应用评估',
     summary:'云平台及租户侧密评示例，覆盖云上密钥管理与多租户隔离合规。',
     body:'<p>该项目对某行业云平台的租户侧开展密评，评估云上密钥管理（KMS）、国密改造与多租户隔离的密码应用合规性。</p>'},
    {id:'p6', date:'2026-02-10', cat:'zx-a', catLabel:'密评项目 · 卓云', title:'某关键信息基础设施等保测评',
     summary:'关基信息系统等级保护测评示例，覆盖定级、测评与整改咨询。',
     body:'<p>该项目为某关键信息基础设施运营者开展等级保护测评，依据 GB/T 22239-2019 完成定级、测评与整改咨询，并衔接关基密码使用管理规定。</p>'},
    {id:'p7', date:'2026-01-15', cat:'zx-b', catLabel:'密评项目 · 合作', title:'某社保系统密码应用方案设计与咨询',
     summary:'合作项目示例：密码应用方案（建设 / 改造）编制与合规差距分析。',
     body:'<p>本合作项目为某社保系统编制密码应用方案，开展合规性差距分析与整改设计，支撑后续密评顺利通过。待真实数据就绪后替换。</p>'},
    {id:'p8', date:'2025-12-08', cat:'zx-b', catLabel:'密评项目 · 合作', title:'某高校统一身份认证平台密评',
     summary:'合作项目示例：统一身份认证平台密码应用安全性评估。',
     body:'<p>本合作项目为某高校统一身份认证平台开展密评，评估身份鉴别、单点登录与凭证保护的密码应用合规性。待真实数据就绪后替换。</p>'}
  ];

  /* 预留：从老站后台（报告系统）拉取真实公告
     后台接口：index/get_article_list?lmid=1/2/4
     返回结构：{data:[{id,title,zhaiy,fb_dt,pic}]}
     后台恢复后取消注释并填入后台域名即可启用：
     function fetchNews(apiBase){
       return fetch(apiBase+'/index/get_article_list?lmid=4')
         .then(r=>r.json())
         .then(res=> res.data.data.map(function(it){
            return {id:it.id, date:(it.fb_dt||'').slice(0,7), cat:'announcement',
                    catLabel:'资质公告', title:it.title, summary:it.zhaiy||'',
                    body:'<p>'+(it.zhaiy||'')+'</p>', pic:it.pic};
         }));
     }
  */
  /* 预留：从老站后台拉取真实项目列表
     function fetchProjects(apiBase){
       return Promise.all([1,4,2,3].map(function(lmid){
         return fetch(apiBase+'/index/get_article_list?lmid='+lmid).then(r=>r.json());
       })).then(function(resArr){
         var catMap={1:'zw-jc',4:'zw-fw',2:'company',3:'jobs'};
         var labelMap={1:'密评项目（卓云）',4:'密评项目（合作）',2:'公司动态',3:'人才招聘'};
         var out=[];
         resArr.forEach(function(res,idx){
           var lmid=[1,4,2,3][idx];
           (res.data.data||[]).forEach(function(it){
             out.push({id:'p'+it.id, date:it.fb_dt, cat:catMap[lmid], catLabel:labelMap[lmid],
                       title:it.title, summary:it.zhaiy||'', body:'<p>'+(it.zhaiy||'')+'</p>', pic:it.pic});
           });
         });
         return out.sort(function(a,b){return new Date(b.date)-new Date(a.date);});
       });
     }
  */

  /* ===== 滚动入场观察器（提前定义，供公告渲染使用） ===== */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});

  /* ===== 弹窗 ===== */
  var overlay=document.getElementById('modalOverlay');
  var mTag=document.getElementById('modalTag');
  var mTitle=document.getElementById('modalTitle');
  var mBody=document.getElementById('modalBody');
  var mClose=document.getElementById('modalClose');
  var lastFocus=null;

  function openModal(tag,title,bodyHtml){
    mTag.textContent=tag;
    mTitle.textContent=title;
    mBody.innerHTML=bodyHtml;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    lastFocus=document.activeElement;
    mClose.focus();
  }
  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  if(overlay){
    mClose.addEventListener('click',closeModal);
    overlay.addEventListener('click',function(e){if(e.target===overlay)closeModal();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&overlay.classList.contains('open'))closeModal();});
  }

  function svcHtml(d){
    var lis=d.items.map(function(i){return '<li>'+i+'</li>';}).join('');
    var stds=d.std.map(function(s){return '<span>'+s+'</span>';}).join('');
    return '<p>'+d.desc+'</p>'
      +'<h4>服务范围</h4><ul>'+lis+'</ul>'
      +'<h4>适用标准（节选）</h4><div class="m-meta">'+stds+'</div>';
  }

  /* ===== 公告时间线渲染 ===== */
  function newsCard(n){
    return '<button class="ann-card reveal" data-news="'+n.id+'">'
      + '<span class="ann-date">'+n.date+'</span>'
      + '<span class="ann-rail"><span class="ann-dot cat-'+n.cat+'"></span></span>'
      + '<span class="ann-main">'
        + '<span class="ann-tag cat-'+n.cat+'">'+n.catLabel+'</span>'
        + '<span class="ann-title">'+n.title+'</span>'
        + '<span class="ann-sum">'+n.summary+'</span>'
      + '</span>'
      + '<span class="ann-arrow"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span>'
      + '</button>';
  }
  function renderNews(container, list){
    if(!container) return;
    container.innerHTML = list.map(newsCard).join('');
    bindNewsClicks(container);
    if(window.IntersectionObserver){
      container.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
    }
  }
  function bindNewsClicks(scope){
    (scope||document).querySelectorAll('.ann-card').forEach(function(el){
      if(el.dataset.bound) return; el.dataset.bound='1';
      var id=el.getAttribute('data-news');
      var n=NEWS.filter(function(x){return String(x.id)===String(id);})[0];
      if(!n) return;
      function fire(){openModal(n.catLabel, n.title, (n.body||'<p>'+n.summary+'</p>'));}
      el.addEventListener('click',fire);
      el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fire();}});
    });
  }

  /* 业务卡片点击 */
  document.querySelectorAll('.svc.clickable[data-service]').forEach(function(el){
    var key=el.getAttribute('data-service');
    var d=SERVICES[key];
    if(!d)return;
    function fire(){openModal(d.tag,d.title,svcHtml(d));}
    el.addEventListener('click',fire);
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fire();}});
  });

  /* ===== 案例页「典型密评项目」关联密评项目公示 ===== */
  var PROJECT_TYPE_CONFIG={
    'gov-crypto':{tag:'密评项目公示',title:'政务系统密码应用安全性评估',emptyTips:'暂未收录到该类别的密评项目，可前往「信息公示」查看全部项目。',keywords:['政务','政务云','gov','电子政务']},
    'finance-crypto':{tag:'密评项目公示',title:'金融系统密码应用安全性评估',emptyTips:'暂未收录到该类别的密评项目，可前往「信息公示」查看全部项目。',keywords:['银行','金融','支付','信贷']},
    'medical-crypto':{tag:'密评项目公示',title:'医疗系统密码应用安全性评估',emptyTips:'暂未收录到该类别的密评项目，可前往「信息公示」查看全部项目。',keywords:['医院','医疗','卫生','his','影像云','医保']},
    'cloud-crypto':{tag:'密评项目公示',title:'云平台密码应用安全性评估',emptyTips:'暂未收录到该类别的密评项目，可前往「信息公示」查看全部项目。',keywords:['云','cloud','云平台','租户']},
    'ics-crypto':{tag:'密评项目公示',title:'工控 / 工业互联网密码应用安全性评估',emptyTips:'暂未收录到该类别的密评项目，可前往「信息公示」查看全部项目。',keywords:['工控','工业','互联网','物联网','ics']},
    'dengbao-crypto':{tag:'密评项目公示',title:'信息系统等保测评项目',emptyTips:'暂未收录到该类别的密评项目，可前往「信息公示」查看全部项目。',keywords:['等保','等级保护','定级','备案']}
  };
  var ZPROJECTS=null, ZPROJECTS_LOADING=false, ZPROJECTS_WAITERS=[];
  function loadZProjects(){
    return new Promise(function(resolve){
      if(ZPROJECTS){resolve(ZPROJECTS);return;}
      ZPROJECTS_WAITERS.push(resolve);
      if(ZPROJECTS_LOADING)return;
      ZPROJECTS_LOADING=true;
      fetch('assets/data/zw_projects.json').then(function(r){return r.json();}).then(function(res){
        ZPROJECTS=(res.data||[]).map(function(it,i){it._idx=i;return it;});
        ZPROJECTS_LOADING=false;
        ZPROJECTS_WAITERS.forEach(function(cb){cb(ZPROJECTS);});
        ZPROJECTS_WAITERS=[];
      }).catch(function(){
        ZPROJECTS=[];
        ZPROJECTS_LOADING=false;
        ZPROJECTS_WAITERS.forEach(function(cb){cb(ZPROJECTS);});
        ZPROJECTS_WAITERS=[];
      });
    });
  }
  function classifyProject(title){
    var t=String(title||'').toLowerCase();
    var order=['gov-crypto','finance-crypto','medical-crypto','cloud-crypto','ics-crypto','dengbao-crypto'];
    for(var k=0;k<order.length;k++){
      var key=order[k], cfg=PROJECT_TYPE_CONFIG[key];
      for(var i=0;i<cfg.keywords.length;i++){
        if(t.indexOf(cfg.keywords[i].toLowerCase())>-1)return key;
      }
    }
    return null;
  }
  function projectListHtml(list, page, per, typeKey, typeCfg){
    var total=Math.max(1, Math.ceil(list.length/per));
    page=Math.min(Math.max(1,page),total);
    var start=(page-1)*per, slice=list.slice(start,start+per);
    var items=slice.map(function(it,i){
      var srcTag='<span class="src-tag svc-detect">密评项目</span>';
      return '<button class="ann-card project-case-card" type="button" data-idx="'+it._idx+'" data-page="'+page+'">'
        +'<span class="ann-date">'+escapeHtml(it.date)+'</span>'
        +'<span class="ann-rail"><span class="ann-dot cat-announcement"></span></span>'
        +'<span class="ann-main">'+srcTag+'<span class="ann-title">'+escapeHtml(it.title)+'</span></span>'
        +'<span class="ann-arrow"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span>'
        +'</button>';
    }).join('') || '<p class="empty-tip">'+typeCfg.emptyTips+'</p>';
    var pager='';
    if(list.length>per){
      pager='<div class="modal-pager">';
      pager+='<button '+(page===1?'disabled':'')+' data-page="'+(page-1)+'" data-type="'+typeKey+'">上一页</button>';
      var pages=[];
      for(var p=1;p<=total;p++){
        if(p===1||p===total||Math.abs(p-page)<=2){pages.push(p);}
        else if(pages[pages.length-1]!==-1){pages.push(-1);}
      }
      pages.forEach(function(p){
        if(p===-1){pager+='<span class="ellipsis">…</span>';}
        else if(p===page){pager+='<span class="current">'+p+'</span>';}
        else{pager+='<button data-page="'+p+'" data-type="'+typeKey+'">'+p+'</button>';}
      });
      pager+='<button '+(page===total?'disabled':'')+' data-page="'+(page+1)+'" data-type="'+typeKey+'">下一页</button>';
      pager+='</div>';
    }
    return '<p class="project-modal-count">共 '+list.length+' 条相关公示信息</p>'+items+pager;
  }
  function openProjectTypeModal(typeKey){
    var cfg=PROJECT_TYPE_CONFIG[typeKey];
    if(!cfg)return;
    openModal(cfg.tag,cfg.title,'<div class="project-modal-loading">正在加载项目公示数据…</div>');
    loadZProjects().then(function(all){
      var list=all.filter(function(it){return classifyProject(it.title)===typeKey;});
      list.sort(function(a,b){return new Date(b.date||0)-new Date(a.date||0);});
      var per=10;
      var wrapId='projectModalList_'+Date.now();
      mBody.innerHTML='<div id="'+wrapId+'">'+projectListHtml(list,1,per,typeKey,cfg)+'</div>';
      bindProjectModalList(document.getElementById(wrapId),list,per,typeKey,cfg);
    });
  }
  function bindProjectModalList(scope,list,per,typeKey,cfg){
    if(!scope)return;
    scope.querySelectorAll('.project-case-card').forEach(function(btn){
      btn.addEventListener('click',function(){
        var idx=parseInt(btn.getAttribute('data-idx'),10);
        var it=ZPROJECTS[idx];
        if(!it)return;
        var backPage=parseInt(btn.getAttribute('data-page'),10)||1;
        mTag.textContent='信息公示卡';
        mTitle.textContent=it.title;
        var srcTag='<span class="src-tag svc-detect">密评项目</span>';
        mBody.innerHTML='<div class="project-detail-head"><button class="btn btn-sm btn-outline" id="projectDetailBack">← 返回列表</button>'
          +'<span class="project-detail-date">'+escapeHtml(it.date)+'</span>'+srcTag+'</div>'
          +'<div class="project-detail-body">'+(it.memo||'<p>暂无详细公示内容</p>')+'</p></div>';
        var backBtn=document.getElementById('projectDetailBack');
        if(backBtn){
          backBtn.addEventListener('click',function(){
            mTag.textContent=cfg.tag;
            mTitle.textContent=cfg.title;
            scope.innerHTML=projectListHtml(list,backPage,per,typeKey,cfg);
            bindProjectModalList(scope,list,per,typeKey,cfg);
          });
        }
      });
    });
    scope.querySelectorAll('.modal-pager button[data-page]').forEach(function(btn){
      btn.addEventListener('click',function(){
        var np=parseInt(btn.getAttribute('data-page'),10);
        scope.innerHTML=projectListHtml(list,np,per,typeKey,cfg);
        bindProjectModalList(scope,list,per,typeKey,cfg);
      });
    });
  }
  document.querySelectorAll('.svc.clickable[data-project-type]').forEach(function(el){
    var typeKey=el.getAttribute('data-project-type');
    function fire(){openProjectTypeModal(typeKey);}
    el.addEventListener('click',fire);
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fire();}});
  });

  /* 核心资质卡片点击：查看证书/能力说明 */
  var CERTS={
    license:{tag:'资质证书',title:'营业执照',img:'assets/img/legacy/1.jpg',desc:'云南卓云信息安全科技有限公司营业执照，注册资本壹仟零伍拾万元整，成立于 2014 年，经营范围涵盖商用密码应用安全性评估、信息安全检测、网络安全等级保护测评、密码技术服务等。'},
    cryptoEval:{tag:'资质证书',title:'商用密码应用安全性评估机构资质（示例）',img:'assets/img/legacy/2.jpg',desc:'公司入选商用密码应用安全性评估服务机构名录，具备依据 GB/T 39786-2021 开展信息系统密码应用安全性评估的资质（示例图，正式证书以主管部门核发为准）。'},
    cryptoProduct:{tag:'资质证书',title:'商用密码检测机构资质（示例）',img:'assets/img/legacy/3.jpg',desc:'公司具备商用密码产品与密码应用系统检测能力，可开展密码产品功能性、安全性与合规性检测（示例图，正式证书以主管部门核发为准）。'},
    dengbao:{tag:'资质证书',title:'信息安全等级保护测评机构推荐证书（示例）',img:'assets/img/legacy/4.jpg',desc:'公司具备信息系统安全等级保护测评能力，可开展等保定级、测评与整改咨询（示例图，正式证书以主管部门核发为准）。'},
    cnas:{tag:'能力证书',title:'CNAS 实验室认可证书（示例）',img:'assets/img/legacy/5.jpg',desc:'公司检测实验室通过 CNAS 认可，技术能力与国际接轨，检测数据更具公信力（示例图，正式证书以 CNAS 核发为准）。'},
    cma:{tag:'资质证书',title:'检验检测机构资质认定证书（CMA，示例）',img:'assets/img/legacy/6.jpg',desc:'公司通过检验检测机构资质认定（CMA），具备向社会出具具有证明作用的数据和结果的法定资格（示例图，正式证书以主管部门核发为准）。'}
  };
  function certHtml(c){
    return '<div class="cert-modal-img"><img src="'+c.img+'" alt="'+c.title+'" loading="lazy"></div>'
      +'<p class="cert-modal-desc">'+c.desc+'</p>';
  }
  document.querySelectorAll('.qual.clickable').forEach(function(el){
    var key=el.getAttribute('data-cert');
    var c=CERTS[key];
    if(!c) return;
    function fire(){openModal(c.tag,c.title,certHtml(c));}
    el.addEventListener('click',fire);
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fire();}});
  });

  /* 学术论文成果卡片点击：查看论文列表 */
  var PAPERS={
    tag:'技术文章',
    title:'卓云安全技术文章与研究成果',
    list:[
      {title:'基于 GB/T 39786-2021 的信息系统密码应用合规性评估方法探讨',journal:'信息系统密码应用',year:'2025',vol:'Vol.1',desc:'结合政务云场景，探讨密码应用合规性、正确性与有效性三维评估的落地方法。',link:''},
      {title:'政务云密码应用方案设计与密钥管理实践',journal:'商用密码技术',year:'2025',vol:'Vol.1',status:'已定稿',desc:'针对政务云平台，给出密码应用方案设计要点与密钥全生命周期管理实践。',link:''},
      {title:'金融核心系统密评整改路径与常见问题分析',journal:'信息安全研究',year:'2024',vol:'2024年第6期',desc:'总结金融核心系统在密评整改中的典型问题与技术路径。',link:''},
      {title:'医疗 HIS 系统密码应用安全性评估案例',journal:'医疗卫生信息化',year:'2024',vol:'2024年6月',desc:'以某医院 HIS 系统为例，分析医疗信息系统密评要点与改造建议。',link:''}
    ]
  };
  function papersHtml(p){
    var items=p.list.map(function(it,i){
      var meta=it.journal+' · '+it.year+(it.vol?' · '+it.vol:'');
      var badge=it.status?'<span class="paper-status">'+it.status+'</span>':'';
      var action=it.link?'<a class="paper-link" href="'+it.link+'" target="_blank" rel="noopener">查看原文 →</a>':'';
      return '<div class="paper-item">'
        +'<div class="paper-num">'+(i+1)+'</div>'
        +'<div class="paper-main">'
          +'<div class="paper-meta">'+meta+badge+'</div>'
          +'<h4>《'+it.title+'》</h4>'
          +'<p class="paper-desc">'+it.desc+'</p>'
          +action
        +'</div>'
      +'</div>';
    }).join('');
    return '<div class="paper-list">'+items+'</div>';
  }
  document.querySelectorAll('.card.clickable[data-papers]').forEach(function(el){
    function fire(){openModal(PAPERS.tag,PAPERS.title,papersHtml(PAPERS));}
    el.addEventListener('click',fire);
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fire();}});
  });

  /* 首页公告（限制条数） */
  var homeList=document.getElementById('announceList');
  if(homeList){ renderNews(homeList, NEWS.slice(0,5)); }

  /* 首页公正性声明渲染 */
  function renderImpartiality(container){
    if(!container) return;
    container.innerHTML = IMPARTIALITY.map(function(it,i){
      return '<button class="imp-card reveal" data-imp="'+it.id+'" type="button">'
        + '<span class="imp-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>'
        + '<span class="imp-main">'
        +   '<span class="imp-date">'+it.date+'</span>'
        +   '<span class="imp-title">'+it.company+'</span>'
        +   '<span class="imp-sum">'+it.summary+'</span>'
        + '</span>'
        + '<span class="imp-arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></span>'
        + '</button>';
    }).join('');
    container.querySelectorAll('.imp-card').forEach(function(el){
      if(el.dataset.bound) return; el.dataset.bound='1';
      var id=el.getAttribute('data-imp');
      var it=IMPARTIALITY.filter(function(x){return x.id===id;})[0];
      if(!it) return;
      function fire(){openModal('公正性声明', it.company+' 公正性声明', it.body);}
      el.addEventListener('click',fire);
      el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fire();}});
    });
    if(window.IntersectionObserver){
      container.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
    }
  }
  var impWrap=document.getElementById('impartialityList');
  if(impWrap){ renderImpartiality(impWrap); }

  /* 招聘卡片渲染 */
  function jobCard(j){
    var tags=j.tags.map(function(t){return '<span class="job-tag">'+t+'</span>';}).join('');
    return '<div class="job-card reveal" data-job="'+j.id+'">'
      + '<div class="job-head">'
      +   '<div class="job-title-row"><h3>'+j.title+'</h3><span class="job-salary">'+j.salary+'</span></div>'
      +   '<div class="job-meta">'
      +     '<span><svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/></svg>'+j.type+'</span>'
      +     '<span><svg viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>'+j.location+'</span>'
      +     '<span><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'+j.date+' 发布</span>'
      +   '</div>'
      + '</div>'
      + '<p class="job-summary">'+j.summary+'</p>'
      + '<div class="job-tags">'+tags+'</div>'
      + '<div class="job-foot"><span class="job-deadline">'+j.deadline+'</span><button class="btn btn-primary btn-sm" aria-label="查看详情">查看详情 →</button></div>'
      + '</div>';
  }
  function renderJobs(container){
    if(!container) return;
    container.innerHTML = JOBS.map(jobCard).join('');
    container.querySelectorAll('.job-card').forEach(function(el){
      if(el.dataset.bound) return; el.dataset.bound='1';
      var id=el.getAttribute('data-job');
      var j=JOBS.filter(function(x){return String(x.id)===String(id);})[0];
      if(!j) return;
      function fire(){openModal('人才招聘', j.title, '<div class="job-modal-meta"><span>'+j.type+'</span><span>'+j.location+'</span><span>'+j.salary+'</span><span>'+j.deadline+'</span></div>'+(j.body||'<p>'+j.summary+'</p>')+'<p style="margin-top:20px"><a class="btn btn-primary" href="apply.html?job='+encodeURIComponent(j.title)+'">投递简历 →</a></p>');}
      el.addEventListener('click',function(e){if(e.target.closest('a,button')){e.preventDefault();fire();}});
      el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fire();}});
    });
    if(window.IntersectionObserver){
      container.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
    }
  }

  /* 新闻页 / 招聘页 Tab 切换 */
  var newsWrap=document.getElementById('newsTimeline');
  var jobsWrap=document.getElementById('jobsGrid');
  var tabBtns=document.querySelectorAll('#newsTabs button');
  var panelNews=document.getElementById('panel-news');
  var panelJobs=document.getElementById('panel-jobs');
  function switchTab(tab){
    tabBtns.forEach(function(b){b.classList.toggle('active', b.getAttribute('data-tab')===tab);});
    if(panelNews) panelNews.classList.toggle('hidden', tab!=='news');
    if(panelJobs) panelJobs.classList.toggle('hidden', tab!=='jobs');
    if(tab==='news' && newsWrap && !newsWrap.dataset.rendered){ renderNews(newsWrap, NEWS); newsWrap.dataset.rendered='1'; }
    if(tab==='jobs' && jobsWrap && !jobsWrap.dataset.rendered){ renderJobs(jobsWrap); jobsWrap.dataset.rendered='1'; }
    if(window.scrollTo){ window.scrollTo({top:0, behavior:'smooth'}); }
  }
  if(tabBtns.length){
    tabBtns.forEach(function(btn){
      btn.addEventListener('click',function(){ switchTab(btn.getAttribute('data-tab')); });
    });
  }
  if(newsWrap){
    renderNews(newsWrap, NEWS);
    newsWrap.dataset.rendered='1';
    var filters=document.querySelectorAll('.news-filter button');
    filters.forEach(function(btn){
      btn.addEventListener('click',function(){
        filters.forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        var c=btn.getAttribute('data-cat');
        renderNews(newsWrap, c==='all'?NEWS:NEWS.filter(function(x){return x.cat===c;}));
      });
    });
  }
  if(jobsWrap){ renderJobs(jobsWrap); jobsWrap.dataset.rendered='1'; }

  /* 信息公示页：左侧菜单切换 */
  var dSidebarBtns=document.querySelectorAll('#disclosureSidebar button');
  var dPanelService=document.getElementById('panel-service');
  var dPanelNews=document.getElementById('panel-news');
  var dPanelJobs=document.getElementById('panel-jobs');
  var dNewsWrap=document.getElementById('disclosureNewsTimeline');
  var dJobsWrap=document.getElementById('disclosureJobsGrid');
  function switchDisclosureSection(section){
    dSidebarBtns.forEach(function(b){b.classList.toggle('active', b.getAttribute('data-section')===section);});
    if(dPanelService) dPanelService.classList.toggle('hidden', section!=='service');
    if(dPanelNews) dPanelNews.classList.toggle('hidden', section!=='news');
    if(dPanelJobs) dPanelJobs.classList.toggle('hidden', section!=='jobs');
    if(section==='news' && dNewsWrap && !dNewsWrap.dataset.rendered){ renderNews(dNewsWrap, NEWS); dNewsWrap.dataset.rendered='1'; }
    if(section==='jobs' && dJobsWrap && !dJobsWrap.dataset.rendered){ renderJobs(dJobsWrap); dJobsWrap.dataset.rendered='1'; }
  }
  if(dSidebarBtns.length){
    dSidebarBtns.forEach(function(btn){
      btn.addEventListener('click',function(){ switchDisclosureSection(btn.getAttribute('data-section')); });
    });
    var dFilters=document.querySelectorAll('#disclosureNewsFilter button');
    dFilters.forEach(function(btn){
      btn.addEventListener('click',function(){
        dFilters.forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        var c=btn.getAttribute('data-cat');
        renderNews(dNewsWrap, c==='all'?NEWS:NEWS.filter(function(x){return x.cat===c;}));
      });
    });
  }

  /* 案例页项目公示（密评项目） */
  var projectWrap=document.getElementById('projectList');
  if(projectWrap){
    var PROJECT_ONLY=PROJECTS.filter(function(x){return x.cat==='zx-a'||x.cat==='zx-b';});
    renderNews(projectWrap, PROJECT_ONLY);
    var pfilters=document.querySelectorAll('.project-filter button');
    pfilters.forEach(function(btn){
      btn.addEventListener('click',function(){
        pfilters.forEach(function(b){b.classList.remove('active');});
        btn.classList.add('active');
        var c=btn.getAttribute('data-cat');
        renderNews(projectWrap, c==='all'?PROJECT_ONLY:PROJECT_ONLY.filter(function(x){return x.cat===c;}));
      });
    });
  }

  /* ===== 移动端导航 ===== */
  var burger=document.querySelector('.hamburger');
  var links=document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open');});
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');});});
  }

  /* ===== 滚动入场 ===== */
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ===== 当前导航高亮 ===== */
  var path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){var h=a.getAttribute('href');if(h===path||(path===''&&h==='index.html'))a.classList.add('active');});

  /* ===== 返回顶部 ===== */
  var top=document.querySelector('.totop');
  if(top){window.addEventListener('scroll',function(){top.classList.toggle('show',window.scrollY>400);});top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});}

  /* ===== 表单校验 ===== */
  var form=document.getElementById('contactForm');
  if(form){
    var alertBox=document.getElementById('formAlert');
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var name=form.name.value.trim();
      var phone=form.phone.value.trim();
      var msg=form.message.value.trim();
      var email=form.email?form.email.value.trim():'';
      var errs=[];
      if(name.length<2)errs.push('请填写正确的联系人姓名');
      if(!/^1[3-9]\d{9}$/.test(phone))errs.push('请填写有效的11位手机号');
      if(email&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))errs.push('邮箱格式不正确');
      if(msg.length<5)errs.push('请简单描述您的需求（至少5个字）');
      if(errs.length){alertBox.className='alert err';alertBox.textContent='⚠ '+errs[0];return;}
      alertBox.className='alert ok';
      alertBox.textContent='✓ 提交成功！我们的技术顾问会在1个工作日内与您联系。';
      form.reset();
    });
  }

  function escapeHtml(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  /* ===== 密评项目信息公示页 ===== */
  var disclosureWrap=document.getElementById('disclosureTableBody');
  if(disclosureWrap){
    var DISCLOSURE=[], filtered=[], page=1, per=20;
    var yearSel=document.getElementById('disclosureYear');
    var searchIn=document.getElementById('disclosureSearch');
    var sourceSel=document.getElementById('disclosureSource');
    var pageSizeSel=document.getElementById('disclosurePageSize');
    var countEl=document.getElementById('disclosureCount');
    var pagerEl=document.getElementById('disclosurePager');
    var loadingEl=document.getElementById('disclosureLoading');
    function renderDisclosure(){
      if(loadingEl) loadingEl.style.display='none';
      var start=(page-1)*per, end=start+per;
      var pageItems=filtered.slice(start,end);
      disclosureWrap.innerHTML=pageItems.map(function(it,i){
        var idx=start+i+1;
        var srcTag='<span class="src-tag svc-detect">密评项目</span>';
        return '<tr><td class="idx">'+idx+'</td><td class="title">'+escapeHtml(it.title)+'</td><td class="date">'+escapeHtml(it.date)+'</td><td class="source">'+srcTag+'</td><td class="action"><button class="btn btn-sm btn-outline" data-idx="'+it._idx+'">查看公示</button></td></tr>';
      }).join('') || '<tr><td colspan="5" class="empty">暂无匹配记录</td></tr>';
      if(countEl) countEl.textContent=String(filtered.length);
      renderPager();
      disclosureWrap.querySelectorAll('button[data-idx]').forEach(function(btn){
        btn.addEventListener('click',function(){
          var i=parseInt(btn.getAttribute('data-idx'),10);
          var it=DISCLOSURE[i];
          if(it) openModal('信息公示卡', it.title, it.memo || '<p>暂无详细公示内容</p>');
        });
      });
      io.observe(disclosureWrap);
      disclosureWrap.querySelectorAll('tr').forEach(function(r){io.observe(r);});
    }
    function renderPager(){
      if(!pagerEl) return;
      var total=Math.max(1, Math.ceil(filtered.length/per));
      var html='';
      html+='<button '+(page===1?'disabled':'')+' data-page="'+(page-1)+'">上一页</button>';
      var pages=[];
      for(var p=1;p<=total;p++){
        if(p===1||p===total||Math.abs(p-page)<=2){pages.push(p);}
        else if(pages[pages.length-1]!==-1){pages.push(-1);}
      }
      pages.forEach(function(p){
        if(p===-1){html+='<span class="ellipsis">…</span>';}
        else if(p===page){html+='<span class="current">'+p+'</span>';}
        else{html+='<button data-page="'+p+'">'+p+'</button>';}
      });
      html+='<button '+(page===total?'disabled':'')+' data-page="'+(page+1)+'">下一页</button>';
      pagerEl.innerHTML=html;
      pagerEl.querySelectorAll('button[data-page]').forEach(function(btn){
        btn.addEventListener('click',function(){
          var np=parseInt(btn.getAttribute('data-page'),10);
          if(np>=1 && np<=total){page=np; renderDisclosure(); window.scrollTo({top:0,behavior:'smooth'});}
        });
      });
    }
    function applyFilter(){
      var y=yearSel?yearSel.value:'all';
      var kw=(searchIn?searchIn.value:'').trim().toLowerCase();
      var s=sourceSel?sourceSel.value:'all';
      filtered=DISCLOSURE.filter(function(it){
        var ok=true;
        if(y!=='all') ok=ok && it.date && it.date.slice(0,4)===y;
        if(s!=='all') ok=ok && it.source===s;
        if(kw) ok=ok && (it.title.toLowerCase().indexOf(kw)>-1 || (it.date&&it.date.indexOf(kw)>-1));
        return ok;
      });
      page=1; renderDisclosure();
    }
    if(yearSel) yearSel.addEventListener('change',applyFilter);
    if(sourceSel) sourceSel.addEventListener('change',applyFilter);
    if(searchIn){
      var t=null;
      searchIn.addEventListener('input',function(){clearTimeout(t); t=setTimeout(applyFilter,300);});
    }
    if(pageSizeSel) pageSizeSel.addEventListener('change',function(){per=parseInt(pageSizeSel.value,10)||20; page=1; renderDisclosure();});
    fetch('assets/data/zw_projects.json').then(function(r){return r.json();}).then(function(res){
      DISCLOSURE=res.data||[];
      DISCLOSURE.forEach(function(it,i){it._idx=i;});
      // 提取年份选项
      var years={}; DISCLOSURE.forEach(function(it){if(it.date) years[it.date.slice(0,4)]=1;});
      var yList=Object.keys(years).sort().reverse();
      if(yearSel){
        yearSel.innerHTML='<option value="all">全部年份</option>'+yList.map(function(y){return '<option value="'+y+'">'+y+'年</option>';}).join('');
      }
      if(sourceSel){
        sourceSel.innerHTML='<option value="all">全部来源</option><option value="检测">卓云安全</option><option value="服务">卓云服务</option>';
      }
      filtered=DISCLOSURE.slice();
      // 支持从站内搜索跳转的 ?kw= 关键词过滤
      var kwParam=new URLSearchParams(location.search).get('kw');
      if(kwParam && searchIn){ searchIn.value=kwParam; applyFilter(); }
      else { renderDisclosure(); }
    }).catch(function(e){
      if(loadingEl) loadingEl.textContent='数据加载失败，请刷新重试';
      console.error(e);
    });
  }

  /* 锚点跳转修正：确保目标 reveal 元素可见并滚动到正确位置 */
  function handleHashScroll(){
    var hash=location.hash.slice(1);
    if(!hash)return;
    var el=document.getElementById(hash);
    if(!el)return;
    el.classList.add('in');
    var navH=0;
    var nav=document.querySelector('.nav');
    if(nav) navH=nav.offsetHeight+16;
    var top=el.getBoundingClientRect().top+window.pageYOffset-navH;
    window.scrollTo({top:top, behavior:'auto'});
  }
  if(location.hash){ setTimeout(handleHashScroll, 50); }
  window.addEventListener('hashchange', handleHashScroll);

  /* ===== 远程内容（极简后台可更新，失败回退内置数组） ===== */
  function applyRemoteContent(data){
    try{
      if(data && Array.isArray(data.news) && data.news.length){
        NEWS.length=0; data.news.forEach(function(x){ NEWS.push(x); });
      }
      if(data && Array.isArray(data.jobs) && data.jobs.length){
        JOBS.length=0; data.jobs.forEach(function(x){ JOBS.push(x); });
      }
      if(homeList) renderNews(homeList, NEWS.slice(0,5));
      if(newsWrap && newsWrap.dataset.rendered) renderNews(newsWrap, NEWS);
      if(jobsWrap && jobsWrap.dataset.rendered) renderJobs(jobsWrap);
      if(dNewsWrap && dNewsWrap.dataset.rendered) renderNews(dNewsWrap, NEWS);
      if(dJobsWrap && dJobsWrap.dataset.rendered) renderJobs(dJobsWrap);
    }catch(e){ console.warn('applyRemoteContent failed', e); }
  }
  fetch('assets/data/content.json', {cache:'no-store'})
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(data){ if(data) applyRemoteContent(data); })
    .catch(function(){ /* 静态快照兜底，不影响浏览 */ });
})();
