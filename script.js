// Elements
const navbar = document.getElementById('navbar');
const typedTextSpan = document.getElementById('typed-text');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

// 1. Sticky Navbar on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Typewriter Effect
const typedWords = ['Websites', 'Digital Experiences', 'Creative Interfaces', 'Apps'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = typedWords[wordIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;

    // Different speeds for typing vs deleting
    if (isDeleting) {
        typeSpeed /= 2;
    }

    // Word finished typing
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } 
    // Word finished deleting
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        // Reset word index
        if (wordIndex === typedWords.length) {
            wordIndex = 0;
        }
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeWriter, typeSpeed);
}

// Init Typewriter on DOM load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// 3. Reveal Elements on Scroll
function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// 4. Update Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
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

// 5. Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Toggle icon between bars and close
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});
