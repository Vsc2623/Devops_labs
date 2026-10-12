const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuBtn.textContent = open ? '×' : '☰';
  });
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    if (menuBtn) { menuBtn.textContent = '☰'; menuBtn.setAttribute('aria-label', 'Open navigation menu'); }
  });
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Hero banner carousel
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.carousel-dot')];
const kicker = document.getElementById('slide-kicker');
let currentSlide = 0;
let carouselTimer;
function showSlide(index) {
  if (!slides.length) return;
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
    dot.setAttribute('aria-pressed', String(i === currentSlide));
  });
  if (kicker) kicker.textContent = slides[currentSlide].dataset.kicker || '';
}
function restartCarousel() {
  clearInterval(carouselTimer);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    carouselTimer = setInterval(() => showSlide(currentSlide + 1), 7000);
  }
}
dots.forEach(dot => dot.addEventListener('click', () => {
  showSlide(Number(dot.dataset.slide));
  restartCarousel();
}));
document.getElementById('prev-slide')?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  restartCarousel();
});
document.getElementById('next-slide')?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  restartCarousel();
});
restartCarousel();

// Study material category filters
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const studyCards = [...document.querySelectorAll('.study-card')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  studyCards.forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

// Quick-reference tabs
const noteTabs = [...document.querySelectorAll('.note-tab')];
const notePanels = [...document.querySelectorAll('.note-content')];
noteTabs.forEach(tab => tab.addEventListener('click', () => {
  const target = tab.dataset.note;
  noteTabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  notePanels.forEach(panel => panel.classList.toggle('active', panel.id === target));
}));

// Copy commands / email with graceful clipboard fallback
const toast = document.querySelector('.toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const text = button.dataset.copy || '';
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard: ' + text);
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      showToast(copied ? 'Copied to clipboard: ' + text : 'Copy this text: ' + text);
    }
  });
});
