/* ==========================================
   storage.js

   초등 필수 영단어 800
   저장 관리 시스템

   기능:
   - 즐겨찾기
   - 학습완료
   - 오답노트
   - 최근학습
   - 설정 저장
   - 검색 기록
   - 백업/복원 지원
========================================== */


/* 저장 키 */

const STORAGE_KEYS = {

    FAVORITES: "english800_favorites",

    COMPLETED: "english800_completed",

    WRONG_WORDS: "english800_wrong_words",

    SETTINGS: "english800_settings",

    HISTORY: "english800_history"

};



/* ==========================================
   기본 저장 함수
========================================== */


function getStorageData(key){

    const data = localStorage.getItem(key);


    if(!data){

        return [];

    }


    try{

        return JSON.parse(data);

    }

    catch(error){

        console.error(error);

        return [];

    }

}



function setStorageData(key,data){

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}



/* ==========================================
   즐겨찾기
========================================== */


function getFavorites(){

    return getStorageData(

        STORAGE_KEYS.FAVORITES

    );

}



function addFavorite(id){

    let list = getFavorites();


    if(!list.includes(id)){

        list.push(id);

    }


    setStorageData(

        STORAGE_KEYS.FAVORITES,

        list

    );

}



function removeFavorite(id){

    let list = getFavorites();


    list = list.filter(

        item => item !== id

    );


    setStorageData(

        STORAGE_KEYS.FAVORITES,

        list

    );

}



function isFavorite(id){

    return getFavorites().includes(id);

}



/* ==========================================
   학습 완료
========================================== */


function getCompletedWords(){

    return getStorageData(

        STORAGE_KEYS.COMPLETED

    );

}



function completeWord(id){

    let list = getCompletedWords();


    if(!list.includes(id)){

        list.push(id);

    }


    setStorageData(

        STORAGE_KEYS.COMPLETED,

        list

    );

}



function removeCompletedWord(id){

    let list = getCompletedWords();


    list = list.filter(

        item => item !== id

    );


    setStorageData(

        STORAGE_KEYS.COMPLETED,

        list

    );

}



function isCompleted(id){

    return getCompletedWords().includes(id);

}



/* ==========================================
   오답노트
========================================== */


function getWrongWords(){

    return getStorageData(

        STORAGE_KEYS.WRONG_WORDS

    );

}



function addWrongWord(id){

    let list = getWrongWords();


    if(!list.includes(id)){

        list.push(id);

    }


    setStorageData(

        STORAGE_KEYS.WRONG_WORDS,

        list

    );

}



function removeWrongWord(id){

    let list = getWrongWords();


    list = list.filter(

        item => item !== id

    );


    setStorageData(

        STORAGE_KEYS.WRONG_WORDS,

        list

    );

}



function clearWrongWords(){

    localStorage.removeItem(

        STORAGE_KEYS.WRONG_WORDS

    );

}



/* ==========================================
   최근 학습 기록
========================================== */


function getHistory(){

    return getStorageData(

        STORAGE_KEYS.HISTORY

    );

}



function addHistory(id){

    let history = getHistory();


    history = history.filter(

        item => item !== id

    );


    history.unshift(id);


    if(history.length > 50){

        history = history.slice(0,50);

    }


    setStorageData(

        STORAGE_KEYS.HISTORY,

        history

    );

}



/* ==========================================
   설정
========================================== */


function getSettings(){

    const data = localStorage.getItem(

        STORAGE_KEYS.SETTINGS

    );


    if(!data){

        return {

            sound:true,

            autoSpeak:false,

            darkMode:false

        };

    }


    return JSON.parse(data);

}



function saveSettings(settings){

    setStorageData(

        STORAGE_KEYS.SETTINGS,

        settings

    );

}



function updateSetting(key,value){

    let settings = getSettings();


    settings[key]=value;


    saveSettings(settings);

}



/* ==========================================
   검색 기록
========================================== */


function getSearchHistory(){

    return getStorageData(

        "english800_search_history"

    );

}



function addSearchHistory(word){

    if(!word){

        return;

    }


    let history=getSearchHistory();


    history=history.filter(

        item=>item!==word

    );


    history.unshift(word);


    if(history.length>20){

        history=history.slice(0,20);

    }


    setStorageData(

        "english800_search_history",

        history

    );

}



function clearSearchHistory(){

    localStorage.removeItem(

        "english800_search_history"

    );

}



/* ==========================================
   공부 날짜
========================================== */


function saveStudyDate(){

    const today=new Date()

    .toISOString()

    .split("T")[0];


    localStorage.setItem(

        "english800_last_study",

        today

    );

}



function getStudyDate(){

    return localStorage.getItem(

        "english800_last_study"

    );

}



/* ==========================================
   전체 데이터
========================================== */


function getAllStorageData(){

    return {

        favorites:getFavorites(),

        completed:getCompletedWords(),

        wrongWords:getWrongWords(),

        history:getHistory(),

        settings:getSettings(),

        searchHistory:getSearchHistory(),

        studyDate:getStudyDate()

    };

}



/* ==========================================
   복원
========================================== */


function restoreStorageData(data){


    if(!data){

        return false;

    }


    if(data.favorites)

        setStorageData(

            STORAGE_KEYS.FAVORITES,

            data.favorites

        );


    if(data.completed)

        setStorageData(

            STORAGE_KEYS.COMPLETED,

            data.completed

        );


    if(data.wrongWords)

        setStorageData(

            STORAGE_KEYS.WRONG_WORDS,

            data.wrongWords

        );


    if(data.history)

        setStorageData(

            STORAGE_KEYS.HISTORY,

            data.history

        );


    if(data.settings)

        setStorageData(

            STORAGE_KEYS.SETTINGS,

            data.settings

        );


    if(data.searchHistory)

        setStorageData(

            "english800_search_history",

            data.searchHistory

        );


    return true;

}



/* ==========================================
   진행률
========================================== */


function getProgress(total=800){


    const count=getCompletedWords().length;


    return {

        count:count,

        total:total,

        percent:Math.floor(

            count/total*100

        )

    };

}



/* ==========================================
   초기화
========================================== */


function initStorage(){


    if(!localStorage.getItem(

        STORAGE_KEYS.FAVORITES

    )){


        setStorageData(

            STORAGE_KEYS.FAVORITES,

            []

        );

    }


    if(!localStorage.getItem(

        STORAGE_KEYS.COMPLETED

    )){


        setStorageData(

            STORAGE_KEYS.COMPLETED,

            []

        );

    }


    if(!localStorage.getItem(

        STORAGE_KEYS.WRONG_WORDS

    )){


        setStorageData(

            STORAGE_KEYS.WRONG_WORDS,

            []

        );

    }

}
