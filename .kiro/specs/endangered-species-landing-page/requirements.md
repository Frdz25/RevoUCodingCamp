# Requirements Document

## Introduction

JagaAlam is a non-profit landing page website built to raise awareness about endangered species in Indonesia. The site is a single-page application built with HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript. It presents information about at-risk wildlife, showcases the organization's impact, and drives visitors toward donation and contact actions. The page is designed to be visually compelling, accessible, and fully responsive across desktop and mobile devices.

## Glossary

- **Landing_Page**: The single HTML page (`index.html`) that constitutes the entire website.
- **Navbar**: The fixed top navigation bar containing the logo, navigation links, and a donate CTA button.
- **Hero_Section**: The full-viewport introductory section with a background image, headline, and call-to-action buttons.
- **About_Section**: The section describing the organization's mission and background.
- **Species_Section**: The section displaying cards for featured endangered species.
- **Species_Card**: A single card component displaying a species image, name, conservation status badge, and short description.
- **Impact_Section**: The section displaying animated statistics about the organization's achievements.
- **Donate_Section**: The section containing preset donation amount buttons and a donation form.
- **Contact_Section**: The section containing contact information and a contact message form.
- **Footer**: The bottom section containing the logo, tagline, social media links, and copyright notice.
- **Mobile_Menu**: The full-screen overlay navigation menu displayed on small-screen devices.
- **Stat_Counter**: An animated numeric counter used in the Impact_Section to display achievement figures.
- **Donation_Form**: The HTML form in the Donate_Section that collects donor name, email, and amount.
- **Contact_Form**: The HTML form in the Contact_Section that collects name, email, and message.
- **Conservation_Status**: A label indicating the IUCN threat level of a species (e.g., Critically Endangered, Endangered, Vulnerable).
- **Tailwind_CDN**: The Tailwind CSS framework loaded via `<script src="https://cdn.tailwindcss.com">`.
- **JS_Module**: The `js/main.js` file responsible for all dynamic behavior on the Landing_Page.

---

## Requirements

### Requirement 1: Page Structure and Navigation

**User Story:** As a visitor, I want a clear and persistent navigation bar, so that I can quickly jump to any section of the page at any time.

#### Acceptance Criteria

1. THE Landing_Page SHALL contain exactly six sections rendered in this order: Navbar, Hero_Section, About_Section, Species_Section, Impact_Section, Donate_Section, Contact_Section, and Footer.
2. THE Navbar SHALL be fixed to the top of the viewport and remain visible during scrolling.
3. WHEN the page is scrolled past 50 pixels from the top, THE Navbar SHALL apply a solid dark background color and a drop shadow to remain legible against page content.
4. WHEN the page is at the top (scroll position 0), THE Navbar SHALL display with a transparent background.
5. THE Navbar SHALL contain navigation links that, when clicked, scroll smoothly to the corresponding section.
6. WHEN a visitor clicks the "Donate Now" button in the Navbar, THE Landing_Page SHALL scroll smoothly to the Donate_Section.

---

### Requirement 2: Responsive Mobile Navigation

**User Story:** As a visitor on a mobile device, I want a full-screen menu overlay, so that I can navigate the page without the links being too small to tap.

#### Acceptance Criteria

1. WHILE the viewport width is below 768px, THE Navbar SHALL hide the desktop navigation links and the desktop donate button, and display a hamburger icon button instead.
2. WHEN a visitor taps the hamburger icon, THE Mobile_Menu SHALL become visible as a full-screen overlay.
3. WHILE the Mobile_Menu is open, THE Landing_Page SHALL display a close (×) button within the Mobile_Menu.
4. WHEN a visitor taps the close button or taps any navigation link inside the Mobile_Menu, THE Mobile_Menu SHALL hide.
5. WHILE the viewport width is 768px or above, THE Navbar SHALL hide the hamburger icon and display the desktop navigation links and donate button.

---

### Requirement 3: Hero Section

**User Story:** As a visitor, I want an impactful hero section with a clear call to action, so that I immediately understand the purpose of the site and know what to do next.

#### Acceptance Criteria

1. THE Hero_Section SHALL occupy 100% of the viewport height on initial page load.
2. THE Hero_Section SHALL display a full-cover background image with a dark gradient overlay to ensure text legibility.
3. THE Hero_Section SHALL display a primary headline, a supporting subheadline, and two call-to-action buttons: one linking to the Species_Section and one linking to the Donate_Section.
4. THE Hero_Section SHALL display a downward-pointing animated scroll indicator arrow at the bottom center of the section.
5. WHEN a visitor clicks the "Meet the Species" button, THE Landing_Page SHALL scroll smoothly to the Species_Section.
6. WHEN a visitor clicks the "Support Us" button, THE Landing_Page SHALL scroll smoothly to the Donate_Section.

---

### Requirement 4: About Section

**User Story:** As a visitor, I want to read about the organization's mission, so that I can understand who JagaAlam is and why their work matters.

#### Acceptance Criteria

1. THE About_Section SHALL display the organization's name, mission statement, and a descriptive paragraph about its work across Indonesia.
2. THE About_Section SHALL display an image alongside the text content.
3. THE About_Section SHALL display a highlighted statistic callout (e.g., "700+ Species at risk") overlaid on or adjacent to the image.
4. WHILE the viewport width is 768px or above, THE About_Section SHALL render the text and image in a two-column side-by-side layout.
5. WHILE the viewport width is below 768px, THE About_Section SHALL render the text and image in a single-column stacked layout.

---

### Requirement 5: Species Cards Section

**User Story:** As a visitor, I want to see featured endangered species with key information, so that I can connect emotionally with the wildlife that needs protection.

#### Acceptance Criteria

1. THE Species_Section SHALL display a minimum of three Species_Cards populated dynamically by the JS_Module.
2. EACH Species_Card SHALL display a species image, the species common name, a Conservation_Status badge, and a short description of the species and its threats.
3. THE Conservation_Status badge SHALL use a distinct background color to visually differentiate threat levels (e.g., red for Critically Endangered, orange for Endangered, yellow for Vulnerable).
4. WHILE the viewport width is 768px or above, THE Species_Section SHALL render Species_Cards in a three-column grid layout.
5. WHILE the viewport width is below 768px, THE Species_Section SHALL render Species_Cards in a single-column stacked layout.
6. THE JS_Module SHALL define the species data as a JavaScript array of objects and inject the Species_Cards into the DOM on page load.

---

### Requirement 6: Impact Statistics Section

**User Story:** As a visitor, I want to see measurable proof of the organization's achievements, so that I feel confident that my support will make a real difference.

#### Acceptance Criteria

1. THE Impact_Section SHALL display a minimum of four Stat_Counters, each showing a numeric achievement figure and a descriptive label.
2. WHEN the Impact_Section enters the browser viewport, THE JS_Module SHALL start animating each Stat_Counter from zero to its target value over a duration of 2000 milliseconds.
3. THE JS_Module SHALL use the Intersection Observer API to detect when the Impact_Section enters the viewport before triggering the counter animation.
4. IF the Intersection Observer API is not supported by the browser, THE JS_Module SHALL display the final target values immediately without animation.
5. THE Stat_Counter animation SHALL run only once per page load; re-scrolling past the section SHALL NOT restart the animation.

---

### Requirement 7: Donation Section

**User Story:** As a supporter, I want to easily select a donation amount and submit my details, so that I can contribute to protecting endangered species in Indonesia.

#### Acceptance Criteria

1. THE Donate_Section SHALL display a minimum of four preset donation amount buttons (e.g., IDR 50,000 / IDR 100,000 / IDR 250,000 / IDR 500,000) injected by the JS_Module.
2. WHEN a visitor clicks a preset donation amount button, THE Donation_Form SHALL populate the custom amount input field with the selected amount value.
3. WHEN a visitor clicks a preset donation amount button, THE Donate_Section SHALL apply a visual active/selected style to the clicked button and remove it from any previously selected button.
4. THE Donation_Form SHALL contain input fields for donor name (text, required), email address (email, required), and a custom amount (number, optional).
5. WHEN a visitor submits the Donation_Form with all required fields valid, THE Donation_Form SHALL display a success confirmation message and reset the form fields.
6. IF a visitor submits the Donation_Form with one or more required fields empty, THE Donation_Form SHALL prevent submission and display native browser validation messages.

---

### Requirement 8: Contact Section

**User Story:** As a potential partner or supporter, I want to send a message to the organization, so that I can inquire about collaboration or ask questions.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the organization's physical address, email address, and phone number.
2. THE Contact_Form SHALL contain input fields for name (text, required), email address (email, required), and a message (textarea, required).
3. WHEN a visitor submits the Contact_Form with all required fields valid, THE Contact_Form SHALL display a success confirmation message and reset the form fields.
4. IF a visitor submits the Contact_Form with one or more required fields empty, THE Contact_Form SHALL prevent submission and display native browser validation messages.
5. WHILE the viewport width is 768px or above, THE Contact_Section SHALL render the contact information and the Contact_Form in a two-column side-by-side layout.
6. WHILE the viewport width is below 768px, THE Contact_Section SHALL render the contact information and the Contact_Form in a single-column stacked layout.

---

### Requirement 9: Footer

**User Story:** As a visitor at the bottom of the page, I want to find the organization's branding and social media links, so that I can follow JagaAlam on other platforms.

#### Acceptance Criteria

1. THE Footer SHALL display the JagaAlam logo/wordmark and a short tagline.
2. THE Footer SHALL display links to a minimum of four social media platforms: Instagram, Twitter, Facebook, and YouTube.
3. THE Footer SHALL display a copyright notice including the current year and the organization name.

---

### Requirement 10: Performance and Compatibility

**User Story:** As a visitor on any device or browser, I want the page to load and function correctly, so that I have a smooth experience regardless of my setup.

#### Acceptance Criteria

1. THE Landing_Page SHALL load all styles using the Tailwind_CDN `<script>` tag and SHALL NOT require a local build step.
2. THE Landing_Page SHALL load all dynamic behavior from the JS_Module (`js/main.js`) using a `<script>` tag placed before the closing `</body>` tag.
3. THE Landing_Page SHALL be functional in the latest stable versions of Chrome, Firefox, Safari, and Edge.
4. THE Landing_Page SHALL include a `<meta name="viewport">` tag to ensure correct scaling on mobile devices.
5. THE Landing_Page SHALL include descriptive `alt` attributes on all `<img>` elements to support screen readers.
