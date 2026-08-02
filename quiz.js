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
   체크한 단어만 가져오기
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



    quizWords = getQuizWords();





    // 체크 단어 없음


    if(quizWords.length === 0){



        const box = document.getElementById(

            "quizPlayBox"

        );



        if(box){



            box.innerHTML = `


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



        }




        openTab("quizPlayPage");



        return;


    }







    quizScore = 0;

    quizNumber = 0;





    openTab("quizPlayPage");





    nextQuiz();



}








/* ==========================================
   퀴즈 나가기
========================================== */


function exitQuiz(){



    openTab("quizPage");



}








/* ==========================================
   다음 문제
========================================== */


function nextQuiz(){



    const index = Math.floor(

        Math.random() *

        quizWords.length

    );



    quizWord = quizWords[index];



    quizNumber++;






    if(quizType==="meaning"){


        createMeaningQuiz();


    }


    else if(quizType==="alphabet"){


        createAlphabetQuiz();


    }


    else if(quizType==="listen"){


        createListenQuiz();


    }


    else if(quizType==="spell"){


        createSpellQuiz();


    }



}








/* ==========================================
   화면 출력
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
   영어 → 뜻
========================================== */


function createMeaningQuiz(){



    let choices=[quizWord];




    while(choices.length < 4){



        let random =

        quizWords[

        Math.floor(

        Math.random()

        *

        quizWords.length

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

onclick="checkQuizAnswer('${item.meaning}')">

${item.meaning}

</button>


`).join("")}



</div>


`);

}

/* ==========================================
   첫 알파벳 퀴즈
========================================== */


function createAlphabetQuiz(){


    const answer =

    quizWord.word

    .charAt(0)

    .toUpperCase();



    let choices=[answer];



    while(choices.length < 4){



        let letter =

        String.fromCharCode(

            65 +

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






    showQuiz(`


<div class="quiz-card">


<h1>

${quizWord.meaning}

</h1>


<p>

첫 알파벳을 고르세요

</p>



${choices.map(letter=>`


<button

class="quiz-option"

onclick="checkQuizAnswer('${letter}')">

${letter}

</button>


`).join("")}



</div>


`);



}









/* ==========================================
   듣기 퀴즈
========================================== */


function createListenQuiz(){



    let choices=[quizWord];



    while(choices.length < 4){



        let random =

        quizWords[

        Math.floor(

            Math.random()

            *

            quizWords.length

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

onclick="checkQuizAnswer('${item.word}')">

${item.word}

</button>


`).join("")}



</div>


`);




    // 자동 한번 읽기


    setTimeout(()=>{


        speakWord(quizWord.word);


    },500);



}









/* ==========================================
   철자 쓰기
========================================== */


function createSpellQuiz(){



    showQuiz(`


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

onclick="checkSpellAnswer()">

확인

</button>



</div>


`);



}









function checkSpellAnswer(){



    const input =

    document.getElementById(

        "spellInput"

    );



    if(!input){

        return;

    }



    checkQuizAnswer(

        input.value.trim()

    );


}










/* ==========================================
   정답 확인
========================================== */


function checkQuizAnswer(answer){



    let correct=false;





    if(quizType==="meaning"){



        correct =

        answer === quizWord.meaning;



    }






    else if(quizType==="alphabet"){



        correct =

        answer ===

        quizWord.word

        .charAt(0)

        .toUpperCase();



    }






    else if(quizType==="listen"){



        correct =

        answer === quizWord.word;



    }






    else if(quizType==="spell"){



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









/* ==========================================
   현재 점수
========================================== */


function getQuizScore(){



    return {


        score:quizScore,


        count:quizNumber



    };


}
