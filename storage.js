/* ==========================================
   storage.js FINAL

   초등 필수 영단어 800

   저장 관리

========================================== */



const COMPLETED_KEY = "completedWords";

const WRONG_KEY = "wrongWords";

const QUIZ_HISTORY_KEY = "quizHistory";







// ==========================================
// 외운 단어 가져오기
// ==========================================


function getCompletedWords(){



    return JSON.parse(


        localStorage.getItem(

            COMPLETED_KEY

        )

        ||

        "[]"


    );


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

        COMPLETED_KEY,

        JSON.stringify(words)

    );



}









// ==========================================
// 단어 체크 삭제
// ==========================================


function removeCompletedWord(id){



    let words = getCompletedWords();





    words = words.filter(

        wordId => wordId !== id

    );







    localStorage.setItem(

        COMPLETED_KEY,

        JSON.stringify(words)

    );



}








// ==========================================
// 체크 여부
// ==========================================


function isCompleted(id){



    return getCompletedWords()

    .includes(id);



}









// ==========================================
// 체크 개수
// ==========================================


function getCompletedCount(){



    return getCompletedWords()

    .length;



}









// ==========================================
// 오답 저장
// ==========================================


function getWrongWords(){



    return JSON.parse(


        localStorage.getItem(

            WRONG_KEY

        )

        ||

        "[]"


    );

}



function addWrongWord(id){



    let list = getWrongWords();





    if(!list.includes(id)){



        list.push(id);



    }






    localStorage.setItem(

        WRONG_KEY,

        JSON.stringify(list)

    );



}








// ==========================================
// 퀴즈 결과 저장
// ==========================================


function saveQuizHistory(result){



    let history = JSON.parse(


        localStorage.getItem(

            QUIZ_HISTORY_KEY

        )

        ||

        "{}"


    );







    let date = result.date;








    if(!history[date]){



        history[date]={};



    }









    // 같은 날짜 같은 퀴즈는 마지막 결과로 변경


    history[date][result.type]={


        total:result.total,


        correct:result.correct,


        wrong:result.wrong



    };








    localStorage.setItem(

        QUIZ_HISTORY_KEY,

        JSON.stringify(history)

    );



}









// ==========================================
// 퀴즈 기록 가져오기
// ==========================================


function getQuizHistory(){



    return JSON.parse(


        localStorage.getItem(

            QUIZ_HISTORY_KEY

        )

        ||

        "{}"


    );



}








// ==========================================
// 오늘 목표 저장
// ==========================================


function saveTodayGoal(value){



    localStorage.setItem(

        "todayGoal",

        value

    );



}




function getTodayGoal(){



    return localStorage.getItem(

        "todayGoal"

    )

    ||

    "";



}








// ==========================================
// 전체 초기화
// ==========================================


function clearAllStorage(){



    localStorage.removeItem(

        COMPLETED_KEY

    );



    localStorage.removeItem(

        WRONG_KEY

    );



    localStorage.removeItem(

        QUIZ_HISTORY_KEY

    );



}
