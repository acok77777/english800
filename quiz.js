/* ==========================================
   quiz.js

   초등 필수 영단어 800
   퀴즈 시스템

========================================== */


let quizWord = null;

let quizType = "meaning";

let quizScore = 0;

let quizCount = 0;



/* ==========================================
   랜덤 단어
========================================== */


function getRandomWord(){


    const index = Math.floor(

        Math.random()*WORDS.length

    );


    return WORDS[index];


}



/* ==========================================
   퀴즈 시작
========================================== */


function startQuiz(type="meaning"){


    quizType = type;


    quizScore = 0;

    quizCount = 0;


    nextQuiz();


}



/* ==========================================
   다음 문제
========================================== */


function nextQuiz(){


    quizWord = getRandomWord();



    if(quizType==="alphabet"){


        createAlphabetQuiz();


    }


    else if(quizType==="spell"){


        createSpellQuiz();


    }


    else if(quizType==="listen"){


        createListenQuiz();


    }


    else{


        createMeaningQuiz();


    }


}





/* ==========================================
   뜻 맞추기
========================================== */


function createMeaningQuiz(){


    const box=document.getElementById(

        "quizBox"

    );


    if(!box)return;



    let choices=[quizWord];



    while(choices.length<4){


        let random=getRandomWord();



        if(!choices.includes(random)){


            choices.push(random);


        }


    }



    choices.sort(

        ()=>Math.random()-0.5

    );



    box.innerHTML=`


    <h2>${quizWord.word}</h2>


    <p>뜻을 고르세요</p>


    ${choices.map(word=>`

        <button

        onclick="checkQuiz('${word.meaning}')">

        ${word.meaning}

        </button>


    `).join("")}


    `;


}





/* ==========================================
   알파벳 맞추기
========================================== */


function createAlphabetQuiz(){



    const box=document.getElementById(

        "quizBox"

    );


    if(!box)return;



    let answer=

    quizWord.word.charAt(0);



    let letters=[answer];



    while(letters.length<4){


        let random=

        String.fromCharCode(

            65+Math.floor(Math.random()*26)

        );



        if(!letters.includes(random)){


            letters.push(random);


        }

    }



    letters.sort(

        ()=>Math.random()-0.5

    );



    box.innerHTML=`


    <h2>${quizWord.meaning}</h2>


    <p>첫 알파벳을 고르세요</p>


    ${letters.map(letter=>`


    <button

    onclick="checkQuiz('${letter}')">

    ${letter}


    </button>


    `).join("")}



    `;



}




/* ==========================================
   철자 쓰기
========================================== */


function createSpellQuiz(){



    const box=document.getElementById(

        "quizBox"

    );



    box.innerHTML=`


    <h2>${quizWord.meaning}</h2>


    <input

    id="spellInput"

    placeholder="영어 단어 입력">


    <button onclick="checkSpell()">

    확인

    </button>


    `;



}




function checkSpell(){


    const input=document.getElementById(

        "spellInput"

    );


    checkQuiz(

        input.value.trim()

    );


}




/* ==========================================
   듣기 퀴즈
========================================== */


function createListenQuiz(){



    const box=document.getElementById(

        "quizBox"

    );



    let choices=[quizWord];



    while(choices.length<4){


        let random=getRandomWord();


        if(!choices.includes(random)){


            choices.push(random);


        }


    }



    choices.sort(

        ()=>Math.random()-0.5

    );



    box.innerHTML=`


    <button

    onclick="speakWord('${quizWord.word}')">

    🔊 듣기

    </button>


    <p>들은 단어 뜻 선택</p>


    ${choices.map(word=>`


    <button

    onclick="checkQuiz('${word.word}')">


    ${word.word}


    </button>


    `).join("")}


    `;



}





/* ==========================================
   정답 확인
========================================== */


function checkQuiz(answer){



    let correct=false;



    if(quizType==="meaning"){


        correct=

        answer===quizWord.meaning;


    }


    else if(quizType==="alphabet"){


        correct=

        answer===quizWord.word.charAt(0);


    }


    else if(quizType==="listen"){


        correct=

        answer===quizWord.word;


    }


    else{


        correct=

        answer.toLowerCase()

        ===quizWord.word.toLowerCase();


    }



    quizCount++;



    if(correct){


        quizScore++;


        showQuizResult(true);


    }

    else{


        addWrongWord(

            quizWord.id

        );


        showQuizResult(false);


    }



}





/* ==========================================
   결과 표시
========================================== */


function showQuizResult(result){



    if(result){


        if(typeof showCorrectEffect==="function"){


            showCorrectEffect();


        }


    }

    else{


        if(typeof showWrongEffect==="function"){


            showWrongEffect();


        }


    }



    setTimeout(()=>{


        nextQuiz();


    },1200);



}




/* ==========================================
   점수
========================================== */


function getQuizScore(){


    return {


        score:quizScore,

        count:quizCount


    };


}
