/* ==========================================
   progress.js

   초등 필수 영단어 800
   학습 진행 관리

========================================== */


const TOTAL_WORDS = 800;




/* ==========================================
   완료 단어 가져오기
========================================== */


function getLearningProgress(){


    let completed = [];


    if(typeof getCompletedWords==="function"){


        completed = getCompletedWords();


    }



    const count = completed.length;



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
   오늘 학습 개수
========================================== */


function getTodayStudyCount(){


    const today = new Date()

    .toISOString()

    .split("T")[0];



    let count = 0;



    for(let i=1;i<=TOTAL_WORDS;i++){



        const date = localStorage.getItem(

            "english800_word_"+i

        );



        if(date===today){


            count++;


        }


    }



    return count;


}







/* ==========================================
   학습 날짜 저장
========================================== */


function saveWordStudyDate(id){



    const today = new Date()

    .toISOString()

    .split("T")[0];



    localStorage.setItem(

        "english800_word_"+id,

        today

    );


}







/* ==========================================
   연속 학습일
========================================== */


function getStreakDays(){



    let streak = 0;



    let checkDate = new Date();





    while(true){



        const date = checkDate

        .toISOString()

        .split("T")[0];



        let studied = false;



        for(let i=1;i<=TOTAL_WORDS;i++){



            if(

            localStorage.getItem(

            "english800_word_"+i

            )

            === date

            ){


                studied=true;

                break;


            }


        }




        if(studied){


            streak++;


            checkDate.setDate(

                checkDate.getDate()-1

            );


        }

        else{


            break;


        }



    }




    return streak;



}







/* ==========================================
   진행률 표시
========================================== */


function renderProgress(){



    const data = getLearningProgress();





    const countBox = document.getElementById(

        "completedCount"

    );



    if(countBox){


        countBox.innerText =

        data.completed +

        " / " +

        TOTAL_WORDS;


    }







    const bar=document.getElementById(

        "progressBar"

    );



    if(bar){


        bar.style.width =

        data.percent+"%";


    }





}







/* ==========================================
   대시보드 표시
========================================== */


function updateProgressDashboard(){



    renderProgress();





    const today=document.getElementById(

        "todayGoal"

    );



    if(today){


        today.innerText =

        getTodayStudyCount()+"개";


    }







    const streak=document.getElementById(

        "streakDays"

    );



    if(streak){


        streak.innerText =

        getStreakDays()+"일";


    }




}







/* ==========================================
   초기 실행
========================================== */


function initProgress(){



    updateProgressDashboard();


}
