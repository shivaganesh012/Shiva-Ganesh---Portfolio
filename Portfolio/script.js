document.addEventListener("DOMContentLoaded", function() {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only enable custom cursor for larger screens (e.g., desktop/tablet)
    const enableCustomCursor = window.innerWidth > 768; 

    if (cursorDot && cursorOutline && enableCustomCursor) {
        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Smoothly animate the outline to follow the dot
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .testimonial-card, input[type="text"], input[type="email"], input[type="tel"], textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('grow');
                // Differentiate hover for text inputs/buttons vs. cards
                if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(el.tagName)) {
                    cursorOutline.classList.add('text-hover');
                }
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('grow');
                if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(el.tagName)) {
                    cursorOutline.classList.remove('text-hover');
                }
            });
        });
    } else if (cursorDot && cursorOutline) { 
        // Hide cursor elements entirely if not enabled
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // Header visibility on scroll (only for screens wider than 768px)
    const header = document.querySelector('.main-header');
    if (window.innerWidth > 768) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scroll Down
                header.style.top = '-100px'; // Hide header
            } else {
                // Scroll Up
                header.style.top = '0'; // Show header
            }
            // For Mobile or negative scrolling (ensure it doesn't jump up at very top)
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Handle mobile menu closing if link is clicked
            const navbar = document.querySelector('.navbar');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (navbar.classList.contains('open')) {
                navbar.classList.remove('open');
                mobileMenuToggle.classList.remove('open');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle Logic
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    const menuLinks = document.querySelectorAll('.menu a');

    if (mobileMenuToggle && navbar) {
        mobileMenuToggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
            mobileMenuToggle.classList.toggle('open');
            // Prevent scrolling on body when mobile menu is open
            document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('open')) {
                    navbar.classList.remove('open');
                    mobileMenuToggle.classList.remove('open');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });
    }

    // Advanced Skill Card Animation (Example using Intersection Observer for a unique effect)
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        const skillCardObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Unique animation for skill card content (e.g., make numbers pop or text fade in)
                    const circleNum = entry.target.querySelector('.circle-num');
                    const skillTitle = entry.target.querySelector('h4');
                    const skillDesc = entry.target.querySelector('p');

                    // Example: Animate the number growing or changing color
                    if (circleNum) {
                        circleNum.style.transform = 'scale(1.1)';
                        circleNum.style.transition = 'transform 0.5s ease-out';
                        setTimeout(() => circleNum.style.transform = 'scale(1)', 500);
                    }
                    
                    // Example: Fade in text with a delay
                    if (skillTitle) {
                        skillTitle.style.opacity = '0';
                        skillTitle.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            skillTitle.style.opacity = '1';
                            skillTitle.style.transform = 'translateY(0)';
                            skillTitle.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        }, 200);
                    }
                    if (skillDesc) {
                        skillDesc.style.opacity = '0';
                        skillDesc.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            skillDesc.style.opacity = '1';
                            skillDesc.style.transform = 'translateY(0)';
                            skillDesc.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        }, 400);
                    }

                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of the card is visible

        skillCards.forEach(card => {
            skillCardObserver.observe(card);
        });
    }

    // Project Card Unique Hover Effect (more JS if needed, currently CSS-driven)
    // You could expand this for a more complex reveal/modal on click
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Example: console log project title, or open a modal
            const projectTitle = card.querySelector('.project-info h4').textContent;
            console.log(`Clicked on project: ${projectTitle}`);
            // if you had a modal:
            // openProjectModal(projectTitle); 
        });
    });

});