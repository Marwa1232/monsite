// Abdeljalil Web - Custom JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });

    // Dynamic text animation in hero section
    const dynamicText = document.getElementById('dynamicText');
    const texts = ['site web', 'application', 'e-commerce', 'design'];
    let currentIndex = 0;

    function changeText() {
        dynamicText.style.opacity = '0';
        dynamicText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            dynamicText.textContent = texts[currentIndex];
            dynamicText.style.opacity = '1';
            dynamicText.style.transform = 'translateY(0)';
        }, 300);
    }

    // Change text every 3 seconds
    setInterval(changeText, 3000);

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            showNotification('Message envoyé avec succès!', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Reset form labels
            const formGroups = this.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('.form-control');
                const label = group.querySelector('label');
                if (input.value === '') {
                    label.style.top = '0.75rem';
                    label.style.fontSize = '1rem';
                    label.style.color = '#6c757d';
                }
            });
        }, 2000);
    });

    // Form input animations
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            const line = label.nextElementSibling;
            
            label.style.top = '-0.5rem';
            label.style.fontSize = '0.875rem';
            label.style.color = 'var(--primary-color)';
            line.style.width = '100%';
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                const label = this.nextElementSibling;
                const line = label.nextElementSibling;
                
                label.style.top = '0.75rem';
                label.style.fontSize = '1rem';
                label.style.color = '#6c757d';
                line.style.width = '0';
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} notification`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

   

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Reference card hover effects
    const referenceCards = document.querySelectorAll('.reference-card');
    
    referenceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.reference-image img');
            image.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.reference-image img');
            image.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Pricing card animations
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Testimonial card animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.animated-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    

    // Performance optimization: Throttle scroll events
    let ticking = false;

    function updateScrollEffects() {
        // Update navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update parallax
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Add smooth hover effects for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after hero animation
    setTimeout(typeWriter, 1000);

    // Add floating animation to contact icons
    const contactIcons = document.querySelectorAll('.contact-icon');
    
    contactIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Add stagger animation to reference cards
    const referenceCardsAll = document.querySelectorAll('.reference-card');
    
    referenceCardsAll.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add pulse animation to popular badge
    const popularBadges = document.querySelectorAll('.popular-badge');
    
    popularBadges.forEach(badge => {
        badge.style.animation = 'pulse 2s infinite';
    });

    // Add pulse keyframes
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% {
                transform: translateX(-50%) scale(1);
            }
            50% {
                transform: translateX(-50%) scale(1.05);
            }
            100% {
                transform: translateX(-50%) scale(1);
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    console.log('🚀 Abdeljalil Web website loaded successfully!');
});