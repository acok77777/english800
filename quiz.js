/* ==========================================
   quiz.js

   초등 필수 영단어 800

   Quiz System

========================================== */


let quizType = "";

let quizWords = [];

let currentQuizWord = null;

let quizScore = 0;

let quizNumber = 0;







/* ==========================================
   체크한 단어 가져오기
========================================== */


function getQuizWords(){


    if(typeof WORDS === "undefined"){

        console.error(
            "data.js 없음"
        );

        return [];

    }




    let completed = [];



    if(typeof getCompletedWords === "function"){

        completed = getCompletedWords();

    }






    return WORDS.filter(word=>{


        return completed.includes(word.id);


    });



}









/* ==========================================
   퀴즈 시작
========================================== */


function startQuiz(type){



    quizType = type;



    quizWords = getQuizWords();






    if(quizWords.length === 0){



        openTab("quizPlayPage");



        document.getElementById(

            "quizTitle"

        ).innerText = "퀴즈 안내";




        document.getElementById(

            "quizPlayBox"

        ).innerHTML = `



        <div class="quiz-card">


        <h2>

        📚 안내

        </h2>


        <p>

        단어 탭에서 외운 단어를 체크 후<br>

        퀴즈를 풀어주세요 😊

        </p>


        </div>


        `;


        return;


    }







    quizScore = 0;

    quizNumber = 0;






    openTab(

        "quizPlayPage"

    );





    nextQuiz();



}









/* ==========================================
   다음 문제
========================================== */


function nextQuiz(){



    quizNumber++;





    const random = Math.floor(

        Math.random()

        *

        quizWords.length

    );





    currentQuizWord =

    quizWords[random];






    updateQuizInfo();







    if(quizType==="meaning"){



        createMeaningQuiz();



    }





    if(quizType==="alphabet"){



        createAlphabetQuiz();



    }





    if(quizType==="spell"){



        createSpellQuiz();



    }



}









/* ==========================================
   정보 표시
========================================== */


function updateQuizInfo(){



    const number = document.getElementById(

        "quizNumber"

    );



    const score = document.getElementById(

        "quizScore"

    );





    if(number){

        number.innerText = quizNumber;

    }





    if(score){

        score.innerText = quizScore;

    }



}









/* ==========================================
   1. 뜻 찾기
========================================== */


function createMeaningQuiz(){



    document.getElementById(

        "quizTitle"

    ).innerText =

    "1️⃣ 뜻 쏙쏙 찾기";







    let choices = [

        currentQuizWord

    ];







    while(choices.length < 4){



        let random =

        quizWords[

        Math.floor(

        Math.random()*quizWords.length

        )

        ];




        if(!choices.includes(random)){


            choices.push(random);


        }



    }






    choices.sort(

        ()=>Math.random()-0.5

    );






    showQuiz(`


<div class="quiz-card">


<h1>

${currentQuizWord.word}

</h1>



<button class="sound-btn"

onclick="speakWord('${currentQuizWord.word}')">

🔊

</button>




<p>

뜻을 고르세요

</p>



${choices.map(item=>`


<button class="quiz-option"

onclick="checkAnswer('${item.meaning}')">


${item.meaning}


</button>


`).join("")}



</div>


`);




}









/* ==========================================
   2. 첫 알파벳
========================================== */


function createAlphabetQuiz(){



    document.getElementById(

        "quizTitle"

    ).innerText =

    "2️⃣ 알파벳 쏙쏙 고르기";






    let answer =

    currentQuizWord.word

    .charAt(0)

    .toUpperCase();





    let letters=[answer];






    while(letters.length<4){



        let letter =

        String.fromCharCode(

            65 +

            Math.floor(

            Math.random()*26

            )

        );



        if(!letters.includes(letter)){


            letters.push(letter);


        }



    }






    letters.sort(

        ()=>Math.random()-0.5

    );






    showQuiz(`



<div class="quiz-card">


<h2>

${currentQuizWord.meaning}

</h2>



<p>

첫 번째 알파벳은?

</p>



${letters.map(letter=>`


<button class="quiz-option"

onclick="checkAnswer('${letter}')">


${letter}


</button>


`).join("")}



</div>


`);



}









/* ==========================================
   3. 철자쓰기
========================================== */


function createSpellQuiz(){



    document.getElementById(

        "quizTitle"

    ).innerText =

    "3️⃣ 스펠링 쏙쏙 쓰기";








showQuiz(`


<div class="quiz-card">


<h2>

${currentQuizWord.meaning}

</h2>




<button class="sound-btn"

onclick="speakWord('${currentQuizWord.word}')">

🔊 듣기

</button>





<br><br>



<input

id="spellInput"

placeholder="영어 철자 입력">





<button class="quiz-option"

onclick="checkSpell()">


확인


</button>


</div>



`);



}









function checkSpell(){



    const input = document.getElementById(

        "spellInput"

    );



    if(input){


        checkAnswer(

            input.value.trim()

        );


    }



}









/* ==========================================
   정답 확인
========================================== */


function checkAnswer(answer){



    let correct=false;






    if(quizType==="meaning"){



        correct =

        answer ===

        currentQuizWord.meaning;



    }







    if(quizType==="alphabet"){



        correct =

        answer ===

        currentQuizWord.word

        .charAt(0)

        .toUpperCase();



    }







    if(quizType==="spell"){



        correct =

        answer.toLowerCase()

        ===

        currentQuizWord.word

        .toLowerCase();



    }









    if(correct){



        quizScore++;




        if(typeof showCorrectEffect==="function"){


            showCorrectEffect();


        }



    }

    else{



        if(typeof addWrongWord==="function"){


            addWrongWord(

                currentQuizWord.id

            );


        }





        if(typeof showWrongEffect==="function"){


            showWrongEffect();


        }



    }







    updateQuizInfo();







    setTimeout(()=>{


        nextQuiz();


    },1000);



}









/* ==========================================
   문제 출력
========================================== */


function showQuiz(html){



    const box=document.getElementById(

        "quizPlayBox"

    );



    if(box){


        box.innerHTML = html;


    }



}









/* ==========================================
   퀴즈 나가기
========================================== */


function exitQuiz(){



    openTab(

        "quizPage"

    );



}
