/* ==========================================
   progress.js

   초등 필수 영단어 800

   학습 진행률 관리

========================================== */


const HISTORY_KEY = "studyHistory";





// ==========================================
// 달성률 초기화
// ==========================================


function initProgress(){


    updateProgressDashboard();


}








// ==========================================
// 현재 달성 개수
// ==========================================


function getProgressCount(){


    if(typeof getCompletedWords === "function"){


        return getCompletedWords().length;


    }


    return 0;


}








// ==========================================
// 첫 화면 달성률 표시
// ==========================================


function updateProgressDashboard(){



    const count = getProgressCount();





    const achievement =

    document.getElementById(

        "achievement"

    );




    if(achievement){


        achievement.innerText =

        count + " / 800";


    }







    const quizAchievement =

    document.getElementById(

        "quizAchievement"

    );




    if(quizAchievement){


        quizAchievement.innerText =

        count + " / 800";


    }


}








// ==========================================
// 단어 학습 완료 기록
// ==========================================


function saveStudyHistory(word){



    if(!word){

        return;

    }





    let history =

    JSON.parse(

        localStorage.getItem(

            HISTORY_KEY

        )

        ||

        "{}"

    );





    const today =

    new Date();





    const date =

    today.getFullYear()

    +

    "년 "

    +

    (today.getMonth()+1)

    +

    "월 "

    +

    today.getDate()

    +

    "일";







    if(!history[date]){


        history[date]={

            count:0,

            words:[]

        };


    }








    if(!history[date].words.includes(word.word)){



        history[date].words.push(

            word.word

        );



        history[date].count++;


    }








    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(history)

    );





}









// ==========================================
// 체크할 때 호출
// ==========================================


function completeStudy(word){



    if(typeof completeWord==="function"){



        completeWord(

            word.id

        );



    }







    saveStudyHistory(

        word

    );






    updateProgressDashboard();



}








// ==========================================
// 학습 기록 가져오기
// ==========================================


function getStudyHistory(){



    return JSON.parse(

        localStorage.getItem(

            HISTORY_KEY

        )

        ||

        "{}"

    );


}








// ==========================================
// 기록 화면 표시
// ==========================================


function renderHistory(){



    const box =

    document.getElementById(

        "historyList"

    );





    if(!box){

        return;

    }






    const history =

    getStudyHistory();






    let html="";








    const dates =

    Object.keys(history)

    .reverse();







    if(dates.length===0){



        box.innerHTML=

        `

        <div class="history-card">

        아직 학습 기록이 없습니다.

        </div>

        `;



        return;


    }








    dates.forEach(date=>{



        html += `



        <div class="history-card">


        <h3>

        📅 ${date}

        </h3>



        <p>

        외운 단어 : ${history[date].count}개

        </p>



        <p>

        ${history[date].words.join(", ")}

        </p>



        </div>



        `;



    });








    box.innerHTML = html;



}









// ==========================================
// 오늘 목표 저장
// ==========================================


function loadTodayGoal(){



    const input =

    document.getElementById(

        "todayGoalInput"

    );





    const quizGoal =

    document.getElementById(

        "quizGoalText"

    );






    const goal =

    localStorage.getItem(

        "todayGoal"

    )

    ||

    "";







    if(input){



        input.value = goal;



    }






    if(quizGoal){



        quizGoal.innerText = goal;



    }



}









// ==========================================
// 시작
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){



    initProgress();


    loadTodayGoal();



});
