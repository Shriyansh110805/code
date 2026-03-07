'use strict';

/* ── Utility: throttle ── */
function throttle(fn, ms) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn(...args); }
  };
}

/* ── Footer Year ── */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ── Sticky header shrink ── */
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', throttle(() => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 50);
}, 100), { passive: true });

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (sec.offsetParent !== null && window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', throttle(updateActiveLink, 150), { passive: true });

/* ── Mobile menu ── */
const mobileToggle = document.getElementById('mobileToggle');
const mobileDrawer = document.getElementById('mobileDrawer');

mobileToggle.addEventListener('click', () => {
  const isOpen = mobileToggle.classList.toggle('open');
  mobileDrawer.classList.toggle('open', isOpen);
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('[data-drawer]').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── Back to Top ── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', throttle(() => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, 150), { passive: true });

/* ── Demo button ── */
function showDemo(gameName) {
  alert(`${gameName}\n\nCurrently in development. Stay tuned for the demo release!`);
}

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');
const submitBtn   = document.getElementById('submitBtn');
const resetBtn    = document.getElementById('resetFormBtn');

function showError(msg) {
  formError.textContent = msg;
  formError.classList.add('show');
  formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearError() {
  formError.textContent = '';
  formError.classList.remove('show');
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();

  const name    = contactForm.contactName.value.trim();
  const email   = contactForm.contactEmail.value.trim();
  const message = contactForm.contactMessage.value.trim();

  if (!name) {
    showError('Please enter your name.');
    contactForm.contactName.focus();
    return;
  }
  if (!email) {
    showError('Please enter your email address.');
    contactForm.contactEmail.focus();
    return;
  }
  if (!contactForm.contactEmail.checkValidity()) {
    showError('Please enter a valid email address.');
    contactForm.contactEmail.focus();
    return;
  }
  if (!message) {
    showError('Please write a message.');
    contactForm.contactMessage.focus();
    return;
  }

  /* Loading state */
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  await new Promise(r => setTimeout(r, 1400));

  contactForm.style.display = 'none';
  formSuccess.classList.add('show');

  /* Auto-dismiss success after 5 seconds */
  setTimeout(() => {
    if (formSuccess.classList.contains('show')) {
      resetBtn.click();
    }
  }, 5000);
});

resetBtn.addEventListener('click', () => {
  contactForm.reset();
  clearError();
  submitBtn.disabled = false;
  submitBtn.textContent = 'Send Message';
  contactForm.style.display = '';
  formSuccess.classList.remove('show');
});

/* ── Portfolio Mode Toggle ── */
const modeToggle = document.getElementById('modeToggle');
const modeLabel  = modeToggle.querySelector('.mode-toggle-btn__label');
const logoEl     = document.querySelector('a.logo');

const GAMEDEV_NAV = [
  { href: '#about',       text: 'About' },
  { href: '#skills',      text: 'Skills' },
  { href: '#projects',    text: 'Portfolio' },
  { href: '#collaborate', text: 'Collaborate' },
  { href: '#contact',     text: 'Contact' },
];
const COLLEGE_NAV = [
  { href: '#about',           text: 'About' },
  { href: '#education',       text: 'Education' },
  { href: '#college-skills',  text: 'Projects' },
  { href: '#certificates',    text: 'Certificates' },
  { href: '#achievements',    text: 'Achievements' },
];

function applyNavLinks(links) {
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link:not(.resume-btn)');
  const drawerLinks  = document.querySelectorAll('[data-drawer]:not([download])');
  links.forEach((d, i) => {
    if (desktopLinks[i]) { desktopLinks[i].setAttribute('href', d.href); desktopLinks[i].textContent = d.text; }
    if (drawerLinks[i])  { drawerLinks[i].setAttribute('href', d.href);  drawerLinks[i].textContent = d.text; }
  });
}

/* ── Language Projects Modal ── */

/*
 * HOW TO ADD YOUR PROJECTS:
 * For each language, add objects to the array below.
 * Fields: title (string), desc (string), tags (array), github (url or null)
 *
 * Example:
 *   { title: 'My Python Project', desc: 'A tool that...', tags: ['Python', 'Flask'], github: 'https://github.com/...' }
 */
const COLLEGE_PROJECTS = {
  python: [
    {
      title: '[Python Project 1]',
      desc: 'Replace this with your Python project description — what it does, the problem it solves, and what you learned.',
      tags: ['Python'],
      github: null,
    },
    /* Add more Python projects here */
  ],
  c: [
    {
      title: '[C Project 1]',
      desc: 'Replace this with your C project description — what it does, the problem it solves, and what you learned.',
      tags: ['C'],
      github: null,
    },
    /* Add more C projects here */
  ],
  cpp: [
    {
      title: '[C++ Project 1]',
      desc: 'Replace this with your C++ project description — what it does, the problem it solves, and what you learned.',
      tags: ['C++'],
      github: null,
    },
    /* Add more C++ projects here */
  ],
  java: [
    {
      title: '[Java Project 1]',
      desc: 'Replace this with your Java project description — what it does, the problem it solves, and what you learned.',
      tags: ['Java'],
      github: null,
    },
    /* Add more Java projects here */
  ],
};

const LANG_CONFIG = {
  python: { icon: '🐍', label: 'Python', gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)', badge: 'proj-lang-badge--python' },
  c:      { icon: '⚙️', label: 'C',      gradient: 'linear-gradient(135deg, #374151, #1f2937)', badge: 'proj-lang-badge--c' },
  cpp:    { icon: '🔧', label: 'C++',    gradient: 'linear-gradient(135deg, #a855f7, #8b5cf6)', badge: 'proj-lang-badge--cpp' },
  java:   { icon: '☕', label: 'Java',   gradient: 'linear-gradient(135deg, #f97316, #c2410c)', badge: 'proj-lang-badge--java' },
};

const langModalOverlay = document.getElementById('langModalOverlay');
const langModalClose   = document.getElementById('langModalClose');
const langModalIcon    = document.getElementById('langModalIcon');
const langModalTitle   = document.getElementById('langModalTitle');
const langModalGrid    = document.getElementById('langModalGrid');
const langModalEmpty   = document.getElementById('langModalEmpty');

function openLangModal(lang) {
  const cfg      = LANG_CONFIG[lang];
  const projects = COLLEGE_PROJECTS[lang] || [];

  langModalIcon.textContent  = cfg.icon;
  langModalTitle.textContent = cfg.label + ' Projects';

  if (projects.length === 0) {
    langModalGrid.innerHTML = '';
    langModalEmpty.style.display = 'block';
  } else {
    langModalEmpty.style.display = 'none';
    langModalGrid.innerHTML = projects.map(p => `
      <article class="project-card" aria-label="Project: ${p.title}">
        <div class="project-img" style="background: ${cfg.gradient};" aria-hidden="true">${cfg.icon} ${cfg.label}</div>
        <div class="project-content">
          <span class="proj-lang-badge ${cfg.badge}">${cfg.label}</span>
          <h3 class="project-title">${p.title}</h3>
          <p>${p.desc}</p>
          ${p.tags && p.tags.length ? `<div class="build-tags" style="margin-top: var(--space-3);">${p.tags.map(t => `<span class="build-tag">${t}</span>`).join('')}</div>` : ''}
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-accent" style="margin-top: var(--space-5);">View on GitHub</a>` : ''}
        </div>
      </article>
    `).join('');
  }

  langModalOverlay.classList.add('open');
  langModalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  langModalClose.focus();

  /* Reset scroll */
  document.getElementById('langModal').querySelector('.lang-modal-body').scrollTop = 0;
}

function closeLangModal() {
  langModalOverlay.classList.remove('open');
  langModalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* Lang card clicks → open modal */
document.querySelectorAll('.lang-card[data-filter]').forEach(card => {
  card.addEventListener('click', () => openLangModal(card.dataset.filter));
});

/* Close button */
langModalClose.addEventListener('click', closeLangModal);

/* Click outside modal panel to close */
langModalOverlay.addEventListener('click', e => {
  if (e.target === langModalOverlay) closeLangModal();
});

/* Escape key to close */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && langModalOverlay.classList.contains('open')) closeLangModal();
});

modeToggle.addEventListener('click', () => {
  const isCollege = document.body.classList.toggle('college-mode');
  modeToggle.setAttribute('aria-pressed', String(isCollege));
  modeToggle.setAttribute('aria-label', isCollege ? 'Switch to Game Dev Portfolio' : 'Switch to College Portfolio');
  modeLabel.textContent = isCollege ? 'GameDev' : 'College';
  logoEl.textContent    = isCollege ? 'Shriyansh — College' : 'Shriyansh GameDev';
  logoEl.setAttribute('aria-label', isCollege ? 'Shriyansh College Portfolio — Home' : 'Shriyansh GameDev — Home');
  logoEl.setAttribute('href', isCollege ? '#college-home' : '#home');
  applyNavLinks(isCollege ? COLLEGE_NAV : GAMEDEV_NAV);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

