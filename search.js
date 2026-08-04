/* ==========================================
   search.js

   초등 필수 영단어 800

   단어 검색 시스템

========================================== */





/* ==========================================
   검색 실행
========================================== */


function searchWords(keyword){



    keyword = keyword

    .trim()

    .toLowerCase();





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
   검색 버튼 연결
========================================== */


function initSearch(){



    const btn = document.getElementById(

        "searchBtn"

    );





    const input = document.getElementById(

        "searchInput"

    );







    if(!btn || !input){



        return;


    }







    btn.addEventListener(

        "click",

        ()=>{


            searchWords(

                input.value

            );



        }

    );








    input.addEventListener(

        "keydown",

        (e)=>{



            if(e.key==="Enter"){



                searchWords(

                    input.value

                );


            }



        }

    );



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
