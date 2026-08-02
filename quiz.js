/* ==========================================
   quiz.js

   초등 필수 영단어 800
   Quiz System

========================================== */


let quizWord = null;

let quizType = "";

let quizScore = 0;

let quizTotal = 0;





/* ==========================================
   랜덤 단어
========================================== */


function randomWord(){


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

    quizTotal = 0;


    nextQuiz();


}







/* ==========================================
   다음 문제
========================================== */


function nextQuiz(){


    quizWord = randomWord();



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


        let item=randomWord();


        if(!choices.includes(item)){


            choices.push(item);


        }

    }



    choices.sort(

        ()=>Math.random()-0.5

    );




    quizBox().innerHTML=`


<h2>

${quizWord.word}

</h2>


<p>

뜻을 고르세요

</p>



${choices.map(item=>`


<button onclick="checkAnswer('${item.meaning}')">

${item.meaning}

</button>


`).join("")}


`;



}









/* ==========================================
   알파벳 퀴즈
========================================== */


function alphabetQuiz(){


    let answer=

    quizWord.word.charAt(0).toUpperCase();



    let letters=[answer];



    while(letters.length<4){


        let random=

        String.fromCharCode(

        65+

        Math.floor(Math.random()*26)

        );



        if(!letters.includes(random)){


            letters.push(random);


        }


    }



    letters.sort(

        ()=>Math.random()-0.5

    );




    quizBox().innerHTML=`


<h2>

${quizWord.meaning}

</h2>


<p>

첫 알파벳을 고르세요

</p>


${letters.map(letter=>`


<button onclick="checkAnswer('${letter}')">

${letter}

</button>


`).join("")}


`;



}








/* ==========================================
   듣기 퀴즈
========================================== */


function listenQuiz(){



    let choices=[quizWord];



    while(choices.length<4){


        let item=randomWord();


        if(!choices.includes(item)){


            choices.push(item);


        }

    }




    choices.sort(

        ()=>Math.random()-0.5

    );





    quizBox().innerHTML=`


<button onclick="speakWord('${quizWord.word}')">

🔊 다시 듣기

</button>



<p>

들은 단어를 선택하세요

</p>



${choices.map(item=>`


<button onclick="checkAnswer('${item.word}')">

${item.word}

</button>


`).join("")}


`;



}









/* ==========================================
   철자 쓰기
========================================== */


function spellQuiz(){



    quizBox().innerHTML=`


<h2>

${quizWord.meaning}

</h2>



<input

id="spellAnswer"

placeholder="영어 철자 입력">



<button onclick="checkSpell()">

확인

</button>


`;



}







function checkSpell(){



    const input=

    document.getElementById(

    "spellAnswer"

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



    quizTotal++;



    let correct=false;




    if(quizType==="meaning"){


        correct=

        answer===quizWord.meaning;


    }



    else if(quizType==="alphabet"){


        correct=

        answer===

        quizWord.word

        .charAt(0)

        .toUpperCase();


    }



    else if(quizType==="listen"){


        correct=

        answer===quizWord.word;


    }



    else if(quizType==="spell"){


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


        addWrongWord(

            quizWord.id

        );



        if(typeof showWrongEffect==="function"){


            showWrongEffect();


        }


    }






    setTimeout(()=>{


        nextQuiz();


    },1200);



}








/* ==========================================
   퀴즈 박스
========================================== */


function quizBox(){


    return document.getElementById(

        "quizBox"

    );


}








/* ==========================================
   점수
========================================== */


function getQuizScore(){


    return {


        score:quizScore,


        total:quizTotal


    };


}
