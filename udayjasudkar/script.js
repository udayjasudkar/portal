// Navbar scroll effect
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu
        document.getElementById('nav-menu').classList.remove('active');
    });
});

// Mobile menu
function toggleMobileMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    document.querySelector('.theme-toggle').textContent = isDark ? '☀️ Dark' : '🌙 Light';
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate skill bars
            if (entry.target.querySelector('.skill-progress')) {
                entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// Form submit
function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent. I'll reply soon.`);
        event.target.reset();
    }
}

// FAQ toggle
function toggleFAQ(element) {
    const p = element.querySelector('p');
    p.style.display = p.style.display === 'block' ? 'none' : 'block';
}
