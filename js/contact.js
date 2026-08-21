// ===== Mobile nav toggle =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.cssText += 'position:absolute; top:100%; left:0; right:0; background:#fff; flex-direction:column; padding:18px 32px; gap:16px; box-shadow:0 20px 30px -20px rgba(0,0,0,0.25);';
  });
}

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Contact form (front-end only — no real submission) =====
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.textContent = "Thanks! This is a front-end demo, so your message wasn't actually sent — connect a backend to enable real submissions.";
  formMsg.classList.add('show');
  contactForm.reset();
});

// ===== Featured On — rotating badge/text =====
const featuredItems = [
  { badge: "Featured In<br>The Wedding Journal", text: 'A boutique banquet hall and event planning studio hosting weddings and celebrations across <b>Gujranwala</b> and <b>Lahore</b>.' },
  { badge: "Featured In<br>City Bridal Guide", text: 'Serving weddings, receptions and corporate events across <b>Punjab</b>, with three signature halls under one roof.' },
  { badge: "Featured In<br>Venue &amp; Vine", text: 'Recognized for bespoke décor and full-service event planning for <b>weddings</b>, <b>corporate dinners</b> and <b>celebrations</b>.' }
];
let featuredIndex = 0;
const featuredBadgeEl = document.getElementById('featuredBadgeText');
const featuredTextEl = document.getElementById('featuredText');

if (featuredBadgeEl && featuredTextEl) {
  setInterval(() => {
    featuredBadgeEl.classList.add('fade-out');
    featuredTextEl.classList.add('fade-out');
    setTimeout(() => {
      featuredIndex = (featuredIndex + 1) % featuredItems.length;
      featuredBadgeEl.innerHTML = featuredItems[featuredIndex].badge;
      featuredTextEl.innerHTML = featuredItems[featuredIndex].text;
      featuredBadgeEl.classList.remove('fade-out');
      featuredTextEl.classList.remove('fade-out');
    }, 400);
  }, 4000);
}
