/* ==========================================
   script.js

   초등 필수 영단어 800

   화면 제어 / 초기 실행

========================================== */





/* ==========================================
   화면 이동
========================================== */


function openTab(pageId){



    const pages = document.querySelectorAll(

        ".page"

    );



    pages.forEach(page=>{


        page.style.display="none";


    });





    const target = document.getElementById(

        pageId

    );



    if(target){


        target.style.display="block";


    }







    // 화면별 실행



    if(pageId==="wordPage"){



        if(typeof renderAllWords==="function"){


            renderAllWords();


        }



        if(typeof updateProgressDashboard==="function"){


            updateProgressDashboard();


        }



    }







    if(pageId==="quizPage"){



        if(typeof updateProgressDashboard==="function"){


            updateProgressDashboard();


        }



    }







    if(pageId==="wrongPage"){



        if(typeof renderWrongWords==="function"){


            renderWrongWords();


        }



    }





}









/* ==========================================
   알파벳 버튼 연결
========================================== */


function initAlphabet(){



    const buttons = document.querySelectorAll(

        ".alphabet-area button"

    );





    buttons.forEach(btn=>{



        btn.addEventListener(

            "click",

            ()=>{



                let letter =

                btn.dataset.letter;





                if(letter){



                    filterAlphabet(letter);



                }

                else{


                    renderAllWords();


                }



            }

        );



    });



}









/* ==========================================
   검색 연결
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



            const keyword =

            input.value.trim();





            if(typeof searchWords==="function"){



                searchWords(keyword);



            }



        }

    );






}









/* ==========================================
   초기 실행
========================================== */


function initApp(){



    console.log(

    "English800 Start"

    );






    // 첫 화면


    openTab(

        "homePage"

    );







    if(typeof initProgress==="function"){


        initProgress();


    }






    if(typeof initRender==="function"){


        initRender();


    }







    if(typeof initSearch==="function"){


        initSearch();


    }






    initAlphabet();






    if(typeof initBackup==="function"){


        initBackup();


    }



}








/* ==========================================
   시작
========================================== */


window.addEventListener(

"DOMContentLoaded",

()=>{


    initApp();


});
