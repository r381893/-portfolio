(function () {
  const list = document.getElementById('toolList');
  const tools = window.HUB_TOOLS || [];

  function render(filter) {
    list.innerHTML = '';
    tools
      .filter(t => filter === 'all' || t.group === filter)
      .forEach((tool, i) => {
        const a = document.createElement('a');
        a.className = 'tool' + (tool.featured ? ' featured' : '');
        a.href = tool.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.animation = 'rise 0.45s ease both';
        a.style.animationDelay = (0.04 * i) + 's';
        a.innerHTML =
          '<div class="tool-meta">' +
            '<div class="tool-top">' +
              '<h3 class="tool-name">' + tool.name + '</h3>' +
              '<span class="tag ' + tool.group + '">' + tool.tag + '</span>' +
            '</div>' +
            '<p class="tool-desc">' + tool.desc + '</p>' +
          '</div>' +
          '<span class="tool-go">前往 →</span>';
        list.appendChild(a);
      });
  }

  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });

  render('all');
})();
