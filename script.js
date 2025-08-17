// Global Variables
let isMenuOpen = false;
let typingIndex = 0;
let typingIndex2 = 0;
let currentSkillIndex = 0;

// Typing Text Configuration
const typingTexts = [
    "AI Developer",
    "Machine Learning Engineer", 
    "Full-Stack Developer",
    "Data Scientist",
    "Mobile App Developer"
];

const aboutTypingTexts = [
    "AI Developer",
    "Problem Solver", 
    "Tech Enthusiast",
    "Innovation Driver"
];

// Initialize particles.js
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6c63ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar.offsetHeight;
                    const targetOffset = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (isMenuOpen) {
                        toggleMobileMenu();
                    }
                }
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    isMenuOpen = !isMenuOpen;
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100;
    
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Update scroll progress bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar.offsetHeight;
        
        if (window.scrollY >= sectionTop - navbarHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Typing animation
function typeText(element, texts, index = 0, charIndex = 0) {
    if (!element) return;
    
    const currentText = texts[index];
    
    if (charIndex < currentText.length) {
        element.textContent = currentText.substring(0, charIndex + 1);
        setTimeout(() => typeText(element, texts, index, charIndex + 1), 100);
    } else {
        setTimeout(() => {
            deleteText(element, texts, index, charIndex);
        }, 2000);
    }
}

function deleteText(element, texts, index, charIndex) {
    if (!element) return;
    
    const currentText = texts[index];
    
    if (charIndex > 0) {
        element.textContent = currentText.substring(0, charIndex - 1);
        setTimeout(() => deleteText(element, texts, index, charIndex - 1), 50);
    } else {
        const nextIndex = (index + 1) % texts.length;
        setTimeout(() => typeText(element, texts, nextIndex, 0), 500);
    }
}

// Initialize typing animations
function initTypingAnimations() {
    const typingElement = document.querySelector('.typing-text');
    const aboutTypingElement = document.querySelector('.typing-about');
    
    if (typingElement) {
        typeText(typingElement, typingTexts);
    }
    
    if (aboutTypingElement) {
        typeText(aboutTypingElement, aboutTypingTexts);
    }
}

// Animate counters
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, index * 200);
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible');
                
                // Special animations for specific sections
                if (element.classList.contains('stat-number')) {
                    animateCounter(element);
                }
                
                if (element.closest('.skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .skill-item,
        .project-card,
        .contact-item,
        .stat-number,
        .about-text,
        .about-image,
        .skills-text,
        .skills-bars
    `);
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Project filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            alert('Thank you for your message! I\'ll get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Reset form labels
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                const label = group.querySelector('label');
                if (input && label && !input.value) {
                    label.style.top = '1rem';
                    label.style.fontSize = '1rem';
                    label.style.color = 'var(--text-secondary)';
                }
            });
            
        }, 2000);
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Handle back to top button visibility
function handleBackToTopVisibility() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Handle scroll indicator click
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar.offsetHeight;
                const targetOffset = aboutSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Add hover effects to project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add floating animation to hero elements
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random delay to make floating more natural
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add mouse interaction
        element.addEventListener('mouseenter', () => {
            element.style.animationPlayState = 'paused';
            element.style.transform = 'scale(1.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animationPlayState = 'running';
            element.style.transform = 'scale(1)';
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    initParticles();
    
    // Initialize scroll-based features
    initSmoothScrolling();
    initScrollAnimations();
    
    // Initialize animations
    initTypingAnimations();
    initFloatingAnimations();
    
    // Initialize interactive features
    initProjectFiltering();
    initContactForm();
    initBackToTop();
    initScrollIndicator();
    initProjectCardEffects();
    
    // Initialize mobile menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMobileMenu();
        }
    });
});

// Handle scroll events
window.addEventListener('scroll', () => {
    handleNavbarScroll();
    updateScrollProgress();
    updateActiveNavLink();
    handleBackToTopVisibility();
});

// Handle page load
window.addEventListener('load', () => {
    // Add loaded class to body for any load-based animations
    document.body.classList.add('loaded');
    
    // Initialize any load-dependent features
    setTimeout(() => {
        initScrollAnimations();
    }, 500);
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-container');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0)';
        });
    });
    
    // Add dynamic background to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
        }
    });
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'all 0.5s ease';
    });
});

// Add custom cursor effect (optional)
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div>';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Initialize custom cursor on larger screens
if (window.innerWidth > 768) {
    // initCustomCursor(); // Uncomment if you want custom cursor
}