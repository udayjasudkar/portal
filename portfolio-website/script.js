// Shared script for portfolio website

// Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const credentials = { username, password };
        localStorage.setItem('portfolioUser', JSON.stringify(credentials));
        alert('Account created! Please login.');
        window.location.href = 'login.html';
    });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const saved = JSON.parse(localStorage.getItem('portfolioUser'));
        if (saved && saved.username === username && saved.password === password) {
            sessionStorage.setItem('loggedIn', 'true');
            window.location.href = 'portfolio.html';
        } else {
            alert('Incorrect username or password!');
        }
    });
}

// Portfolio page logic
if (document.querySelector('.navbar')) {
    // Check login
    if (!sessionStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
    }

    // Navbar mobile toggle
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    hamburger.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animate sections on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });
    document.querySelectorAll('.section').forEach(el => observer.observe(el));

    // Resume download (create HTML as PDF fallback)
    const downloadLinks = document.querySelectorAll('.download');
    downloadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const resumeContent = `
                <!DOCTYPE html>
                <html><head><title>Resume - Uday Jasudkar</title>
                <style>body{font-family:Arial;padding:20px;background:#f0f0f0;}</style></head>
                <body>
                    <h1>Uday Jasudkar</h1>
                    <h2>Full Stack Developer / IT Manager</h2>
                    <p>Experienced professional with skills in web development, IT management.</p>
                    <h3>Skills</h3>
                    <ul><li>HTML/CSS/JS</li><li>React/Node</li><li>Databases</li></ul>
                    <p>GitHub: https://github.com/udayjasudkar</p>
                    <p>LinkedIn: https://www.linkedin.com/in/uday-jasudkar-2b6307364</p>
                </body></html>
            `;
            const blob = new Blob([resumeContent], {type: 'text/html'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Uday_Jasudkar_Resume.pdf';
            a.click();
            URL.revokeObjectURL(url);
        });
    });
}

// Global animations on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = '1';
});
