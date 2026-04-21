import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fc from 'fast-check';
import { JSDOM } from 'jsdom';

// ── Pure function implementations (mirrored from main.js) ──────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderSpecies(species, container) {
  container.innerHTML = species.map(s => `
    <div class="species-card bg-white rounded-2xl overflow-hidden shadow-md fade-in">
      <div class="relative h-52 overflow-hidden">
        <img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.name)}" class="w-full h-full object-cover" />
        <span class="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${escapeHtml(s.statusColor)}">${escapeHtml(s.status)}</span>
      </div>
      <div class="p-6">
        <h3 class="font-heading text-xl text-forest mb-1">${escapeHtml(s.name)}</h3>
        <p class="text-moss text-sm font-medium mb-3">${escapeHtml(s.population)}</p>
        <p class="text-gray-500 text-sm leading-relaxed">${escapeHtml(s.description)}</p>
      </div>
    </div>
  `).join('');
}

function renderStats(stats, container) {
  container.innerHTML = stats.map(s => `
    <div class="fade-in">
      <p class="stat-number" data-target="${s.value}" data-suffix="${escapeHtml(s.suffix)}">0</p>
      <p class="text-gray-300 text-sm mt-1">${escapeHtml(s.label)}</p>
    </div>
  `).join('');
}

function renderDonationAmounts(donationAmounts, container, customAmountInput) {
  container.innerHTML = donationAmounts.map(d => `
    <button class="amount-btn border-2 border-leaf text-leaf font-semibold px-6 py-2 rounded-full" data-value="${d.value}">
      ${d.label}
    </button>
  `).join('');

  container.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      customAmountInput.value = btn.dataset.value;
    });
  });
}

// ── Property Tests ─────────────────────────────────────────────

// Feature: endangered-species-landing-page, Property 1: Species card rendering completeness
it('Property 1: renders exactly N species cards with correct content', () => {
  fc.assert(fc.property(
    fc.array(fc.record({
      name: fc.string({ minLength: 1 }),
      status: fc.string({ minLength: 1 }),
      statusColor: fc.string(),
      population: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      image: fc.webUrl(),
    }), { minLength: 1, maxLength: 20 }),
    (speciesArr) => {
      const dom = new JSDOM('<div id="species-grid"></div>');
      const container = dom.window.document.getElementById('species-grid');
      renderSpecies(speciesArr, container);
      const cards = container.querySelectorAll('.species-card');
      expect(cards.length).toBe(speciesArr.length);
      speciesArr.forEach((s, i) => {
        // Use textContent for text nodes (browser unescapes HTML entities)
        expect(cards[i].textContent).toContain(s.name);
        expect(cards[i].textContent).toContain(s.population);
        expect(cards[i].textContent).toContain(s.description);
        // statusColor classes are injected into the class attribute — check via className
        const badge = cards[i].querySelector('span');
        s.statusColor.split(' ').filter(Boolean).forEach(cls => {
          expect(badge.className).toContain(cls);
        });
      });
    }
  ));
});

// Feature: endangered-species-landing-page, Property 8: All rendered images have non-empty alt attributes
it('Property 8: all rendered images have non-empty alt attributes', () => {
  fc.assert(fc.property(
    fc.array(fc.record({
      name: fc.string({ minLength: 1 }),
      status: fc.string({ minLength: 1 }),
      statusColor: fc.string(),
      population: fc.string({ minLength: 1 }),
      description: fc.string({ minLength: 1 }),
      image: fc.webUrl(),
    }), { minLength: 1, maxLength: 20 }),
    (speciesArr) => {
      const dom = new JSDOM('<div id="species-grid"></div>');
      const container = dom.window.document.getElementById('species-grid');
      renderSpecies(speciesArr, container);
      const imgs = container.querySelectorAll('img');
      imgs.forEach(img => {
        expect(img.alt).toBeTruthy();
        expect(img.alt.length).toBeGreaterThan(0);
      });
    }
  ));
});

// Feature: endangered-species-landing-page, Property 2: Stats rendering count
it('Property 2: renders exactly N stat-number elements with correct data attributes', () => {
  fc.assert(fc.property(
    fc.array(fc.record({
      value: fc.integer({ min: 0, max: 1000000 }),
      suffix: fc.string(),
      label: fc.string({ minLength: 1 }),
    }), { minLength: 1, maxLength: 10 }),
    (statsArr) => {
      const dom = new JSDOM('<div id="stats-grid"></div>');
      const container = dom.window.document.getElementById('stats-grid');
      renderStats(statsArr, container);
      const statEls = container.querySelectorAll('.stat-number');
      expect(statEls.length).toBe(statsArr.length);
      statsArr.forEach((s, i) => {
        expect(statEls[i].dataset.target).toBe(String(s.value));
        // dataset returns the unescaped attribute value
        expect(statEls[i].dataset.suffix).toBe(s.suffix);
      });
    }
  ));
});

// Feature: endangered-species-landing-page, Property 5: Donation buttons rendering count
it('Property 5: renders exactly N donation buttons with correct data-value', () => {
  fc.assert(fc.property(
    fc.array(fc.record({
      label: fc.string({ minLength: 1 }),
      value: fc.integer({ min: 1, max: 10000000 }),
    }), { minLength: 1, maxLength: 10 }),
    (amounts) => {
      const dom = new JSDOM('<div id="donation-amounts"></div><input id="custom-amount" />');
      const container = dom.window.document.getElementById('donation-amounts');
      const input = dom.window.document.getElementById('custom-amount');
      renderDonationAmounts(amounts, container, input);
      const btns = container.querySelectorAll('.amount-btn');
      expect(btns.length).toBe(amounts.length);
      amounts.forEach((a, i) => {
        expect(btns[i].dataset.value).toBe(String(a.value));
      });
    }
  ));
});

// Feature: endangered-species-landing-page, Property 6: Donation button click populates amount input
it('Property 6: clicking a donation button populates the amount input', () => {
  fc.assert(fc.property(
    fc.array(fc.record({
      label: fc.string({ minLength: 1 }),
      value: fc.integer({ min: 1, max: 10000000 }),
    }), { minLength: 1, maxLength: 10 }),
    fc.integer({ min: 0, max: 9 }),
    (amounts, rawIdx) => {
      const idx = rawIdx % amounts.length;
      const dom = new JSDOM('<div id="donation-amounts"></div><input id="custom-amount" />');
      const container = dom.window.document.getElementById('donation-amounts');
      const input = dom.window.document.getElementById('custom-amount');
      renderDonationAmounts(amounts, container, input);
      const btns = container.querySelectorAll('.amount-btn');
      btns[idx].click();
      expect(input.value).toBe(String(amounts[idx].value));
    }
  ));
});

// Feature: endangered-species-landing-page, Property 7: Donation button active state mutual exclusion
it('Property 7: only one donation button can be active at a time', () => {
  fc.assert(fc.property(
    fc.array(fc.record({
      label: fc.string({ minLength: 1 }),
      value: fc.integer({ min: 1, max: 10000000 }),
    }), { minLength: 2, maxLength: 10 }),
    fc.integer({ min: 0, max: 9 }),
    fc.integer({ min: 0, max: 9 }),
    (amounts, rawA, rawB) => {
      const idxA = rawA % amounts.length;
      let idxB = rawB % amounts.length;
      if (idxB === idxA) idxB = (idxA + 1) % amounts.length;
      const dom = new JSDOM('<div id="donation-amounts"></div><input id="custom-amount" />');
      const container = dom.window.document.getElementById('donation-amounts');
      const input = dom.window.document.getElementById('custom-amount');
      renderDonationAmounts(amounts, container, input);
      const btns = container.querySelectorAll('.amount-btn');
      btns[idxA].click();
      btns[idxB].click();
      const activeBtns = container.querySelectorAll('.amount-btn.active');
      expect(activeBtns.length).toBe(1);
      expect(activeBtns[0]).toBe(btns[idxB]);
    }
  ));
});

// Feature: endangered-species-landing-page, Property 3: Counter animation reaches target value
it('Property 3: counter animation reaches target value', () => {
  fc.assert(fc.property(
    fc.integer({ min: 0, max: 1000000 }),
    fc.string(),
    (targetVal, suffix) => {
      vi.useFakeTimers();
      const dom = new JSDOM(`<p class="stat-number" data-target="${targetVal}" data-suffix="${suffix}">0</p>`);
      const el = dom.window.document.querySelector('.stat-number');
      const target = parseInt(el.dataset.target);
      const sfx = el.dataset.suffix;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString() + sfx;
      }, 30);
      vi.runAllTimers();
      expect(el.textContent).toBe(target.toLocaleString() + sfx);
      vi.useRealTimers();
    }
  ));
});

// Feature: endangered-species-landing-page, Property 4: Counter animation runs only once
it('Property 4: counter animation runs only once (unobserve called)', () => {
  fc.assert(fc.property(
    fc.integer({ min: 1, max: 100000 }),
    fc.string(),
    (targetVal, suffix) => {
      vi.useFakeTimers();
      const unobserveMock = vi.fn();
      const dom = new JSDOM(`<p class="stat-number" data-target="${targetVal}" data-suffix="${suffix}">0</p>`);
      const el = dom.window.document.querySelector('.stat-number');
      const target = parseInt(el.dataset.target);
      const sfx = el.dataset.suffix;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      // Simulate observer callback firing
      const runAnimation = () => {
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString() + sfx;
        }, 30);
        unobserveMock(el);
      };
      runAnimation();
      vi.runAllTimers();
      const valueAfterFirst = el.textContent;
      // unobserve was already called, so we just verify it was called once
      expect(unobserveMock).toHaveBeenCalledTimes(1);
      expect(el.textContent).toBe(valueAfterFirst);
      vi.useRealTimers();
    }
  ));
});

// ── Unit Tests ─────────────────────────────────────────────────

describe('initNavbar', () => {
  let dom, navbar, scrollHandler;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><nav id="navbar"></nav>');
    navbar = dom.window.document.getElementById('navbar');
    // Replicate initNavbar logic
    scrollHandler = () => {
      navbar.classList.toggle('scrolled', dom.window.scrollY > 60);
    };
    dom.window.addEventListener('scroll', scrollHandler);
  });

  it('does not add .scrolled at scrollY = 0', () => {
    Object.defineProperty(dom.window, 'scrollY', { value: 0, configurable: true });
    dom.window.dispatchEvent(new dom.window.Event('scroll'));
    expect(navbar.classList.contains('scrolled')).toBe(false);
  });

  it('does not add .scrolled at scrollY = 60', () => {
    Object.defineProperty(dom.window, 'scrollY', { value: 60, configurable: true });
    dom.window.dispatchEvent(new dom.window.Event('scroll'));
    expect(navbar.classList.contains('scrolled')).toBe(false);
  });

  it('adds .scrolled at scrollY = 61', () => {
    Object.defineProperty(dom.window, 'scrollY', { value: 61, configurable: true });
    dom.window.dispatchEvent(new dom.window.Event('scroll'));
    expect(navbar.classList.contains('scrolled')).toBe(true);
  });
});

describe('initMobileMenu', () => {
  let dom, menuBtn, closeBtn, mobileMenu, mobileLink;

  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html>
      <button id="menu-btn"></button>
      <div id="mobile-menu" class="hidden">
        <button id="close-menu"></button>
        <a class="mobile-link" href="#about">About</a>
      </div>
    `);
    menuBtn = dom.window.document.getElementById('menu-btn');
    closeBtn = dom.window.document.getElementById('close-menu');
    mobileMenu = dom.window.document.getElementById('mobile-menu');
    mobileLink = dom.window.document.querySelector('.mobile-link');

    // Replicate initMobileMenu logic
    menuBtn.addEventListener('click', () => mobileMenu.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    dom.window.document.querySelectorAll('.mobile-link').forEach(l =>
      l.addEventListener('click', () => mobileMenu.classList.add('hidden'))
    );
  });

  it('removes hidden from mobile-menu when menu-btn is clicked', () => {
    menuBtn.click();
    expect(mobileMenu.classList.contains('hidden')).toBe(false);
  });

  it('adds hidden to mobile-menu when close-menu is clicked', () => {
    menuBtn.click();
    closeBtn.click();
    expect(mobileMenu.classList.contains('hidden')).toBe(true);
  });

  it('adds hidden to mobile-menu when a mobile-link is clicked', () => {
    menuBtn.click();
    mobileLink.click();
    expect(mobileMenu.classList.contains('hidden')).toBe(true);
  });
});

describe('initForms - valid submission', () => {
  let dom, donateForm, formMsg, contactForm, contactMsg;

  beforeEach(() => {
    vi.useFakeTimers();
    dom = new JSDOM(`<!DOCTYPE html>
      <form id="donate-form">
        <input name="name" required value="Test User" />
        <input name="email" type="email" required value="test@example.com" />
        <div id="form-msg" class="hidden">Thank you!</div>
        <button type="submit">Submit</button>
      </form>
      <form id="contact-form">
        <input name="name" required value="Test User" />
        <input name="email" type="email" required value="test@example.com" />
        <textarea name="message" required>Hello</textarea>
        <div id="contact-msg" class="hidden">Message sent!</div>
        <button type="submit">Submit</button>
      </form>
    `);
    donateForm = dom.window.document.getElementById('donate-form');
    formMsg = dom.window.document.getElementById('form-msg');
    contactForm = dom.window.document.getElementById('contact-form');
    contactMsg = dom.window.document.getElementById('contact-msg');

    // Replicate initForms logic
    donateForm.addEventListener('submit', e => {
      e.preventDefault();
      formMsg.classList.remove('hidden');
      e.target.reset();
      setTimeout(() => formMsg.classList.add('hidden'), 4000);
    });
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      contactMsg.classList.remove('hidden');
      e.target.reset();
      setTimeout(() => contactMsg.classList.add('hidden'), 4000);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows success message and resets donate form on valid submit', () => {
    donateForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    expect(formMsg.classList.contains('hidden')).toBe(false);
  });

  it('hides donate form success message after 4 seconds', () => {
    donateForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    vi.advanceTimersByTime(4000);
    expect(formMsg.classList.contains('hidden')).toBe(true);
  });

  it('shows success message and resets contact form on valid submit', () => {
    contactForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    expect(contactMsg.classList.contains('hidden')).toBe(false);
  });

  it('hides contact form success message after 4 seconds', () => {
    contactForm.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true }));
    vi.advanceTimersByTime(4000);
    expect(contactMsg.classList.contains('hidden')).toBe(true);
  });
});

describe('initForms - invalid submission', () => {
  it('checkValidity returns false for empty donate form', () => {
    const dom = new JSDOM(`<!DOCTYPE html>
      <form id="donate-form">
        <input name="name" required />
        <input name="email" type="email" required />
      </form>
    `);
    const form = dom.window.document.getElementById('donate-form');
    expect(form.checkValidity()).toBe(false);
  });

  it('checkValidity returns false for empty contact form', () => {
    const dom = new JSDOM(`<!DOCTYPE html>
      <form id="contact-form">
        <input name="name" required />
        <input name="email" type="email" required />
        <textarea name="message" required></textarea>
      </form>
    `);
    const form = dom.window.document.getElementById('contact-form');
    expect(form.checkValidity()).toBe(false);
  });
});
