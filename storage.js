// =========================================
// storage.js
// LocalStorage Manager
// Version 1.0
// =========================================

'use strict';

// =========================================
// Storage Keys
// =========================================

const STORAGE_KEYS = {

    checked : "english800_checked",

    favorite : "english800_favorite",

    wrong : "english800_wrong",

    today : "english800_today",

    dark : "english800_dark",

    voice : "english800_voice",

    speed : "english800_speed",

    quizBest : "english800_bestscore",

    streak : "english800_beststreak"

};

// =========================================
// Data
// =========================================

let checkedWords = [];

let favoriteWords = [];

let wrongWords = [];

// =========================================
// Load
// =========================================

function loadStorage(){

    checkedWords = JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.checked

        ) || "[]"

    );

    favoriteWords = JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.favorite

        ) || "[]"

    );

    wrongWords = JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.wrong

        ) || "[]"

    );

}

// =========================================
// Save
// =========================================

function saveStorage(){

    localStorage.setItem(

        STORAGE_KEYS.checked,

        JSON.stringify(

            checkedWords

        )

    );

    localStorage.setItem(

        STORAGE_KEYS.favorite,

        JSON.stringify(

            favoriteWords

        )

    );

    localStorage.setItem(

        STORAGE_KEYS.wrong,

        JSON.stringify(

            wrongWords

        )

    );

}

// =========================================
// Checked
// =========================================

function getCheckedWords(){

    return checkedWords;

}

function isChecked(id){

    return checkedWords.includes(id);

}

// =========================================
// Favorite
// =========================================

function getFavoriteWords(){

    return favoriteWords;

}

function isFavorite(id){

    return favoriteWords.includes(id);

}

// =========================================
// Wrong
// =========================================

function getWrongWords(){

    return wrongWords;

}
// =========================================
// Checked Toggle
// =========================================

function toggleChecked(id){

    if(isChecked(id)){

        checkedWords = checkedWords.filter(

            item => item !== id

        );

    }

    else{

        checkedWords.push(id);

    }

    saveStorage();

    if(typeof updateProgress==="function"){

        updateProgress();

    }

    if(typeof saveStudyDate==="function"){

        saveStudyDate();

    }

    if(typeof updateCalendar==="function"){

        updateCalendar();

    }

}

// =========================================
// Favorite Toggle
// =========================================

function toggleFavoriteWord(id){

    if(isFavorite(id)){

        favoriteWords = favoriteWords.filter(

            item => item !== id

        );

    }

    else{

        favoriteWords.push(id);

    }

    saveStorage();

    if(typeof updateProgress==="function"){

        updateProgress();

    }

}

// =========================================
// Wrong Word
// =========================================

function addWrongWord(id){

    if(!wrongWords.includes(id)){

        wrongWords.push(id);

        saveStorage();

    }

}

// =========================================
// Remove Wrong
// =========================================

function removeWrongWord(id){

    wrongWords = wrongWords.filter(

        item => item !== id

    );

    saveStorage();

}

// =========================================
// Clear Wrong
// =========================================

function clearWrongWords(){

    if(

        !confirm(

            "오답노트를 모두 삭제할까요?"

        )

    ){

        return;

    }

    wrongWords = [];

    saveStorage();

    if(typeof updateProgress==="function"){

        updateProgress();

    }

}

// =========================================
// Checked Count
// =========================================

function checkedCount(){

    return checkedWords.length;

}

// =========================================
// Favorite Count
// =========================================

function favoriteCount(){

    return favoriteWords.length;

}

// =========================================
// Wrong Count
// =========================================

function wrongCount(){

    return wrongWords.length;

}

// =========================================
// Has Wrong
// =========================================

function hasWrongWords(){

    return wrongWords.length > 0;

}

// =========================================
// Auto Save
// =========================================

window.addEventListener(

    "beforeunload",

    saveStorage

);
// =========================================
// Dark Mode
// =========================================

function saveDarkMode(value){

    localStorage.setItem(

        STORAGE_KEYS.dark,

        String(value)

    );

}

function loadDarkMode(){

    return localStorage.getItem(

        STORAGE_KEYS.dark

    ) || "false";

}

// =========================================
// Voice
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
// Speech Speed
// =========================================

function saveSpeechSpeed(value){

    localStorage.setItem(

        STORAGE_KEYS.speed,

        value

    );

}

function loadSpeechSpeed(){

    return Number(

        localStorage.getItem(

            STORAGE_KEYS.speed

        ) || 1

    );

}

// =========================================
// Best Quiz Score
// =========================================

function saveBestScore(score){

    const best = getBestScore();

    if(score > best){

        localStorage.setItem(

            STORAGE_KEYS.quizBest,

            score

        );

    }

}

function getBestScore(){

    return Number(

        localStorage.getItem(

            STORAGE_KEYS.quizBest

        ) || 0

    );

}

// =========================================
// Best Streak
// =========================================

function saveBestStreak(streak){

    const best = getBestStreak();

    if(streak > best){

        localStorage.setItem(

            STORAGE_KEYS.streak,

            streak

        );

    }

}

function getBestStreak(){

    return Number(

        localStorage.getItem(

            STORAGE_KEYS.streak

        ) || 0

    );

}

// =========================================
// Today Words
// =========================================

function saveTodayWords(list){

    localStorage.setItem(

        STORAGE_KEYS.today,

        JSON.stringify(list)

    );

}

function loadTodayWords(){

    return JSON.parse(

        localStorage.getItem(

            STORAGE_KEYS.today

        ) || "[]"

    );

}

// =========================================
// Today Exists
// =========================================

function hasTodayWords(){

    return loadTodayWords().length > 0;

}

// =========================================
// Clear Today
// =========================================

function clearTodayWords(){

    localStorage.removeItem(

        STORAGE_KEYS.today

    );

}
// =========================================
// Backup Data
// =========================================

function exportStorage(){

    return {

        checked : checkedWords,

        favorite : favoriteWords,

        wrong : wrongWords,

        today : loadTodayWords(),

        dark : loadDarkMode(),

        voice : loadVoice(),

        speed : loadSpeechSpeed(),

        bestScore : getBestScore(),

        bestStreak : getBestStreak()

    };

}

// =========================================
// Import Data
// =========================================

function importStorage(data){

    checkedWords = data.checked || [];

    favoriteWords = data.favorite || [];

    wrongWords = data.wrong || [];

    saveTodayWords(

        data.today || []

    );

    saveDarkMode(

        data.dark || false

    );

    saveVoice(

        data.voice || "en-US"

    );

    saveSpeechSpeed(

        data.speed || 1

    );

    saveBestScore(

        data.bestScore || 0

    );

    saveBestStreak(

        data.bestStreak || 0

    );

    saveStorage();

}

// =========================================
// Reset Storage
// =========================================

function resetStorage(){

    if(

        !confirm(

            "모든 학습 데이터를 삭제할까요?"

        )

    ){

        return;

    }

    checkedWords = [];

    favoriteWords = [];

    wrongWords = [];

    localStorage.removeItem(

        STORAGE_KEYS.checked

    );

    localStorage.removeItem(

        STORAGE_KEYS.favorite

    );

    localStorage.removeItem(

        STORAGE_KEYS.wrong

    );

    localStorage.removeItem(

        STORAGE_KEYS.today

    );

    localStorage.removeItem(

        STORAGE_KEYS.quizBest

    );

    localStorage.removeItem(

        STORAGE_KEYS.streak

    );

    saveDarkMode(false);

    saveVoice("en-US");

    saveSpeechSpeed(1);

    saveStorage();

}

// =========================================
// First Run
// =========================================

function initializeStorage(){

    loadStorage();

    if(

        checkedWords.length===0

        &&

        favoriteWords.length===0

    ){

        console.log(

            "First Start"

        );

    }

}

// =========================================
// Start
// =========================================

initializeStorage();

// =========================================
// End
// =========================================
