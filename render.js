/* ==========================================
   render.js

   초등 필수 영단어 800

   단어 화면 출력 시스템

========================================== */


let currentWords = [];

let currentPage = 1;


const WORDS_PER_PAGE = 10;

const PAGE_GROUP = 7;







/* ==========================================
   전체 단어 출력
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



    const box = document.getElementById(

        "wordList"

    );



    if(!box){

        return;

    }



    box.innerHTML="";






    const start =

    (currentPage-1)

    *

    WORDS_PER_PAGE;






    const list =

    currentWords.slice(

        start,

        start + WORDS_PER_PAGE

    );






    list.forEach(word=>{


        box.appendChild(

            createWordRow(word)

        );


    });





    renderPagination();



}









/* ==========================================
   단어 한 줄
========================================== */


function createWordRow(word){



    const div=document.createElement(

        "div"

    );



    div.className="word-row";






    div.innerHTML=`



<div>


<input

type="checkbox"

${isCompleted(word.id) ? "checked":""}

onchange="toggleWord(${word.id})">


</div>




<div>

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



    const word = WORDS.find(w=>{


        return w.id===id;


    });





    if(!word){

        return;

    }








    if(isCompleted(id)){



        removeCompletedWord(id);



    }

    else{



        completeWord(id);





        // 학습 기록 저장


        if(typeof saveStudyHistory==="function"){


            saveStudyHistory(

                word.word

            );


        }




    }








    renderWords();






    if(typeof updateProgressDashboard==="function"){


        updateProgressDashboard();


    }



}









/* ==========================================
   페이지 버튼
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






    const startPage =


    Math.floor(

        (currentPage-1)

        /

        PAGE_GROUP

    )

    *

    PAGE_GROUP

    +1;








    const endPage=Math.min(

        startPage + PAGE_GROUP -1,

        totalPage

    );








    // 이전 화살표


    if(startPage>1){



        const prev=document.createElement(

            "button"

        );



        prev.innerText="〈";



        prev.onclick=()=>{


            currentPage=startPage-1;


            renderWords();


        };



        box.appendChild(prev);



    }









    // 숫자


    for(

        let i=startPage;

        i<=endPage;

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









    // 다음 화살표


    if(endPage < totalPage){



        const next=document.createElement(

            "button"

        );



        next.innerText="〉";



        next.onclick=()=>{


            currentPage=endPage+1;


            renderWords();



        };



        box.appendChild(next);



    }



}









/* ==========================================
   알파벳 검색
========================================== */


function filterAlphabet(letter){



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






    const wrongIds =

    getWrongWords();






    const list = WORDS.filter(word=>{


        return wrongIds.includes(

            word.id

        );


    });






    if(list.length===0){



        box.innerHTML=`

        <div class="wrong-card">

        틀린 단어가 없습니다 😊

        </div>

        `;



        return;


    }







    list.forEach(word=>{



        const div=document.createElement(

            "div"

        );



        div.className="wrong-card";





        div.innerHTML=`



<h3>

${word.word}

</h3>



<p>

${word.pronunciation}

</p>



<button

class="sound-btn"

onclick="speakWord('${word.word}')">

🔊

</button>



<p>

${word.meaning}

</p>


`;





        box.appendChild(div);



    });



}









/* ==========================================
   초기 실행
========================================== */


function initRender(){



    if(typeof WORDS==="undefined"){



        console.error(

        "data.js 로딩 필요"

        );


        return;


    }




    renderAllWords();



}
