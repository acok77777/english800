/* ==========================================
   quiz.js
   초등 필수 영단어 800
========================================== */


let quizMode = "";

let quizList = [];

let quizIndex = 0;

let quizScore = 0;

let currentQuizWord = null;




// ===============================
// 체크한 단어 가져오기
// ===============================

function getQuizWords(){


    if(typeof WORDS === "undefined"){

        return [];

    }


    let checked = [];


    if(typeof getCompletedWords === "function"){

        checked = getCompletedWords();

    }



    return WORDS.filter(word =>

        checked.includes(word.id)

    );


}







// ===============================
// 퀴즈 시작
// ===============================

function startQuiz(mode){


    quizMode = mode;


    quizList = getQuizWords();



    if(quizList.length === 0){


        openTab("quizPlayPage");



        document.getElementById("quizPlayBox").innerHTML = `

        <div class="quiz-card">

        <h2>📚 안내</h2>

        <p>
        단어 탭에서 외운 단어를 체크 후<br>
        퀴즈를 풀어주세요
        </p>


        </div>

        `;


        return;

    }



    quizIndex = 0;

    quizScore = 0;



    openTab("quizPlayPage");


    showNextQuiz();


}







// ===============================
// 다음 문제
// ===============================


function showNextQuiz(){



    if(quizList.length === 0){

        return;

    }



    currentQuizWord =

    quizList[

        Math.floor(

            Math.random() * quizList.length

        )

    ];



    quizIndex++;



    updateQuizInfo();



    if(quizMode==="meaning"){

        meaningQuiz();

    }


    else if(quizMode==="alphabet"){

        alphabetQuiz();

    }


    else if(quizMode==="listen"){

        listenQuiz();

    }


    else if(quizMode==="spell"){

        spellQuiz();

    }



}







// ===============================
// 문제 번호 표시
// ===============================


function updateQuizInfo(){



    const number = document.getElementById(
        "quizNumber"
    );


    const score = document.getElementById(
        "quizScore"
    );



    if(number){

        number.innerText = quizIndex;

    }


    if(score){

        score.innerText = quizScore;

    }


}







// ===============================
// 뜻 맞추기
// ===============================


function meaningQuiz(){


    document.getElementById("quizTitle").innerText =
    "영어 뜻 맞추기";



    let choices=[currentQuizWord];



    while(choices.length<4){


        let r =
        WORDS[
            Math.floor(
                Math.random()*WORDS.length
            )
        ];



        if(!choices.includes(r)){

            choices.push(r);

        }

    }



    choices.sort(()=>Math.random()-0.5);



    showQuiz(`


<div class="quiz-card">


<h1>

${currentQuizWord.word}

</h1>



<button onclick="speakWord('${currentQuizWord.word}')">

🔊 듣기

</button>



<p>

뜻을 선택하세요

</p>



${choices.map(item=>`


<button class="quiz-option"

onclick="answerQuiz('${item.meaning}')">


${item.meaning}


</button>


`).join("")}



</div>


`);


}







// ===============================
// 첫 알파벳
// ===============================


function alphabetQuiz(){


document.getElementById("quizTitle").innerText =
"첫 알파벳 맞추기";



let answer =

currentQuizWord.word[0].toUpperCase();



let arr=[answer];



while(arr.length<4){


let a=

String.fromCharCode(

65+Math.floor(Math.random()*26)

);



if(!arr.includes(a)){

arr.push(a);

}


}



arr.sort(()=>Math.random()-0.5);



showQuiz(`


<div class="quiz-card">


<h2>

${currentQuizWord.meaning}

</h2>


<p>

첫 글자는?

</p>



${arr.map(a=>`


<button class="quiz-option"

onclick="answerQuiz('${a}')">

${a}

</button>


`).join("")}



</div>


`);


}







// ===============================
// 듣기 퀴즈
// ===============================


function listenQuiz(){


document.getElementById("quizTitle").innerText =
"듣기 맞추기";



showQuiz(`


<div class="quiz-card">


<button onclick="speakWord('${currentQuizWord.word}')">

🔊 듣기

</button>



<p>

들은 단어를 고르세요

</p>


<button class="quiz-option"

onclick="answerQuiz('${currentQuizWord.word}')">

${currentQuizWord.word}

</button>



</div>


`);


}







// ===============================
// 철자 쓰기
// ===============================


function spellQuiz(){



document.getElementById("quizTitle").innerText =
"철자 쓰기";



showQuiz(`


<div class="quiz-card">


<h2>

${currentQuizWord.meaning}

</h2>



<button onclick="speakWord('${currentQuizWord.word}')">

🔊 듣기

</button>



<br><br>


<input id="spellInput">


<button class="quiz-option"

onclick="checkSpell()">

확인

</button>


</div>


`);

}





function checkSpell(){


let input =

document.getElementById("spellInput");


answerQuiz(input.value);


}







// ===============================
// 정답 확인
// ===============================


function answerQuiz(answer){



let correct=false;



if(quizMode==="meaning"){


correct =
answer === currentQuizWord.meaning;


}


if(quizMode==="alphabet"){


correct =
answer === currentQuizWord.word[0].toUpperCase();


}


if(quizMode==="listen"){


correct =
answer === currentQuizWord.word;


}


if(quizMode==="spell"){


correct =
answer.toLowerCase()
===
currentQuizWord.word.toLowerCase();


}




if(correct){


quizScore++;


if(typeof showCorrectEffect==="function"){

showCorrectEffect();

}


}

else{


if(typeof addWrongWord==="function"){

addWrongWord(currentQuizWord.id);

}



if(typeof showWrongEffect==="function"){

showWrongEffect();

}


}





setTimeout(()=>{


showNextQuiz();


},800);



}








// ===============================
// 화면 출력
// ===============================


function showQuiz(html){


const box=document.getElementById(
"quizPlayBox"
);


if(box){

box.innerHTML=html;

}


}







// ===============================
// 퀴즈 나가기
// ===============================


function exitQuiz(){


openTab("quizPage");


}
