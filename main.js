const cards = document.querySelectorAll('.card');
const results = [
  '大吉: 今日は最高の日！',
  '中吉: 良いことが待っているよ。',
  '小吉: 少し頑張れば良いことがあるかも。',
  '凶: 今日の運はちょっと低め。気をつけて！'
];

const instructionText = document.getElementById('instruction');
const resetButton = document.getElementById('resetButton');
const title = document.getElementById('title');
const tweetButton = document.getElementById('tweetButton');
let currentResult = '';

cards.forEach((card) => {
  card.addEventListener('click', () => {
    if (card.classList.contains('clicked')) return;

    instructionText.style.display = 'none';
    title.style.display = 'none';

    const randomResult = results[Math.floor(Math.random() * results.length)];
    currentResult = randomResult;
    const resultElement = card.querySelector('.card-back p');
    resultElement.textContent = randomResult;

    card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';

    cards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.add('hidden');
      }
    });

    card.classList.add('center');
    card.classList.add('clicked');

    resetButton.style.display = 'inline-block';
    tweetButton.style.display = 'inline-block';
  });
});

resetButton.addEventListener('click', () => {
  cards.forEach((card) => {
    card.classList.remove('hidden', 'clicked', 'center');
    card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
    card.querySelector('.card-back p').textContent = '結果がここに表示されます';
  });

  instructionText.style.display = 'block';
  title.style.display = 'block';
  resetButton.style.display = 'none';
  tweetButton.style.display = 'none';
});

tweetButton.addEventListener('click', () => {
  const text = encodeURIComponent(`今日のわんわんおみくじの結果は…「${currentResult}」🐾 #わんわんおみくじ`);
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank');
});
