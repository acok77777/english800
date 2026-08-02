/* ==========================================
   quiz.js

   초등 필수 영단어 800
   체크 단어 퀴즈 시스템

========================================== */


let quizWord = null;

let quizType = "";

let quizList = [];

let quizScore = 0;

let quizCount = 0;





/* ==========================================
   퀴즈용 단어 가져오기
   체크 완료 단어만
========================================== */


function getQuizWords(){


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



    quizList = getQuizWords();





    if(quizList.length === 0){



        alert(

        "먼저 단어를 체크해주세요 😊"

        );



        return;


    }





    quizScore = 0;

    quizCount = 0;





    // 화면 전환


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
   랜덤 문제
========================================== */


function nextQuiz(){



    const index = Math.floor(

        Math.random() *

        quizList.length

    );



    quizWord = quizList[index];






    if(quizType==="meaning"){


        meaningQuiz();


    }


    else if(quizType==="alphabet"){


        alphabetQuiz();


    }


    else if(quizType==="listen"){


        listenQuiz();


    }


    else if(quizType==="spell"){


        spellQuiz();


    }



}








/* ==========================================
   문제 화면
========================================== */


function quizScreen(html){



    const box = document.getElementById(

        "quizPlayBox"

    );



    if(box){


        box.innerHTML = html;


    }


}







/* ==========================================
   영어 → 뜻
========================================== */


function meaningQuiz(){



    let choices=[quizWord];



    while(choices.length<4){



        let random =

        quizList[

        Math.floor(

        Math.random()

        *

        quizList.length

        )

        ];



        if(!choices.includes(random)){


            choices.push(random);


        }


    }




    choices.sort(

        ()=>Math.random()-0.5

    );





    quizScreen(`


<div class="quiz-card">


<h1>

${quizWord.word}

</h1>



<button class="sound-btn"

onclick="speakWord('${quizWord.word}')">

🔊

</button>



<p>

뜻을 선택하세요

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
   첫 알파벳
========================================== */


function alphabetQuiz(){



    let answer =

    quizWord.word

    .charAt(0)

    .toUpperCase();




    let choices=[answer];




    while(choices.length<4){


        let letter =

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





    quizScreen(`


<div class="quiz-card">


<h1>

${quizWord.meaning}

</h1>



<p>

첫 알파벳은?

</p>



${choices.map(letter=>`


<button class="quiz-option"

onclick="checkAnswer('${letter}')">

${letter}

</button>


`).join("")}


</div>


`);




}









/* ==========================================
   듣기
========================================== */


function listenQuiz(){



    let choices=[quizWord];



    while(choices.length<4){


        let random =

        quizList[

        Math.floor(

        Math.random()

        *

        quizList.length

        )

        ];



        if(!choices.includes(random)){


            choices.push(random);


        }


    }




    choices.sort(

        ()=>Math.random()-0.5

    );





    quizScreen(`


<div class="quiz-card">


<h1>

🔊

</h1>


<button class="sound-btn"

onclick="speakWord('${quizWord.word}')">

다시 듣기

</button>



<p>

들은 단어를 선택하세요

</p>



${choices.map(item=>`


<button class="quiz-option"

onclick="checkAnswer('${item.word}')">

${item.word}

</button>


`).join("")}


</div>


`);



}









/* ==========================================
   철자쓰기
========================================== */


function spellQuiz(){



    quizScreen(`


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



    const input =

    document.getElementById(

        "spellInput"

    );



    checkAnswer(

        input.value.trim()

    );



}









/* ==========================================
   정답 확인
========================================== */


function checkAnswer(answer){



    quizCount++;



    let correct=false;





    if(quizType==="meaning"){


        correct =

        answer === quizWord.meaning;


    }





    if(quizType==="alphabet"){


        correct =

        answer ===

        quizWord.word

        .charAt(0)

        .toUpperCase();


    }





    if(quizType==="listen"){


        correct =

        answer === quizWord.word;


    }





    if(quizType==="spell"){


        correct =

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






    setTimeout(()=>{


        nextQuiz();



    },1000);



}
