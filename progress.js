/* ==========================================
   progress.js

   초등 필수 영단어 800

   목표 / 달성률 관리

========================================== */


const TOTAL_WORDS = 800;





/* ==========================================
   완료 단어 개수 가져오기
========================================== */


function getCompletedCount(){


    let completed = [];



    if(typeof getCompletedWords === "function"){


        completed = getCompletedWords();


    }



    return completed.length;


}







/* ==========================================
   달성률 정보
========================================== */


function getLearningProgress(){



    const count = getCompletedCount();




    const percent = Math.floor(

        (count / TOTAL_WORDS) * 100

    );



    return {


        completed: count,


        total: TOTAL_WORDS,


        percent: percent


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


}








/* ==========================================
   오늘 목표 가져오기
========================================== */


function getTodayGoal(){



    return Number(

        localStorage.getItem(

            "todayGoal"

        )

    ) || 20;



}








/* ==========================================
   오늘 목표 표시
========================================== */


function loadTodayGoal(){



    const input = document.getElementById(

        "todayGoalInput"

    );



    if(input){


        input.value = getTodayGoal();


    }



}








/* ==========================================
   진행률 표시
========================================== */


function renderProgress(){



    const data = getLearningProgress();






    // 0 / 800 표시


    const achievement = document.getElementById(

        "achievement"

    );



    if(achievement){



        achievement.innerText =


        data.completed +

        " / " +

        TOTAL_WORDS;



    }






    // 기존 진행바도 지원


    const bar = document.getElementById(

        "progressBar"

    );



    if(bar){



        bar.style.width =


        data.percent + "%";



    }



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



        const date = localStorage.getItem(

            "study_word_" + i

        );



        if(date === today){


            count++;


        }



    }



    return count;


}









/* ==========================================
   체크 날짜 저장
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
   연속 학습일
========================================== */


function getStreakDays(){



    let streak = 0;



    let date = new Date();






    while(true){



        const check = date

        .toISOString()

        .split("T")[0];



        let found=false;




        for(let i=1;i<=TOTAL_WORDS;i++){



            if(

            localStorage.getItem(

            "study_word_"+i

            )

            ===check

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
   전체 대시보드 업데이트
========================================== */


function updateProgressDashboard(){



    renderProgress();



    loadTodayGoal();



}








/* ==========================================
   초기 실행
========================================== */


function initProgress(){



    loadTodayGoal();



    renderProgress();





    const goalInput = document.getElementById(

        "todayGoalInput"

    );



    if(goalInput){



        goalInput.addEventListener(

            "change",

            saveTodayGoal

        );



    }



}
