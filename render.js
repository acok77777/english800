/* ==========================================
   render.js FINAL

   초등 필수 영단어 800

========================================== */



let currentPage = 1;

const wordsPerPage = 50;






// ==========================================
// 초기 실행
// ==========================================


function initRender(){


    renderAllWords();


}







// ==========================================
// 전체 단어 출력
// ==========================================


function renderAllWords(){



    const box = document.getElementById(

        "wordList"

    );



    if(!box){

        return;

    }






    let start =

    (currentPage-1)

    *

    wordsPerPage;





    let end =

    start + wordsPerPage;






    let list = WORDS.slice(

        start,

        end

    );






    let html = "";








    list.forEach(word=>{



        const checked =

        isCompleted(word.id)

        ?

        "checked"

        :

        "";







        html += `



<div class="word-card">



<input

type="checkbox"

${checked}

onclick="toggleWord(${word.id})">





<span class="word-number">

${word.id}

</span>






<span class="word">

${word.word}

</span>






<span class="pronunciation">

${word.pronunciation}

</span>







<button

onclick="speakWord('${word.word}')">

🔊

</button>








<span class="meaning">

${word.meaning}

</span>





</div>



`;



    });






    box.innerHTML = html;



    renderPagination();



}









// ==========================================
// 체크 변경
// ==========================================


function toggleWord(id){



    if(isCompleted(id)){


        removeCompletedWord(id);


    }

    else{


        completeWord(id);


    }







    renderAllWords();





    if(typeof updateProgressDashboard==="function"){


        updateProgressDashboard();


    }



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





    const total = Math.ceil(

        WORDS.length / wordsPerPage

    );






    let html="";






    for(let i=1;i<=total;i++){



        html += `


<button

onclick="changePage(${i})">


${i}


</button>


`;



    }






    box.innerHTML = html;



}









function changePage(page){



    currentPage = page;


    renderAllWords();



}









// ==========================================
// 검색 결과 출력
// ==========================================


function renderSearchWords(list){



    const box = document.getElementById(

        "wordList"

    );



    if(!box){

        return;

    }





    box.innerHTML = list.map(word=>`



<div class="word-card">


<input

type="checkbox"

${isCompleted(word.id)?"checked":""}

onclick="toggleWord(${word.id})">


<span>

${word.id}

</span>


<span>

${word.word}

</span>


<span>

${word.pronunciation}

</span>



<button onclick="speakWord('${word.word}')">

🔊

</button>



<span>

${word.meaning}

</span>



</div>



`).join("");



}









// ==========================================
// 알파벳 필터
// ==========================================


function filterAlphabet(letter){



    const list = WORDS.filter(word=>


        word.word

        .charAt(0)

        .toUpperCase()

        ===

        letter



    );



    renderSearchWords(list);



}
