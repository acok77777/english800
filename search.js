/* ==========================================
   search.js

   초등 필수 영단어 800

   검색 / 알파벳 필터

========================================== */



// 현재 검색 상태

let searchWords = [];





// ==========================================
// 검색 시작
// ==========================================


function searchWord(){



    const input = document.getElementById(

        "searchInput"

    );



    if(!input){

        return;

    }





    const keyword =

    input.value

    .trim()

    .toLowerCase();






    if(keyword===""){



        currentWords = WORDS;

        currentPage = 1;

        renderWords();

        return;


    }







    searchWords = WORDS.filter(word=>{



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







    currentWords = searchWords;


    currentPage = 1;


    renderWords();



}









// ==========================================
// 알파벳 필터
// ==========================================


function filterByAlphabet(letter){



    if(letter==="ALL"){



        currentWords = WORDS;



    }

    else{



        currentWords = WORDS.filter(word=>{



            return word.word

            .charAt(0)

            .toUpperCase()

            === letter;



        });



    }






    currentPage = 1;



    renderWords();



}









// ==========================================
// 검색 이벤트 연결
// ==========================================


function initSearch(){



    const btn = document.getElementById(

        "searchBtn"

    );



    const input = document.getElementById(

        "searchInput"

    );






    if(btn){



        btn.addEventListener(

            "click",

            searchWord

        );



    }







    if(input){



        input.addEventListener(

            "keyup",

            function(e){



                if(e.key==="Enter"){



                    searchWord();



                }



            }


        );



    }






    // 전체 버튼


    const allBtn = document.getElementById(

        "allBtn"

    );



    if(allBtn){



        allBtn.onclick=function(){



            filterByAlphabet(

                "ALL"

            );



        };



    }







    // A~Z 버튼


    document.querySelectorAll(

        ".alphabet-area button"

    )

    .forEach(btn=>{



        if(btn.id==="allBtn"){


            return;


        }





        btn.onclick=function(){



            filterByAlphabet(

                btn.innerText

            );



        };



    });




}








// ==========================================
// 실행
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){



    initSearch();



});
