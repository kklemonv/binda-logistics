/* ============================================================
   [公司名称] 企业官网 — 全局脚本
   轮播图 / 下拉菜单 / 滚动效果 / 移动端菜单
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // 1. HEADER SCROLL EFFECT
    // ============================================================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ============================================================
    // 2. MOBILE MENU
    // ============================================================
    const menuBtn = document.querySelector('.header-menu-btn');
    const nav = document.querySelector('.header-nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            // Toggle between hamburger and close icon
            menuBtn.innerHTML = isOpen
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        });

        // Toggle dropdowns on mobile
        document.querySelectorAll('.nav-item').forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link && item.querySelector('.nav-dropdown')) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        item.classList.toggle('open');
                    }
                });
            }
        });
    }

    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('open') && !e.target.closest('.header')) {
            nav.classList.remove('open');
            if (menuBtn) {
                menuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
            }
        }
    });

    // ============================================================
    // 3. CAROUSEL — 轮播图
    // ============================================================
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');

    if (carouselTrack && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;
        const autoPlayDelay = 5000; // 5 seconds

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            currentSlide = index;
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Arrow clicks
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });

        // Dot clicks
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { goToSlide(i); startAutoPlay(); });
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
            }
            startAutoPlay();
        });

        // Pause on hover
        const carouselEl = carouselTrack.closest('.carousel');
        if (carouselEl) {
            carouselEl.addEventListener('mouseenter', stopAutoPlay);
            carouselEl.addEventListener('mouseleave', startAutoPlay);
        }

        // Start
        startAutoPlay();
    }

    // ============================================================
    // 4. AUTO-SET CURRENT YEAR
    // ============================================================
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // ============================================================
    // 5. SCROLL FADE-IN ANIMATION
    // ============================================================
    const fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        fadeEls.forEach(el => observer.observe(el));
    }

    // ============================================================
    // 6. BACK TO TOP
    // ============================================================
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
