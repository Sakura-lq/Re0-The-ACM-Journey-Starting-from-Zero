window.onload = async function () { // 1. 新增 async：因为用了 await 导入 SDK
  // 创建浏览量容器
  const viewCountDiv = document.createElement('div');
  viewCountDiv.style.cssText = `
        margin: 20px auto;
        text-align: center;
        color: var(--md-default-fg-color--lighter);
        font-size: 0.9em;
        padding: 10px;
        border-top: 1px solid var(--md-default-fg-color--lightest);
    `;
  viewCountDiv.innerHTML = `
        🌐 全站总浏览量：<span id="site-count">加载中...</span> 次 | 
        👁️ 本文浏览量：<span id="page-count">加载中...</span> 次
    `;
  document.body.appendChild(viewCountDiv);

  // 用 LeanCloud 免费API实现（无需脚本，直接计数，稳定可靠）
  const APP_ID = "t49GUs7ZLkrOnnbbJLBkC8ou-gzGzoHsz";
  const APP_KEY = "UjHcyJ1SqD0Jx0jygwNPBbBP"; // 2. 移除末尾空格：避免 AppKey 无效
  const SERVER_URL = "https://t49gus7z.lc-cn-n1-shared.com";

  // 初始化 LeanCloud（修复 await 导入逻辑）
  let AV;
  if (window.AV) {
    AV = window.AV; // 若已通过 mkdocs.yml 引入 SDK，直接使用
  } else {
    // 动态导入 SDK（确保加载成功）
    const module = await import('https://cdn.jsdelivr.net/npm/leancloud-storage@4.12.0/dist/av-min.js');
    AV = module.default;
  }
  AV.init({ appId: APP_ID, appKey: APP_KEY, serverURL: SERVER_URL });

  // 统计页面浏览量
  const PageView = AV.Object.extend('PageView');
  const pagePath = window.location.pathname; // 用页面路径作为唯一标识

  // 查询并更新计数
  new AV.Query(PageView).equalTo('path', pagePath).first().then(record => {
    if (record) {
      record.increment('count', 1);
      return record.save();
    } else {
      const newRecord = new PageView();
      return newRecord.save({ path: pagePath, count: 1 });
    }
  }).then(updatedRecord => {
    // 更新当前页面计数
    document.getElementById('page-count').innerText = updatedRecord.get('count');
    // 查询全站总计数
    return new AV.Query(PageView).sum('count');
  }).then(total => {
    // 更新全站计数（处理 total 为 null 的情况）
    document.getElementById('site-count').innerText = total !== null ? total : 0;
  }).catch(err => {
    console.error('计数失败：', err); // 打印错误，方便排查
    document.getElementById('site-count').innerText = '加载失败';
    document.getElementById('page-count').innerText = '加载失败';
  });
};