/* ==========================================
   render.js

   초등 필수 영단어 800

   단어 외우기 화면 출력

========================================== */


let currentWords = [];

let currentPage = 1;

const WORDS_PER_PAGE = 10;

const PAGE_GROUP = 7;






/* ==========================================
   전체 단어
========================================== */


function renderAllWords(){


    currentWords = WORDS;


    currentPage = 1;


    renderWords();


}








/* ==========================================
   단어 목록 출력
========================================== */


function renderWords(){



    const list = document.getElementById(

        "wordList"

    );



    if(!list){

        return;

    }




    list.innerHTML="";





    const start =

    (currentPage-1)

    *

    WORDS_PER_PAGE;





    const words =

    currentWords.slice(

        start,

        start + WORDS_PER_PAGE

    );






    words.forEach(word=>{


        list.appendChild(

            createWordRow(word)

        );


    });






    renderPagination();


}








/* ==========================================
   단어 한 줄 생성
========================================== */


function createWordRow(word){



    const div=document.createElement(

        "div"

    );



    div.className="word-row";





    const checked =

    isCompleted(word.id)

    ?

    "checked"

    :

    "";






    div.innerHTML=`



<div class="check-box">

<input

type="checkbox"

${checked}

onchange="toggleWord(${word.id})">


</div>





<div class="word-number">

${word.id}

</div>





<div class="english-word">

${word.word}

</div>





<div class="pronunciation">

${word.pronunciation}

</div>






<button

class="sound-btn"

onclick="speakWord('${word.word}')">

🔊

</button>





<div class="meaning">

${word.meaning}

</div>



`;





    return div;


}









/* ==========================================
   체크 처리
========================================== */


function toggleWord(id){



    if(isCompleted(id)){



        removeCompletedWord(id);



    }

    else{


        completeWord(id);



        if(typeof saveWordStudyDate==="function"){


            saveWordStudyDate(id);


        }



    }






    renderWords();





    if(typeof updateProgressDashboard==="function"){


        updateProgressDashboard();


    }



}









/* ==========================================
   페이지 번호

   7개씩 표시

========================================== */


function renderPagination(){



    const box=document.getElementById(

        "pagination"

    );



    if(!box){

        return;

    }





    box.innerHTML="";






    const totalPage=Math.ceil(

        currentWords.length /

        WORDS_PER_PAGE

    );





    const groupStart =

    Math.floor(

        (currentPage-1)

        /

        PAGE_GROUP

    )

    *

    PAGE_GROUP

    +1;





    const groupEnd = Math.min(

        groupStart + PAGE_GROUP -1,

        totalPage

    );








    // 이전


    if(groupStart>1){



        const prev=document.createElement(

            "button"

        );



        prev.innerText="〈";



        prev.onclick=()=>{


            currentPage=

            groupStart-1;


            renderWords();


        };



        box.appendChild(prev);



    }









    // 숫자


    for(

    let i=groupStart;

    i<=groupEnd;

    i++

    ){



        const btn=document.createElement(

            "button"

        );



        btn.innerText=i;





        if(i===currentPage){


            btn.classList.add(

                "active-page"

            );


        }





        btn.onclick=()=>{


            currentPage=i;


            renderWords();



        };





        box.appendChild(btn);


    }









    // 다음


    if(groupEnd < totalPage){



        const next=document.createElement(

            "button"

        );



        next.innerText="〉";



        next.onclick=()=>{


            currentPage=

            groupEnd+1;


            renderWords();



        };



        box.appendChild(next);



    }




}









/* ==========================================
   퀴즈용 체크 단어
========================================== */


function getQuizWords(){



    let checked=[];




    if(typeof getCompletedWords==="function"){


        checked=getCompletedWords();


    }





    return WORDS.filter(word=>{


        return checked.includes(

            word.id

        );


    });



}









/* ==========================================
   오답노트 출력
========================================== */


function renderWrongWords(){



    const box=document.getElementById(

        "wrongList"

    );



    if(!box){

        return;

    }





    box.innerHTML="";





    let wrong=[];




    if(typeof getWrongWords==="function"){


        wrong=getWrongWords();


    }





    const list=WORDS.filter(word=>{


        return wrong.includes(

            word.id

        );


    });






    if(list.length===0){



        box.innerHTML=`

<div class="wrong-card">

아직 틀린 단어가 없습니다 😊

</div>

`;



        return;


    }






    list.forEach(word=>{



        const card=document.createElement(

            "div"

        );



        card.className="wrong-card";





        card.innerHTML=`


<div class="wrong-word">

${word.word}

</div>


<div>

[${word.pronunciation}]

<button

class="sound-btn"

onclick="speakWord('${word.word}')">

🔊

</button>

</div>



<div class="wrong-meaning">

${word.meaning}

</div>



`;





        box.appendChild(card);



    });



}








/* ==========================================
   초기 실행
========================================== */


function initRender(){



    if(typeof WORDS==="undefined"){


        console.error(

        "data.js 없음"

        );


        return;


    }





    renderAllWords();



}
