const cards = [
    { front: 'Лингвокультурология', back: 'отрасль лингвистики, возникшая на стыке лингвистики и культурологии и исследующая проявления культуры народа, которые отразились и закрепились в языке.', isDefinitionCorrect: true },
    { front: 'Национально-культурная специфика', back: 'это уникальные особенности языка, обычаев, ценностей и материальной культуры, отличающие один народ от другого', isDefinitionCorrect: true },
    { front: 'Билингвизм (двуязычие)', back: 'это способность человека или группы людей свободно использовать два языка для общения, попеременно переключаясь между ними в зависимости от ситуации', isDefinitionCorrect: true },
    { front: 'Интерференция', back: 'это нарушение норм изучаемого (второго) языка под влиянием родного (первого) языка, возникающее при билингвизме (двуязычии)', isDefinitionCorrect: true },
    { front: 'Аккультурация', back: 'это процесс взаимного влияния культур, при котором происходит усвоение одним народом (или личностью) языка, традиций и ценностей другой культуры, сохраняя при этом свою оригинальную самобытность', isDefinitionCorrect: true },
    { front: 'Лексический фон', back: 'это совокупность ассоциаций, коннотаций и фоновых знаний, которые возникают у носителей языка при употреблении слова, помимо его основного словарного значения', isDefinitionCorrect: true }
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
