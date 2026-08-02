/* ==========================================
   progress.js

   초등 필수 영단어 800
   학습 진행 관리

========================================== */



const TOTAL_WORDS = 800;



/* ==========================================
   진행률 데이터
========================================== */


function getLearningProgress(){


    const completed = getCompletedWords();



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
   진행률 화면 표시
========================================== */


function renderProgress(){



    const data = getLearningProgress();



    const countBox = document.getElementById(

        "completedCount"

    );



    const percentBox = document.getElementById(

        "progressPercent"

    );



    const bar = document.getElementById(

        "progressBar"

    );



    if(countBox){


        countBox.innerText =

        `${data.completed} / ${data.total}`;


    }



    if(percentBox){


        percentBox.innerText =

        data.percent + "%";


    }



    if(bar){


        bar.style.width =

        data.percent + "%";


    }



}





/* ==========================================
   오늘 학습 단어
========================================== */


function getTodayStudyCount(){



    const history = getHistory();



    const today = new Date()

    .toISOString()

    .split("T")[0];



    const todayWords = history.filter(id=>{


        const key =

        "english800_word_" + id;



        return localStorage.getItem(key)

        === today;


    });



    return todayWords.length;


}





/* ==========================================
   단어 학습 날짜 저장
========================================== */


function saveWordStudyDate(id){



    const today = new Date()

    .toISOString()

    .split("T")[0];



    localStorage.setItem(

        "english800_word_" + id,

        today

    );


}





/* ==========================================
   연속 학습일 계산
========================================== */


function getStreakDays(){



    let streak = 0;



    let date = new Date();



    while(true){



        const key = date

        .toISOString()

        .split("T")[0];



        let found = false;



        for(let i=1;i<=800;i++){



            if(

            localStorage.getItem(

            "english800_word_"+i

            )

            === key

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
   전체 통계
========================================== */


function getStudyStatistics(){


    const progress =

    getLearningProgress();



    return {


        completed:

        progress.completed,


        percent:

        progress.percent,


        today:

        getTodayStudyCount(),


        streak:

        getStreakDays()


    };


}





/* ==========================================
   통계 화면 출력
========================================== */


function renderStatistics(){



    const data = getStudyStatistics();



    const todayBox = document.getElementById(

        "todayStudy"

    );



    const streakBox = document.getElementById(

        "streakDays"

    );



    if(todayBox){


        todayBox.innerText =

        data.today + "개";


    }



    if(streakBox){


        streakBox.innerText =

        data.streak + "일";


    }



    renderProgress();


}





/* ==========================================
   초기 실행
========================================== */


function initProgress(){


    renderStatistics();


}
