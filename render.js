/* ==========================================
   render.js

   초등 필수 영단어 800
   단어 출력 시스템

========================================== */


let currentWords = [];





/* ==========================================
   전체 출력
========================================== */


function renderAllWords(){


    currentWords = WORDS;


    renderWords(currentWords);


}







/* ==========================================
   단어 출력
========================================== */


function renderWords(words){



    const list = document.getElementById(

        "wordList"

    );



    if(!list){

        return;

    }



    list.innerHTML="";




    words.forEach(word=>{


        list.appendChild(

            createWordRow(word)

        );


    });



}








/* ==========================================
   단어 한 줄 생성
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





<div class="word-info">


<div class="english-word">

${word.word}

</div>



<div class="pronunciation">

${word.pronunciation}

</div>


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
   학습 체크
========================================== */


function toggleComplete(id){



    if(isCompleted(id)){



        removeCompletedWord(id);



    }

    else{



        completeWord(id);



        addHistory(id);



        // 오늘 학습 날짜 저장

        if(typeof saveWordStudyDate==="function"){


            saveWordStudyDate(id);


        }



    }





    renderWords(currentWords);





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






    const result = WORDS.filter(word=>{


        return word.word

        .charAt(0)

        .toUpperCase()

        === letter;


    });





    currentWords=result;



    renderWords(result);



}









/* ==========================================
   검색 결과 출력용
========================================== */


function showSearchResult(result){



    currentWords=result;



    renderWords(result);



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



    const wrong = getWrongWords();





    const words = WORDS.filter(word=>{


        return wrong.includes(word.id);


    });





    box.innerHTML="";





    if(words.length===0){



        box.innerHTML=`

        <p>

        아직 틀린 단어가 없습니다 😊

        </p>

        `;



        return;


    }







    words.forEach(word=>{


        box.appendChild(

            createWordRow(word)

        );


    });



}









/* ==========================================
   초기 실행
========================================== */


function initRender(){



    if(typeof WORDS==="undefined"){


        console.error(

        "data.js가 없습니다."

        );


        return;


    }





    renderAllWords();



}
