const SECRET_CODE = "2517";

// --- CUSTOMIZE YOUR CONTENT HERE ---
const bookContent = [
    {
        image: "images/WhatsApp Image 2026-02-06 at 6.18.58 AM.png",
        text: "My Baby every moment with you is the best moment of my life"
    },
    {
        image: "images/WhatsApp Image 2026-02-06 at 6.18.58 AM (1).png",
        text: "too more of our goofy pics"
    },
    {
        image: "images/WhatsApp Image 2026-02-06 at 7.20.07 AM.png",
        text: "TOO MORE SOKAR AFTER EXAMS WITH MY BABY"
    },
    {
        image: "images/WhatsApp Image 2026-02-06 at 6.18.59 AM.png",
        text: "I love you more than anything in this world ❤️"
    }
];
// ------------------------------------

let currentPage = 0;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const bookScreen = document.getElementById('book-screen');
const codeInputs = document.querySelectorAll('.code-input');
const errorMsg = document.getElementById('error-msg');
const contentImage = document.getElementById('content-image');
const contentText = document.getElementById('content-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const floatingHeartsContainer = document.querySelector('.floating-hearts');

// Initialize Login Logic
codeInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < codeInputs.length - 1) {
            codeInputs[index + 1].focus();
        }
        checkCode();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            codeInputs[index - 1].focus();
        }
    });
});

function checkCode() {
    const code = Array.from(codeInputs).map(input => input.value).join('');
    if (code.length === 4) {
        if (code === SECRET_CODE) {
            unlockBook();
        } else {
            errorMsg.textContent = "That's not it... try again ❤️";
            codeInputs.forEach(input => {
                input.value = '';
                input.style.borderColor = 'red';
            });
            codeInputs[0].focus();
            setTimeout(() => {
                errorMsg.textContent = '';
                codeInputs.forEach(input => input.style.borderColor = '');
            }, 2000);
        }
    }
}

function unlockBook() {
    loginScreen.classList.remove('active');
    bookScreen.classList.add('active');
    loadPage(0);
    createFloatingHearts();
}

// Book Navigation Logic
function loadPage(pageIndex) {
    currentPage = pageIndex;
    const content = bookContent[pageIndex];

    // Add fade-out effect
    contentImage.style.opacity = 0;
    contentText.style.opacity = 0;

    setTimeout(() => {
        contentImage.innerHTML = `<img src="${content.image}" alt="Moment">`;
        contentText.textContent = content.text;

        contentImage.style.opacity = 1;
        contentText.style.opacity = 1;

        // Button states
        prevBtn.disabled = pageIndex === 0;
        nextBtn.textContent = pageIndex === bookContent.length - 1 ? "Start Over" : "Next Page";
    }, 400);
}

nextBtn.addEventListener('click', () => {
    if (currentPage < bookContent.length - 1) {
        loadPage(currentPage + 1);
    } else {
        loadPage(0);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        loadPage(currentPage - 1);
    }
});

// Aesthetics: Floating Hearts
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
        floatingHeartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}
