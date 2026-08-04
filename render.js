/* ==========================================
   render.js

   초등 필수 영단어 800

   단어 표시 / 체크 관리

========================================== */



let currentWords = [];

let currentPage = 1;

const WORDS_PER_PAGE = 10;









// ==========================================
// 초기 실행
// ==========================================


function initRender(){


    if(typeof WORDS !== "undefined"){


        currentWords = WORDS;


    }


}









// ==========================================
// 전체 단어 표시
// ==========================================


function renderAllWords(){



    currentWords = WORDS;


    currentPage = 1;


    renderWords();



}









// ==========================================
// 단어 출력
// ==========================================


function renderWords(){



    const box = document.getElementById(

        "wordList"

    );



    if(!box){

        return;

    }







    const start =

    (currentPage - 1)

    *

    WORDS_PER_PAGE;





    const end =

    start + WORDS_PER_PAGE;






    const list =

    currentWords.slice(

        start,

        end

    );







    let html="";








    list.forEach(word=>{



        const checked =

        isCompleted(word.id)

        ?

        "checked"

        :

        "";





        html += `


<div class="word-row">



<div>

<input

type="checkbox"

${checked}

onchange="toggleWord(${word.id})">

</div>





<div>

${word.id}

</div>






<div>

<strong>

${word.word}

</strong>

</div>







<div>

${word.pronunciation}

</div>







<div>


<button

class="sound-btn"

onclick="speakWord('${word.word}')">

🔊

</button>


</div>







<div>

${word.meaning}

</div>



</div>



`;



    });







    box.innerHTML = html;





    renderPagination();



}









// ==========================================
// 체크 처리
// ==========================================


function toggleWord(id){



    const word =

    WORDS.find(

        item=>item.id===id

    );






    if(isCompleted(id)){



        removeCompletedWord(id);



    }

    else{



        completeStudy(word);



    }






    updateProgressDashboard();



}









// ==========================================
// 페이지 버튼
// ==========================================


function renderPagination(){



    const box =

    document.getElementById(

        "pagination"

    );





    if(!box){

        return;

    }






    const total =

    Math.ceil(

        currentWords.length

        /

        WORDS_PER_PAGE

    );





    let html="";








    if(currentPage > 1){


        html += `

<button onclick="changePage(${currentPage-1})">

◀

</button>

`;

    }









    for(let i=1;i<=total;i++){



        html += `



<button

class="${

i===currentPage

?

'active-page'

:

''

}"


onclick="changePage(${i})">


${i}


</button>


`;



    }








    if(currentPage < total){


        html += `


<button onclick="changePage(${currentPage+1})">


▶


</button>


`;



    }






    box.innerHTML = html;



}









// ==========================================
// 페이지 이동
// ==========================================


function changePage(page){



    currentPage = page;


    renderWords();



}









// ==========================================
// 체크 유지 새로고침
// ==========================================


function refreshWords(){



    renderWords();



}









// ==========================================
// 시작
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){


    initRender();


});
