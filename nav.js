// nav.js — injects the shared nav + footer partials, then wires up nav behavior.
// Edit nav.html / footer.html to change those areas across the whole site.

function initNav() {
  var toggle = document.querySelector('.sf-toggle');
  var links  = document.querySelector('.sf-nav ul');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // highlight active link
  var path = window.location.pathname;
  document.querySelectorAll('.sf-nav ul a').forEach(function (a) {
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

function injectPartial(mountId, url, after) {
  var mount = document.getElementById(mountId);
  if (!mount) return;
  fetch(url)
    .then(function (r) { return r.text(); })
    .then(function (html) {
      mount.innerHTML = html;
      if (after) after();
    })
    .catch(function (e) { console.error('Could not load ' + url, e); });
}

document.addEventListener('DOMContentLoaded', function () {
  injectPartial('sf-nav-mount', '/nav.html', initNav);
  injectPartial('sf-footer-mount', '/footer.html', null);
});
