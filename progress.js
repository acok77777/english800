/* ==========================================
   progress.js

   초등 필수 영단어 800

   목표 / 달성률 관리

========================================== */


const TOTAL_WORDS = 800;







/* ==========================================
   완료 단어 가져오기
========================================== */


function getCompletedCount(){


    let words = [];



    if(typeof getCompletedWords === "function"){


        words = getCompletedWords();


    }



    return words.length;


}







/* ==========================================
   달성률 데이터
========================================== */


function getLearningProgress(){



    const completed =

    getCompletedCount();




    return {



        completed: completed,



        total: TOTAL_WORDS,



        percent:

        Math.floor(

            (completed / TOTAL_WORDS)

            *

            100

        )



    };


}







/* ==========================================
   오늘 목표 저장
========================================== */


function saveTodayGoal(){



    const input = document.getElementById(

        "todayGoalInput"

    );



    if(!input){

        return;

    }





    localStorage.setItem(

        "todayGoal",

        input.value

    );





    updateTodayGoalText();



}








/* ==========================================
   오늘 목표 불러오기
========================================== */


function loadTodayGoal(){



    const input = document.getElementById(

        "todayGoalInput"

    );



    if(!input){

        return;

    }





    const saved =

    localStorage.getItem(

        "todayGoal"

    );





    if(saved){


        input.value = saved;


    }





    updateTodayGoalText();


}








/* ==========================================
   오늘 목표 숫자 표시
========================================== */


function updateTodayGoalText(){



    const input = document.getElementById(

        "todayGoalInput"

    );



    const text = document.getElementById(

        "todayGoalText"

    );





    if(input && text){



        text.innerText =

        input.value || "";



    }



}









/* ==========================================
   달성률 표시
========================================== */


function renderProgress(){



    const data =

    getLearningProgress();





    const box = document.getElementById(

        "achievement"

    );



    if(box){



        box.innerText =



        data.completed

        +

        " / "

        +

        TOTAL_WORDS;



    }







    const bar = document.getElementById(

        "progressBar"

    );



    if(bar){



        bar.style.width =

        data.percent

        +

        "%";



    }



}









/* ==========================================
   단어 학습 날짜 저장
========================================== */


function saveWordStudyDate(id){



    const today = new Date()

    .toISOString()

    .split("T")[0];





    localStorage.setItem(


        "study_word_" + id,


        today


    );



}









/* ==========================================
   오늘 학습 단어 수
========================================== */


function getTodayStudyCount(){



    const today = new Date()

    .toISOString()

    .split("T")[0];



    let count = 0;





    for(let i=1;i<=TOTAL_WORDS;i++){



        const date =

        localStorage.getItem(

            "study_word_" + i

        );



        if(date === today){



            count++;



        }


    }





    return count;


}









/* ==========================================
   연속 학습일
========================================== */


function getStreakDays(){



    let streak = 0;



    let date = new Date();






    while(true){



        const check = date

        .toISOString()

        .split("T")[0];



        let found = false;





        for(let i=1;i<=TOTAL_WORDS;i++){



            if(

            localStorage.getItem(

            "study_word_"+i

            )

            === check

            ){



                found=true;


                break;


            }


        }






        if(found){



            streak++;



            date.setDate(

                date.getDate()-1

            );



        }

        else{


            break;


        }



    }





    return streak;



}









/* ==========================================
   전체 업데이트
========================================== */


function updateProgressDashboard(){



    renderProgress();



    updateTodayGoalText();



}








/* ==========================================
   초기 실행
========================================== */


function initProgress(){



    loadTodayGoal();



    renderProgress();





    const input = document.getElementById(

        "todayGoalInput"

    );



    if(input){



        input.addEventListener(

            "input",

            saveTodayGoal

        );


    }



}
