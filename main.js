// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('open');
    }
});

// Mobile accordion functionality
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        const icon = trigger.querySelector('svg');
        
        content.classList.toggle('open');
        icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
});

// FAQ accordion functionality
document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const allItems = document.querySelectorAll('.faq-item');
        const content = trigger.nextElementSibling;
        const icon = trigger.querySelector('svg');
        const parentItem = trigger.parentElement;
        const isOpen = parentItem.classList.contains('open');

        // Close all other items
        allItems.forEach(item => {
            if (item !== parentItem) {
                item.classList.remove('open');
                item.querySelector('.faq-content').classList.remove('open');
                item.querySelector('.faq-trigger svg').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle the clicked item
        parentItem.classList.toggle('open');
        content.classList.toggle('open');
        if (content.classList.contains('open')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});



// Smooth scrolling for anchor links
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
    });
});
// JavaScript функция для открытия WhatsApp
function openWhatsApp() {
// Номер телефона (без + и пробелов)
const phoneNumber = "491788079318";

// Готовое сообщение
const message = encodeURIComponent(
"Здравствуйте! Я хотел(а) бы записаться на консультацию в Центр психотерапии. " +
"Подскажите, пожалуйста, как можно записаться на ближайшее время?"
);

// Формируем ссылку
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

// Открываем WhatsApp
window.open(whatsappUrl, '_blank');
}
// Contact form functionality
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Simple validation
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        // Simulate form submission
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
        e.target.reset();
    });
}