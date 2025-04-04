// Mobile menu functionality
const menuIcon = document.querySelector('.menu-icon');
const dropdown = document.querySelector('.dropdown');
const navItems = document.querySelectorAll('nav ul li');

// Add animation delay to nav items
navItems.forEach((item, index) => {
    item.style.setProperty('--item-index', index);
});

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});


// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            dropdown.classList.remove('show');
        }
    });
});

// CV download functionality
document.querySelectorAll('.cv-download').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const cvPath = 'assets/files/mycv.pdf';
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = 'mycv.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

// Add intersection observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in animation
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Add loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Here you would typically send the data to your server
            // For now, we'll just simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            // Show error message
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Add typing animation to multiple-text span
const multipleText = document.querySelector('.multiple-text');
if (multipleText) {
    const roles = ['Web_Developer', 'Programmer', 'Graphic_Designer', 'Photographer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    let erasingDelay = 100;
    let newTextDelay = 2000;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            multipleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            multipleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, typingDelay);
    }

    type();
}
