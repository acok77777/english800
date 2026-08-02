/* ==========================================
   script.js

   초등 필수 영단어 800
   메인 컨트롤러

========================================== */



/* ==========================================
   앱 시작
========================================== */


function initApp(){


    console.log(
        "English800 App Start"
    );



    // 저장 초기화

    if(typeof initStorage === "function"){

        initStorage();

    }



    // 단어 출력

    if(typeof initRender === "function"){

        initRender();

    }



    // 검색

    if(typeof initSearch === "function"){

        initSearch();

    }



    // 진행률

    if(typeof initProgress === "function"){

        initProgress();

    }



    updateDashboard();



    setupEvents();


}







/* ==========================================
   탭 이동
========================================== */


function openTab(tabName){



    document

    .querySelectorAll(

        ".content-page"

    )

    .forEach(page=>{


        page.style.display="none";


    });




    const page = document.getElementById(

        tabName

    );



    if(page){


        page.style.display="block";


    }





    // 퀴즈 선택 화면

    if(tabName==="quizPage"){



        const box=document.getElementById(

            "quizBox"

        );



        if(box){


            box.innerHTML=`

            <h3>
            🎮 퀴즈 종류를 선택하세요
            </h3>

            `;


        }


    }






    // 오답노트

    if(tabName==="wrongPage"){


        if(typeof renderWrongWords==="function"){


            renderWrongWords();


        }


    }



}








/* ==========================================
   대시보드 업데이트
========================================== */


function updateDashboard(){



    if(typeof getLearningProgress==="function"){



        const progress = getLearningProgress();




        const box = document.getElementById(

            "completedCount"

        );



        if(box){


            box.innerText =

            progress.completed +

            " / 800";


        }


    }






    if(typeof getStreakDays==="function"){



        const streak=document.getElementById(

            "streakDays"

        );



        if(streak){


            streak.innerText =

            getStreakDays()+"일";


        }


    }







    const today=document.getElementById(

        "todayGoal"

    );



    if(today && typeof getTodayStudyCount==="function"){


        today.innerText =

        getTodayStudyCount()+"개";


    }





    if(typeof renderProgress==="function"){


        renderProgress();


    }



}








/* ==========================================
   이벤트 연결
========================================== */


function setupEvents(){



    // 검색 버튼


    const searchBtn=document.getElementById(

        "searchBtn"

    );



    if(searchBtn){


        searchBtn.onclick=function(){


            runSearch();


        };


    }








    // 전체 보기


    const allBtn=document.getElementById(

        "allBtn"

    );



    if(allBtn){


        allBtn.onclick=function(){


            renderAllWords();


        };


    }








    // 알파벳 버튼


    document

    .querySelectorAll(

        ".alphabet-btn"

    )

    .forEach(btn=>{


        btn.onclick=function(){


            filterAlphabet(

                btn.dataset.letter

            );


        };


    });



}









/* ==========================================
   체크 후 갱신
========================================== */


function refreshApp(){



    updateDashboard();



}







/* ==========================================
   시작
========================================== */


window.addEventListener(

"DOMContentLoaded",

()=>{


    initApp();


});
