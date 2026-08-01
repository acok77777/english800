/* ===================================
   초등 필수 영단어 800
   script.js Part 1
=================================== */

// ================================
// DOM
// ================================

const wordList = document.getElementById("wordList");
const search = document.getElementById("search");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const todayGoal = document.getElementById("todayGoal");
const streak = document.getElementById("streak");


// ================================
// localStorage
// ================================

let checkedWords =
JSON.parse(localStorage.getItem("checkedWords")) || {};

let wrongWords =
JSON.parse(localStorage.getItem("wrongWords")) || {};

let goal =
Number(localStorage.getItem("goal")) || 0;

let streakCount =
Number(localStorage.getItem("streak")) || 0;

todayGoal.innerText =
goal === 0 ? "미설정" : goal + "개";

streak.innerText =
streakCount + "일";


// ================================
// 현재 필터
// ================================

let currentLetter = "ALL";
let currentMode = "ALL";


// ================================
// 메뉴 전환
// ================================

document.querySelectorAll("nav button")
.forEach(btn=>{

btn.onclick=()=>{

document.querySelectorAll(".page")
.forEach(p=>p.classList.add("hidden"));

document
.getElementById(btn.dataset.page)
.classList.remove("hidden");

};

});


// ================================
// A~Z 버튼
// ================================

document
.querySelectorAll(".filter")
.forEach(btn=>{

btn.onclick=()=>{

document
.querySelectorAll(".filter")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

currentLetter=
btn.dataset.letter;

renderWords();

};

});


// ================================
// 외운단어 보기
// ================================

document
.getElementById("showLearned")
.onclick=()=>{

currentMode="LEARNED";

renderWords();

};


// ================================
// 안외운단어
// ================================

document
.getElementById("showUnlearned")
.onclick=()=>{

currentMode="UNLEARNED";

renderWords();

};


// ================================
// 전체보기
// ================================

document
.getElementById("showAll")
.onclick=()=>{

currentMode="ALL";

renderWords();

};


// ================================
// 검색
// ================================

search.oninput=()=>{

renderWords();

};


// ================================
// 발음
// ================================

function speak(word){

speechSynthesis.cancel();

const utter=
new SpeechSynthesisUtterance(word);

utter.lang="en-US";

utter.rate=0.9;

speechSynthesis.speak(utter);

}


// ================================
// 진행률
// ================================

function updateProgress(){

const total=
words.length;

const learned=
Object.keys(checkedWords).length;

progressText.innerText=
learned+" / "+total;

const percent=
(learned/total)*100;

progressBar.style.width=
percent+"%";

}


// ================================
// 단어 출력
// ================================

function renderWords(){

wordList.innerHTML="";

let list=[...words];


// A~Z

if(currentLetter!="ALL"){

list=list.filter(w=>

w.word
.toUpperCase()
.startsWith(currentLetter)

);

}


// 검색

const keyword=
search.value
.toLowerCase();

if(keyword){

list=list.filter(w=>

w.word
.toLowerCase()
.includes(keyword)

||

w.meaning
.includes(keyword)

);

}


// 외운단어

if(currentMode=="LEARNED"){

list=list.filter(w=>

checkedWords[w.id]

);

}


// 안외운단어

if(currentMode=="UNLEARNED"){

list=list.filter(w=>

!checkedWords[w.id]

);

}


// 출력

list.forEach(w=>{

const card=
document.createElement("div");

card.className="wordCard fade";

card.innerHTML=`

<input
type="checkbox"
${checkedWords[w.id]?"checked":""}
data-id="${w.id}">

<div class="number">

${w.id}

</div>

<div>

<div class="word">

${w.word}

</div>

<div class="pronounce">

${w.pronunciation}

</div>

</div>

<div
class="speaker">

🔊

</div>

<div
class="meaning">

${w.meaning}

</div>

`;


// 체크

card
.querySelector("input")
.onchange=e=>{

if(e.target.checked){

checkedWords[w.id]=true;

}else{

delete checkedWords[w.id];

}

localStorage.setItem(

"checkedWords",

JSON.stringify(
checkedWords)

);

updateProgress();

};


// 스피커

card
.querySelector(".speaker")
.onclick=()=>{

speak(w.word);

};

wordList.appendChild(card);

});

}


// ================================
// 시작
// ================================

renderWords();

updateProgress();
/* ===================================
   script.js Part 2
   오늘 목표 / 연속학습 / 백업기초
=================================== */

// ================================
// 목표 설정
// ================================

const goalDialog = document.getElementById("goalDialog");
const goalInput = document.getElementById("goalInput");

document.getElementById("setGoalBtn").onclick = () => {

    goalInput.value = goal || "";

    goalDialog.showModal();

};

document.getElementById("cancelGoal").onclick = () => {

    goalDialog.close();

};

document.getElementById("saveGoal").onclick = () => {

    const value = Number(goalInput.value);

    if(value < 1 || value > words.length){

        alert("1~800 사이로 입력하세요.");

        return;

    }

    goal = value;

    localStorage.setItem("goal", goal);

    todayGoal.innerText = goal + "개";

    goalDialog.close();

    updateGoalProgress();

};


// ================================
// 오늘 날짜
// ================================

function getToday(){

    const d = new Date();

    return d.getFullYear()+"-"+
    String(d.getMonth()+1).padStart(2,"0")+"-"+
    String(d.getDate()).padStart(2,"0");

}


// ================================
// 오늘 체크한 단어
// ================================

let todayChecked =
JSON.parse(localStorage.getItem("todayChecked")) || {};


// ================================
// 체크 변경
// ================================

function saveToday(id){

    const today=getToday();

    if(!todayChecked[today]){

        todayChecked[today]=[];

    }

    if(!todayChecked[today].includes(id)){

        todayChecked[today].push(id);

    }

    localStorage.setItem(

        "todayChecked",

        JSON.stringify(todayChecked)

    );

}


// ================================
// 진행률 계산
// ================================

function updateGoalProgress(){

    if(goal===0){

        return;

    }

    const today=getToday();

    const count=

    todayChecked[today]

    ?

    todayChecked[today].length

    :

    0;

    todayGoal.innerHTML=`

    ${count} / ${goal}

    <br><br>

    <div class="progress">

    <div

    style="width:${Math.min(count/goal*100,100)}%"

    id="goalBar">

    </div>

    </div>

    `;


    if(count>=goal){

        setTimeout(()=>{

            alert("🎉 오늘 목표를 달성했습니다!");

        },300);

    }

}


// ================================
// renderWords 수정
// ================================

const oldRender = renderWords;

renderWords = function(){

    oldRender();

    document

    .querySelectorAll(".wordCard input")

    .forEach(ch=>{

        ch.onchange=(e)=>{

            const id=Number(e.target.dataset.id);

            if(e.target.checked){

                checkedWords[id]=true;

                saveToday(id);

            }else{

                delete checkedWords[id];

            }

            localStorage.setItem(

                "checkedWords",

                JSON.stringify(checkedWords)

            );

            updateProgress();

            updateGoalProgress();

        };

    });

};


// ================================
// 연속학습
// ================================

function updateStreak(){

    const today=getToday();

    const last=

    localStorage.getItem("lastStudyDate");

    if(last===today){

        return;

    }

    if(todayChecked[today]

    &&

    todayChecked[today].length>0){

        if(last){

            const diff=

            Math.floor(

            (

            new Date(today)

            -

            new Date(last)

            )

            /86400000

            );

            if(diff===1){

                streakCount++;

            }

            else{

                streakCount=1;

            }

        }

        else{

            streakCount=1;

        }

        localStorage.setItem(

        "lastStudyDate",

        today

        );

        localStorage.setItem(

        "streak",

        streakCount

        );

        streak.innerText=

        streakCount+"일";

    }

}


// ================================
// 최초 실행
// ================================

updateGoalProgress();

updateStreak();
/* ==========================================
   script.js Part 3-1
   퀴즈 엔진
========================================== */

const quizArea=document.getElementById("quizArea");

let quizWords=[];
let quizIndex=0;
let score=0;
let currentQuizType="meaning";


// =======================
// 시작버튼
// =======================

document
.getElementById("startQuiz")
.onclick=()=>{

    currentQuizType=

    document
    .querySelector(".quizMenu button.active")

    ?

    document
    .querySelector(".quizMenu button.active")
    .dataset.type

    :

    "meaning";

    startQuiz();

};


// =======================
// 퀴즈 종류 선택
// =======================

document
.querySelectorAll(".quizMenu button")
.forEach(btn=>{

    btn.onclick=()=>{

        document
        .querySelectorAll(".quizMenu button")
        .forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentQuizType=btn.dataset.type;

    };

});



// =======================
// 문제 만들기
// =======================

function startQuiz(){

    const range=

    document.querySelector(
    "input[name=range]:checked"
    ).value;


    quizWords=[...words];


    if(range==="learned"){

        quizWords=

        quizWords.filter(

        w=>checkedWords[w.id]

        );

    }

    if(range==="unlearned"){

        quizWords=

        quizWords.filter(

        w=>!checkedWords[w.id]

        );

    }

    if(range==="wrong"){

        quizWords=

        quizWords.filter(

        w=>wrongWords[w.id]

        );

    }


    shuffle(quizWords);


    let count=

    Number(

    document.getElementById("quizCount")

    .value

    );


    if(count<quizWords.length){

        quizWords=

        quizWords.slice(0,count);

    }


    quizIndex=0;

    score=0;

    nextQuiz();

}



// =======================
// 문제
// =======================

function nextQuiz(){

    if(quizIndex>=quizWords.length){

        finishQuiz();

        return;

    }


    const q=

    quizWords[quizIndex];


    if(currentQuizType==="meaning"){

        showMeaningQuiz(q);

    }

    else

    if(currentQuizType==="word"){

        showWordQuiz(q);

    }

    else

    if(currentQuizType==="listen"){

        showListenQuiz(q);

    }

    else

    if(currentQuizType==="spelling"){

        showSpellingQuiz(q);

    }

}



// =======================
// 정답
// =======================

function correct(){

    score++;

    quizArea.insertAdjacentHTML(

    "beforeend",

    "<h2 class='correct'>⭕ 정답!</h2>"

    );


    setTimeout(()=>{

        quizIndex++;

        nextQuiz();

    },900);

}



// =======================
// 오답
// =======================

function wrong(word){

    wrongWords[word.id]=

    (wrongWords[word.id]||0)+1;


    localStorage.setItem(

    "wrongWords",

    JSON.stringify(wrongWords)

    );


    quizArea.insertAdjacentHTML(

    "beforeend",

    "<h2 class='wrong'>❌ 오답!</h2>"

    );


    setTimeout(()=>{

        quizIndex++;

        nextQuiz();

    },1000);

}



// =======================
// 종료
// =======================

function finishQuiz(){

    quizArea.innerHTML=`

<h2>

퀴즈 종료

</h2>

<br>

<h1>

${score} / ${quizWords.length}

</h1>

<br>

<button id="restartQuiz">

다시하기

</button>

`;

    document

    .getElementById("restartQuiz")

    .onclick=()=>{

        startQuiz();

    };

}



// =======================
// 랜덤
// =======================

function shuffle(array){

    for(

    let i=array.length-1;

    i>0;

    i--

    ){

        const j=

        Math.floor(

        Math.random()*(i+1)

        );

        [

        array[i],

        array[j]

        ]

        =

        [

        array[j],

        array[i]

        ];

    }

}
/* ==========================================
   Part 3-2A
   영어 → 뜻 퀴즈
========================================== */

function showMeaningQuiz(word){

    quizArea.innerHTML="";

    // 보기 만들기
    let choices=[word.meaning];

    while(choices.length<4){

        const random=
        words[
        Math.floor(
        Math.random()*words.length
        )].meaning;

        if(!choices.includes(random)){
            choices.push(random);
        }

    }

    shuffle(choices);

    let html=`

    <h2>

    문제 ${quizIndex+1} / ${quizWords.length}

    </h2>

    <br>

    <div class="quizWord">

    ${word.word}

    </div>

    <br>

    <button class="listenBtn">

    🔊 발음 듣기

    </button>

    <br><br>

    <div class="choiceArea">

    `;

    choices.forEach((c,i)=>{

        html+=`

        <button

        class="choiceBtn"

        data-answer="${c}"

        >

        ${i+1}. ${c}

        </button>

        <br><br>

        `;

    });

    html+=`</div>`;

    quizArea.innerHTML=html;

    // 발음 버튼
    document
    .querySelector(".listenBtn")
    .onclick=()=>{

        speak(word.word);

    };

    // 보기 클릭
    document
    .querySelectorAll(".choiceBtn")
    .forEach(btn=>{

        btn.onclick=()=>{

            if(btn.dataset.answer===word.meaning){

                btn.style.background="#4CAF50";
                btn.style.color="white";

                correct();

            }else{

                btn.style.background="#f44336";
                btn.style.color="white";

                wrong(word);

            }

        };

    });

}
/* ==========================================
   Part 3-2B
   뜻 → 영어 퀴즈
========================================== */

function showWordQuiz(word){

    quizArea.innerHTML="";

    // 보기 만들기
    let choices=[word.word];

    while(choices.length<4){

        const random=
        words[
        Math.floor(
        Math.random()*words.length
        )].word;

        if(!choices.includes(random)){

            choices.push(random);

        }

    }

    shuffle(choices);

    let html=`

    <h2>

    문제 ${quizIndex+1} / ${quizWords.length}

    </h2>

    <br>

    <div class="quizMeaning">

    ${word.meaning}

    </div>

    <br>

    <div class="choiceArea">

    `;

    choices.forEach((c,i)=>{

        html+=`

        <button

        class="choiceBtn"

        data-answer="${c}"

        >

        ${i+1}. ${c}

        </button>

        <br><br>

        `;

    });

    html+=`</div>`;

    quizArea.innerHTML=html;


    // 버튼 클릭

    document

    .querySelectorAll(".choiceBtn")

    .forEach(btn=>{

        btn.onclick=()=>{

            if(btn.dataset.answer===word.word){

                btn.style.background="#4CAF50";

                btn.style.color="white";

                btn.innerHTML+=" ⭕";

                correct();

            }

            else{

                btn.style.background="#f44336";

                btn.style.color="white";

                btn.innerHTML+=" ❌";

                wrong(word);

            }

        };

    });

}
/* ==========================================
   Part 3-3
   알파벳 철자 쓰기 퀴즈
========================================== */


function showSpellingQuiz(word){

    quizArea.innerHTML="";


    let html=`

    <h2>
    문제 ${quizIndex+1} / ${quizWords.length}
    </h2>

    <br>


    <div class="quizMeaning">

    ${word.meaning}

    </div>


    <br>


    <button class="listenBtn">

    🔊 발음 듣기

    </button>


    <br><br>


    <input

    type="text"

    id="spellInput"

    placeholder="영어 철자를 입력하세요"

    autocomplete="off"

    >


    <br><br>


    <button

    id="checkSpell"

    class="checkBtn"

    >

    확인

    </button>


    `;


    quizArea.innerHTML=html;



    // 발음

    document
    .querySelector(".listenBtn")
    .onclick=()=>{

        speak(word.word);

    };



    // 확인 버튼

    document
    .getElementById("checkSpell")
    .onclick=()=>{


        const answer=

        document
        .getElementById("spellInput")
        .value

        .trim()

        .toLowerCase();



        if(answer===word.word.toLowerCase()){


            document
            .getElementById("spellInput")
            .style.border="3px solid green";


            correct();


        }

        else{


            document
            .getElementById("spellInput")
            .style.border="3px solid red";


            wrong(word);


        }


    };


    // 엔터키 지원

    document
    .getElementById("spellInput")
    .addEventListener(
    "keydown",
    function(e){

        if(e.key==="Enter"){

            document
            .getElementById("checkSpell")
            .click();

        }

    });


}
/* ==========================================
   Part 3-4
   듣기 퀴즈
========================================== */


function showListenQuiz(word){

    quizArea.innerHTML="";


    let choices=[word.word];


    // 오답 보기 만들기

    while(choices.length<4){

        const random =

        words[

        Math.floor(

        Math.random()*words.length

        )

        ].word;


        if(!choices.includes(random)){

            choices.push(random);

        }

    }


    shuffle(choices);



    let html=`

    <h2>

    문제 ${quizIndex+1} / ${quizWords.length}

    </h2>


    <br>


    <div class="listenBox">

    🔊 단어를 듣고 맞춰보세요

    </div>


    <br>


    <button class="listenBtn">

    🔊 다시 듣기

    </button>


    <br><br>


    <div class="choiceArea">

    `;



    choices.forEach((c,i)=>{


        html+=`

        <button

        class="choiceBtn"

        data-answer="${c}"

        >

        ${i+1}. ${c}

        </button>


        <br><br>

        `;


    });



    html+=`

    </div>

    `;



    quizArea.innerHTML=html;



    // 자동 재생

    setTimeout(()=>{

        speak(word.word);

    },500);



    // 다시 듣기

    document

    .querySelector(".listenBtn")

    .onclick=()=>{

        speak(word.word);

    };




    // 선택 버튼

    document

    .querySelectorAll(".choiceBtn")

    .forEach(btn=>{


        btn.onclick=()=>{


            if(btn.dataset.answer===word.word){


                btn.style.background="#4CAF50";

                btn.style.color="white";


                btn.innerHTML+=" ⭕";


                correct();


            }


            else{


                btn.style.background="#f44336";

                btn.style.color="white";


                btn.innerHTML+=" ❌";


                wrong(word);


            }


        };


    });


}
/* ==========================================
   script.js Part 4
   오답노트 / 데이터 관리
========================================== */


// ================================
// 오답노트 보기
// ================================

const wrongArea =
document.getElementById("wrongArea");


document
.getElementById("showWrong")
.onclick=()=>{

    renderWrongWords();

};



// ================================
// 오답 출력
// ================================

function renderWrongWords(){


    if(!wrongArea){

        return;

    }


    wrongArea.innerHTML="";


    const list = words.filter(w=>

        wrongWords[w.id]

    );



    if(list.length===0){


        wrongArea.innerHTML=`

        <h3>

        🎉 틀린 단어가 없습니다

        </h3>

        `;


        return;

    }




    list.forEach(w=>{


        const card=document.createElement("div");


        card.className="wordCard";



        card.innerHTML=`

        <div class="number">

        ${w.id}

        </div>


        <div>


        <div class="word">

        ${w.word}

        </div>


        <div class="pronounce">

        ${w.pronunciation}

        </div>


        <div class="meaning">

        ${w.meaning}

        </div>


        <div>

        ❌ 틀린 횟수 :
        ${wrongWords[w.id]}회

        </div>


        </div>


        <button class="speaker">

        🔊

        </button>


        `;



        card
        .querySelector(".speaker")
        .onclick=()=>{

            speak(w.word);

        };



        wrongArea.appendChild(card);



    });


}



// ================================
// 오답 전체 삭제
// ================================


const clearWrong =
document.getElementById("clearWrong");


if(clearWrong){


clearWrong.onclick=()=>{


    if(confirm(
    "오답노트를 모두 삭제할까요?"
    )){


        wrongWords={};


        localStorage.removeItem(
        "wrongWords"
        );


        renderWrongWords();


    }


};


}



// ================================
// 데이터 백업
// ================================


const backupBtn =
document.getElementById("backupBtn");



if(backupBtn){


backupBtn.onclick=()=>{


    const data={


        checkedWords,

        wrongWords,

        goal,

        streakCount,

        todayChecked


    };



    const blob =

    new Blob(

    [

    JSON.stringify(
    data,
    null,
    2)

    ],

    {

    type:"application/json"

    }

    );



    const url=

    URL.createObjectURL(blob);



    const a=

    document.createElement("a");



    a.href=url;


    a.download=

    "english800_backup.json";



    a.click();



    URL.revokeObjectURL(url);



};



}




// ================================
// 데이터 복원
// ================================


const restoreInput =

document.getElementById(
"restoreInput"
);



if(restoreInput){


restoreInput.onchange=e=>{


    const file=

    e.target.files[0];



    const reader=

    new FileReader();



    reader.onload=()=>{


        const data=

        JSON.parse(
        reader.result
        );



        checkedWords =
        data.checkedWords || {};

        wrongWords =
        data.wrongWords || {};

        goal =
        data.goal || 0;

        streakCount =
        data.streakCount || 0;

        todayChecked =
        data.todayChecked || {};



        localStorage.setItem(
        "checkedWords",
        JSON.stringify(checkedWords)
        );


        localStorage.setItem(
        "wrongWords",
        JSON.stringify(wrongWords)
        );


        localStorage.setItem(
        "goal",
        goal
        );


        localStorage.setItem(
        "streak",
        streakCount
        );



        alert(
        "복원이 완료되었습니다."
        );



        location.reload();



    };



    reader.readAsText(file);



};


}



// ================================
// 앱 초기화
// ================================


const resetBtn=

document.getElementById(
"resetBtn"
);



if(resetBtn){


resetBtn.onclick=()=>{


    if(confirm(
    "모든 학습 데이터를 삭제할까요?"
    )){


        localStorage.clear();


        alert(
        "초기화 완료"
        );


        location.reload();


    }


};


}


// ================================
// 최초 오답 표시
// ================================

renderWrongWords();
