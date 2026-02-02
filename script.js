const htmlElement = document.documentElement;

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

function showDetails(productName, details) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDetails = document.getElementById("modalDetails");

  if (!modal || !modalTitle || !modalDetails) return;

  modalTitle.textContent = productName;
  modalDetails.textContent = details;
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  ripple.classList.add("ripple");

  const ripples = button.querySelectorAll(".ripple");
  ripples.forEach((r) => r.remove());
  button.appendChild(ripple);
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const navbar = document.querySelector(".navbar");
  const modal = document.getElementById("modal");

  if (themeToggle) {
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
      htmlElement.classList.add("dark-mode");
      themeToggle.classList.add("active");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener("click", () => {
      htmlElement.classList.toggle("dark-mode");
      themeToggle.classList.toggle("active");
      const isDarkMode = htmlElement.classList.contains("dark-mode");
      themeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.id === "modal") {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  if (navbar) {
    window.addEventListener("scroll", () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      navbar.style.boxShadow =
        scrollTop > 0
          ? "0 10px 25px rgba(0, 0, 0, 0.15)"
          : "0 4px 6px rgba(0, 0, 0, 0.1)";
    });
  }

  window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.style.color = "white";
      if (link.getAttribute("href").slice(1) === current) {
        link.style.color = "#f093fb";
        link.style.fontWeight = "700";
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".product-card, .feature-item, .contact-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  window.addEventListener("load", () => {
    document.body.style.opacity = "1";
    document.body.classList.add("loaded");
  });

  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", createRipple);
    button.style.position = "relative";
    button.style.overflow = "hidden";
  });

  const style = document.createElement("style");
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  if (hamburger && navMenu) {
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".nav-container") &&
        !e.target.closest(".nav-menu")
      ) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }

  if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll("img");
    const imageObserver = new IntersectionObserver((entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src || img.dataset.src;
          img.classList.add("loaded");
          observerRef.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  console.log(
    "%c🎉 Hadeza Shop Website Loaded Successfully! 🎉",
    "font-size: 16px; color: #667eea; font-weight: bold;",
  );
  console.log(
    "%cTerima kasih telah mengunjungi Hadeza Shop!",
    "font-size: 12px; color: #764ba2;",
  );

  document.querySelectorAll("button, a").forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "2px solid #667eea";
      this.style.outlineOffset = "2px";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "none";
    });
  });
});
