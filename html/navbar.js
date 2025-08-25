// Injects the navbar.html into the <div id="navbar"></div> element on all pages
window.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      // After navbar is loaded, activate enhancements

      // 1. Highlight active link
      const navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach(link => {
        // Handles both plain filenames and full URLs
        if (window.location.pathname.endsWith(link.getAttribute('href'))) {
          link.classList.add('active');
        }
      });

      // 2. Keyboard arrow navigation for accessibility
      const navItems = Array.from(navLinks);
      navItems.forEach((item, idx) => {
        item.addEventListener('keydown', e => {
          if (e.key === 'ArrowRight') {
            navItems[(idx + 1) % navItems.length].focus();
          } else if (e.key === 'ArrowLeft') {
            navItems[(idx - 1 + navItems.length) % navItems.length].focus();
          }
        });
      });

      // 3. Minimalist hamburger for mobile (if present)
      const hamburger = document.querySelector('.hamburger');
      const navLinksContainer = document.querySelector('.nav-links');
      if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
          navLinksContainer.classList.toggle('open');
        });
      }
    })
    .catch((err) => console.error("Navbar load failed:", err));
});
