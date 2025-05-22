document.addEventListener("DOMContentLoaded", function () {
        const track = document.querySelector(".carousel-track");
        const slides = Array.from(track.children);
        const nextButton = document.querySelector(".right-btn");
        const prevButton = document.querySelector(".left-btn");

        let currentIndex = 0;

        function updateCarousel() {
          const slideWidth = slides[0].getBoundingClientRect().width;
          track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        }

        nextButton.addEventListener("click", function () {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel();
          resetAutoSlide();
        });

        prevButton.addEventListener("click", function () {
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          updateCarousel();
          resetAutoSlide();
        });

        let autoSlideInterval = setInterval(function () {
          currentIndex = (currentIndex + 1) % slides.length;
          updateCarousel();
        }, 4000);

        function resetAutoSlide() {
          clearInterval(autoSlideInterval);
          autoSlideInterval = setInterval(function () {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
          }, 4000);
        }

        window.addEventListener("resize", updateCarousel);

        updateCarousel();
      });

      // Hamburger Menu Toggle
      document.addEventListener("DOMContentLoaded", function () {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".header-nav ul");
        const menuOverlay = document.querySelector(".menu-overlay");
        const navLinks = document.querySelectorAll(".header-nav ul li a");

        // Toggle mobile menu
        function toggleMenu() {
          hamburger.classList.toggle("active");
          navMenu.classList.toggle("active");
          menuOverlay.classList.toggle("active");

          // Prevent body scroll when menu is open
          document.body.style.overflow = navMenu.classList.contains("active")
            ? "hidden"
            : "";
        }

        // Close menu
        function closeMenu() {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          menuOverlay.classList.remove("active");
          document.body.style.overflow = "";
        }

        // Event listeners
        hamburger.addEventListener("click", toggleMenu);
        menuOverlay.addEventListener("click", closeMenu);

        // Close menu when clicking on nav links
        navLinks.forEach((link) => {
          link.addEventListener("click", closeMenu);
        });

        // Close menu on window resize if desktop size
        window.addEventListener("resize", function () {
          if (window.innerWidth > 743) {
            closeMenu();
          }
        });

        // Close menu on Escape key
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && navMenu.classList.contains("active")) {
            closeMenu();
          }
        });
      });