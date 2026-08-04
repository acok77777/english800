/* ==========================================
   history.js

   초등 필수 영단어 800

   학습 기록 화면

========================================== */



const HISTORY_STORAGE_KEY = "studyHistory";








// ==========================================
// 기록 가져오기
// ==========================================


function getHistoryData(){


    return JSON.parse(


        localStorage.getItem(

            HISTORY_STORAGE_KEY

        )

        ||

        "{}"


    );


}









// ==========================================
// 달성률 클릭
// ==========================================


function openHistory(){


    openTab(

        "historyPage"

    );


    renderHistory();


}









// ==========================================
// 기록 화면 출력
// ==========================================


function renderHistory(){



    const box = document.getElementById(

        "historyList"

    );




    if(!box){

        return;

    }






    const history = getHistoryData();





    const dates = Object.keys(history)

    .reverse();






    if(dates.length===0){



        box.innerHTML=`

        <div class="history-card">


        📚 아직 학습 기록이 없습니다.


        </div>

        `;


        return;


    }








    let html="";







    dates.forEach(date=>{



        const data = history[date];







        html += `


        <div class="history-card">



        <h3>

        📅 ${date}

        </h3>





        <p>

        ✏️ 외운 단어 :

        <strong>

        ${data.count}개

        </strong>

        </p>






        <p>

        ${data.words.join(", ")}

        </p>





        </div>


        `;



    });







    box.innerHTML = html;



}









// ==========================================
// 오늘 기록
// ==========================================


function getTodayHistory(){



    const now = new Date();





    const today =

    now.getFullYear()

    +

    "년 "

    +

    (now.getMonth()+1)

    +

    "월 "

    +

    now.getDate()

    +

    "일";





    const history = getHistoryData();





    return history[today] || {


        count:0,

        words:[]


    };


}








// ==========================================
// 기록 삭제
// ==========================================


function clearHistory(){



    localStorage.removeItem(

        HISTORY_STORAGE_KEY

    );




    renderHistory();



}







// ==========================================
// 시작
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){


    renderHistory();


});
