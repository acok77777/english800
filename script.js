// =========================================
// script.js
// Main Controller
// Version 1.0
// =========================================

'use strict';

// =========================================
// 전역 상태
// =========================================

let currentCategory = "ALL";
let currentSearchKeyword = "";

let currentVoice = "en-US";
let speechSpeed = 1.0;

let deferredPrompt = null;

// =========================================
// 앱 시작
// =========================================

window.addEventListener("DOMContentLoaded", initApp);

// =========================================
// 초기화
// =========================================

function initApp(){

    console.log("🐱 English800 Start");

    loadStorage();

    currentVoice = loadVoice();

    speechSpeed = loadSpeechSpeed();

    initSearch();

    initAlphabetButtons();

    renderWordList(words);

    updateProgress();

    updateCalendar();

    updateBackupInfo();

    updateQuizStatistics();

    updateBestScore();

    updateBestStreak();

    updateBadge();

    registerPWA();

    restoreDarkMode();

}

// =========================================
// 다크모드
// =========================================

function restoreDarkMode(){

    if(loadDarkMode()==="true"){

        document.body.classList.add("dark");

    }

}

// =========================================
// A~Z 버튼
// =========================================

function initAlphabetButtons(){

    const buttons=document.querySelectorAll(".alphabet-btn");

    buttons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            currentCategory=

                btn.dataset.category;

            filterCategory(currentCategory);

        });

    });

}

// =========================================
// 카테고리
// =========================================

function filterCategory(letter){

    if(letter==="ALL"){

        renderWordList(words);

        return;

    }

    const list=

        words.filter(item=>

            item.word

            .toUpperCase()

            .startsWith(letter)

        );

    renderWordList(list);

}

// =========================================
// 검색
// =========================================

function search(keyword){

    currentSearchKeyword=keyword;

    searchWords(keyword);

}

// =========================================
// 전체보기
// =========================================

function showAllWords(){

    renderWordList(words);

}

// =========================================
// 새로고침
// =========================================

function refreshApp(){

    loadStorage();

    updateProgress();

    updateCalendar();

    renderWordList(words);

}

// =========================================
// 랜덤20
// =========================================

function random20(){

    showRandomWords();

}

// =========================================
// 오늘20
// =========================================

function today20(){

    updateTodayWords();

}

// =========================================
// 다크모드
// =========================================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    saveDarkMode(

        document.body.classList.contains("dark")

    );

}

// =========================================
// 앱 정보
// =========================================

function showAppInfo(){

    alert(

`🐱 초등 필수 영단어 800

Version 1.0

Offline PWA`

    );

}
// =========================================
// PWA 설치
// =========================================

function registerPWA(){

    window.addEventListener(

        "beforeinstallprompt",

        (e)=>{

            e.preventDefault();

            deferredPrompt=e;

            const btn=

                document.getElementById(

                    "installBtn"

                );

            if(btn){

                btn.style.display="inline-block";

            }

        }

    );

    const installBtn=

        document.getElementById(

            "installBtn"

        );

    if(!installBtn) return;

    installBtn.addEventListener(

        "click",

        installPWA

    );

}

// =========================================
// 설치
// =========================================

async function installPWA(){

    if(!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    deferredPrompt=null;

    document.getElementById(

        "installBtn"

    ).style.display="none";

}

// =========================================
// 발음
// =========================================

function setVoice(lang){

    currentVoice=lang;

    saveVoice(lang);

}

// =========================================
// 발음 속도
// =========================================

function setSpeechSpeed(speed){

    speechSpeed=

        Number(speed);

    saveSpeechSpeed(

        speechSpeed

    );

}

// =========================================
// 오늘의20단어
// =========================================

function loadTodayWords(){

    const today=

        new Date()

        .toISOString()

        .slice(0,10);

    const savedDate=

        localStorage.getItem(

            "todayDate"

        );

    if(savedDate===today){

        todayWords=

            JSON.parse(

                localStorage.getItem(

                    "todayWords"

                ) || "[]"

            );

        return;

    }

    const shuffled=[...words];

    shuffled.sort(

        ()=>Math.random()-0.5

    );

    todayWords=

        shuffled

        .slice(0,20)

        .map(item=>item.id);

    localStorage.setItem(

        "todayDate",

        today

    );

    localStorage.setItem(

        "todayWords",

        JSON.stringify(todayWords)

    );

}

// =========================================
// 새 오늘단어
// =========================================

function refreshTodayWords(){

    localStorage.removeItem(

        "todayDate"

    );

    loadTodayWords();

    updateTodayWords();

}

// =========================================
// 새버전
// =========================================

function checkVersion(){

    console.log(

        "Version 1.0"

    );

}

// =========================================
// 앱 종료
// =========================================

window.addEventListener(

    "beforeunload",

    ()=>{

        saveStorage();

    }

);

// =========================================
// 새로고침
// =========================================

function reloadApp(){

    location.reload();

}
// =========================================
// 메뉴
// =========================================

function showFavorite(){

    showFavoriteWords();

}

function showChecked(){

    showCheckedWords();

}

function showUnchecked(){

    showUncheckedWords();

}

function showWrong(){

    showWrongWords();

}

// =========================================
// 체크
// =========================================

function toggleCheck(id){

    toggleChecked(id);

    updateProgress();

    updateCalendar();

    updateWrongCount();

}

// =========================================
// 즐겨찾기
// =========================================

function toggleFavorite(id){

    toggleFavoriteWord(id);

    updateProgress();

}

// =========================================
// 검색
// =========================================

function searchWord(){

    const input=document.getElementById(

        "searchInput"

    );

    if(!input) return;

    currentSearchKeyword=input.value;

    searchWords(currentSearchKeyword);

}

// =========================================
// 검색 초기화
// =========================================

function clearSearchBox(){

    const input=document.getElementById(

        "searchInput"

    );

    if(input){

        input.value="";

    }

    renderWordList(words);

}

// =========================================
// 검색 Enter
// =========================================

function initSearchEvent(){

    const input=document.getElementById(

        "searchInput"

    );

    if(!input) return;

    input.addEventListener(

        "keydown",

        e=>{

            if(e.key==="Enter"){

                searchWord();

            }

        }

    );

}

// =========================================
// 진행률 새로고침
// =========================================

function refreshProgress(){

    updateProgress();

    updateTodayCount();

    updateWrongCount();

}

// =========================================
// 달력 새로고침
// =========================================

function refreshCalendar(){

    saveStudyDate();

    updateCalendar();

}

// =========================================
// 오늘 단어
// =========================================

function refreshToday(){

    loadTodayWords();

    updateTodayWords();

}

// =========================================
// 퀴즈
// =========================================

function openQuiz(type){

    startQuizGame(type);

}

// =========================================
// 퀴즈 종료
// =========================================

function finishLearning(){

    updateProgress();

    updateCalendar();

    updateQuizStatistics();

}

// =========================================
// 앱 전체 새로고침
// =========================================

function refreshAll(){

    loadStorage();

    renderWordList(words);

    updateProgress();

    updateCalendar();

    updateQuizStatistics();

    updateBestScore();

    updateBestStreak();

    updateBadge();

    updateBackupInfo();

}

// =========================================
// 초기 이벤트
// =========================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initSearchEvent();

    }

);
// =========================================
// Mobile
// =========================================

function initMobile(){

    if(

        /Android|iPhone|iPad|iPod/i

        .test(

            navigator.userAgent

        )

    ){

        document.body.classList.add(

            "mobile"

        );

    }

}

// =========================================
// Welcome
// =========================================

function firstRun(){

    if(

        localStorage.getItem(

            "english800_first"

        )

    ) return;

    alert(

`🐱

초등 필수 영단어 800

설치를 환영합니다!

오늘도 즐겁게 공부하세요 😊`

    );

    localStorage.setItem(

        "english800_first",

        "true"

    );

}

// =========================================
// 다크모드
// =========================================

function applyDarkMode(){

    const mode=

        loadDarkMode();

    if(mode==="true"){

        document.body.classList.add(

            "dark"

        );

    }

}

// =========================================
// 버전
// =========================================

const APP_VERSION="1.0.0";

// =========================================
// 버전확인
// =========================================

function checkAppVersion(){

    const version=

        localStorage.getItem(

            "appVersion"

        );

    if(version!==APP_VERSION){

        localStorage.setItem(

            "appVersion",

            APP_VERSION

        );

        console.log(

            "Version Updated"

        );

    }

}

// =========================================
// 온라인
// =========================================

window.addEventListener(

    "online",

    ()=>{

        console.log(

            "Online"

        );

    }

);

// =========================================
// 오프라인
// =========================================

window.addEventListener(

    "offline",

    ()=>{

        console.log(

            "Offline"

        );

    }

);

// =========================================
// Scroll Top
// =========================================

function scrollTopButton(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// =========================================
// Footer Year
// =========================================

function updateYear(){

    const el=

        document.getElementById(

            "year"

        );

    if(!el) return;

    el.textContent=

        new Date()

        .getFullYear();

}

// =========================================
// Toast
// =========================================

function toast(message){

    console.log(message);

}

// =========================================
// 시작
// =========================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initMobile();

        firstRun();

        applyDarkMode();

        checkAppVersion();

        updateYear();

    }

);
// =========================================
// script.js
// Final
// =========================================

'use strict';

// =========================================
// 앱 종료
// =========================================

function shutdownApp(){

    saveStorage();

    console.log(

        "English800 Closed"

    );

}

// =========================================
// 전체 새로고침
// =========================================

function reloadAll(){

    loadStorage();

    renderWordList(words);

    updateProgress();

    updateCalendar();

    updateBackupInfo();

    updateQuizStatistics();

    updateBestScore();

    updateBestStreak();

    updateBadge();

}

// =========================================
// 전체 초기화
// =========================================

function resetApplication(){

    if(

        !confirm(

            "모든 데이터를 삭제할까요?"

        )

    ){

        return;

    }

    localStorage.clear();

    location.reload();

}

// =========================================
// 정보
// =========================================

function aboutApp(){

    alert(

`🐱 초등 필수 영단어 800

Version 1.0

PWA

Offline

Copyright © 2026`

    );

}

// =========================================
// 개발자
// =========================================

function developer(){

    console.log(

        "English800"

    );

}

// =========================================
// 종료
// =========================================

window.addEventListener(

    "beforeunload",

    shutdownApp

);

// =========================================
// 오류
// =========================================

window.onerror=function(

    message,

    source,

    line,

    column,

    error

){

    console.log(

        message

    );

};

// =========================================
// 시작
// =========================================

console.log(

"===================================="

);

console.log(

"🐱 초등 필수 영단어 800"

);

console.log(

"Version 1.0"

);

console.log(

"English800 Started"

);

console.log(

"====================================");
