/* ==========================================
   progress.js

   초등 필수 영단어 800

   학습 진행률 관리

========================================== */





const TOTAL_WORDS = 800;







/* ==========================================
   현재 완료 단어 개수
========================================== */


function getCompletedCount(){



    if(typeof getCompletedWords !== "function"){


        return 0;


    }





    return getCompletedWords().length;



}









/* ==========================================
   달성률 계산
========================================== */


function getAchievementRate(){



    const count = getCompletedCount();





    return Math.floor(

        (count / TOTAL_WORDS) * 100

    );



}









/* ==========================================
   메인 화면 업데이트
========================================== */


function updateProgressDashboard(){



    const count = getCompletedCount();






    const achievement = document.getElementById(

        "achievement"

    );





    if(achievement){



        achievement.innerText =

        count +

        " / " +

        TOTAL_WORDS;



    }








    const quizAchievement = document.getElementById(

        "quizAchievement"

    );





    if(quizAchievement){



        quizAchievement.innerText =

        count +

        " / " +

        TOTAL_WORDS;



    }







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
   오늘 목표 불러오기
========================================== */


function loadTodayGoal(){



    const input = document.getElementById(

        "todayGoalInput"

    );



    const goalText = document.getElementById(

        "quizGoalText"

    );





    const goal =

    localStorage.getItem(

        "todayGoal"

    )

    || "";






    if(input){



        input.value = goal;


    }






    if(goalText){



        goalText.innerText = goal;


    }



}









/* ==========================================
   완료 단어 목록
========================================== */


function showCompletedWords(){



    const words = getCompletedWords();





    if(words.length===0){



        alert(

        "아직 외운 단어가 없습니다."

        );



        return;


    }






    let result = "";





    words.forEach(id=>{



        const word = WORDS.find(w=>{


            return w.id === id;


        });





        if(word){



            result +=

            word.word

            +

            "\n";



        }



    });







    alert(


    "외운 단어\n\n"

    +

    result


    );



}









/* ==========================================
   초기 실행
========================================== */


function initProgress(){



    updateProgressDashboard();



    loadTodayGoal();



}
