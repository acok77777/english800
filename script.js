/* ===================================
   초등 필수 영단어 800 - script.js
=================================== */

// DOM 요소
const wordList = document.getElementById("wordList");
const search = document.getElementById("search");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const todayGoal = document.getElementById("todayGoal");
const streak = document.getElementById("streak");

// 로컬 스토리지 데이터
let checkedWords = JSON.parse(localStorage.getItem("checkedWords")) || {};
let wrongWords = JSON.parse(localStorage.getItem("wrongWords")) || {};
let goal = Number(localStorage.getItem("goal")) || 0;
let streakCount = Number(localStorage.getItem("streak")) || 0;
let todayChecked = JSON.parse(localStorage.getItem("todayChecked")) || {};

// 상태 변수
let currentLetter = "ALL";
let currentMode = "ALL";

// ===================================
// 📱 모바일(스마트폰) TTS 대응 및 재생
// ===================================
let synth = window.speechSynthesis;
let voices = [];

function loadVoices() {
    if ('speechSynthesis' in window) {
        voices = synth.getVoices();
    }
}
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// 모바일 첫 터치 시 TTS 잠금 해제
document.addEventListener("click", function initMobileTTS() {
    if (synth && synth.speak) {
        const silentUtter = new SpeechSynthesisUtterance("");
        synth.speak(silentUtter);
    }
    document.removeEventListener("click", initMobileTTS);
}, { once: true });

function speak(word) {
    if (!('speechSynthesis' in window)) {
        alert("이 브라우저는 음성 재생을 지원하지 않습니다.");
        return;
    }

    synth.cancel(); // 이전 재생 취소

    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    utter.rate = 0.85; // 모바일에서 알아듣기 편하도록 약간 천천히

    // 미국 영어 목소리 우선 선택
    if (voices.length > 0) {
        const usVoice = voices.find(v => v.lang.includes("en-US") || v.lang.includes("en_US"));
        if (usVoice) utter.voice = usVoice;
    }

    synth.speak(utter);
}

// ===================================
// 🎉 O / X 연출 및 폭죽 효과
// ===================================
function showFeedback(isCorrect) {
    const overlay = document.getElementById("answerOverlay");
    const symbol = document.getElementById("overlaySymbol");

    if (!overlay || !symbol) return;

    if (isCorrect) {
        symbol.innerText = "⭕";
        symbol.className = "overlay-symbol correct";
        
        // 폭죽 효과 (canvas-confetti)
        if (typeof confetti === "function") {
            confetti({
                particleCount: 70,
                spread: 60,
                origin: { y: 0.6 }
            });
        }
    } else {
        symbol.innerText = "❌";
        symbol.className = "overlay-symbol wrong";
    }

    overlay.classList.remove("hidden");
    overlay.classList.add("show");

    setTimeout(() => {
        overlay.classList.remove("show");
        overlay.classList.add("hidden");
    }, 800);
}

// ===================================
// 퀴즈 채점 예시 연동 함수 (퀴즈 로직에 연결)
// ===================================
// 퀴즈 정답 선택 시 호출할 예시 함수
function checkQuizAnswer(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        showFeedback(true);  // ⭕ 정답 + 폭죽
    } else {
        showFeedback(false); // ❌ 오답
    }
}

// ===================================
// 학습 관리 / 날짜 / 진행률 로직
// ===================================
function getToday() {
    const d = new Date();
    return d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0");
}

function saveToday(id) {
    const today = getToday();
    if (!todayChecked[today]) todayChecked[today] = [];
    if (!todayChecked[today].includes(id)) todayChecked[today].push(id);
    localStorage.setItem("todayChecked", JSON.stringify(todayChecked));
}

function updateGoalProgress() {
    if (goal === 0) {
        todayGoal.innerText = "미설정";
        return;
    }
    const today = getToday();
    const count = todayChecked[today] ? todayChecked[today].length : 0;
    todayGoal.innerText = `${count} / ${goal}개`;

    if (count >= goal && goal > 0) {
        setTimeout(() => alert("🎉 오늘 목표를 달성했습니다!"), 300);
    }
}

function updateProgress() {
    if (typeof words === 'undefined') return;
    const total = words.length;
    const learned = Object.keys(checkedWords).length;
    
    progressText.innerText = learned + " / " + total;
    progressBar.style.width = ((learned / total) * 100) + "%";
}

function updateStreak() {
    const today = getToday();
    const last = localStorage.getItem("lastStudyDate");

    if (last === today) return;

    if (todayChecked[today] && todayChecked[today].length > 0) {
        if (last) {
            const diff = Math.floor((new Date(today) - new Date(last)) / 86400000);
            streakCount = (diff === 1) ? streakCount + 1 : 1;
        } else {
            streakCount = 1;
        }
        localStorage.setItem("lastStudyDate", today);
        localStorage.setItem("streak", streakCount);
        streak.innerText = streakCount + "일";
    }
}

// ===================================
// 단어 목록 렌더링
// ===================================
function renderWords() {
    if (typeof words === 'undefined') return;
    wordList.innerHTML = "";
    let list = [...words];

    if (currentLetter !== "ALL") {
        list = list.filter(w => w.word.toUpperCase().startsWith(currentLetter));
    }

    const keyword = search.value.toLowerCase();
    if (keyword) {
        list = list.filter(w => 
            w.word.toLowerCase().includes(keyword) || 
            w.meaning.includes(keyword)
        );
    }

    if (currentMode === "LEARNED") {
        list = list.filter(w => checkedWords[w.id]);
    } else if (currentMode === "UNLEARNED") {
        list = list.filter(w => !checkedWords[w.id]);
    }

    list.forEach(w => {
        const card = document.createElement("div");
        card.className = "wordCard";

        card.innerHTML = `
            <input type="checkbox" ${checkedWords[w.id] ? "checked" : ""} data-id="${w.id}">
            <div class="number">${w.id}</div>
            <div>
                <div class="word">${w.word}</div>
                <div class="pronounce">${w.pronunciation || ''}</div>
            </div>
            <div class="speaker">🔊</div>
            <div class="meaning">${w.meaning}</div>
        `;

        card.querySelector("input").onchange = (e) => {
            const id = Number(e.target.dataset.id);
            if (e.target.checked) {
                checkedWords[id] = true;
                saveToday(id);
            } else {
                delete checkedWords[id];
            }
            localStorage.setItem("checkedWords", JSON.stringify(checkedWords));
            updateProgress();
            updateGoalProgress();
            updateStreak();
        };

        // 모바일 스피커 터치 대응
        const speakerBtn = card.querySelector(".speaker");
        speakerBtn.onclick = (e) => {
            e.stopPropagation();
            speak(w.word);
        };

        wordList.appendChild(card);
    });
}

// 이벤트 연결
document.querySelectorAll("nav button").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
        document.getElementById(btn.dataset.page).classList.remove("hidden");
    };
});

document.querySelectorAll(".filter").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentLetter = btn.dataset.letter;
        renderWords();
    };
});

document.getElementById("showLearned").onclick = () => { currentMode = "LEARNED"; renderWords(); };
document.getElementById("showUnlearned").onclick = () => { currentMode = "UNLEARNED"; renderWords(); };
document.getElementById("showAll").onclick = () => { currentMode = "ALL"; renderWords(); };
search.oninput = () => renderWords();

// 초기 실행
streak.innerText = streakCount + "일";
renderWords();
updateProgress();
updateGoalProgress();
updateStreak();
