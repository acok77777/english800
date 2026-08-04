/* ==========================================
   render.js FINAL

   초등 필수 영단어 800

========================================== */


let currentWords = [];

let currentPage = 1;

const WORDS_PER_PAGE = 10;






// ==========================================
// 초기화
// ==========================================


function initRender(){


    if(typeof WORDS !== "undefined"){


        currentWords = WORDS;


    }


}







// ==========================================
// 단어 화면 열기
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



    const list = document.getElementById(

        "wordList"

    );



    if(!list){

        return;

    }







    const start =

    (currentPage - 1)

    *

    WORDS_PER_PAGE;






    const words =

    currentWords.slice(

        start,

        start + WORDS_PER_PAGE

    );







    let html = "";







    words.forEach(word=>{



        let checked = "";





        if(

        typeof isCompleted === "function"

        &&

        isCompleted(word.id)

        ){


            checked="checked";


        }






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

<b>

${word.word}

</b>

</div>





<div>

${word.pronunciation || ""}

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







    list.innerHTML = html;





    renderPagination();



}








// ==========================================
// 체크 처리
// ==========================================


function toggleWord(id){



    const word = WORDS.find(

        w=>w.id===id

    );






    if(!word){

        return;

    }







    if(

    typeof isCompleted==="function"

    &&

    isCompleted(id)

    ){



        removeCompletedWord(id);



    }

    else{



        if(typeof completeStudy==="function"){


            completeStudy(word);


        }

        else if(typeof completeWord==="function"){


            completeWord(id);


        }



    }







    if(typeof updateProgressDashboard==="function"){


        updateProgressDashboard();


    }







    renderWords();



}








// ==========================================
// 페이지 버튼
// ==========================================


function renderPagination(){



    const box = document.getElementById(

        "pagination"

    );



    if(!box){

        return;

    }






    const totalPage = Math.ceil(

        currentWords.length /

        WORDS_PER_PAGE

    );






    let html="";







    // 이전 버튼


    if(currentPage > 1){


        html += `

<button onclick="changePage(${currentPage-1})">

◀

</button>

`;

    }







    // 페이지 번호

    for(

    let i=1;

    i<=totalPage;

    i++

    ){





        html += `


<button

class="${

i===currentPage

?

"active-page"

:

""

}"


onclick="changePage(${i})">


${i}


</button>



`;



    }







    // 다음 버튼


    if(currentPage < totalPage){



        html += `


<button onclick="changePage(${currentPage+1})">


▶


</button>


`;

    }






    box.innerHTML = html;



}









// ==========================================
// 페이지 변경
// ==========================================


function changePage(page){



    currentPage = page;


    renderWords();



}









// ==========================================
// 검색 결과 표시용
// ==========================================


function renderSearchResult(result){



    currentWords = result;


    currentPage = 1;


    renderWords();



}








// ==========================================
// 새로고침
// ==========================================


function refreshWords(){



    renderWords();



}








// ==========================================
// 실행
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){



    initRender();



});
