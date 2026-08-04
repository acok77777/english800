/* ==========================================
   storage.js FINAL

   초등 필수 영단어 800

========================================== */


const COMPLETED_KEY = "completedWords";

const WRONG_KEY = "wrongWords";

const QUIZ_HISTORY_KEY = "quizHistory";




// ==========================================
// 체크 단어 가져오기
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
// 단어 체크
// ==========================================


function completeWord(id){


    let list = getCompletedWords();



    if(!list.includes(id)){


        list.push(id);


    }




    localStorage.setItem(

        COMPLETED_KEY,

        JSON.stringify(list)

    );


}






// ==========================================
// 체크 삭제
// ==========================================


function removeCompletedWord(id){


    let list = getCompletedWords();



    list = list.filter(

        item => item !== id

    );



    localStorage.setItem(

        COMPLETED_KEY,

        JSON.stringify(list)

    );


}






// ==========================================
// 체크 확인
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
// 퀴즈 점수 저장
// ==========================================


function saveQuizHistory(result){



    let history = JSON.parse(


        localStorage.getItem(

            QUIZ_HISTORY_KEY

        )

        ||

        "{}"

    );





    const date = result.date;





    if(!history[date]){


        history[date]={};


    }







    // 마지막 푼 점수로 저장


    history[date][result.type]={



        total: result.total,



        score: result.score,



        correct: result.correct,



        wrong: result.wrong



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
// 전체 삭제
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
