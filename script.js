// Enhanced Slideshow Logic with Progress Bars
document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const progressBars = [];
    let slideshowInterval;
    
    // Create progress bars if they don't exist
    if (slides.length > 0) {
        const barsContainer = document.createElement('div');
        barsContainer.className = 'slideshow-bars';
        
        slides.forEach((_, index) => {
            const barContainer = document.createElement('div');
            barContainer.className = 'progress-bar-container';
            if (index === 0) barContainer.classList.add('active');
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            if (index === 0) progressBar.classList.add('active');
            
            barContainer.appendChild(progressBar);
            barsContainer.appendChild(barContainer);
            progressBars.push(progressBar);
            
            // Click to navigate
            barContainer.addEventListener('click', () => {
                currentSlide(index);
            });
        });
        
        document.querySelector('.slideshow-container').appendChild(barsContainer);
    }

    function showSlides() {
        // Hide all slides and reset progress bars
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        progressBars.forEach((bar, index) => {
            bar.classList.remove('active', 'completed');
            bar.style.width = '0%';
            bar.parentElement.classList.remove('active');
            
            // Mark previous slides as completed
            if (index < slideIndex) {
                bar.classList.add('completed');
                bar.style.width = '100%';
            }
        });
        
        // Increment index
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        
        // Show current slide and activate progress bar
        if (slides[slideIndex]) {
            slides[slideIndex].classList.add('active');
        }
        
        if (progressBars[slideIndex]) {
            progressBars[slideIndex].classList.add('active');
            progressBars[slideIndex].parentElement.classList.add('active');
            progressBars[slideIndex].style.width = '100%';
        }
        
        // Restart animation
        restartProgressAnimation();
    }

    function restartProgressAnimation() {
        progressBars.forEach(bar => {
            bar.style.animation = 'none';
            void bar.offsetWidth; // Trigger reflow
        });
        
        if (progressBars[slideIndex]) {
            progressBars[slideIndex].style.animation = 'progress 4s linear forwards';
        }
    }

    // Manual slide control
    function currentSlide(n) {
        clearInterval(slideshowInterval);
        slideIndex = n;
        
        // Hide all slides and reset progress bars
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        progressBars.forEach((bar, index) => {
            bar.classList.remove('active', 'completed');
            bar.style.width = '0%';
            bar.style.animation = 'none';
            bar.parentElement.classList.remove('active');
            
            // Mark previous slides as completed
            if (index < slideIndex) {
                bar.classList.add('completed');
                bar.style.width = '100%';
            }
        });
        
        // Show selected slide and activate progress bar
        if (slides[slideIndex]) {
            slides[slideIndex].classList.add('active');
        }
        
        if (progressBars[slideIndex]) {
            progressBars[slideIndex].classList.add('active');
            progressBars[slideIndex].parentElement.classList.add('active');
            progressBars[slideIndex].style.width = '100%';
        }
        
        restartProgressAnimation();
        
        // Restart the automatic slideshow
        slideshowInterval = setInterval(showSlides, 4000);
    }

    // Pause on hover
    const slideshowSection = document.querySelector('.slideshow-section');
    if (slideshowSection) {
        slideshowSection.addEventListener('mouseenter', () => {
            progressBars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
        });
        
        slideshowSection.addEventListener('mouseleave', () => {
            progressBars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        });
    }

    // Start slideshow if slides exist
    if (slides.length > 0) {
        // Show first slide immediately
        if (slides[0]) {
            slides[0].classList.add('active');
        }
        
        // Start automatic slideshow
        slideshowInterval = setInterval(showSlides, 4000);
        
        // Start first progress bar animation
        setTimeout(() => {
            if (progressBars[0]) {
                progressBars[0].style.animation = 'progress 4s linear forwards';
            }
        }, 100);
    }

    // Mobile menu toggle and other existing JavaScript...
    const hamburger = document.querySelector('.hamburger');
    const navMain = document.querySelector('.nav-main');
    
    if (hamburger && navMain) {
        hamburger.addEventListener('click', function() {
            navMain.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMain.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Scroll to top functionality...
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    function toggleScrollToTop() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', toggleScrollToTop);
    scrollToTopBtn.addEventListener('click', scrollToTop);
    toggleScrollToTop();
});
