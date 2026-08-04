/* ==========================================
   script.js

   초등 필수 영단어 800

   메인 제어 파일

========================================== */






// ==========================================
// 화면 전환
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






    // 화면별 실행


    if(pageId==="wordPage"){



        if(typeof renderAllWords==="function"){


            renderAllWords();


        }



    }







    if(pageId==="wrongPage"){



        if(typeof renderWrongWords==="function"){


            renderWrongWords();


        }


    }







    if(pageId==="historyPage"){



        if(typeof renderHistory==="function"){


            renderHistory();


        }


    }





    if(pageId==="quizPage"){



        if(typeof updateProgressDashboard==="function"){


            updateProgressDashboard();


        }



        if(typeof loadTodayGoal==="function"){


            loadTodayGoal();


        }



    }



}












// ==========================================
// 앱 시작
// ==========================================


function initApp(){



    console.log(

        "English800 Start"

    );







    // 라이선스 확인


    if(typeof initLicense==="function"){


        initLicense();


    }






    // 기본 화면


    openTab(

        "homePage"

    );






    // 진행률


    if(typeof initProgress==="function"){


        initProgress();


    }







    // 단어 렌더 준비


    if(typeof initRender==="function"){


        initRender();


    }



}











// ==========================================
// 오늘 목표 입력 저장
// ==========================================


document.addEventListener(

"input",

function(e){



    if(

    e.target.id==="todayGoalInput"

    ){



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
// 페이지 로딩
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){



    initApp();



}

);
