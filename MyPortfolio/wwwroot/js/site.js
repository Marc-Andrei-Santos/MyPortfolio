// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Function to open the modal and display the image
function openModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    // Set the source of the image in the modal to the clicked image
    modal.style.display = "flex";  // Show the modal
    modalImage.src = `/images/${imageSrc}`;  // Set the src to the clicked image
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";  // Hide the modal
}



// Scroll Reveal Effect

    ScrollReveal({
        reset: true,
    distance: '80px',
    duration: 1640,
    delay: 200
        });

    ScrollReveal().reveal('.hero-animate', {delay: 100, origin: 'left' });
    ScrollReveal().reveal('.heroImg-animate', {delay: 150, origin: 'right' });
    ScrollReveal().reveal('.about-animate', {delay: 200, origin: 'right' });
    ScrollReveal().reveal('.aboutImg-animate', {delay: 250, origin: 'left' });
    ScrollReveal().reveal('.icon img', {delay: 55, origin: 'bottom', interval: 150 });
    ScrollReveal().reveal('.PTitle-animate', {delay: 100, origin: 'left' });
    ScrollReveal().reveal('.PDesc-animate', {delay: 150, origin: 'right' });
    ScrollReveal().reveal('.TTitle-animate', {delay: 100, origin: 'left' });
    ScrollReveal().reveal('.TDesc-animate', {delay: 150, origin: 'right' });
    ScrollReveal().reveal('.certi-1animate', {delay: 200, origin: 'left', distance: '100px' });
    ScrollReveal().reveal('.certi-2animate', {delay: 200, origin: 'top', distance: '130px' });
    ScrollReveal().reveal('.certi-3animate', {delay: 200, origin: 'right', distance: '100px' });
    ScrollReveal().reveal('.certi-4animate', {delay: 200, origin: 'bottom', distance: '100px' });
    ScrollReveal().reveal('.certi-5animate', {delay: 200, origin: 'bottom', distance: '100px' });
    ScrollReveal().reveal('.STitle-animate', {delay: 100, origin: 'left' });
    ScrollReveal().reveal('.SDesc-animate', {delay: 150, origin: 'right' });
    ScrollReveal().reveal('.CTitle-animate', {delay: 100, origin: 'left' });
    ScrollReveal().reveal('.CDesc-animate', {delay: 150, origin: 'right' });
    ScrollReveal().reveal('.contact-animate', {delay: 150, origin: 'left' });
    ScrollReveal().reveal('.form-animate', {delay: 200, origin: 'right' });
    ScrollReveal().reveal('.footer-animate a', {delay: 150, origin: 'left', interval: 50 });


    $('.responsive').slick({
        dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
    {
        breakpoint: 1024,
    settings: {
        slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    dots: true
                    }
                },
    {
        breakpoint: 480,
    settings: {
        slidesToShow: 1,
    slidesToScroll: 1
                    }
                }
    ]
        });
