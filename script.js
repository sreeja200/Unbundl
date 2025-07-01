// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeContactForm();
    initializeFAQ();
    initializeAnimations();
});

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const mobile = formData.get('mobile');
            const city = formData.get('city');
            const message = formData.get('message');

            // Basic validation
            if (!name || !mobile || !city) {
                alert('Please fill in all required fields.');
                return;
            }

            // Mobile number validation (basic)
            const mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(mobile.replace(/\D/g, '').slice(-10))) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Booking...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert(`Thank you ${name}! Your consultation has been booked. We will contact you at ${mobile} shortly.`);
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling for Anchor Links
function initializeAnimations() {
    // Add smooth scrolling behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.treatment-card, .testimonial-card, .location-card, .specialty-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Button Click Handlers
document.addEventListener('click', function(e) {
    // Handle consultation buttons
    if (e.target.textContent.includes('Book Free Consultation') ||
        e.target.textContent.includes('Get Free Consultation')) {

        // Scroll to contact form
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    // Handle call buttons
    if (e.target.textContent.includes('Call')) {
        const phoneNumber = '+91-888-330';
        if (confirm(`Call ${phoneNumber}?`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    }

    // Handle location cards
    if (e.target.closest('.location-card')) {
        const cityName = e.target.closest('.location-card').querySelector('h3').textContent;
        alert(`Showing clinics in ${cityName}. In a real application, this would show a list of clinics in the selected city.`);
    }
});

// Form Input Enhancements
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Phone number formatting
document.getElementById('mobile')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading states to buttons
function addLoadingState(button, loadingText = 'Loading...') {
    const originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
    button.classList.add('loading');

    return function restore() {
        button.textContent = originalText;
        button.disabled = false;
        button.classList.remove('loading');
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Console welcome message
console.log('%c🦷 Welcome to Clove Dental! %c\nBook your free consultation today!',
    'color: #f97316; font-size: 16px; font-weight: bold;',
    'color: #666; font-size: 12px;');