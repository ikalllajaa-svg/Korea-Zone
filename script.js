const lessons = {
  hangeul: {
    title: "Belajar Huruf Hangeul",
    content: `
      <h3>Huruf Vokal Dasar (모음)</h3>
      <div class="lesson-item">ㅏ = a</div>
      <div class="lesson-item">ㅑ = ya</div>
      <div class="lesson-item">ㅓ = eo</div>
      <div class="lesson-item">ㅕ = yeo</div>
      <div class="lesson-item">ㅗ = o</div>
      <div class="lesson-item">ㅛ = yo</div>
      <div class="lesson-item">ㅜ = u</div>
      <div class="lesson-item">ㅠ = yu</div>
      <div class="lesson-item">ㅡ = eu</div>
      <div class="lesson-item">ㅣ = i</div>

      <h3>Konsonan Dasar (자음)</h3>
      <div class="lesson-item">ㄱ = g/k</div>
      <div class="lesson-item">ㄴ = n</div>
      <div class="lesson-item">ㄷ = d/t</div>
      <div class="lesson-item">ㄹ = r/l</div>
      <div class="lesson-item">ㅁ = m</div>
      <div class="lesson-item">ㅂ = b/p</div>
      <div class="lesson-item">ㅅ = s</div>
      <div class="lesson-item">ㅇ = ng (akhir) / tanpa bunyi (awal)</div>
      <div class="lesson-item">ㅈ = j</div>
      <div class="lesson-item">ㅎ = h</div>
    `
  },

  kosakata: {
    title: "Kosakata Sehari-hari",
    content: `
      <div class="lesson-item">안녕하세요 = Halo</div>
      <div class="lesson-item">감사합니다 = Terima kasih</div>
      <div class="lesson-item">사랑 = Cinta</div>
      <div class="lesson-item">친구 = Teman</div>
      <div class="lesson-item">학교 = Sekolah</div>
      <div class="lesson-item">가족 = Keluarga</div>
      <div class="lesson-item">물 = Air</div>
      <div class="lesson-item">밥 = Nasi / makanan</div>
      <div class="lesson-item">책 = Buku</div>
      <div class="lesson-item">사람 = Orang</div>
    `
  },

  grammar: {
    title: "Tata Bahasa Dasar",
    content: `
      <h3>1. 저는 ... 입니다</h3>
      <p>Digunakan untuk memperkenalkan diri secara sopan.</p>
      <p>Contoh: 저는 학생입니다.</p>
      <p>Artinya: Saya adalah seorang siswa.</p>
      <br>
      <h3>2. 은 / 는</h3>
      <p>Partikel penanda topik pembicaraan.</p>
      <p>Contoh: 저는 학생입니다.</p>
      <br>
      <h3>3. 입니다</h3>
      <p>Bentuk sopan untuk menyatakan identitas atau sesuatu.</p>
    `
  },

  conversation: {
    title: "Percakapan Sederhana",
    content: `
      <h3>Perkenalan Diri</h3>
      <div class="lesson-item">
        A: 안녕하세요! <br>
        Halo!
      </div>
      <div class="lesson-item">
        B: 안녕하세요! <br>
        Halo!
      </div>
      <div class="lesson-item">
        A: 이름이 뭐예요? <br>
        Siapa namamu?
      </div>
      <div class="lesson-item">
        B: 제 이름은 민지예요. <br>
        Nama saya Minji.
      </div>
      <div class="lesson-item">
        A: 만나서 반가워요. <br>
        Senang bertemu denganmu.
      </div>
      <div class="lesson-item">
        B: 저도 반가워요. <br>
        Saya juga senang bertemu denganmu.
      </div>
    `
  }
};

function showLesson(type) {
  const lesson = lessons[type];

  document.getElementById("lesson-title").textContent =
    lesson.title;

  document.getElementById("lesson-content").innerHTML =
    lesson.content;

  document.getElementById("lesson").scrollIntoView({
    behavior: "smooth"
  });
}

// DATA KUIS

const questions = [
  {
    question: "Apa arti dari 안녕하세요?",
    answers: ["Terima kasih", "Halo", "Selamat malam", "Maaf"],
    correct: 1
  },
  {
    question: "Apa arti 감사합니다?",
    answers: ["Terima kasih", "Sampai jumpa", "Halo", "Teman"],
    correct: 0
  },
  {
    question: "Huruf Korea ㅏ dibaca...",
    answers: ["O", "U", "A", "I"],
    correct: 2
  },
  {
    question: "Apa arti 학교?",
    answers: ["Rumah", "Sekolah", "Buku", "Air"],
    correct: 1
  },
  {
    question: "Apa arti 친구?",
    answers: ["Keluarga", "Guru", "Teman", "Makanan"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  document.getElementById("question-number").textContent =
    `Soal ${currentQuestion + 1} / ${questions.length}`;

  document.getElementById("score").textContent =
    `Skor: ${score}`;

  document.getElementById("question").textContent =
    q.question;

  document.getElementById("feedback").textContent = "";

  document.getElementById("next-btn").hidden = true;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.textContent = answer;

    button.onclick = () => checkAnswer(index, button);

    answers.appendChild(button);
  });
}

function checkAnswer(index, button) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answers button");

  buttons.forEach((btn, i) => {
    btn.disabled = true;

    if (i === q.correct) {
      btn.classList.add("correct");
    }
  });

  if (index === q.correct) {
    score += 20;
    document.getElementById("feedback").textContent =
      "Benar! 잘했어요! (Bagus sekali!)";
  } else {
    button.classList.add("wrong");
    document.getElementById("feedback").textContent =
      "Belum tepat! Coba pelajari kembali materinya.";
  }

  document.getElementById("score").textContent =
    `Skor: ${score}`;

  document.getElementById("next-btn").hidden = false;

  if (currentQuestion === questions.length - 1) {
    document.getElementById("next-btn").textContent =
      "Lihat Hasil";
  }
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  document.getElementById("next-btn").textContent =
    "Soal Selanjutnya →";

  loadQuestion();
}

function showResult() {
  document.getElementById("question-number").textContent =
    "Kuis Selesai!";

  document.getElementById("question").textContent =
    "축하합니다! 🎉";

  document.getElementById("answers").innerHTML = `
    <h3>Skor Akhir: ${score} / 100</h3>
    <p>${
      score >= 80
        ? "Hebat! Pemahaman bahasa Koreamu sangat baik!"
        : score >= 60
        ? "Bagus! Terus tingkatkan kemampuanmu!"
        : "Tetap semangat! Yuk pelajari materi lagi!"
    }</p>
    <button onclick="restartQuiz()">Ulangi Kuis</button>
  `;

  document.getElementById("score").textContent =
    `Skor: ${score}`;

  document.getElementById("feedback").textContent = "";
  document.getElementById("next-btn").hidden = true;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
}

loadQuestion();
