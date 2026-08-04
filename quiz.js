/* ==========================================
   quiz.js

   초등 필수 영단어 800
   Quiz System

========================================== */


let quizType = "";

let quizWord = null;

let quizWords = [];

let quizScore = 0;

let quizNumber = 0;







/* ==========================================
   체크 완료 단어만 가져오기
========================================== */


function getQuizWords(){


    let completed=[];



    if(typeof getCompletedWords==="function"){


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






    if(quizWords.length===0){



        openTab("quizPlayPage");



        showQuiz(`


<div class="quiz-card">


<h2>

📚 안내

</h2>



<p>

단어 탭에서 외운 단어를 체크 후<br>

퀴즈를 풀어주세요 😊

</p>



</div>


`);



        return;


    }





    quizScore=0;

    quizNumber=0;



    openTab("quizPlayPage");



    nextQuiz();



}









/* ==========================================
   나가기
========================================== */


function exitQuiz(){



    openTab("quizPage");



}









/* ==========================================
   다음 문제
========================================== */


function nextQuiz(){



    quizNumber++;





    const index = Math.floor(

        Math.random()

        *

        quizWords.length

    );





    quizWord = quizWords[index];






    updateQuizInfo();






    if(quizType==="meaning"){


        meaningQuiz();


    }



    else if(quizType==="alphabet"){


        alphabetQuiz();


    }



    else if(quizType==="spell"){


        spellQuiz();


    }



}









/* ==========================================
   문제 출력
========================================== */


function showQuiz(html){



    const box=document.getElementById(

        "quizPlayBox"

    );



    if(box){


        box.innerHTML=html;


    }


}









function updateQuizInfo(){



    const number=document.getElementById(

        "quizNumber"

    );



    const score=document.getElementById(

        "quizScore"

    );



    if(number){


        number.innerText=quizNumber;


    }





    if(score){


        score.innerText=quizScore;


    }




}









/* ==========================================
   1번 뜻 쏙쏙 찾기
========================================== */


function meaningQuiz(){



    let choices=[quizWord];





    while(choices.length<4){



        let item=

        quizWords[

        Math.floor(

        Math.random()

        *

        quizWords.length

        )

        ];



        if(!choices.includes(item)){


            choices.push(item);


        }


    }





    choices.sort(

        ()=>Math.random()-0.5

    );







    document.getElementById(

        "quizTitle"

    ).innerText=

    "(1) 뜻 쏙쏙 찾기";






    showQuiz(`


<div class="quiz-card">


<h1>

${quizWord.word}

</h1>



<button class="sound-btn"

onclick="speakWord('${quizWord.word}')">

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
   2번 알파벳
========================================== */


function alphabetQuiz(){



    let answer=

    quizWord.word

    .charAt(0)

    .toUpperCase();





    let choices=[answer];





    while(choices.length<4){



        let letter=

        String.fromCharCode(

        65+

        Math.floor(

        Math.random()*26

        )

        );



        if(!choices.includes(letter)){


            choices.push(letter);


        }



    }







    choices.sort(

        ()=>Math.random()-0.5

    );





    document.getElementById(

        "quizTitle"

    ).innerText=

    "(2) 알파벳 쏙쏙 고르기";







    showQuiz(`


<div class="quiz-card">


<h1>

${quizWord.meaning}

</h1>



<p>

첫 알파벳을 고르세요

</p>




${choices.map(item=>`


<button class="quiz-option"

onclick="checkAnswer('${item}')">

${item}

</button>


`).join("")}



</div>


`);




}









/* ==========================================
   3번 스펠링 쓰기
========================================== */


function spellQuiz(){



    document.getElementById(

        "quizTitle"

    ).innerText=

    "(3) 스펠링 쏙쏙 쓰기";







    showQuiz(`


<div class="quiz-card">


<h1>

${quizWord.meaning}

</h1>





<button class="sound-btn"

onclick="speakWord('${quizWord.word}')">

🔊 듣기

</button>





<p>

영어 철자를 입력하세요

</p>





<input

id="spellInput"

placeholder="영어 입력">





<button class="quiz-option"

onclick="checkSpell()">

확인

</button>



</div>


`);




}







function checkSpell(){



    const input=document.getElementById(

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


        correct=

        answer===quizWord.meaning;


    }







    if(quizType==="alphabet"){


        correct=

        answer===

        quizWord.word

        .charAt(0)

        .toUpperCase();



    }







    if(quizType==="spell"){


        correct=

        answer.toLowerCase()

        ===

        quizWord.word.toLowerCase();



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

                quizWord.id

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
