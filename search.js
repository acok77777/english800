/* ==========================================
   search.js

   초등 필수 영단어 800
   검색 시스템

========================================== */



/* ==========================================
   검색 실행
========================================== */


function runSearch(){



    const input = document.getElementById(

        "searchInput"

    );



    if(!input){

        return;

    }





    const keyword = input.value

    .trim()

    .toLowerCase();






    // 검색어 없으면 전체

    if(keyword===""){


        renderAllWords();


        return;


    }







    const result = WORDS.filter(word=>{



        const english =

        word.word

        .toLowerCase();





        const meaning =

        word.meaning

        .toLowerCase();





        const pronunciation =

        word.pronunciation

        .toLowerCase();







        return (

            english.includes(keyword)

            ||

            meaning.includes(keyword)

            ||

            pronunciation.includes(keyword)

        );



    });








    currentWords = result;


    currentPage = 1;



    renderWords();



}









/* ==========================================
   엔터 검색
========================================== */


function searchEnter(event){



    if(event.key==="Enter"){


        runSearch();


    }



}








/* ==========================================
   검색 초기화
========================================== */


function clearSearch(){



    const input=document.getElementById(

        "searchInput"

    );



    if(input){


        input.value="";


    }



    renderAllWords();



}








/* ==========================================
   초기 연결
========================================== */


function initSearch(){



    const input=document.getElementById(

        "searchInput"

    );



    if(input){



        input.addEventListener(

            "keydown",

            searchEnter

        );


    }



}
