/* ==========================================
   quiz.js FINAL

   초등 필수 영단어 800
========================================== */


let currentQuizType = "";

let quizList = [];

let quizIndex = 0;

let quizCorrect = 0;

let quizWrong = 0;

let currentQuizWord = null;






// ==========================================
// 체크한 단어 가져오기
// ==========================================


function getCheckedQuizWords(){


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



    currentQuizType = type;



    quizList = getCheckedQuizWords();





    if(quizList.length === 0){



        alert(

        "단어장에서 외운 단어를 체크 후\n퀴즈를 풀어주세요."

        );


        return;

    }







    shuffleQuiz();



    quizIndex = 0;

    quizCorrect = 0;

    quizWrong = 0;





    openTab("quizPlayPage");



    updateQuizCount();



    showQuizQuestion();



}









// ==========================================
// 랜덤 섞기
// ==========================================


function shuffleQuiz(){


    quizList.sort(

        ()=>Math.random()-0.5

    );


}









// ==========================================
// 체크 개수 표시
// ==========================================


function updateQuizCount(){



    const count = quizList.length;




    const a = document.getElementById(

        "quizCheckedCount"

    );


    const b = document.getElementById(

        "quizPlayCount"

    );




    if(a){

        a.innerText=count;

    }


    if(b){

        b.innerText=count;

    }


}









// ==========================================
// 문제 출력
// ==========================================


function showQuizQuestion(){



    if(quizIndex >= quizList.length){



        finishQuiz();


        return;

    }






    currentQuizWord =

    quizList[quizIndex];







    document.getElementById(

        "quizNumber"

    ).innerText =

    (quizIndex+1)

    +

    "/"

    +

    quizList.length;







    if(currentQuizType==="meaning"){



        createMeaningQuestion();



    }

    else if(currentQuizType==="spell"){



        createSpellQuestion();



    }



}









// ==========================================
// 뜻 맞추기
// ==========================================


function createMeaningQuestion(){



    let choices=[

        currentQuizWord

    ];







    while(choices.length < 3){



        let random =

        WORDS[

        Math.floor(

        Math.random()*WORDS.length

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

    ).innerText=

    "단어의 뜻 맞추기";









    document.getElementById(

    "quizPlayBox"

    ).innerHTML=`

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

onclick="checkQuizAnswer('${item.meaning}')">


${item.meaning}


</button>


`).join("")

}



</div>

`;





}









// ==========================================
// 스펠링 맞추기
// ==========================================


function createSpellQuestion(){



    let choices=[

    currentQuizWord

    ];







    while(choices.length < 3){



        let random=

        WORDS[

        Math.floor(

        Math.random()*WORDS.length

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

    ).innerText=

    "단어의 스펠링 맞추기";









    document.getElementById(

    "quizPlayBox"

    ).innerHTML=`

<div class="quiz-card">


<h2>

${currentQuizWord.meaning}

</h2>




${

choices.map(item=>`


<button class="quiz-option"

onclick="checkQuizAnswer('${item.word}')">


${item.word}


</button>


`).join("")

}



</div>

`;




}









// ==========================================
// 정답 확인
// ==========================================


function checkQuizAnswer(answer){



    let correct="";






    if(currentQuizType==="meaning"){


        correct=

        currentQuizWord.meaning;


    }





    if(currentQuizType==="spell"){


        correct=

        currentQuizWord.word;


    }







    if(answer===correct){



        quizCorrect++;



        if(typeof showCorrectEffect==="function"){


            showCorrectEffect();


        }



    }

    else{



        quizWrong++;




        if(typeof showWrongEffect==="function"){


            showWrongEffect();


        }



    }






    setTimeout(()=>{



        quizIndex++;



        showQuizQuestion();



    },800);



}









// ==========================================
// 퀴즈 종료
// ==========================================


function finishQuiz(){





    const result={


        date:getTodayDate(),


        type:currentQuizType,


        total:quizList.length,


        correct:quizCorrect,


        wrong:quizWrong


    };






    if(typeof saveQuizHistory==="function"){


        saveQuizHistory(result);


    }






    document.getElementById(

    "quizPlayBox"

    ).innerHTML=`



<div class="quiz-card">


<h2>

🎉 퀴즈 완료

</h2>


<p>

총 ${quizList.length}문제

</p>



<p>

⭕ 정답 ${quizCorrect}개

</p>



<p>

❌ 오답 ${quizWrong}개

</p>




<button class="quiz-option"

onclick="restartQuiz()">

다시 풀기

</button>


</div>



`;



}









// ==========================================
// 다시 풀기
// ==========================================


function restartQuiz(){



    startQuiz(

        currentQuizType

    );



}









// ==========================================
// 퀴즈 기록 보기
// ==========================================


function openQuizHistory(){



    openTab(

        "quizHistoryPage"

    );



    if(typeof renderQuizHistory==="function"){


        renderQuizHistory();


    }


}









// ==========================================
// 날짜
// ==========================================


function getTodayDate(){


    const d=new Date();



    return (

    d.getFullYear()

    +

    "년 "

    +

    (d.getMonth()+1)

    +

    "월 "

    +

    d.getDate()

    +

    "일"

    );


}









// ==========================================
// 나가기
// ==========================================


function exitQuiz(){


    openTab(

    "quizPage"

    );


}
