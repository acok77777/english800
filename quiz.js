/* ==========================================
   quiz.js FINAL

   초등 필수 영단어 800

========================================== */


window.quizType = "";

window.quizWords = [];

window.quizIndex = 0;

window.quizScore = 0;

window.quizWrong = 0;

window.currentQuizWord = null;





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



    window.quizType = type;



    window.quizWords = getQuizWords();





    if(window.quizWords.length === 0){


        alert("단어장에서 체크한 단어가 없습니다.");

        return;


    }






    window.quizWords.sort(

        ()=>Math.random()-0.5

    );






    window.quizIndex = 0;

    window.quizScore = 0;

    window.quizWrong = 0;






    openTab("quizPlayPage");







    setText(
        "quizCheckedCount",
        window.quizWords.length
    );


    setText(
        "quizPlayCount",
        window.quizWords.length
    );



    setText(
        "quizTotal",
        "총 " + window.quizWords.length + "문제 중"
    );



    setText(
        "quizScore",
        0
    );






    showQuestion();


}









// ==========================================
// 텍스트 변경 안전 함수
// ==========================================


function setText(id,value){


    const el = document.getElementById(id);


    if(el){

        el.innerText = value;

    }


}









// ==========================================
// 문제 출력
// ==========================================


function showQuestion(){



    if(window.quizIndex >= window.quizWords.length){


        finishQuiz();

        return;


    }







    window.currentQuizWord =

    window.quizWords[window.quizIndex];







    setText(

        "quizNumber",

        (window.quizIndex + 1) + "번 문제"

    );







    if(window.quizType === "meaning"){


        showMeaningQuiz();


    }

    else{


        showSpellQuiz();


    }



}









// ==========================================
// 뜻 맞추기
// ==========================================


function showMeaningQuiz(){



    let choices = [

        window.currentQuizWord

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






    setText(

        "quizTitle",

        "단어의 뜻 맞추기"

    );








    document.getElementById(

        "quizPlayBox"

    ).innerHTML = `



<div class="quiz-card">


<h1>

${window.currentQuizWord.word}

</h1>



<button class="sound-btn"

onclick="speakWord('${window.currentQuizWord.word}')">

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


`;



}









// ==========================================
// 스펠링 맞추기
// ==========================================


function showSpellQuiz(){



    let choices = [

        window.currentQuizWord

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






    setText(

        "quizTitle",

        "단어의 스펠링 맞추기"

    );






    document.getElementById(

    "quizPlayBox"

    ).innerHTML = `



<div class="quiz-card">


<h2>

${window.currentQuizWord.meaning}

</h2>



<p>

영어 단어를 선택하세요

</p>



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



    let correct = "";





    if(window.quizType === "meaning"){


        correct = window.currentQuizWord.meaning;


    }

    else{


        correct = window.currentQuizWord.word;


    }







    if(answer === correct){


        window.quizScore++;


        if(typeof showCorrectEffect === "function"){

            showCorrectEffect();

        }


    }

    else{


        window.quizWrong++;


        if(typeof showWrongEffect === "function"){

            showWrongEffect();

        }


    }







    setText(

        "quizScore",

        window.quizScore

    );






    setTimeout(()=>{


        window.quizIndex++;


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


            type:window.quizType,


            total:window.quizWords.length,


            score:window.quizScore,


            correct:window.quizScore,


            wrong:window.quizWrong



        });



    }







    document.getElementById(

    "quizPlayBox"

    ).innerHTML = `



<div class="quiz-card">


<h2>

🎉 퀴즈 완료

</h2>



<p>

총 ${window.quizWords.length}문제

</p>



<p>

⭐ ${window.quizScore}점

</p>



<p>

⭕ 정답 ${window.quizScore}개

</p>



<p>

❌ 오답 ${window.quizWrong}개

</p>



<button class="quiz-option"

onclick="restartQuiz()">

🔄 다시 풀기

</button>



</div>



`;



}









function restartQuiz(){


    startQuiz(window.quizType);


}








function openQuizHistory(){


    openTab("quizHistoryPage");


    if(typeof renderQuizHistory === "function"){

        renderQuizHistory();

    }


}








function exitQuiz(){


    openTab("quizPage");


}








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
