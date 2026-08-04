/* ==========================================
   quiz.js FINAL

   초등 필수 영단어 800

========================================== */


let quizType = "";

let quizWords = [];

let quizIndex = 0;

let quizScore = 0;

let quizWrong = 0;

let currentQuizWord = null;





// ==========================================
// 체크한 단어 가져오기
// ==========================================


function getQuizWords(){


    if(typeof getCompletedWords !== "function"){

        return [];

    }


    const ids = getCompletedWords();



    return WORDS.filter(word =>

        ids.includes(word.id)

    );


}






// ==========================================
// 퀴즈 시작
// ==========================================


function startQuiz(type){



    quizType = type;



    quizWords = getQuizWords();





    if(quizWords.length === 0){


        alert("단어장에서 체크한 단어가 없습니다.");


        return;


    }





    quizWords.sort(

        ()=>Math.random()-0.5

    );





    quizIndex = 0;

    quizScore = 0;

    quizWrong = 0;





    openTab("quizPlayPage");






    document.getElementById(
        "quizCheckedCount"
    ).innerText = quizWords.length;



    document.getElementById(
        "quizPlayCount"
    ).innerText = quizWords.length;



    document.getElementById(
        "quizTotal"
    ).innerText =
    "총 " + quizWords.length + "문제 중";



    document.getElementById(
        "quizScore"
    ).innerText = 0;





    showQuestion();


}









// ==========================================
// 문제 출력
// ==========================================


function showQuestion(){



    if(quizIndex >= quizWords.length){


        finishQuiz();


        return;


    }





    currentQuizWord = quizWords[quizIndex];





    document.getElementById(
        "quizNumber"
    ).innerText =
    (quizIndex + 1) + "번 문제";






    if(quizType === "meaning"){


        showMeaningQuiz();


    }

    else if(quizType === "spell"){


        showSpellQuiz();


    }


}









// ==========================================
// 뜻 맞추기
// ==========================================


function showMeaningQuiz(){



    let choices = [

        currentQuizWord

    ];





    while(choices.length < 3){



        let random = WORDS[

            Math.floor(

                Math.random()*WORDS.length

            )

        ];



        if(!choices.includes(random)){


            choices.push(random);


        }


    }






    choices.sort(

        ()=>Math.random()-0.5

    );







    document.getElementById(
        "quizTitle"
    ).innerText =
    "단어의 뜻 맞추기";







    document.getElementById(
    "quizPlayBox"
    ).innerHTML = `


<div class="quiz-card">


<h1>${currentQuizWord.word}</h1>


<button class="sound-btn"
onclick="speakWord('${currentQuizWord.word}')">

🔊

</button>


<p>뜻을 선택하세요</p>



${choices.map(item=>`

<button class="quiz-option"

onclick="checkAnswer('${item.meaning}')">

${item.meaning}

</button>

`).join("")}



</div>


`;



}









// ==========================================
// 스펠링 맞추기
// ==========================================


function showSpellQuiz(){



    let choices = [

        currentQuizWord

    ];






    while(choices.length < 3){



        let random = WORDS[

            Math.floor(

                Math.random()*WORDS.length

            )

        ];



        if(!choices.includes(random)){


            choices.push(random);


        }


    }






    choices.sort(

        ()=>Math.random()-0.5

    );







    document.getElementById(
        "quizTitle"
    ).innerText =
    "단어의 스펠링 맞추기";






    document.getElementById(
    "quizPlayBox"
    ).innerHTML = `



<div class="quiz-card">


<h2>${currentQuizWord.meaning}</h2>


<p>영어 단어를 선택하세요</p>



${choices.map(item=>`

<button class="quiz-option"

onclick="checkAnswer('${item.word}')">

${item.word}

</button>


`).join("")}



</div>


`;



}









// ==========================================
// 정답 확인
// ==========================================


function checkAnswer(answer){



    let correct;



    if(quizType === "meaning"){


        correct = currentQuizWord.meaning;


    }


    else{


        correct = currentQuizWord.word;


    }






    if(answer === correct){



        quizScore++;



        if(typeof showCorrectEffect === "function"){


            showCorrectEffect();


        }


    }

    else{


        quizWrong++;



        if(typeof showWrongEffect === "function"){


            showWrongEffect();


        }


    }






    document.getElementById(
        "quizScore"
    ).innerText = quizScore;







    setTimeout(()=>{


        quizIndex++;


        showQuestion();


    },800);



}









// ==========================================
// 종료
// ==========================================


function finishQuiz(){



    if(typeof saveQuizHistory === "function"){



        saveQuizHistory({


            date:getQuizDate(),


            type:quizType,


            total:quizWords.length,


            score:quizScore,


            correct:quizScore,


            wrong:quizWrong



        });



    }







    document.getElementById(
    "quizPlayBox"
    ).innerHTML = `


<div class="quiz-card">


<h2>🎉 퀴즈 완료</h2>


<p>
총 ${quizWords.length}문제
</p>


<p>
⭐ 점수 ${quizScore}점
</p>


<p>
⭕ 정답 ${quizScore}개
</p>


<p>
❌ 오답 ${quizWrong}개
</p>



<button class="quiz-option"
onclick="restartQuiz()">

🔄 다시 풀기

</button>



</div>


`;



}









// ==========================================
// 다시 풀기
// ==========================================


function restartQuiz(){


    startQuiz(quizType);


}









// ==========================================
// 누적 기록
// ==========================================


function openQuizHistory(){



    openTab("quizHistoryPage");



    if(typeof renderQuizHistory === "function"){


        renderQuizHistory();


    }


}









// ==========================================
// 나가기
// ==========================================


function exitQuiz(){


    openTab("quizPage");


}









// ==========================================
// 날짜
// ==========================================


function getQuizDate(){



    const d = new Date();



    return (

        d.getFullYear()
        +"년 "
        +(d.getMonth()+1)
        +"월 "
        +d.getDate()
        +"일"

    );


}
