function creerConfettis() {
    const couleurs = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'absolute w-2 h-2 rounded-full';
        confetti.style.top = '-100px'; 
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = couleurs[Math.floor(Math.random() * couleurs.length)];
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear ${Math.random() * 5}s infinite`;
        document.body.appendChild(confetti);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

window.onload = creerConfettis;
