/* ==========================================
   script.js

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


        page.style.display="none";


    });







    const target = document.getElementById(

        pageId

    );





    if(target){


        target.style.display="block";


    }








    // 단어 화면


    if(pageId==="wordPage"){



        if(typeof renderAllWords==="function"){


            renderAllWords();


        }


    }








    // 퀴즈 화면


    if(pageId==="quizPage"){



        if(typeof updateProgressDashboard==="function"){


            updateProgressDashboard();


        }



        if(typeof loadTodayGoal==="function"){


            loadTodayGoal();


        }


    }








    // 오답노트


    if(pageId==="wrongPage"){



        if(typeof renderWrongWords==="function"){


            renderWrongWords();


        }


    }








    // 기록


    if(pageId==="historyPage"){



        if(typeof renderHistory==="function"){


            renderHistory();


        }


    }



}









// ==========================================
// 앱 초기 실행
// ==========================================


function initApp(){



    console.log(

        "English800 시작"

    );







    // 라이선스 확인


    let licenseOK = true;





    if(typeof initLicense==="function"){



        licenseOK = initLicense();



    }







    // 라이선스 없으면 여기서 멈춤


    if(!licenseOK){



        return;


    }








    openTab(

        "homePage"

    );








    if(typeof initRender==="function"){


        initRender();


    }








    if(typeof initProgress==="function"){


        initProgress();


    }






    if(typeof loadTodayGoal==="function"){


        loadTodayGoal();


    }



}











// ==========================================
// 오늘 목표 저장
// ==========================================


document.addEventListener(

"input",

function(e){





    if(e.target.id==="todayGoalInput"){





        localStorage.setItem(

            "todayGoal",

            e.target.value

        );







        const quizGoal =

        document.getElementById(

            "quizGoalText"

        );







        if(quizGoal){


            quizGoal.innerText =

            e.target.value;


        }



    }




}

);











// ==========================================
// 앱 시작
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){



    initApp();



});
