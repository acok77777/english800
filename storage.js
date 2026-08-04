/* ==========================================
   storage.js

   초등 필수 영단어 800

   저장 관리

========================================== */



const COMPLETE_KEY = "completedWords";

const WRONG_KEY = "wrongWords";





// ==========================================
// 외운 단어 가져오기
// ==========================================


function getCompletedWords(){


    const data = localStorage.getItem(

        COMPLETE_KEY

    );



    if(!data){


        return [];


    }



    try{


        return JSON.parse(data);


    }

    catch(e){


        return [];


    }


}







// ==========================================
// 단어 체크 저장
// ==========================================


function completeWord(id){



    let words = getCompletedWords();



    if(!words.includes(id)){


        words.push(id);


    }




    localStorage.setItem(

        COMPLETE_KEY,

        JSON.stringify(words)

    );



}








// ==========================================
// 체크 해제
// ==========================================


function removeCompletedWord(id){



    let words = getCompletedWords();




    words = words.filter(wordId=>{


        return wordId !== id;


    });





    localStorage.setItem(

        COMPLETE_KEY,

        JSON.stringify(words)

    );


}







// ==========================================
// 체크 여부 확인
// ==========================================


function isCompleted(id){



    return getCompletedWords()

    .includes(id);



}







// ==========================================
// 오답 저장
// ==========================================


function addWrongWord(id){



    let wrong = getWrongWords();





    if(!wrong.includes(id)){



        wrong.push(id);



    }




    localStorage.setItem(

        WRONG_KEY,

        JSON.stringify(wrong)

    );



}








// ==========================================
// 오답 가져오기
// ==========================================


function getWrongWords(){



    const data = localStorage.getItem(

        WRONG_KEY

    );





    if(!data){


        return [];


    }




    try{


        return JSON.parse(data);


    }

    catch(e){


        return [];


    }



}









// ==========================================
// 오답 삭제
// ==========================================


function removeWrongWord(id){



    let wrong = getWrongWords();





    wrong = wrong.filter(wordId=>{


        return wordId !== id;


    });






    localStorage.setItem(

        WRONG_KEY,

        JSON.stringify(wrong)

    );


}








// ==========================================
// 전체 초기화
// ==========================================


function clearAllStorage(){



    localStorage.removeItem(

        COMPLETE_KEY

    );



    localStorage.removeItem(

        WRONG_KEY

    );



    localStorage.removeItem(

        "studyHistory"

    );



    alert(

    "학습 데이터가 초기화되었습니다."

    );



}








// ==========================================
// 저장 개수
// ==========================================


function getCompletedCount(){



    return getCompletedWords().length;



}









// ==========================================
// 백업용 데이터
// ==========================================


function getBackupData(){



    return {



        completedWords:

        getCompletedWords(),



        wrongWords:

        getWrongWords(),



        studyHistory:

        JSON.parse(

        localStorage.getItem(

        "studyHistory"

        )

        || "{}"

        )



    };


}








// ==========================================
// 복원
// ==========================================


function restoreBackupData(data){



    if(!data){


        return;


    }




    localStorage.setItem(

        COMPLETE_KEY,

        JSON.stringify(

        data.completedWords || []

        )

    );





    localStorage.setItem(

        WRONG_KEY,

        JSON.stringify(

        data.wrongWords || []

        )

    );






    localStorage.setItem(

        "studyHistory",

        JSON.stringify(

        data.studyHistory || {}

        )

    );




}
