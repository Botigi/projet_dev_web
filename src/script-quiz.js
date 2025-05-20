document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    let currentIndex = 0;

    function unblurNextQuestion() {
        if (currentIndex < questions.length) {
            questions[currentIndex].classList.remove('blur-sm', 'pointer-events-none');
            console.log(`Unblurring question ${currentIndex + 1}`);
        }
    }

    function handleAnswerChange(event) {
        if (event.target.type === 'radio') {
            currentIndex++;
            unblurNextQuestion();
        }
    }

    // Unblur the first question immediately
    unblurNextQuestion();

    // Add event listeners to all radio buttons
    questions.forEach(question => {
        question.addEventListener('change', handleAnswerChange);
    });
});

function verifierReponses() {
    const reponsesCorrectes = {
        q1: "b",
        q2: "c",
        q3: "b",
        q4: "a",
        q5: "c",
        q6: "a"
    };

    let score = 0;
    for (let i = 1; i <= 6; i++) {
        const nomQuestion = "q" + i;
        const selected = document.querySelector(`input[name="${nomQuestion}"]:checked`);
        if (selected && selected.value === reponsesCorrectes[nomQuestion]) {
            score++;
        }
    }

    if (score === 6) {
        window.location.href = "felicitations.html";
    } else {
        alert(`Vous avez obtenu ${score}/6. Toutes les réponses doivent être correctes pour continuer.`);
    }
}

function brutForce() {
    const reponsesCorrectes = {
        q1: "b",
        q2: "c",
        q3: "b",
        q4: "a",
        q5: "c",
        q6: "a"
    };

    const questions = Object.keys(reponsesCorrectes);
    const options = ["a", "b", "c"];
    let found = false;

    async function tryCombination(index, answers) {
        if (index === questions.length) {
            console.log(`Testing combination: ${answers.join(", ")}`);
            questions.forEach((q, i) => {
                document.querySelector(`input[name="${q}"][value="${answers[i]}"]`).checked = true;
            });

            const originalAlert = window.alert;
            window.alert = function () {
                window.alert = originalAlert;
            };

            verifierReponses();
            if (window.location.href.includes("felicitations.html")) {
                found = true;
            }
            await new Promise(resolve => setTimeout(resolve, 10));
            return;
        }

        for (let opt of options) {
            if (found) break;
            await tryCombination(index + 1, [...answers, opt]);
        }
    }

    tryCombination(0, []);
}