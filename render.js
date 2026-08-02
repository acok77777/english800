/* ==========================================
   render.js

   초등 필수 영단어 800

   표 형태 출력
   페이지 기능

========================================== */


let currentWords = [];

let currentPage = 1;

const WORDS_PER_PAGE = 10;






/* ==========================================
   전체 단어
========================================== */


function renderAllWords(){


    currentWords = WORDS;


    currentPage = 1;


    renderWords();


}







/* ==========================================
   단어 출력
========================================== */


function renderWords(){


    const list = document.getElementById(
        "wordList"
    );


    if(!list) return;



    list.innerHTML="";



    const start =

    (currentPage - 1) *

    WORDS_PER_PAGE;



    const end =

    start +

    WORDS_PER_PAGE;



    const pageWords =

    currentWords.slice(
        start,
        end
    );






    pageWords.forEach(word=>{


        list.appendChild(

            createWordRow(word)

        );


    });




    renderPagination();



}








/* ==========================================
   단어 한 줄
========================================== */


function createWordRow(word){



    const row = document.createElement(
        "div"
    );


    row.className="word-row";




    const checked =

    isCompleted(word.id)

    ? "checked"

    : "";





    row.innerHTML = `


<div class="check-box">

<input

type="checkbox"

${checked}

onchange="toggleComplete(${word.id})">

</div>



<div class="word-number">

${word.id}

</div>




<div class="english-word">

${word.word}

</div>




<div class="pronunciation">

[${word.pronunciation}]

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



return row;


}









/* ==========================================
   체크 저장
========================================== */


function toggleComplete(id){



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
   알파벳 필터
========================================== */


function filterAlphabet(letter){



    if(letter==="ALL"){


        renderAllWords();


        return;


    }




    currentWords = WORDS.filter(word=>{


        return word.word

        .charAt(0)

        .toUpperCase()

        === letter;


    });



    currentPage=1;



    renderWords();


}









/* ==========================================
   페이지 번호
========================================== */


function renderPagination(){



    const box = document.getElementById(

        "pagination"

    );



    if(!box) return;



    box.innerHTML="";



    const total = Math.ceil(

        currentWords.length /

        WORDS_PER_PAGE

    );






    for(let i=1;i<=total;i++){



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



}









/* ==========================================
   오답노트
========================================== */


function renderWrongWords(){



    const box=document.getElementById(

        "wrongList"

    );



    if(!box)return;




    const wrong = getWrongWords();



    currentWords = WORDS.filter(word=>{


        return wrong.includes(word.id);


    });



    currentPage=1;



    renderWords();



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
