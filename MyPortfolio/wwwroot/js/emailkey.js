async function initEmailJS() {
    try {
        const res = await fetch('/api/emailjs/config');
        const config = await res.json();

        emailjs.init({
            publicKey: config.publicKey
        });

        const form = document.getElementById('contact-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            emailjs.sendForm(config.serviceID, config.templateID, form)
                .then(function (response) {
                    Toastify({
                        text: "Message sent successfully!",
                        duration: 3000,
                        gravity: "top", 
                        position: "center", 
                        style: {
                            background: "#4BB543"
                        },
                        stopOnFocus: true
                    }).showToast();

                    form.reset();
                }, function (error) {
                    Toastify({
                        text: "Failed to send message. Please try again.",
                        duration: 3000,
                        gravity: "top",
                        position: "center",
                        style: {
                            background: "#FF4C4C"
                        }, stopOnFocus: true
                    }).showToast();

                    console.log('FAILED...', error);
                });
        });

    } catch (error) {
        console.error("Failed to initialize EmailJS:", error);
        Toastify({
            text: "Initialization failed. Please refresh the page.",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "#FF4C4C"
            },
            stopOnFocus: true
        }).showToast();
    }
}

initEmailJS();
