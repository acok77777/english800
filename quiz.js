// quiz.js

let words=[];
let current=null;
let score=0;
let total=0;

export function startQuiz(data){

    words=[...data];
    score=0;
    total=0;

    nextQuiz();

}

function shuffle(arr){

    return arr.sort(()=>Math.random()-0.5);

}

function nextQuiz(){

    current=words[Math.floor(Math.random()*words.length)];

    const answer=current.m;

    let choices=[answer];

    while(choices.length<4){

        const w=words[Math.floor(Math.random()*words.length)];

        if(!choices.includes(w.m)){

            choices.push(w.m);

        }

    }

    shuffle(choices);

    document.getElementById("quiz").innerHTML=`

    <div class="quiz-card">

        <h2>${current.word}</h2>

        <button onclick="playWord()">
        🔊 듣기
        </button>

        <div id="quizButtons">

        ${choices.map(c=>

        `<button onclick="checkAnswer('${c}')">${c}</button>`

        ).join("")}

        </div>

        <br>

        <div id="quizResult"></div>

        <br>

        <div>

        점수 : ${score} / ${total}

        </div>

    </div>

    `;

}

window.checkAnswer=function(choice){

    total++;

    if(choice==current.m){

        score++;

        document.getElementById("quizResult").innerHTML=
        "⭕ 정답입니다.";

    }else{

        document.getElementById("quizResult").innerHTML=
        "❌ 정답 : "+current.m;

    }

    setTimeout(()=>{

        nextQuiz();

    },1200);

}
