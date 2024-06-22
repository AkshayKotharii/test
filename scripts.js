let currentQuestion = 0; 
const questions = [
    { text: "I have ambitious aims of making a difference.", category: "idealistic" },
    { text: "My leadership journey has progressed as I anticipated.", category: "idealistic" },
    { text: "I have spent fewer than 4 years in full time service or ministry.", category: "disillusioned" },
    
];

let answeredCounts = {
    idealistic: 0,
    disillusioned: 0,
    cynical: 0,
    hopeful: 0
};

const slider = document.querySelector('.slider');
const responseInputs = document.querySelectorAll('input[name="response"]');

responseInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
        const width = `${(index + 1) * 20}%`;
        const left = `${index * 20}%`;
        slider.style.width = width;
        slider.style.left = '0';
        setTimeout(() => {
            slider.style.width = '20%';
            slider.style.left = left;
            moveToNextQuestion();
        }, 300);
    });
});

function moveToNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        const category = questions[currentQuestion].category;
        answeredCounts[category]++;
        updateNavBar();
        currentQuestion++;
        updateUI();
    }
}

document.getElementById('next').addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        const category = questions[currentQuestion].category;
        answeredCounts[category]++;
        updateNavBar();
        currentQuestion++;
        updateUI();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentQuestion > 0) {
        const category = questions[currentQuestion].category;
        if (answeredCounts[category] > 0) {
            answeredCounts[category]--;
        }
        currentQuestion--;
        updateNavBar();
        updateUI();
    }
});

function updateUI() {
    document.querySelector('.progress').textContent = `${currentQuestion + 1}/${questions.length}`;
    document.querySelector('.question-text').textContent = questions[currentQuestion].text;
    responseInputs.forEach((input) => {
        input.checked = false;
    });
    slider.style.width = '0'; // Reset slider width when moving to the next question
    slider.style.left = '0'; // Reset slider position when moving to the next question
}

function updateNavBar() {
    for (const category in answeredCounts) {
        const navItem = document.getElementById(category);
        if (answeredCounts[category] > 0) {
            navItem.classList.add('answered');
        } else {
            navItem.classList.remove('answered');
        }
    }
}

// Initial UI update
updateUI();
updateNavBar();
