
const toggleFaq = element => {
    const parent = element.parentElement;
    const isActive = parent.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) parent.classList.add('active');
};
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    window.scrollY > 300
        ? scrollBtn.classList.add('show')
        : scrollBtn.classList.remove('show');
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
const hamburger = document.getElementById('hamburgerIcon');
const navOverlay = document.getElementById('navOverlay');
const closeBtnMenu = document.getElementById('closeMenu');
const navLinks = document.querySelectorAll('.mobile-nav__link');
const openMenu = () => {
    navOverlay.classList.add('active');
    hamburger.classList.replace('fa-bars', 'fa-times');
};

const closeMenuMain = () => {
    navOverlay.classList.remove('active');
    hamburger.classList.replace('fa-times', 'fa-bars');
};

hamburger.addEventListener('click', openMenu);
closeBtnMenu.addEventListener('click', closeMenuMain);
navLinks.forEach(link => link.addEventListener('click', closeMenuMain));
navOverlay.addEventListener('click', e => {
    if (e.target === navOverlay) closeMenuMain();
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) closeMenuMain();
});
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const closeBtn = document.querySelector('.close-lightbox');
    if (lightbox && galleryItems.length) {
        galleryItems.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = img.src;
            });
        });
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        lightbox.addEventListener('click', e => {
            if (e.target !== lightboxImg) lightbox.classList.remove('active');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeMenuBtn = document.getElementById('closeMenu');
    const navOverlayEl = document.getElementById('navOverlay');
    const galleryGrid = document.querySelector('.tour-gallery-grid');
    const heroTitle = document.querySelector('.hero-big-title');
    const bodyElement = document.body;
    const PHONE_NUMBER = '201151532637';
    if (bookingForm) {
        bookingForm.addEventListener('submit', e => {
            e.preventDefault();
            const tripIdentifier =
                bodyElement.className.split(' ').find(cls => cls.startsWith('trip-')) ||
                'General Inquiry';
            const formData = {
                tourName: heroTitle?.textContent?.trim() || 'Unknown Tour',
                tripId: tripIdentifier,
                name: document.getElementById('name')?.value?.trim(),
                phone: document.getElementById('phone')?.value?.trim(),
                date: document.getElementById('date')?.value,
                time: document.getElementById('time')?.value,
                guests: document.getElementById('guests')?.value,
                hotel: document.getElementById('hotel')?.value?.trim(),
                notes:
                    document.getElementById('notes')?.value?.trim() ||
                    'No special requests'
            };
            const message = `*Booking Request Received*
*Reference:* ${formData.tripId}
*Tour:* ${formData.tourName}
*Customer Name:* ${formData.name}
*Phone:* ${formData.phone}
*Date:* ${formData.date}
*Time:* ${formData.time}
*Guests:* ${formData.guests}
*Hotel/Pickup:* ${formData.hotel}
*Notes:* ${formData.notes}`;

            window.open(
                `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`,
                '_blank',
                'noopener,noreferrer'
            );
        });
    }
    if (hamburgerIcon && closeMenuBtn && navOverlayEl) {
        const toggleMenu = status =>
            navOverlayEl.classList[status ? 'add' : 'remove']('active');
        hamburgerIcon.addEventListener('click', () => toggleMenu(true));
        closeMenuBtn.addEventListener('click', () => toggleMenu(false));
        navOverlayEl.addEventListener(
            'click',
            e => e.target === navOverlayEl && toggleMenu(false)
        );
    }
    if (galleryGrid) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML =
            '<span class="lightbox-close">&times;</span><img src="" alt="Zoomed">';
        document.body.appendChild(overlay);
        const lightboxImg = overlay.querySelector('img');
        const closeBtn = overlay.querySelector('.lightbox-close');
        const openLightbox = src => {
            lightboxImg.src = src;
            overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        };
        const closeLightbox = () => {
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
        };
        galleryGrid.addEventListener('click', e => {
            if (e.target.tagName === 'IMG') openLightbox(e.target.src);
        });
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener(
            'click',
            e => e.target === overlay && closeLightbox()
        );
        document.addEventListener(
            'keydown',
            e => e.key === 'Escape' && closeLightbox()
        );
    }
});







