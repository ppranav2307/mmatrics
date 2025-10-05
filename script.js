document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMain = document.querySelector('.nav-main');
    
    if (hamburger && navMain) {
        hamburger.addEventListener('click', () => {
            navMain.style.display = navMain.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Enhanced Slideshow Logic
    let slideIndex = 0;
    const slides = document.querySelectorAll('.hero-slide');
    let slideshowInterval;
    
    // Create dots if they don't exist
    if (slides.length > 0) {
        const slideshowContainer = document.querySelector('.slideshow-container');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slideshow-dots';
        
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        slideshowContainer.appendChild(dotsContainer);
    }
    
    const dots = document.querySelectorAll('.dot');

    function showSlides() {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        if (dots.length > 0) {
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
        }
        
        // Increment index
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // Show current slide and activate dot
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].classList.add('active');
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add('active');
        }
    }

    // Manual slide control
    function currentSlide(n) {
        clearInterval(slideshowInterval);
        slideIndex = n;
        showSlides();
        // Restart the automatic slideshow
        slideshowInterval = setInterval(showSlides, 5000);
    }

    // Start slideshow if slides exist
    if (slides.length > 0) {
        // Show first slide immediately
        if (slides[0]) {
            slides[0].classList.add('active');
        }
        // Start automatic slideshow
        slideshowInterval = setInterval(showSlides, 5000);
    }

    // Add scroll effect to header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
            header.style.background = '#fff';
        }
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email && validateEmail(email)) {
                // Visual feedback
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.textContent = 'Subscribed!';
                button.style.background = '#4CAF50';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            } else {
                // Visual error feedback
                emailInput.style.border = '1px solid #ff4444';
                setTimeout(() => {
                    emailInput.style.border = '';
                }, 2000);
            }
        });
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Filter functionality
    const filterLinks = document.querySelectorAll('.filter-group a');
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            filterLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you would typically filter products based on the selected category
            console.log('Filter by:', this.textContent);
        });
    });

    // Sorting functionality
    const sortSelect = document.getElementById('sorting');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('Sort by:', this.value);
            // Here you would typically sort the products
        });
    }

    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pagination links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Here you would typically load the corresponding page
            console.log('Go to page:', this.textContent);
        });
    });
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button based on scroll position
    function toggleScrollToTop() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event listeners
    window.addEventListener('scroll', toggleScrollToTop);
    scrollToTopBtn.addEventListener('click', scrollToTop);

    // Initial check
    toggleScrollToTop();
});