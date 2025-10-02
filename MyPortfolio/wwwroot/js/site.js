 // Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Menu bar in mobile
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-btn');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

const menuItems = document.querySelectorAll('#mobile-menu a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
}


const scrollOptions = {
    distance: '80px',
    duration: 1640,
    delay: 200, 
    useDelay: 'once',
    interval: 50, 
    reset: true 
};

const mobileScrollOptions = {
    distance: '80px',
    duration: 1340,
    delay: 0, 
    useDelay: 'none',
    interval: 20,
    reset: true 
};


// SCROLL EFFECTS

function initializeScrollReveal() {
    const options = isMobile() ? mobileScrollOptions : scrollOptions;
    const reveals = [
        ['.hero-animate', { origin: 'left' }],
        ['.heroImg-animate', { origin: 'right' }],
        ['.about-animate', { origin: 'right' }],
        ['.aboutImg-animate', { origin: 'left' }],
        ['.icon img', { origin: 'bottom', interval: 150 }],
        ['.PTitle-animate', { origin: 'left' }],
        ['.PDesc-animate', { origin: 'right' }],
        ['.TTitle-animate', { origin: 'left' }],
        ['.TDesc-animate', { origin: 'right' }],
        ['.ADesc-animate', { origin: 'bottom' }],
        ['.certi-1animate', { origin: 'left', distance: '100px' }],
        ['.certi-2animate', { origin: 'top', distance: '130px' }],
        ['.certi-3animate', { origin: 'right', distance: '100px' }],
        ['.certi-4animate', { origin: 'bottom', distance: '100px' }],
        ['.certi-5animate', { origin: 'bottom', distance: '100px' }],
        ['.contact-head', { origin: 'left', distance: '100px' }],
        ['.contact-desc', { origin: 'right', distance: '100px' }],
        ['.gif-animate', { origin: 'left', distance: '100px' }],
        ['.contact-animate', { origin: 'right', distance: '100px' }],
        ['.STitle-animate', { origin: 'left' }],
        ['.SDesc-animate', { origin: 'right' }],
        ['.CTitle-animate', { origin: 'left' }],
        ['.CDesc-animate', { origin: 'right' }],
        ['.form-animate', { origin: 'right' }],
        ['.footer-animate a', { origin: 'left', interval: 50 }],
        ['.experience-header-animate', { origin: 'bottom' }],
        ['.experience-animate', { origin: 'top' }]
    ];

    reveals.forEach(([selector, opts]) => ScrollReveal(options).reveal(selector, opts));
}

function setupExperienceObserver() {
    const section = document.getElementById('experience-cross-anim');
    if (!section) return;

    new IntersectionObserver(
        ([entry]) => {
            section.classList.toggle('experience-cross-anim-active', entry.isIntersecting);
        },
        { threshold: 0.3 }
    ).observe(section);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeScrollReveal();
    setupExperienceObserver();
});


// PROJECTS MODAL

function openProjectModal(videoUrl) {
    const modal = document.getElementById('projectModal');
    const videoContainer = document.getElementById('projectVideoIframe');
    const title = document.getElementById('projectModalTitle');

    videoContainer.innerHTML = `
        <video controls class="w-full max-h-full rounded" style="object-fit: contain;">
            <source src="${videoUrl}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    if (videoUrl.includes('portfolio.mp4') || videoUrl.includes('portfoliodemo.mp4')) {
        title.textContent = 'Personal Portfolio Demo';
    } else if (videoUrl.includes('salestracker.mp4') || videoUrl.includes('food_sales.mp4')) {
        title.textContent = 'Food Sales Tracking System Demo';
    } else {
        title.textContent = 'Project Preview';
    }

    modal.classList.remove('hidden');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    const videoContainer = document.getElementById('projectVideoIframe');
    videoContainer.innerHTML = '';
    modal.classList.add('hidden');
}

document.getElementById('projectModal').addEventListener('click', function (event) {
    if (event.target === this) {
        closeProjectModal();
    }
});

function alignModalForMobile() {
    const modal = document.querySelector('#projectModal > div');
    if (window.innerWidth <= 640) {
        modal.style.marginLeft = '0';
        modal.style.marginRight = 'auto';
    } else {
        modal.style.marginLeft = 'auto';
        modal.style.marginRight = 'auto';
    }
}

window.addEventListener('load', alignModalForMobile);
window.addEventListener('resize', alignModalForMobile);


// CERTIFICATES MODAL

function openCertificatePreview(imageFileName) {
  const modal = document.getElementById("certificatePreviewModal");
  const image = document.getElementById("certificatePreviewImage");

  modal.style.display = "flex";
  image.src = `/images/${imageFileName}`;
  document.body.style.overflow = "hidden";
}

function closeCertificatePreview() {
  document.getElementById("certificatePreviewModal").style.display = "none";
  document.body.style.overflow = "auto"; 
}

// Cross Line
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("cross-lines");
  const vertical = section.querySelector(".line-vertical");
  const horizontal = section.querySelector(".line-horizontal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        vertical.classList.remove("animate-grow-y");
        horizontal.classList.remove("animate-grow-x");

        void vertical.offsetWidth; 
        void horizontal.offsetWidth;

        vertical.classList.add("animate-grow-y");
        horizontal.classList.add("animate-grow-x");
      }
    });
  }, { threshold: 0.5 });

  observer.observe(section);
});


// Preloader
window.addEventListener("load", function () {
            const preloader = document.getElementById("preloader");
            const wrapper = document.getElementById("site-wrapper");


            preloader.classList.add("fade-out");
            setTimeout(() => {
                wrapper.classList.add("show");
                preloader.style.display = "none";
            }, 500);
        });
