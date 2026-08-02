/* ==========================================
   search.js

   초등 필수 영단어 800
   검색 시스템

========================================== */



/* ==========================================
   검색 입력 가져오기
========================================== */


function getSearchInput(){


    return document.getElementById(

        "searchInput"

    );


}



/* ==========================================
   단어 검색
========================================== */


function searchWords(keyword){


    if(!keyword || keyword.trim()===""){


        renderAllWords();


        return;


    }



    keyword = keyword

    .trim()

    .toLowerCase();



    const result = WORDS.filter(word=>{


        return (

            word.word

            .toLowerCase()

            .includes(keyword)


            ||


            word.meaning

            .toLowerCase()

            .includes(keyword)


            ||


            word.pronunciation

            .toLowerCase()

            .includes(keyword)

        );


    });



    addSearchHistory(keyword);



    renderWords(result);



    return result;


}





/* ==========================================
   검색 버튼 실행
========================================== */


function runSearch(){


    const input = getSearchInput();


    if(!input){

        return;

    }



    searchWords(

        input.value

    );


}



/* ==========================================
   실시간 검색
========================================== */


function liveSearch(){


    const input = getSearchInput();



    if(!input){

        return;

    }



    searchWords(

        input.value

    );


}





/* ==========================================
   검색 초기화
========================================== */


function clearSearch(){


    const input = getSearchInput();



    if(input){


        input.value="";


    }


    renderAllWords();


}





/* ==========================================
   검색 기록 표시
========================================== */


function showSearchHistory(){


    const history = getSearchHistory();



    const box = document.getElementById(

        "searchHistory"

    );



    if(!box){

        return;

    }



    box.innerHTML="";



    history.forEach(item=>{


        const button = document.createElement(

            "button"

        );


        button.className="history-item";


        button.innerText=item;



        button.onclick=()=>{


            searchWords(item);


        };



        box.appendChild(button);


    });



}





/* ==========================================
   검색 기록 삭제
========================================== */


function clearSearchHistoryUI(){


    clearSearchHistory();



    const box = document.getElementById(

        "searchHistory"

    );



    if(box){


        box.innerHTML="";


    }


}





/* ==========================================
   알파벳 검색
========================================== */


function searchByAlphabet(letter){



    const result = WORDS.filter(word=>{


        return word.word

        .charAt(0)

        .toUpperCase()

        === letter;


    });



    renderWords(result);


}




/* ==========================================
   번호 검색
========================================== */


function searchByNumber(number){



    const result = WORDS.filter(word=>{


        return word.id === Number(number);


    });



    renderWords(result);


}





/* ==========================================
   검색 이벤트 연결
========================================== */


function initSearch(){



    const input = getSearchInput();



    if(!input){

        return;

    }



    input.addEventListener(

        "input",

        liveSearch

    );



}
