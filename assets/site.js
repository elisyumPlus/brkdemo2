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
      if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.defaultMuted = true;
        heroVideo.loop = true;
        heroVideo.playsInline = true;
        const startHeroVideo = function () {
          if (document.hidden || !heroVideo.paused) return;
          const playback = heroVideo.play();
          if (playback && typeof playback.catch === "function") playback.catch(function () {});
        };
        heroVideo.addEventListener("loadeddata", startHeroVideo, { once: true });
        heroVideo.addEventListener("canplay", startHeroVideo, { once: true });
        document.addEventListener("visibilitychange", function () {
          if (!document.hidden) startHeroVideo();
        });
        window.addEventListener("pageshow", startHeroVideo);
        startHeroVideo();
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
