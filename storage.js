/* ==========================================
   storage.js

   초등 필수 영단어 800

   저장 관리 시스템

========================================== */





const STORAGE_KEYS = {



    COMPLETED_WORDS:

    "completedWords",



    WRONG_WORDS:

    "wrongWords"



};









/* ==========================================
   체크 완료 단어 가져오기
========================================== */


function getCompletedWords(){



    const data = localStorage.getItem(

        STORAGE_KEYS.COMPLETED_WORDS

    );



    if(!data){


        return [];


    }




    return JSON.parse(data);



}








/* ==========================================
   단어 체크 저장
========================================== */


function completeWord(id){



    let words = getCompletedWords();





    if(!words.includes(id)){



        words.push(id);



    }





    localStorage.setItem(

        STORAGE_KEYS.COMPLETED_WORDS,


        JSON.stringify(words)


    );



}








/* ==========================================
   체크 해제
========================================== */


function removeCompletedWord(id){



    let words = getCompletedWords();





    words = words.filter(wordId=>{


        return wordId !== id;


    });





    localStorage.setItem(

        STORAGE_KEYS.COMPLETED_WORDS,


        JSON.stringify(words)


    );



}








/* ==========================================
   체크 여부 확인
========================================== */


function isCompleted(id){



    const words = getCompletedWords();



    return words.includes(id);



}








/* ==========================================
   체크 초기화
========================================== */


function clearCompletedWords(){



    localStorage.removeItem(

        STORAGE_KEYS.COMPLETED_WORDS

    );


}









/* ==========================================
   오답 단어 가져오기
========================================== */


function getWrongWords(){



    const data = localStorage.getItem(

        STORAGE_KEYS.WRONG_WORDS

    );



    if(!data){


        return [];


    }




    return JSON.parse(data);



}









/* ==========================================
   오답 저장
========================================== */


function addWrongWord(id){



    let wrong = getWrongWords();





    if(!wrong.includes(id)){



        wrong.push(id);



    }





    localStorage.setItem(

        STORAGE_KEYS.WRONG_WORDS,


        JSON.stringify(wrong)


    );



}









/* ==========================================
   오답 삭제
========================================== */


function removeWrongWord(id){



    let wrong = getWrongWords();





    wrong = wrong.filter(wordId=>{


        return wordId !== id;


    });





    localStorage.setItem(

        STORAGE_KEYS.WRONG_WORDS,


        JSON.stringify(wrong)


    );



}









/* ==========================================
   오답 초기화
========================================== */


function clearWrongWords(){



    localStorage.removeItem(

        STORAGE_KEYS.WRONG_WORDS

    );


}









/* ==========================================
   전체 데이터 삭제
========================================== */


function clearAllData(){



    localStorage.clear();



}









/* ==========================================
   저장 개수 확인
========================================== */


function getStorageInfo(){



    return {



        completed:

        getCompletedWords().length,



        wrong:

        getWrongWords().length



    };


}
