const questions = [
  {
    text: "今日の気分に一番近いのは？",
    choices: [
      { text: "何もしたくない", type: "しんだ目" },
      { text: "刺激がほしい", type: "暴走気味" },
      { text: "穏やかに過ごしたい", type: "おっとり" }
    ]
  },
  {
    text: "空を見たら何を感じる？",
    choices: [
      { text: "無", type: "しんだ目" },
      { text: "自由になりたい", type: "繊細" },
      { text: "わぁ！きれい！", type: "元気っ子" }
    ]
  },
  {
    text: "話しかけられたら？",
    choices: [
      { text: "疲れる…", type: "しんだ目" },
      { text: "内容次第", type: "クール" },
      { text: "うれしい！", type: "甘えんぼ" }
    ]
  }
];

const results = {
  "しんだ目": "やる気が出ない日。でもそんな日も大事。",
  "暴走気味": "ちょっとテンション上がりすぎ？楽しいけど注意！",
  "おっとり": "ゆったり穏やかなあなた。癒し系。",
  "繊細": "心がガラスのよう。でも感受性は宝物。",
  "元気っ子": "エネルギーがあふれてる！周りも元気になるよ。",
  "甘えんぼ": "誰かにかまってほしい日。優しさに包まれて。",
  "クール": "感情はあるけど出さない。大人なあなた。"
};

let currentQuestionIndex = 0;
let selectedType = null;
const answerCounts = {};

const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const resultArea = document.getElementById("result-area");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const restartButton = document.getElementById("restart-button");

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.text;
  choicesContainer.innerHTML = "";

  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.className = "choice-button";

    button.addEventListener("click", () => {
      selectedType = choice.type;
      nextButton.disabled = false;

      // 選択表示の切り替え
      document.querySelectorAll(".choice-button").forEach(btn => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
    });

    choicesContainer.appendChild(button);
  });
}

nextButton.addEventListener("click", () => {
  if (selectedType) {
    if (!answerCounts[selectedType]) {
      answerCounts[selectedType] = 0;
    }
    answerCounts[selectedType]++;
  }

  currentQuestionIndex++;
  selectedType = null;
  nextButton.disabled = true;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  selectedType = null;
  for (let key in answerCounts) delete answerCounts[key];
  resultArea.style.display = "none";
  questionText.style.display = "block";
  choicesContainer.style.display = "block";
  nextButton.style.display = "inline-block";
  renderQuestion();
});

function showResult() {
  const max = Object.entries(answerCounts).reduce((a, b) => (a[1] > b[1] ? a : b));
  resultTitle.textContent = `あなたは「${max[0]}」タイプ`;
  resultDescription.textContent = results[max[0]];
  resultArea.style.display = "block";
  questionText.style.display = "none";
  choicesContainer.style.display = "none";
  nextButton.style.display = "none";
}

// 初期化
renderQuestion();

const shareButton = document.getElementById("share-button");

shareButton.addEventListener("click", () => {
  const text = `${resultTitle.textContent}\n${resultDescription.textContent}\n#気分診断 #今日はどの自分`;
  const url = encodeURIComponent("https://hanawebdesign.github.io/Hana-shindan/"); // 公開URLに差し替えてね
  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
  window.open(tweet, "_blank");
});
