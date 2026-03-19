// nav.js — runs after nav.html is injected via fetch
// handles hamburger toggle + active link highlighting

function initNav() {
  var toggle = document.querySelector('.sf-toggle');
  var links  = document.querySelector('.sf-nav ul');

  if (toggle && links) {
    toggle.addEventListener('click', function() {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // highlight active link
  var path = window.location.pathname;
  document.querySelectorAll('.sf-nav ul a').forEach(function(a) {
    var page = a.getAttribute('data-page');
    if (
      (page === 'home'     && (path === '/' || path === '/index.html')) ||
      (page === 'projects' && path.includes('projects')) ||
      (page === 'about'    && path.includes('about')) ||
      (page === 'blog'     && path.includes('blog'))
    ) {
      a.classList.add('active');
    }
  });
}
