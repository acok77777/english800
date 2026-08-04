/* ==========================================
   quiz.js FINAL (1/2)

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


    const checkedIds = getCompletedWords();



    return WORDS.filter(word =>

        checkedIds.includes(word.id)

    );


}







// ==========================================
// 퀴즈 시작
// ==========================================


function startQuiz(type){


    quizType = type;


    quizWords = getQuizWords();





    if(quizWords.length === 0){


        alert(
        "단어장에서 외운 단어를 체크해주세요."
        );


        return;


    }






    // 랜덤 섞기

    quizWords.sort(

        ()=>Math.random()-0.5

    );






    quizIndex = 0;

    quizScore = 0;

    quizWrong = 0;








    openTab("quizPlayPage");







    // 체크 개수 표시


    const count1 = document.getElementById(
        "quizCheckedCount"
    );


    const count2 = document.getElementById(
        "quizPlayCount"
    );



    if(count1){

        count1.innerText = quizWords.length;

    }



    if(count2){

        count2.innerText = quizWords.length;

    }







    const total = document.getElementById(
        "quizTotal"
    );


    if(total){

        total.innerText =
        "총 " + quizWords.length + "문제 중";

    }






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







    currentQuizWord =

    quizWords[quizIndex];







    const number = document.getElementById(
        "quizNumber"
    );



    if(number){


        number.innerText =

        (quizIndex + 1)

        +

        "번 문제";


    }







    if(quizType === "meaning"){



        showMeaningQuiz();



    }

    else if(quizType === "spell"){



        showSpellQuiz();



    }



}









// ==========================================
// 1번 뜻 맞추기
// ==========================================


function showMeaningQuiz(){



    let choices = [

        currentQuizWord

    ];







    while(choices.length < 3){



        let random =

        WORDS[

            Math.floor(

                Math.random() *

                WORDS.length

            )

        ];





        if(

            !choices.includes(random)

        ){


            choices.push(random);


        }



    }







    choices.sort(

        ()=>Math.random()-0.5

    );







    document.getElementById(

        "quizTitle"

    ).innerText =

    "영어 뜻 맞추기";









    document.getElementById(

    "quizPlayBox"

    ).innerHTML = `



<div class="quiz-card">


<h1>

${currentQuizWord.word}

</h1>





<button class="sound-btn"

onclick="speakWord('${currentQuizWord.word}')">

🔊

</button>





<p>

뜻을 선택하세요

</p>





${

choices.map(item=>`


<button class="quiz-option"

onclick="checkAnswer('${item.meaning}')">


${item.meaning}


</button>


`).join("")

}



</div>


`;



}

/* ==========================================
   quiz.js FINAL (1/2)

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


    const checkedIds = getCompletedWords();



    return WORDS.filter(word =>

        checkedIds.includes(word.id)

    );


}







// ==========================================
// 퀴즈 시작
// ==========================================


function startQuiz(type){


    quizType = type;


    quizWords = getQuizWords();





    if(quizWords.length === 0){


        alert(
        "단어장에서 외운 단어를 체크해주세요."
        );


        return;


    }






    // 랜덤 섞기

    quizWords.sort(

        ()=>Math.random()-0.5

    );






    quizIndex = 0;

    quizScore = 0;

    quizWrong = 0;








    openTab("quizPlayPage");







    // 체크 개수 표시


    const count1 = document.getElementById(
        "quizCheckedCount"
    );


    const count2 = document.getElementById(
        "quizPlayCount"
    );



    if(count1){

        count1.innerText = quizWords.length;

    }



    if(count2){

        count2.innerText = quizWords.length;

    }







    const total = document.getElementById(
        "quizTotal"
    );


    if(total){

        total.innerText =
        "총 " + quizWords.length + "문제 중";

    }






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







    currentQuizWord =

    quizWords[quizIndex];







    const number = document.getElementById(
        "quizNumber"
    );



    if(number){


        number.innerText =

        (quizIndex + 1)

        +

        "번 문제";


    }







    if(quizType === "meaning"){



        showMeaningQuiz();



    }

    else if(quizType === "spell"){



        showSpellQuiz();



    }



}









// ==========================================
// 1번 뜻 맞추기
// ==========================================


function showMeaningQuiz(){



    let choices = [

        currentQuizWord

    ];







    while(choices.length < 3){



        let random =

        WORDS[

            Math.floor(

                Math.random() *

                WORDS.length

            )

        ];





        if(

            !choices.includes(random)

        ){


            choices.push(random);


        }



    }







    choices.sort(

        ()=>Math.random()-0.5

    );







    document.getElementById(

        "quizTitle"

    ).innerText =

    "영어 뜻 맞추기";









    document.getElementById(

    "quizPlayBox"

    ).innerHTML = `



<div class="quiz-card">


<h1>

${currentQuizWord.word}

</h1>





<button class="sound-btn"

onclick="speakWord('${currentQuizWord.word}')">

🔊

</button>





<p>

뜻을 선택하세요

</p>





${

choices.map(item=>`


<button class="quiz-option"

onclick="checkAnswer('${item.meaning}')">


${item.meaning}


</button>


`).join("")

}



</div>


`;



}
