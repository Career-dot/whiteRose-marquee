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

// ===== Availability checker (mock logic) =====
const checkBtn = document.getElementById('checkAvailBtn');
const availResult = document.getElementById('availResult');
const availDot = document.getElementById('availDot');
const availText = document.getElementById('availText');

checkBtn.addEventListener('click', () => {
  const date = document.getElementById('availDate').value;
  const hall = document.getElementById('availHall').value;
  availResult.classList.add('show');

  if (!date) {
    availDot.className = 'dot hold';
    availText.textContent = 'Please select a date to check availability.';
    return;
  }
  const day = new Date(date).getDate();
  const isAvailable = day % 3 !== 0; // simplified placeholder rule for this prototype
  if (isAvailable) {
    availDot.className = 'dot ok';
    availText.textContent = `${hall} is available on ${new Date(date).toDateString()}. Reserve it with a deposit to confirm.`;
  } else {
    availDot.className = 'dot hold';
    availText.textContent = `${hall} is already held on this date. Our team can suggest the nearest open dates.`;
  }
});

// ===== Package customizer =====
const pkgData = {
  wedding:   { title:'The Wedding Package',    sub:'Venue, décor foundation and coordination for your ceremony or reception.', includes:['Hall booking, 8-hour slot','Stage &amp; floral centerpiece décor','Guest seating &amp; table linens','Dedicated event coordinator'], base:450000 },
  corporate: { title:'The Corporate Package',  sub:'A polished setup for dinners, launches and conferences.',                  includes:['Hall booking, 6-hour slot','Stage, screen &amp; branding backdrop','Boardroom-style or banquet seating','On-site event manager'], base:280000 },
  birthday:  { title:'The Celebration Package',sub:'A vibrant setup for birthdays, anniversaries and family milestones.',      includes:['Hall booking, 5-hour slot','Themed backdrop &amp; balloon décor','Dessert table styling','Dedicated host coordinator'], base:160000 }
};

let basePrice = 450000;
const checkboxes = document.querySelectorAll('.addon-row input[type=checkbox]');

function recalcTotal() {
  let total = basePrice;
  checkboxes.forEach(cb => { if (cb.checked) total += parseInt(cb.dataset.price, 10); });
  document.getElementById('pkgBase').textContent = total.toLocaleString('en-IN');
}

document.querySelectorAll('.pkg-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pkg-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const d = pkgData[tab.dataset.pkg];
    document.getElementById('pkgTitle').textContent = d.title;
    document.getElementById('pkgSub').textContent = d.sub;
    document.getElementById('pkgIncludes').innerHTML = d.includes.map(i => `<li>${i}</li>`).join('');
    basePrice = d.base;
    recalcTotal();
  });
});

checkboxes.forEach(cb => cb.addEventListener('change', recalcTotal));

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
