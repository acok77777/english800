/* ==========================================
   storage.js (1/3)

   초등 필수 영단어 800
   LocalStorage 관리
========================================== */


// 저장 키 이름
const STORAGE_KEYS = {

    FAVORITES: "english800_favorites",

    COMPLETED: "english800_completed",

    WRONG_WORDS: "english800_wrong_words",

    SETTINGS: "english800_settings",

    HISTORY: "english800_history"

};


/* ==========================================
   기본 데이터 가져오기
========================================== */


function getStorageData(key){

    const data = localStorage.getItem(key);

    if(!data){

        return [];

    }

    try{

        return JSON.parse(data);

    }catch(error){

        console.error("Storage Error:", error);

        return [];

    }

}



/* ==========================================
   데이터 저장
========================================== */


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

    let favorites = getFavorites();


    if(!favorites.includes(id)){

        favorites.push(id);

    }


    setStorageData(

        STORAGE_KEYS.FAVORITES,

        favorites

    );

}



function removeFavorite(id){

    let favorites = getFavorites();


    favorites = favorites.filter(

        item => item !== id

    );


    setStorageData(

        STORAGE_KEYS.FAVORITES,

        favorites

    );

}



function isFavorite(id){

    return getFavorites().includes(id);

}



/* ==========================================
   학습 완료 단어
========================================== */


function getCompletedWords(){

    return getStorageData(

        STORAGE_KEYS.COMPLETED

    );

}



function completeWord(id){

    let completed = getCompletedWords();


    if(!completed.includes(id)){

        completed.push(id);

    }


    setStorageData(

        STORAGE_KEYS.COMPLETED,

        completed

    );

}



function removeCompletedWord(id){

    let completed = getCompletedWords();


    completed = completed.filter(

        item => item !== id

    );


    setStorageData(

        STORAGE_KEYS.COMPLETED,

        completed

    );

}



function isCompleted(id){

    return getCompletedWords().includes(id);

}



/* ==========================================
   오답노트 저장
========================================== */


function getWrongWords(){

    return getStorageData(

        STORAGE_KEYS.WRONG_WORDS

    );

}



function addWrongWord(id){

    let wrong = getWrongWords();


    if(!wrong.includes(id)){

        wrong.push(id);

    }


    setStorageData(

        STORAGE_KEYS.WRONG_WORDS,

        wrong

    );

}



function removeWrongWord(id){

    let wrong = getWrongWords();


    wrong = wrong.filter(

        item => item !== id

    );


    setStorageData(

        STORAGE_KEYS.WRONG_WORDS,

        wrong

    );

}



function clearWrongWords(){

    localStorage.removeItem(

        STORAGE_KEYS.WRONG_WORDS

    );

}
/* ==========================================
   storage.js (2/3)

   최근기록 / 설정 / 검색기록
========================================== */


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


    // 중복 제거
    history = history.filter(

        item => item !== id

    );


    // 최신 학습을 앞에 추가
    history.unshift(id);


    // 최대 50개 저장
    if(history.length > 50){

        history = history.slice(0,50);

    }


    setStorageData(

        STORAGE_KEYS.HISTORY,

        history

    );

}



/* ==========================================
   앱 설정
========================================== */


function getSettings(){

    const settings = localStorage.getItem(

        STORAGE_KEYS.SETTINGS

    );


    if(!settings){

        return {

            sound:true,

            darkMode:false,

            autoSpeak:false

        };

    }


    try{

        return JSON.parse(settings);

    }catch(error){

        return {

            sound:true,

            darkMode:false,

            autoSpeak:false

        };

    }

}



function saveSettings(settings){

    setStorageData(

        STORAGE_KEYS.SETTINGS,

        settings

    );

}



function updateSetting(key,value){

    let settings = getSettings();


    settings[key] = value;


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



function addSearchHistory(keyword){

    if(!keyword){

        return;

    }


    let history = getSearchHistory();


    history = history.filter(

        item => item !== keyword

    );


    history.unshift(keyword);


    if(history.length > 20){

        history = history.slice(0,20);

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
   오늘 학습 날짜 저장
========================================== */


function saveStudyDate(){

    const today = new Date()

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
   storage.js (3/3)

   백업 / 복원 / 진행률 관리
========================================== */


/* ==========================================
   전체 저장 데이터 가져오기
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
   데이터 복원
========================================== */


function restoreStorageData(data){


    if(!data){

        return false;

    }


    try{


        if(data.favorites){

            setStorageData(

                STORAGE_KEYS.FAVORITES,

                data.favorites

            );

        }


        if(data.completed){

            setStorageData(

                STORAGE_KEYS.COMPLETED,

                data.completed

            );

        }


        if(data.wrongWords){

            setStorageData(

                STORAGE_KEYS.WRONG_WORDS,

                data.wrongWords

            );

        }


        if(data.history){

            setStorageData(

                STORAGE_KEYS.HISTORY,

                data.history

            );

        }


        if(data.settings){

            setStorageData(

                STORAGE_KEYS.SETTINGS,

                data.settings

            );

        }


        if(data.searchHistory){

            setStorageData(

                "english800_search_history",

                data.searchHistory

            );

        }


        if(data.studyDate){

            localStorage.setItem(

                "english800_last_study",

                data.studyDate

            );

        }


        return true;


    }catch(error){


        console.error(

            "복원 오류",

            error

        );


        return false;

    }

}



/* ==========================================
   모든 학습 데이터 삭제
========================================== */


function clearAllData(){


    const keys = [

        STORAGE_KEYS.FAVORITES,

        STORAGE_KEYS.COMPLETED,

        STORAGE_KEYS.WRONG_WORDS,

        STORAGE_KEYS.HISTORY,

        STORAGE_KEYS.SETTINGS,

        STORAGE_KEYS.SEARCH_HISTORY,

        "english800_search_history",

        "english800_last_study"

    ];


    keys.forEach(key=>{


        localStorage.removeItem(key);


    });


}



/* ==========================================
   학습 진행률 계산
========================================== */


function getProgress(total=800){


    const completed = getCompletedWords();


    const count = completed.length;


    const percent = Math.floor(

        (count / total) * 100

    );


    return {


        count:count,

        total:total,

        percent:percent


    };


}



/* ==========================================
   저장 용량 확인
========================================== */


function getStorageInfo(){


    let size = 0;


    for(let key in localStorage){


        if(localStorage.hasOwnProperty(key)){


            size += localStorage[key].length;


        }

    }


    return {


        bytes:size,

        kb:(size/1024).toFixed(2)


    };


}



/* ==========================================
   초기 데이터 생성
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
