/* ==========================================
   history.js

   초등 필수 영단어 800

   학습 기록 관리

========================================== */





/* ==========================================
   달성률 클릭
========================================== */


function openHistory(){



    openTab("historyPage");



    renderHistory();



}









/* ==========================================
   학습 기록 출력
========================================== */


function renderHistory(){



    const box = document.getElementById(

        "historyList"

    );





    if(!box){

        return;

    }





    box.innerHTML = "";





    const history = getStudyHistory();





    const dates = Object.keys(history)

    .sort()

    .reverse();









    if(dates.length===0){



        box.innerHTML = `


        <div class="history-card">


        아직 학습 기록이 없습니다 😊


        <br><br>


        단어를 체크하면 기록됩니다.


        </div>


        `;



        return;


    }









    dates.forEach(date=>{



        const words = history[date];





        const card = document.createElement(

            "div"

        );





        card.className="history-card";






        card.innerHTML = `



<h3>

📅 ${formatDate(date)}

</h3>



<p>

외운 단어 ${words.length}개

</p>



<div>


${words.map(word=>`


<span>

${word}

</span>


<br>


`).join("")}


</div>


`;







        box.appendChild(card);



    });




}









/* ==========================================
   기록 가져오기
========================================== */


function getStudyHistory(){



    const data = localStorage.getItem(

        "studyHistory"

    );





    if(!data){



        return {};



    }





    try{


        return JSON.parse(data);


    }


    catch(e){



        return {};



    }



}









/* ==========================================
   날짜 저장

   단어 체크할 때 호출

========================================== */


function saveStudyHistory(word){



    const today = new Date();





    const date =



    today.getFullYear()

    +

    "-"

    +

    String(

    today.getMonth()+1

    )

    .padStart(2,"0")

    +

    "-"

    +

    String(

    today.getDate()

    )

    .padStart(2,"0");








    let history = getStudyHistory();






    if(!history[date]){


        history[date]=[];

    }








    if(!history[date].includes(word)){



        history[date].push(word);



    }








    localStorage.setItem(

        "studyHistory",

        JSON.stringify(history)

    );



}









/* ==========================================
   날짜 표시
========================================== */


function formatDate(date){



    const arr = date.split("-");



    return (

        arr[0]

        +

        "년 "

        +

        Number(arr[1])

        +

        "월 "

        +

        Number(arr[2])

        +

        "일"

    );


}
