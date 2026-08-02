/* ==========================================
   render.js

   초등 필수 영단어 800
   화면 출력 관리

========================================== */


/* 현재 표시 목록 */

let currentWords = [];



/* ==========================================
   단어 영역 가져오기
========================================== */


function getWordContainer(){

    return document.getElementById(
        "wordList"
    );

}



/* ==========================================
   전체 단어 표시
========================================== */


function renderAllWords(){

    currentWords = WORDS;

    renderWords(currentWords);

}



/* ==========================================
   단어 출력 메인
========================================== */


function renderWords(words){


    const container = getWordContainer();


    if(!container){

        console.error(
            "wordList 영역 없음"
        );

        return;

    }


    container.innerHTML = "";


    words.forEach(word=>{


        const card = createWordCard(word);


        container.appendChild(card);


    });


}



/* ==========================================
   단어 카드 생성
========================================== */


function createWordCard(word){


    const card = document.createElement(
        "div"
    );


    card.className =
        "word-card";



    const favorite =
        isFavorite(word.id);



    const completed =
        isCompleted(word.id);



    card.innerHTML = `

        <div class="word-number">

            ${word.id}

        </div>


        <div class="word-main">


            <h3>

                ${word.word}

                <button 
                class="sound-btn"
                onclick="speakWord('${word.word}')">

                🔊

                </button>


            </h3>


            <p class="pronunciation">

                ${word.pronunciation}

            </p>


            <p class="meaning">

                ${word.meaning}

            </p>


        </div>



        <div class="word-buttons">


            <button 
            class="favorite-btn 
            ${favorite ? "active":""}"
            onclick="toggleFavorite(${word.id})">

                ⭐

            </button>



            <button

            class="complete-btn
            ${completed ? "active":""}"

            onclick="toggleComplete(${word.id})">


                ${completed ? "✅":"☑️"}

            </button>


        </div>


    `;


    return card;


}




/* ==========================================
   즐겨찾기 변경
========================================== */


function toggleFavorite(id){


    if(isFavorite(id)){


        removeFavorite(id);


    }

    else{


        addFavorite(id);


    }


    renderWords(currentWords);


}




/* ==========================================
   학습 완료 변경
========================================== */


function toggleComplete(id){


    if(isCompleted(id)){


        removeCompletedWord(id);


    }

    else{


        completeWord(id);


        addHistory(id);


        saveStudyDate();


    }


    renderWords(currentWords);


}




/* ==========================================
   알파벳 필터
========================================== */


function filterAlphabet(letter){


    if(letter==="ALL"){


        renderAllWords();


        return;

    }



    const filtered = WORDS.filter(word=>{


        return word.word

        .charAt(0)

        .toUpperCase()

        === letter;


    });



    currentWords = filtered;


    renderWords(filtered);


}




/* ==========================================
   즐겨찾기만 보기
========================================== */


function renderFavorites(){


    const list = getFavorites();



    const words = WORDS.filter(word=>{


        return list.includes(word.id);


    });



    currentWords = words;


    renderWords(words);


}





/* ==========================================
   오답노트 보기
========================================== */


function renderWrongWords(){


    const list = getWrongWords();



    const words = WORDS.filter(word=>{


        return list.includes(word.id);


    });



    currentWords = words;


    renderWords(words);


}





/* ==========================================
   학습완료 보기
========================================== */


function renderCompletedWords(){


    const list = getCompletedWords();



    const words = WORDS.filter(word=>{


        return list.includes(word.id);


    });



    currentWords = words;


    renderWords(words);


}





/* ==========================================
   초기 실행
========================================== */


function initRender(){


    if(typeof WORDS === "undefined"){


        console.error(

            "data.js 없음"

        );


        return;

    }



    renderAllWords();


}
