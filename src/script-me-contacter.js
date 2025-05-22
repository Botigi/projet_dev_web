function toggleDetails(id) {
    const elem = document.getElementById(id);
    elem.classList.toggle("hidden");
}

function sendEmail(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: name,
        from_email: email,
        company: company,
        subject: subject,
        message: message,
        to_name: "Thibault Girard",
        to_email: 'botigirard@gmail.com',
        date: new Date().toLocaleDateString('fr-FR')
    };

    emailjs.send('service_xmxse7b', 'template_u9o6j2s', templateParams)
        .then(function() {
            document.body.innerHTML = `
                <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-200 via-pink-300 to-red-400 text-black">
                    <div class="card w-full max-w-lg shadow-xl bg-base-100 p-6 text-black">
                        <h1 class="text-2xl font-bold text-center">Merci pour votre message !</h1>
                        <p class="mt-4">Votre message a bien été reçu. Je vous répondrai sous 48 heures ouvrées.</p>
                        <ul class="list-disc list-inside mt-4">
                            <li>Email de confirmation envoyé</li>
                            <li>Demande en cours d'examen</li>
                            <li>Réponse détaillée à venir</li>
                        </ul>
                        <div class="mt-6 flex justify-between">
                            <a href="acceuil.html" class="btn btn-secondary">Retourner a l'accueil</a>
                            <a href="https://www.linkedin.com/in/thibault-girard" target="_blank" class="btn btn-accent">LinkedIn</a>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(function(error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        });

    return false;
}

document.querySelector('.contact-form').addEventListener('submit', sendEmail);
