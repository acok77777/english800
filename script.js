// =========================================
// 초등 필수 영단어 800
// Main Script
// Version 1.0
// =========================================

'use strict';

// ===============================
// 전역 변수
// ===============================

let currentCategory = "ALL";
let currentQuizType = "";
let currentQuizCount = 20;
let currentVoice = "en-US";
let speechRate = 1.0;

let checkedWords = [];
let favoriteWords = [];
let wrongWords = [];

let todayWords = [];
let searchKeyword = "";

// ===============================
// 앱 시작
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    console.log("English800 Start");

    loadStorage();

    initCategoryButtons();

    renderWordList(words);

    updateProgress();

    updateCalendar();

    loadTodayWords();

    updateTodayWords();

    registerInstallButton();

});

// ===============================
// 카테고리 버튼
// ===============================

function initCategoryButtons(){

    document.querySelectorAll(".alphabet-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            currentCategory = btn.dataset.category;

            filterCategory(currentCategory);

        });

    });

}

// ===============================
// 카테고리 필터
// ===============================

function filterCategory(category){

    if(category==="ALL"){

        renderWordList(words);

        return;

    }

    const list = words.filter(item=>{

        return item.word.charAt(0).toUpperCase()===category;

    });

    renderWordList(list);

}

// ===============================
// 검색
// ===============================

function searchWord(keyword){

    searchKeyword = keyword;

    searchWords(keyword);

}

// ===============================
// 체크 저장
// ===============================

function toggleCheck(id){

    toggleChecked(id);

}

// ===============================
// 즐겨찾기
// ===============================

function toggleFavorite(id){

    toggleFavoriteWord(id);

}

// ===============================
// 발음
// ===============================

function speak(word){

    speakWord(word);

}

// ===============================
// 퀴즈 시작
// ===============================

function startQuiz(type){

    currentQuizType = type;

    startQuizGame(type);

}

// ===============================
// 오늘의 단어
// ===============================

function refreshTodayWords(){

    loadTodayWords();

    updateTodayWords();

}

// ===============================
// 백업
// ===============================

function backup(){

    backupData();

}

// ===============================
// 복원
// ===============================

function restore(file){

    restoreData(file);

}

// ===============================
// 다크모드
// ===============================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkmode",
        document.body.classList.contains("dark")
    );

}

// ===============================
// 발음속도
// ===============================

function setSpeechRate(rate){

    speechRate = rate;

}

// ===============================
// 미국식 / 영국식
// ===============================

function setVoice(lang){

    currentVoice = lang;

}

// ===============================
// 설치버튼
// ===============================

let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

    e.preventDefault();

    deferredPrompt=e;

    const btn=document.getElementById("installBtn");

    if(btn){

        btn.style.display="block";

    }

});

function registerInstallButton(){

    const btn=document.getElementById("installBtn");

    if(!btn) return;

    btn.onclick=async()=>{

        if(!deferredPrompt) return;

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt=null;

        btn.style.display="none";

    }

}
