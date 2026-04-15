const cards = [
    { front: 'Межкультурная коммуникация', back: 'обмен информацией, осуществляемый носителями разных культур, причем то, что коммуниканты являются носителями разных культур, значительнейшим образом влияет на их коммуникацию и в некоторой степени определяет ее ход', isDefinitionCorrect: true },
    { front: 'Проксемика', back: 'изучение пространственного поведения человека и животных. Выделено четыре дистантные зоны (интимная, личная, социальная и публичная), подчеркивая, что границы зон варьируют в разных культурах и что нарушение этих границ критично для коммуникативного процесса', isDefinitionCorrect: true },
    { front: 'Паралингвистистика', back: 'направление, занимающееся изучением того, как влияют на конечный смысл высказывания просодические компоненты', isDefinitionCorrect: true }
];

const cardElement = document.getElementById('flip-card');
const frontTextElement = document.getElementById('card-front-text');
const backTextElement = document.getElementById('card-back-text');
const prevCardButton = document.getElementById('prev-card');
const nextCardButton = document.getElementById('next-card');
const correctButton = document.getElementById('correct-btn');
const wrongButton = document.getElementById('wrong-btn');
const toast = document.getElementById('toast');

let cardIndex = 0;
let toastTimeoutId;

function setCardContent() {
    frontTextElement.textContent = cards[cardIndex].front;
    backTextElement.textContent = cards[cardIndex].back;
    cardElement.classList.remove('is-flipped');
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
        toast.classList.remove('is-visible');
    }, 1400);
}

function showNextCard() {
    cardIndex = (cardIndex + 1) % cards.length;
    setCardContent();
}

function showPreviousCard() {
    cardIndex = (cardIndex - 1 + cards.length) % cards.length;
    setCardContent();
}

function handleAnswer(answerType) {
    const isDefinitionCorrect = cards[cardIndex].isDefinitionCorrect;
    const isCorrectAnswer = (answerType === 'correct' && isDefinitionCorrect)
        || (answerType === 'wrong' && !isDefinitionCorrect);

    showToast(isCorrectAnswer ? 'Верно!' : 'Неверно!');
    cardElement.classList.remove('is-flipped');
}

cardElement.addEventListener('click', () => {
    cardElement.classList.toggle('is-flipped');
});

cardElement.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
        return;
    }

    event.preventDefault();
    cardElement.classList.toggle('is-flipped');
});

prevCardButton.addEventListener('click', showPreviousCard);
nextCardButton.addEventListener('click', showNextCard);

correctButton.addEventListener('click', (event) => {
    event.stopPropagation();
    handleAnswer('correct');
});

wrongButton.addEventListener('click', (event) => {
    event.stopPropagation();
    handleAnswer('wrong');
});

setCardContent();
