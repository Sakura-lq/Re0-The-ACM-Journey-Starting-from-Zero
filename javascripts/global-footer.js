// 页面加载完成后，在页面底部添加浏览量显示（兼容不蒜子脚本加载+ID匹配）
window.onload = function () {
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
  // 插入浏览量标签（用不蒜子默认识别ID，去掉_pv，提高兼容性）
  viewCountDiv.innerHTML = `
        🌐 全站总浏览量：<span id="busuanzi_value_site">加载中...</span> 次 | 
        👁️ 本文浏览量：<span id="busuanzi_value_page">加载中...</span> 次
    `;
  // 把容器添加到页面最底部
  document.body.appendChild(viewCountDiv);

  // 关键：等待不蒜子脚本加载，手动触发渲染（解决脚本加载延迟问题）
  setTimeout(() => {
    // 检查不蒜子是否加载成功
    if (window.busuanzi && busuanzi.site && busuanzi.page) {
      // 手动更新数字到标签
      document.getElementById('busuanzi_value_site').innerText = busuanzi.site.pv;
      document.getElementById('busuanzi_value_page').innerText = busuanzi.page.pv;
    } else {
      // 脚本加载失败时的降级显示
      document.getElementById('busuanzi_value_site').innerText = '未知';
      document.getElementById('busuanzi_value_page').innerText = '未知';
    }
  }, 800); // 延迟800ms，确保国内网络加载脚本
};