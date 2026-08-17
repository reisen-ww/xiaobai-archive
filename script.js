const body = document.body;
const menuButton = document.querySelector('#menuButton');
const siteNav = document.querySelector('#siteNav');
const signalButton = document.querySelector('#signalButton');

window.addEventListener('load', () => {
  window.setTimeout(() => body.classList.remove('is-booting'), 120);
});

menuButton?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航');
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

signalButton?.addEventListener('click', () => {
  const paused = body.dataset.signal === 'paused';
  body.dataset.signal = paused ? 'live' : 'paused';
  signalButton.setAttribute('aria-pressed', String(!paused));
  signalButton.querySelector('b').textContent = paused ? 'LIVE' : 'PAUSED';
  signalButton.querySelector('i').textContent = paused ? '观测中' : '观测暂停';
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const navLinks = [...document.querySelectorAll('.site-nav a')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

/* ===== SCROLL PROGRESS ===== */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

function updateProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

/* ===== TO TOP ===== */
const toTop = document.querySelector('#toTop');
function updateToTop() {
  const visible = window.scrollY > 600;
  toTop.classList.toggle('is-visible', visible);
  toTop.setAttribute('aria-hidden', String(!visible));
}
window.addEventListener('scroll', updateToTop, { passive: true });
updateToTop();
function smoothScrollTo(targetY, duration = 700) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    window.scrollTo({ top: startY + diff * eased, behavior: 'instant' });
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
toTop?.addEventListener('click', () => smoothScrollTo(0));

/* ===== COUNT-UP ANIMATION ===== */
function animateCount(node, target, duration = 1300) {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    node.nodeValue = String(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countTargets = [];
document.querySelectorAll('.stat b').forEach((el) => {
  const textNode = [...el.childNodes].find((n) => n.nodeType === 3 && n.nodeValue.trim() !== '');
  if (!textNode) return;
  const value = parseInt(textNode.nodeValue.trim(), 10);
  if (Number.isNaN(value)) return;
  countTargets.push({ el, textNode, value });
});
const scoreNum = document.querySelector('.score-num');
if (scoreNum) {
  const value = parseInt(scoreNum.textContent, 10);
  if (!Number.isNaN(value)) countTargets.push({ el: scoreNum, textNode: scoreNum.firstChild, value });
}

if ('IntersectionObserver' in window && countTargets.length) {
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = countTargets.find((t) => t.el === entry.target);
      if (target) animateCount(target.textNode, target.value);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  countTargets.forEach((t) => countObserver.observe(t.el));
} else {
  countTargets.forEach((t) => { t.textNode.nodeValue = String(t.value); });
}
