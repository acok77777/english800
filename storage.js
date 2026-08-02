// =========================================
// storage.js
// LocalStorage 관리
// =========================================

'use strict';

// =========================================
// Storage Key
// =========================================

const STORAGE_KEYS = {

    checked: "english800_checked",

    favorite: "english800_favorite",

    darkMode: "english800_darkmode",

    speechSpeed: "english800_speed",

    voice: "english800_voice"

};

// =========================================
// 체크 단어
// =========================================

let checkedWords = [];

// =========================================
// 즐겨찾기
// =========================================

let favoriteWords = [];

// =========================================
// 저장 불러오기
// =========================================

function loadStorage(){

    checkedWords = JSON.parse(

        localStorage.getItem(STORAGE_KEYS.checked)

        || "[]"

    );

    favoriteWords = JSON.parse(

        localStorage.getItem(STORAGE_KEYS.favorite)

        || "[]"

    );

}

// =========================================
// 저장
// =========================================

function saveStorage(){

    localStorage.setItem(

        STORAGE_KEYS.checked,

        JSON.stringify(checkedWords)

    );

    localStorage.setItem(

        STORAGE_KEYS.favorite,

        JSON.stringify(favoriteWords)

    );

}

// =========================================
// 체크 여부
// =========================================

function isChecked(id){

    return checkedWords.includes(id);

}

// =========================================
// 즐겨찾기 여부
// =========================================

function isFavorite(id){

    return favoriteWords.includes(id);

}

// =========================================
// 체크 토글
// =========================================

function toggleChecked(id){

    if(isChecked(id)){

        checkedWords = checkedWords.filter(

            item=>item!==id

        );

    }

    else{

        checkedWords.push(id);

    }

    saveStorage();

    renderWordList(words);

    updateProgress();

}

// =========================================
// 즐겨찾기 토글
// =========================================

function toggleFavoriteWord(id){

    if(isFavorite(id)){

        favoriteWords = favoriteWords.filter(

            item=>item!==id

        );

    }

    else{

        favoriteWords.push(id);

    }

    saveStorage();

    renderWordList(words);

    updateProgress();

}

// =========================================
// 체크 배열
// =========================================

function getCheckedWords(){

    return checkedWords;

}

// =========================================
// 즐겨찾기 배열
// =========================================

function getFavoriteWords(){

    return favoriteWords;

}

// =========================================
// 체크 모두 삭제
// =========================================

function clearChecked(){

    if(!confirm("외운 단어를 모두 삭제할까요?"))

        return;

    checkedWords=[];

    saveStorage();

    renderWordList(words);

    updateProgress();

}

// =========================================
// 즐겨찾기 모두 삭제
// =========================================

function clearFavorite(){

    if(!confirm("즐겨찾기를 모두 삭제할까요?"))

        return;

    favoriteWords=[];

    saveStorage();

    renderWordList(words);

    updateProgress();

}

// =========================================
// 전체 초기화
// =========================================

function resetAllStorage(){

    if(!confirm("모든 학습 데이터를 삭제할까요?"))

        return;

    checkedWords=[];

    favoriteWords=[];

    localStorage.removeItem(

        STORAGE_KEYS.checked

    );

    localStorage.removeItem(

        STORAGE_KEYS.favorite

    );

    renderWordList(words);

    updateProgress();

}

// =========================================
// 다크모드
// =========================================

function saveDarkMode(value){

    localStorage.setItem(

        STORAGE_KEYS.darkMode,

        value

    );

}

function loadDarkMode(){

    return localStorage.getItem(

        STORAGE_KEYS.darkMode

    );

}

// =========================================
// 발음속도
// =========================================

function saveSpeechSpeed(value){

    localStorage.setItem(

        STORAGE_KEYS.speechSpeed,

        value

    );

}

function loadSpeechSpeed(){

    return Number(

        localStorage.getItem(

            STORAGE_KEYS.speechSpeed

        ) || 1

    );

}

// =========================================
// 음성
// =========================================

function saveVoice(value){

    localStorage.setItem(

        STORAGE_KEYS.voice,

        value

    );

}

function loadVoice(){

    return localStorage.getItem(

        STORAGE_KEYS.voice

    ) || "en-US";

}

// =========================================
// 시작
// =========================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadStorage();

    }

);
