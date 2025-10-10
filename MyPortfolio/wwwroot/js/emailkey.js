document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/api/emailjs/config');
        const config = await res.json();

        emailjs.init({ publicKey: config.publicKey });

        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault(); // prevent page reload

            emailjs.sendForm(config.serviceID, config.templateID, form)
                .then(response => {
                    Toastify({
                        text: "Message sent successfully!",
                        duration: 3000,
                        gravity: "top",
                        position: "center",
                        style: { background: "#4BB543" }
                    }).showToast();

                    form.reset();
                })
                .catch(error => {
                    Toastify({
                        text: "Failed to send message. Please try again.",
                        duration: 3000,
                        gravity: "top",
                        position: "center",
                        style: { background: "#FF4C4C" }
                    }).showToast();

                    console.error('FAILED...', error);
                });
        });

    } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
        Toastify({
            text: "Initialization failed. Please refresh the page.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: { background: "#FF4C4C" }
        }).showToast();
    }
});
