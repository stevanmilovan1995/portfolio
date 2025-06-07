// Create animated bugs in background
function createBugs() {
    const container = document.querySelector('.bug-container');
    const bugEmojis = ['🐛', '🐞', '🦗', '🪲', '🐜', '🕷️'];
    const bugColors = ['red', 'green'];
    
    function addBug() {
        const bug = document.createElement('div');
        bug.className = 'bug ' + bugColors[Math.floor(Math.random() * bugColors.length)];
        bug.innerHTML = bugEmojis[Math.floor(Math.random() * bugEmojis.length)];
        bug.style.top = Math.random() * 100 + 'vh';
        bug.style.animationDuration = (Math.random() * 10 + 10) + 's';
        bug.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(bug);
        
        setTimeout(() => {
            if (bug.parentNode) {
                bug.parentNode.removeChild(bug);
            }
        }, 20000);
    }
    
    setInterval(addBug, Math.random() * 2000 + 2000);
    
    for (let i = 0; i < 5; i++) {
        setTimeout(addBug, i * 1000);
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        mobileMenu.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.test-step, .mobile-test-step');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

// Scroll Animations
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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + (element.textContent.includes('%') ? '%' : element.textContent.includes('<') ? '' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.textContent.includes('<') ? '<5%' : target + (element.textContent.includes('%') ? '%' : element.textContent.includes('+') ? '+' : '');
        }
    }
    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.status-number');
            numbers.forEach(number => {
                const text = number.textContent;
                if (text.includes('90')) animateCounter(number, 90);
                if (text.includes('80')) animateCounter(number, 80);
                if (text.includes('<5')) {
                    number.textContent = '<5%';
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.test-status');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    createBugs();
});