/* ==========================================
   script.js FINAL

   초등 필수 영단어 800

   메인 제어 파일

========================================== */



// ==========================================
// 화면 이동
// ==========================================


function openTab(pageId){



    const pages = document.querySelectorAll(

        ".page"

    );



    pages.forEach(page=>{


        page.style.display = "none";


    });






    const target = document.getElementById(

        pageId

    );



    if(target){


        target.style.display = "block";


    }






    // 단어 화면


    if(pageId === "wordPage"){



        if(typeof renderAllWords === "function"){


            renderAllWords();


        }


    }







    // 퀴즈 메인 화면


    if(pageId === "quizPage"){



        if(typeof updateProgressDashboard === "function"){


            updateProgressDashboard();


        }






        if(typeof loadTodayGoal === "function"){


            loadTodayGoal();


        }







        // 체크한 단어 개수 표시


        const quizCount = document.getElementById(

            "quizCheckedCount"

        );





        if(

            quizCount &&

            typeof getCompletedCount === "function"

        ){


            quizCount.innerText = getCompletedCount();



        }



    }







    // 퀴즈 진행 화면


    if(pageId === "quizPlayPage"){



        const count = document.getElementById(

            "quizPlayCount"

        );



        if(

            count &&

            typeof getCompletedCount === "function"

        ){


            count.innerText = getCompletedCount();


        }



    }







    // 누적기록


    if(pageId === "quizHistoryPage"){



        if(typeof renderQuizHistory === "function"){


            renderQuizHistory();


        }


    }








    // 오답노트


    if(pageId === "wrongPage"){



        if(typeof renderWrongWords === "function"){


            renderWrongWords();


        }


    }








    // 학습 기록


    if(pageId === "historyPage"){



        if(typeof renderHistory === "function"){


            renderHistory();


        }


    }



}









// ==========================================
// 앱 시작
// ==========================================


function initApp(){



    console.log(

        "English800 시작"

    );






    let licenseOK = true;






    if(typeof initLicense === "function"){



        licenseOK = initLicense();



    }







    if(!licenseOK){


        return;


    }






    openTab(

        "homePage"

    );







    if(typeof initRender === "function"){


        initRender();


    }






    if(typeof initProgress === "function"){


        initProgress();


    }






    if(typeof loadTodayGoal === "function"){


        loadTodayGoal();


    }




}









// ==========================================
// 오늘 목표 저장
// ==========================================


document.addEventListener(

"input",

function(e){



    if(e.target.id === "todayGoalInput"){





        localStorage.setItem(

            "todayGoal",

            e.target.value

        );





    }



}

);









// ==========================================
// 앱 실행
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){



    initApp();



});
