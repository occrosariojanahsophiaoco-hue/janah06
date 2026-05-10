// mobile menu
const hamburger = document.getElementById('hamburger');
const navLinksDiv = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => navLinksDiv.classList.toggle('active'));
}
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinksDiv.classList.remove('active')));

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const projectsBtn = document.getElementById('projectsBtn');
if (projectsBtn) {
    projectsBtn.addEventListener('click', () => document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    }));
}

const contactBtn = document.getElementById('contactBtn');
if (contactBtn) {
    contactBtn.addEventListener('click', () => document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    }));
}

// download resume demo
const downloadResumeBtn = document.getElementById('downloadResumeBtn');
if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => alert('📄 Resume download would start. (Demo version)'));
}

// scroll to top button
const scrollBtn = document.getElementById('scrollTopBtn');
const sectionIds = ['home', 'about', 'skills', 'education', 'projects', 'resume', 'contact'];
const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

if (scrollBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) scrollBtn.classList.add('show');
        else scrollBtn.classList.remove('show');
    });

    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentScroll = window.scrollY;
        let currentSectionIndex = 0;
        sections.forEach((section, index) => {
            if (currentScroll >= section.offsetTop - 10) {
                currentSectionIndex = index;
            }
        });
        const targetIndex = Math.max(0, currentSectionIndex - 1);
        const target = sections[targetIndex];
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.style.background = "rgba(236,72,153,0.96)";
    else navbar.style.background = "linear-gradient(90deg, #EC4899, #F472B6)";
});

// active nav link on scroll - FIXED (no duplicate variable)
const navLinks = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// contact form localstorage
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        const subject = document.getElementById('subjectInput').value.trim();
        const message = document.getElementById('msgInput').value.trim();
        if (!name || !email || !subject || !message) return alert('⚠ Please fill all fields.');
        const msgObj = {
            name,
            email,
            subject,
            message,
            date: new Date().toLocaleString()
        };
        let msgs = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        msgs.push(msgObj);
        localStorage.setItem('portfolio_messages', JSON.stringify(msgs));
        alert('✓ Message sent! Thank you for reaching out.');
        form.reset();
        console.log('Message saved:', msgObj);
    });
}