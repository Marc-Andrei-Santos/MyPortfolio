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



