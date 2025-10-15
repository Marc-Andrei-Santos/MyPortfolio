 // Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// MENU BAR (MOBILE)
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

    const sr = ScrollReveal(options);

    sr.reveal('.reveal-left', { origin: 'left', distance: '110px' });
    sr.reveal('.reveal-right', { origin: 'right', distance: '110px' });
    sr.reveal('.reveal-down', { origin: 'bottom', distance: '110px' });
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



// Projects Modal
function openProjectModal(title, description, techStackItems) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectModalContent');

    document.getElementById('projectModalTitle').textContent = title;
    document.getElementById('projectModalDesc').textContent = description;

    const techStackEl = document.getElementById('projectTechStack');
    techStackEl.innerHTML = techStackItems.map(item => `
        <div class="relative group flex flex-col items-center">
            <img src="${item.src}" alt="${item.label}" class="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110">
            <span class="absolute opacity-0 group-hover:opacity-100 text-gray-300 text-sm mt-14 transition-opacity duration-300">${item.label}</span>
        </div>
    `).join('');

    modal.classList.remove('hidden');
    modalContent.classList.remove('modal-hide');
    modalContent.classList.add('modal-show');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectModalContent');

    modalContent.classList.remove('modal-show');
    modalContent.classList.add('modal-hide');

    modalContent.addEventListener('animationend', () => {
        if (modalContent.classList.contains('modal-hide')) {
            modal.classList.add('hidden');
        }
    }, { once: true });
}

document.getElementById('projectModal').addEventListener('click', function (event) {
    if (event.target === this) closeProjectModal();
});


// CERTIFICATES MODAL 
function openCertificatePreview(imageFileName) {
  const modal = document.getElementById("certificatePreviewModal");
  const modalContent = document.getElementById("certificateModalContent");
  const image = document.getElementById("certificatePreviewImage");

  image.src = `/images/${imageFileName}`;

  modal.classList.remove("hidden");
  modalContent.classList.remove("modal-hide");
  modalContent.classList.add("modal-show");

  document.body.style.overflow = "hidden";
}

function closeCertificatePreview() {
  const modal = document.getElementById("certificatePreviewModal");
  const modalContent = document.getElementById("certificateModalContent");

  modalContent.classList.remove("modal-show");
  modalContent.classList.add("modal-hide");

  modalContent.addEventListener(
    "animationend",
    () => {
      if (modalContent.classList.contains("modal-hide")) {
        modal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }
    },
    { once: true }
  );
}

document.getElementById("certificatePreviewModal").addEventListener("click", function (event) {
  if (event.target === this) {
    closeCertificatePreview();
  }
});


// LOADER
window.addEventListener("load", function () {
    const preloader = document.getElementById("loader");
    const wrapper = document.getElementById("site-wrapper");

    if (!preloader || !wrapper) {
        console.warn("Loader or wrapper not found.");
        return;
    }

    preloader.classList.add("fade-out");

    setTimeout(() => {
        wrapper.classList.add("show");
        preloader.style.display = "none";
    }, 500);
});



// 404 ERROR PAGE JS

(function() {
  const allowed = [
    '', '#home', '#about', '#projects', '#education',
    '#experience', '#certifications', '#skills', '#contact'
  ];

  function isValidHash(hash) {

    if (!hash || hash === '#') return true; 
    if (hash.indexOf('/') !== -1) return false;
    return allowed.includes(hash.toLowerCase());
  }

  function checkHashAndRedirect() {
    const currentHash = location.hash || '';
    if (!isValidHash(currentHash)) {
      const errorUrl = window.__ERROR_404_URL || '/Error/404';
      window.location.replace(errorUrl);
    }
  }

  document.addEventListener('DOMContentLoaded', checkHashAndRedirect);
  window.addEventListener('hashchange', checkHashAndRedirect);
})();
