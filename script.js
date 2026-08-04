/* ==========================================
   script.js

   초등 필수 영단어 800

   화면 이동 / 앱 초기화

========================================== */






/* ==========================================
   화면 전환
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








    if(pageId==="wrongPage"){



        if(typeof renderWrongWords==="function"){


            renderWrongWords();


        }



    }







    if(pageId==="quizPage"){



        if(typeof updateProgressDashboard==="function"){


            updateProgressDashboard();


        }



    }



}









/* ==========================================
   알파벳 버튼
========================================== */


function initAlphabetButtons(){



    const buttons = document.querySelectorAll(

        ".alphabet-area button"

    );






    buttons.forEach(button=>{



        button.addEventListener(

            "click",

            ()=>{



                const letter =

                button.dataset.letter;






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
   목표 숫자 표시 연결
========================================== */


function updateGoalDisplay(){



    const input = document.getElementById(

        "todayGoalInput"

    );



    const texts = document.querySelectorAll(

        "#todayGoalText, #quizGoalText"

    );





    texts.forEach(text=>{



        if(input){



            text.innerText =

            input.value || "";



        }



    });



}









/* ==========================================
   목표 입력 이벤트
========================================== */


function initGoalInput(){



    const input = document.getElementById(

        "todayGoalInput"

    );





    if(!input){

        return;

    }






    input.addEventListener(

        "input",

        ()=>{



            updateGoalDisplay();



            if(typeof saveTodayGoal==="function"){


                saveTodayGoal();


            }



        }



    );



}









/* ==========================================
   초기 실행
========================================== */


function initApp(){



    console.log(

    "English800 App Start"

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







    if(typeof initSpeech==="function"){


        initSpeech();


    }







    if(typeof initBackup==="function"){


        initBackup();


    }







    initAlphabetButtons();



    initGoalInput();



    updateGoalDisplay();



}









/* ==========================================
   실행
========================================== */


window.addEventListener(

"DOMContentLoaded",

()=>{


    initApp();


});
