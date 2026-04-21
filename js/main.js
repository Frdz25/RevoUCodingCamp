// ── Species Data ──────────────────────────────────────────────
const species = [
  {
    name: "Sumatran Orangutan",
    status: "Critically Endangered",
    statusColor: "bg-red-100 text-red-700",
    population: "~13,000 remaining",
    description: "Deforestation and illegal pet trade have pushed this great ape to the brink. Found only in the rainforests of Sumatra.",
    image: "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=600&q=80",
    // "https://unsplash.com/photos/the-female-of-the-orangutan-with-a-baby-on-ground-indonesia-the-island-of-kalimantan-borneo-an-excellent-illustration-nHFAaf0jFBs"
  },
  {
    name: "Javan Rhino",
    status: "Critically Endangered",
    statusColor: "bg-red-100 text-red-700",
    population: "~76 remaining",
    description: "One of the rarest large mammals on Earth, surviving only in Ujung Kulon National Park on the western tip of Java.",
    image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=600&q=80",
  },
  {
    name: "Sumatran Tiger",
    status: "Critically Endangered",
    statusColor: "bg-red-100 text-red-700",
    population: "~400 remaining",
    description: "The smallest surviving tiger subspecies, threatened by habitat loss and poaching across the Sumatran landscape.",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80",
  },
  {
    name: "Irrawaddy Dolphin",
    status: "Endangered",
    statusColor: "bg-orange-100 text-orange-700",
    population: "~92 in Mahakam",
    description: "This freshwater dolphin faces threats from fishing nets, boat traffic, and pollution in Kalimantan's Mahakam River.",
    image: "https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=600&q=80",
  },
  {
    name: "Bali Starling",
    status: "Critically Endangered",
    statusColor: "bg-red-100 text-red-700",
    population: "~100 in the wild",
    description: "Indonesia's iconic white bird, endemic to Bali, has been decimated by the illegal cage-bird trade.",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80",
  },
  {
    name: "Komodo Dragon",
    status: "Endangered",
    statusColor: "bg-orange-100 text-orange-700",
    population: "~1,400 remaining",
    description: "The world's largest lizard is threatened by rising sea levels, habitat loss, and reduced prey availability.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
];

// ── Stats Data ─────────────────────────────────────────────────
const stats = [
  { value: 12000, suffix: "+", label: "Hectares Protected" },
  { value: 48,    suffix: "",  label: "Species Monitored" },
  { value: 320,   suffix: "+", label: "Community Partners" },
  { value: 5,     suffix: "M+", label: "IDR Raised" },
];

// ── Donation Amounts ───────────────────────────────────────────
const donationAmounts = [
  { label: "IDR 50K",  value: 50000 },
  { label: "IDR 100K", value: 100000 },
  { label: "IDR 250K", value: 250000 },
  { label: "IDR 500K", value: 500000 },
];

// ── HTML Escape Helper ─────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Render Species Cards ───────────────────────────────────────
function renderSpecies() {
  const grid = document.getElementById("species-grid");
  grid.innerHTML = species.map(s => `
    <div class="species-card bg-white rounded-2xl overflow-hidden shadow-md fade-in">
      <div class="relative h-52 overflow-hidden">
        <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.name)}" class="w-full h-full object-cover hover:scale-105 transition duration-500" />
        <span class="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${escapeHtml(s.statusColor)}">${escapeHtml(s.status)}</span>
      </div>
      <div class="p-6">
        <h3 class="font-heading text-xl text-forest mb-1">${escapeHtml(s.name)}</h3>
        <p class="text-moss text-sm font-medium mb-3">${escapeHtml(s.population)}</p>
        <p class="text-gray-500 text-sm leading-relaxed">${escapeHtml(s.description)}</p>
      </div>
    </div>
  `).join("");
}

// ── Render Stats ───────────────────────────────────────────────
function renderStats() {
  const grid = document.getElementById("stats-grid");
  grid.innerHTML = stats.map(s => `
    <div class="fade-in">
      <p class="stat-number" data-target="${s.value}" data-suffix="${escapeHtml(s.suffix)}">0</p>
      <p class="text-gray-300 text-sm mt-1">${escapeHtml(s.label)}</p>
    </div>
  `).join("");
}

// ── Render Donation Buttons ────────────────────────────────────
function renderDonationAmounts() {
  const container = document.getElementById("donation-amounts");
  container.innerHTML = donationAmounts.map(d => `
    <button class="amount-btn border-2 border-leaf text-leaf font-semibold px-6 py-2 rounded-full hover:bg-leaf hover:text-white transition" data-value="${d.value}">
      ${d.label}
    </button>
  `).join("");

  container.querySelectorAll(".amount-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".amount-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("custom-amount").value = btn.dataset.value;
    });
  });
}

// ── Navbar Scroll Effect ───────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });
}

// ── Mobile Menu ────────────────────────────────────────────────
function initMobileMenu() {
  const btn       = document.getElementById("menu-btn");
  const closeBtn  = document.getElementById("close-menu");
  const menu      = document.getElementById("mobile-menu");
  const links     = menu.querySelectorAll(".mobile-link");

  const openMenu  = () => menu.classList.remove("hidden");
  const closeMenu = () => menu.classList.add("hidden");

  btn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  links.forEach(l => l.addEventListener("click", closeMenu));
}

// ── Scroll Fade-In Observer ────────────────────────────────────
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

// ── Counter Animation ──────────────────────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix;
      let current  = 0;
      const step   = Math.ceil(target / 60);
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString() + suffix;
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ── Form Handlers ──────────────────────────────────────────────
function initForms() {
  document.getElementById("donate-form").addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.getElementById("form-msg");
    msg.classList.remove("hidden");
    e.target.reset();
    setTimeout(() => msg.classList.add("hidden"), 4000);
  });

  document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.getElementById("contact-msg");
    msg.classList.remove("hidden");
    e.target.reset();
    setTimeout(() => msg.classList.add("hidden"), 4000);
  });
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderSpecies();
  renderStats();
  renderDonationAmounts();
  initNavbar();
  initMobileMenu();
  // Observer needs elements in DOM first
  setTimeout(() => {
    initScrollObserver();
    animateCounters();
  }, 100);
  initForms();
});
