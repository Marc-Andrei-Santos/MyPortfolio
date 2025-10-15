document.addEventListener('DOMContentLoaded', async () => {

    const form = document.getElementById('contact-form');
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;

    if (!form || !submitButton) {
        console.warn("Contact form or submit button not found.");
        return;
    }

    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.loader-spinner');

    if (!buttonText || !spinner) {
        console.error("Missing required button elements (.button-text or .loader-spinner). Check Index.cshtml.");
        return;
    }

    const setButtonState = (isLoading) => {
        if (isLoading) {
            submitButton.disabled = true;
            buttonText.classList.add('opacity-0');
            spinner.classList.remove('hidden');
        } else {
            submitButton.disabled = false;

            buttonText.classList.remove('opacity-0');

            spinner.classList.add('hidden');
        }
    };

    try {

        const res = await fetch('/api/EmailJS/config');
        if (!res.ok) {
            throw new Error(`API call failed with status: ${res.status}`);
        }
        const config = await res.json();

        emailjs.init({ publicKey: config.publicKey });

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            setButtonState(true);

            emailjs.sendForm(config.serviceID, config.templateID, form)
                .then(response => {

                    Toastify({
                        text: "🎉 Success! Your message has been sent.",
                        duration: 5000,
                        gravity: "top",
                        position: "center",
                        close: true,
                        backgroundColor: "linear-gradient(to right, #10B981, #059669)", 
                        stopOnFocus: true,
                        style: {
                            borderRadius: "8px",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                            fontWeight: "bold"
                        }
                    }).showToast();

                    form.reset();
                })
                .catch(error => {
  
                    Toastify({
                        text: "⚠️ Failed! There was an issue sending your message. Please try again.",
                        duration: 5000,
                        gravity: "top",
                        position: "center",
                        close: true,
                        backgroundColor: "linear-gradient(to right, #EF4444, #DC2626)", 
                        stopOnFocus: true,
                        style: {
                            borderRadius: "8px",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                            fontWeight: "bold"
                        }
                    }).showToast();

                    console.error('EmailJS Send Failed:', error);
                })
                .finally(() => {
                    setButtonState(false);
                });
        });

    } catch (error) {
        console.error("Failed to initialize EmailJS:", error);

        Toastify({
            text: "🚨 Initialization failed. Contact form is temporarily unavailable.",
            duration: 5000,
            gravity: "top",
            position: "center",
            close: true,
            style: {
                background: "linear-gradient(to right, #475569, #334155)", 
                borderRadius: "8px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                fontWeight: "bold"
            }
        }).showToast();

        setButtonState(false);
        if (submitButton) submitButton.disabled = true;
    }
});