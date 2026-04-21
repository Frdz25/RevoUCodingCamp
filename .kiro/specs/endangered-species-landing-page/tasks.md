# Implementation Plan: Endangered Species Landing Page (JagaAlam)

## Overview

Implement a single-page static website using HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript. The page is already scaffolded — tasks focus on completing and wiring all dynamic JS behavior, CSS custom styles, and ensuring the static HTML structure is correct and accessible.

## Tasks

- [x] 1. Set up data arrays and core rendering in `js/main.js`
  - [x] 1.1 Define the `species` array with at least 6 objects (name, status, statusColor, population, description, image)
    - Each object must include all fields defined in the data model
    - Use distinct `statusColor` Tailwind classes per IUCN level (red/orange/yellow)
    - _Requirements: 5.1, 5.2, 5.3, 5.6_
  - [x] 1.2 Define the `stats` array with at least 4 objects (value, suffix, label)
    - _Requirements: 6.1_
  - [x] 1.3 Define the `donationAmounts` array with at least 4 objects (label, value)
    - _Requirements: 7.1_

- [x] 2. Implement `renderSpecies()` — inject species cards into `#species-grid`
  - [x] 2.1 Write `renderSpecies()` to map the `species` array to HTML card strings and set `#species-grid.innerHTML`
    - Each card must include: image with non-empty `alt`, status badge with `statusColor` classes, species name, population, description
    - Cards must have class `species-card` and `fade-in`
    - _Requirements: 5.1, 5.2, 5.3, 5.6, 10.5_
  - [x] 2.2 Write property test for species card rendering completeness
    - **Property 1: Species card rendering completeness**
    - Generate arbitrary arrays of species objects (length 1–20); call `renderSpecies()` and assert exactly N `.species-card` elements exist in `#species-grid`, each containing the correct name, statusColor classes, population, and description
    - **Validates: Requirements 5.1, 5.2, 5.3**
  - [x] 2.3 Write property test for image alt attributes
    - **Property 8: All rendered images have non-empty alt attributes**
    - Generate arbitrary species arrays; call `renderSpecies()`; query all `img` elements in `#species-grid`; assert every `img.alt` is a non-empty string
    - **Validates: Requirements 10.5**

- [x] 3. Implement `renderStats()` — inject stat counters into `#stats-grid`
  - [x] 3.1 Write `renderStats()` to map the `stats` array to HTML strings and set `#stats-grid.innerHTML`
    - Each element must have class `stat-number`, `data-target`, and `data-suffix` attributes matching the source data
    - Elements must also have class `fade-in`
    - _Requirements: 6.1_
  - [x] 3.2 Write property test for stats rendering count
    - **Property 2: Stats rendering count**
    - Generate arbitrary stats arrays (length 1–10); call `renderStats()`; assert exactly N `.stat-number` elements exist with correct `data-target` and `data-suffix` attributes
    - **Validates: Requirements 6.1**

- [x] 4. Implement `animateCounters()` — scroll-triggered counter animation
  - [x] 4.1 Write `animateCounters()` using `IntersectionObserver` (threshold 0.5) to animate each `.stat-number` from 0 to its `data-target` value over ~2000ms using `setInterval`
    - Guard against `step = 0` when `data-target` is 0: use `Math.max(1, Math.ceil(target / 60))`
    - Call `observer.unobserve(el)` immediately after the observer fires (one-shot)
    - Final `textContent` must equal `target.toLocaleString() + suffix`
    - _Requirements: 6.2, 6.3, 6.5_
  - [x] 4.2 Add `IntersectionObserver` fallback: if `typeof IntersectionObserver === 'undefined'`, set each `.stat-number` `textContent` to `target.toLocaleString() + suffix` immediately
    - _Requirements: 6.4_
  - [x] 4.3 Write property test for counter animation reaching target value
    - **Property 3: Counter animation reaches target value**
    - Generate arbitrary stat objects (value 0–1,000,000, arbitrary suffix); trigger observer callback and run timers to completion; assert final `textContent` equals `value.toLocaleString() + suffix`
    - **Validates: Requirements 6.2**
  - [x] 4.4 Write property test for counter animation running only once
    - **Property 4: Counter animation runs only once**
    - Generate arbitrary stat data; trigger the observer callback twice; assert `unobserve` was called after the first trigger and the counter value does not reset on the second trigger
    - **Validates: Requirements 6.5**

- [x] 5. Implement `renderDonationAmounts()` — inject preset donation buttons
  - [x] 5.1 Write `renderDonationAmounts()` to inject `.amount-btn` buttons into `#donation-amounts`, each with a `data-value` attribute matching the source data
    - _Requirements: 7.1_
  - [x] 5.2 Attach click listeners to each `.amount-btn`: on click, remove `.active` from all buttons, add `.active` to the clicked button, and set `#custom-amount.value` to the button's `data-value`
    - _Requirements: 7.2, 7.3_
  - [x] 5.3 Write property test for donation buttons rendering count
    - **Property 5: Donation buttons rendering count**
    - Generate arbitrary `donationAmounts` arrays (length 1–10); call `renderDonationAmounts()`; assert exactly N `.amount-btn` elements exist with correct `data-value` attributes
    - **Validates: Requirements 7.1**
  - [x] 5.4 Write property test for donation button click populating amount input
    - **Property 6: Donation button click populates amount input**
    - Generate arbitrary donation amount objects; render buttons; simulate click on each; assert `#custom-amount.value` equals the button's `data-value` as a string
    - **Validates: Requirements 7.2**
  - [x] 5.5 Write property test for donation button active state mutual exclusion
    - **Property 7: Donation button active state mutual exclusion**
    - Generate arbitrary pairs of button indices; click first then second; assert only the second has `.active` and no other button has `.active`
    - **Validates: Requirements 7.3**

- [x] 6. Checkpoint — Ensure rendering and data tasks pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement `initNavbar()` — scroll-triggered navbar style
  - [x] 7.1 Write `initNavbar()` to attach a `scroll` event listener on `window`; toggle class `.scrolled` on `#navbar` when `window.scrollY > 60`
    - _Requirements: 1.2, 1.3, 1.4_
  - [x] 7.2 Write unit tests for navbar scroll behavior
    - Simulate scroll events at 0px, 60px, and 61px; verify `.scrolled` is absent at ≤60px and present at >60px
    - _Requirements: 1.3, 1.4_

- [x] 8. Implement `initMobileMenu()` — full-screen overlay navigation
  - [x] 8.1 Write `initMobileMenu()` to attach click listeners: `#menu-btn` removes `hidden` from `#mobile-menu`; `#close-menu` and each `.mobile-link` add `hidden` back
    - _Requirements: 2.2, 2.3, 2.4_
  - [x] 8.2 Write unit tests for mobile menu open/close
    - Simulate click on `#menu-btn`; assert `hidden` is removed from `#mobile-menu`
    - Simulate click on `#close-menu`; assert `hidden` is added back
    - Simulate click on a `.mobile-link`; assert `hidden` is added back
    - _Requirements: 2.2, 2.3, 2.4_

- [x] 9. Implement `initScrollObserver()` — fade-in on scroll
  - [x] 9.1 Write `initScrollObserver()` using `IntersectionObserver` (threshold 0.15) to add class `.visible` to each `.fade-in` element when it enters the viewport, then call `observer.unobserve()` on it (one-shot)
    - _Requirements: 5.4 (implicit from design), 6.1_

- [x] 10. Implement `initForms()` — form submission handlers
  - [x] 10.1 Write `initForms()` to attach a `submit` listener on `#donate-form`: call `e.preventDefault()`, show `#form-msg` (remove `hidden`), reset the form, hide `#form-msg` after 4 seconds
    - _Requirements: 7.4, 7.5, 7.6_
  - [x] 10.2 Attach a `submit` listener on `#contact-form` with the same pattern: show `#contact-msg`, reset, hide after 4 seconds
    - _Requirements: 8.3, 8.4_
  - [x] 10.3 Write unit tests for form submission (valid)
    - Fill all required fields, submit, assert success message is visible and form is reset
    - _Requirements: 7.5, 8.3_
  - [x] 10.4 Write unit tests for form submission (invalid)
    - Submit empty form, assert `form.checkValidity()` returns false and submission is prevented
    - _Requirements: 7.6, 8.4_

- [x] 11. Wire all init functions in `DOMContentLoaded`
  - [x] 11.1 Ensure `DOMContentLoaded` calls `renderSpecies()`, `renderStats()`, `renderDonationAmounts()`, `initNavbar()`, `initMobileMenu()`, and `initForms()` in order
  - [x] 11.2 Call `initScrollObserver()` and `animateCounters()` inside a `setTimeout(..., 100)` to ensure rendered elements are in the DOM before observers attach
    - _Requirements: 5.6, 6.3_

- [x] 12. Verify `css/style.css` custom styles are complete
  - [x] 12.1 Confirm `html { scroll-behavior: smooth; }` is present for smooth anchor scrolling
    - _Requirements: 1.5, 1.6, 3.5, 3.6_
  - [x] 12.2 Confirm `#navbar` transparent default and `#navbar.scrolled` solid background + shadow styles are present
    - _Requirements: 1.3, 1.4_
  - [x] 12.3 Confirm `.species-card` hover transform and `.fade-in` / `.fade-in.visible` transition styles are present
    - _Requirements: 5.2_
  - [x] 12.4 Confirm `.amount-btn.active` active state styles are present
    - _Requirements: 7.3_

- [x] 13. Verify `index.html` static structure and accessibility
  - [x] 13.1 Confirm all required section IDs exist in order: `#navbar`, `#hero`, `#about`, `#species`, `#impact`, `#donate`, `#contact`, footer
    - _Requirements: 1.1_
  - [x] 13.2 Confirm `<meta name="viewport">` tag is present
    - _Requirements: 10.4_
  - [x] 13.3 Confirm Tailwind CDN `<script>` tag is present in `<head>` and `js/main.js` `<script>` tag is before `</body>`
    - _Requirements: 10.1, 10.2_
  - [x] 13.4 Confirm all static `<img>` elements have non-empty `alt` attributes
    - _Requirements: 10.5_
  - [x] 13.5 Confirm footer contains at least 4 social media links (Instagram, Twitter, Facebook, YouTube)
    - _Requirements: 9.2_
  - [x] 13.6 Confirm responsive Tailwind grid classes are present on containers (`md:grid-cols-2`, `md:grid-cols-3`)
    - _Requirements: 4.4, 4.5, 5.4, 5.5, 8.5, 8.6_

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests should use [fast-check](https://github.com/dubzzz/fast-check) with jsdom (Jest or Vitest)
- Each property test must include a comment: `// Feature: endangered-species-landing-page, Property N: <property_text>`
- All implementation is in three files: `index.html`, `js/main.js`, `css/style.css` — no build step required
- Checkpoints ensure incremental validation before moving to the next phase
