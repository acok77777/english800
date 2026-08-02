/* ==========================================
   render.js

   초등 필수 영단어 800

   단어 표시 / 체크 / 오답노트

========================================== */


let currentWords = [];

let currentPage = 1;

const WORDS_PER_PAGE = 10;







/* ==========================================
   전체 단어 표시
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



    if(!list){

        return;

    }



    list.innerHTML="";




    const start =

    (currentPage - 1)

    *

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
   단어 한 줄 생성
========================================== */


function createWordRow(word){



    const row = document.createElement(

        "div"

    );



    row.className = "word-row";





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
   퀴즈용 단어 가져오기

   체크 완료만 반환

========================================== */


function getQuizWords(){



    let completed=[];



    if(typeof getCompletedWords==="function"){


        completed = getCompletedWords();


    }





    return WORDS.filter(word=>{


        return completed.includes(

            word.id

        );


    });



}









/* ==========================================
   알파벳 검색
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



    const box=document.getElementById(

        "pagination"

    );



    if(!box){

        return;

    }





    box.innerHTML="";




    const totalPage = Math.ceil(

        currentWords.length /

        WORDS_PER_PAGE

    );






    for(

    let i=1;

    i<=totalPage;

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





        btn.onclick=function(){


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



    if(!box){

        return;

    }





    box.innerHTML="";





    let wrong=[];



    if(typeof getWrongWords==="function"){


        wrong=getWrongWords();


    }






    const wrongWords = WORDS.filter(word=>{


        return wrong.includes(

            word.id

        );


    });








    if(wrongWords.length===0){



        box.innerHTML=`

        <p>

        아직 틀린 단어가 없습니다 😊

        </p>

        `;


        return;


    }







    wrongWords.forEach(word=>{


        const card=document.createElement(

            "div"

        );



        card.className="wrong-card";





        card.innerHTML=`


<div class="wrong-word">

${word.word}

</div>



<div class="wrong-pronunciation">

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
   검색 결과 출력
========================================== */


function showSearchResult(result){



    currentWords=result;


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
