document.addEventListener("DOMContentLoaded", function () {
    // Carousel functionality
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

    // Hamburger Menu Toggle - Improved version
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".header-nav ul");
    const menuOverlay = document.querySelector(".menu-overlay");
    const headerNav = document.querySelector(".header-nav");
    const navLinks = document.querySelectorAll(".header-nav ul li a, .header-nav a");

    // Check if elements exist before adding event listeners
    if (!hamburger || !navMenu) {
        console.warn("Navigation elements not found");
        return;
    }

    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        if (menuOverlay) {
            menuOverlay.classList.toggle("active");
        }
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    }

    // Close menu
    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }
        document.body.style.overflow = "";
    }

    // Check if menu is open
    function isMenuOpen() {
        return navMenu.classList.contains("active");
    }

    // Event listeners
    hamburger.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent event bubbling
        toggleMenu();
    });

    // Close menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    // Close menu when clicking on nav links
    navLinks.forEach((link) => {
        link.addEventListener("click", function(e) {
            // Only close menu if it's currently open
            if (isMenuOpen()) {
                closeMenu();
            }
        });
    });

    // Close menu when clicking anywhere outside the navigation
    document.addEventListener("click", function(e) {
        if (isMenuOpen()) {
            // Check if the click is outside the navigation area
            const isClickInsideNav = headerNav && headerNav.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnHamburger) {
                closeMenu();
            }
        }
    });

    // Prevent menu from closing when clicking inside the nav menu itself
    if (headerNav) {
        headerNav.addEventListener("click", function(e) {
            // Only stop propagation if clicking on the nav container, not on links
            if (e.target === headerNav || e.target === navMenu) {
                e.stopPropagation();
            }
        });
    }

    // Close menu on window resize if desktop size
    window.addEventListener("resize", function () {
        if (window.innerWidth > 743) {
            closeMenu();
        }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && isMenuOpen()) {
            closeMenu();
        }
    });

    // Touch event handling for mobile devices
    let touchStartY = 0;
    
    document.addEventListener("touchstart", function(e) {
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", function(e) {
        if (isMenuOpen()) {
            const touchEndY = e.changedTouches[0].clientY;
            const isClickInsideNav = headerNav && headerNav.contains(e.target);
            const isClickOnHamburger = hamburger.contains(e.target);
            
            // Close menu if tapping outside nav area and it's not a scroll gesture
            if (!isClickInsideNav && !isClickOnHamburger && Math.abs(touchEndY - touchStartY) < 10) {
                closeMenu();
            }
        }
    });
});
