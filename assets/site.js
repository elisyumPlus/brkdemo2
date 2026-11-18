      const year = document.getElementById("year");
      if (year) year.textContent = new Date().getFullYear();
      const pageHeader = document.querySelector("header");
      const updateHeader = function () {
        if (pageHeader) pageHeader.classList.toggle("is-scrolled", window.scrollY > 80);
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.getElementById("nav-links");
      if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
          const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
          menuToggle.setAttribute("aria-expanded", String(!isOpen));
          navLinks.classList.toggle("is-open", !isOpen);
          menuToggle.textContent = isOpen ? "Menü" : "Kapat";
        });
        navLinks.querySelectorAll("a").forEach(function (link) {
          link.addEventListener("click", function () {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "Menü";
          });
        });
      }
      document.querySelectorAll("[data-service]").forEach(function (link) {
        link.addEventListener("click", function () {
          const serviceField = document.getElementById("service");
          if (serviceField) serviceField.value = link.dataset.service;
        });
      });
      const heroVideo = document.getElementById("hero-video");
      const videoToggle = document.getElementById("video-toggle");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (heroVideo && videoToggle) {
        if (reducedMotion) {
          heroVideo.pause();
          videoToggle.textContent = "▶";
          videoToggle.setAttribute("aria-label", "Videoyu oynat");
          videoToggle.setAttribute("aria-pressed", "false");
        }
        videoToggle.addEventListener("click", function () {
          if (heroVideo.paused) {
            heroVideo.play();
            videoToggle.textContent = "Ⅱ";
            videoToggle.setAttribute("aria-label", "Videoyu duraklat");
            videoToggle.setAttribute("aria-pressed", "true");
          } else {
            heroVideo.pause();
            videoToggle.textContent = "▶";
            videoToggle.setAttribute("aria-label", "Videoyu oynat");
            videoToggle.setAttribute("aria-pressed", "false");
          }
        });
      }
      const serviceField = document.getElementById("service");
      const serviceKey = new URLSearchParams(window.location.search).get("hizmet");
      const serviceLabels = {
        ppf: "PPF kaplama",
        cam: "Cam filmi",
        seramik: "Seramik kaplama",
        pasta: "Pasta & cila",
        detayli: "Detaylı temizlik",
        diger: "Diğer"
      };
      if (serviceField && serviceLabels[serviceKey]) {
        serviceField.value = serviceLabels[serviceKey];
      }
      document.querySelectorAll("[data-comparison]").forEach(function (stage) {
        const slider = stage.querySelector(".compare-range");
        if (!slider) return;
        const updateComparison = function () {
          stage.style.setProperty("--comparison", slider.value + "%");
        };
        slider.addEventListener("input", updateComparison);
        updateComparison();
      });
      const bookingForm = document.getElementById("booking-form");
      if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const name = document.getElementById("name").value.trim();
          const phone = document.getElementById("phone").value.trim();
          const vehicle = document.getElementById("vehicle").value.trim();
          const service = document.getElementById("service").value;
          const note = document.getElementById("note").value.trim();
          const message = "Merhaba, BRK Garage için teklif almak istiyorum.%0A%0A" +
            "Ad Soyad: " + encodeURIComponent(name) + "%0A" +
            "Telefon: " + encodeURIComponent(phone) + "%0A" +
            "Araç: " + encodeURIComponent(vehicle) + "%0A" +
            "Hizmet: " + encodeURIComponent(service) +
            (note ? "%0ANot: " + encodeURIComponent(note) : "");
          window.open("https://wa.me/905441723633?text=" + message, "_blank", "noopener");
        });
      }
