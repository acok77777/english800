/* ==========================================
   quiz.js

   초등 필수 영단어 800
   Quiz System

========================================== */


let quizWord = null;

let quizType = "";

let quizScore = 0;

let quizCount = 0;





/* ==========================================
   랜덤 단어
========================================== */


function randomQuizWord(){


    const index = Math.floor(

        Math.random() * WORDS.length

    );


    return WORDS[index];


}






/* ==========================================
   퀴즈 시작
========================================== */


function startQuiz(type){


    quizType = type;


    quizScore = 0;

    quizCount = 0;


    nextQuiz();


}






/* ==========================================
   다음 문제
========================================== */


function nextQuiz(){



    quizWord = randomQuizWord();



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
   뜻 맞추기
========================================== */


function meaningQuiz(){



    let choices=[quizWord];



    while(choices.length<4){


        let item=randomQuizWord();


        if(!choices.includes(item)){


            choices.push(item);


        }


    }





    choices.sort(

        ()=>Math.random()-0.5

    );





    quizBox().innerHTML=`


<div class="quiz-card">


<h1>

${quizWord.word}

</h1>



<button

class="sound-btn"

onclick="speakWord('${quizWord.word}')">

🔊

</button>



<p>

뜻을 선택하세요

</p>



${choices.map(item=>`


<button

class="quiz-option"

onclick="checkAnswer('${item.meaning}')">

${item.meaning}

</button>


`).join("")}



</div>


`;



}








/* ==========================================
   첫 알파벳
========================================== */


function alphabetQuiz(){



    const answer =

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






    quizBox().innerHTML=`


<div class="quiz-card">


<h1>

${quizWord.meaning}

</h1>



<p>

첫 알파벳은?

</p>



${choices.map(letter=>`


<button

class="quiz-option"

onclick="checkAnswer('${letter}')">

${letter}

</button>


`).join("")}



</div>


`;



}









/* ==========================================
   듣기 퀴즈
========================================== */


function listenQuiz(){



    let choices=[quizWord];



    while(choices.length<4){


        let item=randomQuizWord();


        if(!choices.includes(item)){


            choices.push(item);


        }


    }




    choices.sort(

        ()=>Math.random()-0.5

    );





    quizBox().innerHTML=`


<div class="quiz-card">


<h1>

🔊

</h1>



<button

class="sound-btn"

onclick="speakWord('${quizWord.word}')">

다시 듣기

</button>



<p>

들은 단어를 선택하세요

</p>



${choices.map(item=>`


<button

class="quiz-option"

onclick="checkAnswer('${item.word}')">

${item.word}

</button>


`).join("")}



</div>


`;



}








/* ==========================================
   철자 쓰기
========================================== */


function spellQuiz(){



    quizBox().innerHTML=`


<div class="quiz-card">


<h1>

${quizWord.meaning}

</h1>



<button

class="sound-btn"

onclick="speakWord('${quizWord.word}')">

🔊 듣기

</button>



<p>

영어 철자를 입력하세요

</p>



<input

id="spellInput"

placeholder="영어 입력">



<button

class="quiz-option"

onclick="checkSpell()">

확인

</button>



</div>


`;



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


    },1200);



}







/* ==========================================
   박스
========================================== */


function quizBox(){


    return document.getElementById(

        "quizBox"

    );


}
