/* ==========================================
   script.js

   초등 필수 영단어 800
   메인 컨트롤러

========================================== */



/* ==========================================
   앱 초기화
========================================== */


function initApp(){


    console.log(

        "English800 App Start"

    );



    // 저장소 초기화

    if(typeof initStorage==="function"){

        initStorage();

    }



    // 백업 초기화

    if(typeof initBackup==="function"){

        initBackup();

    }



    // 라이선스 확인

    if(typeof initLicense==="function"){

        initLicense();

    }



    // 단어 출력

    if(typeof initRender==="function"){

        initRender();

    }



    // 검색

    if(typeof initSearch==="function"){

        initSearch();

    }



    // 진행률

    if(typeof initProgress==="function"){

        initProgress();

    }



    setupEvents();


}







/* ==========================================
   버튼 이벤트 연결
========================================== */


function setupEvents(){



    // 검색 버튼


    const searchBtn = document.getElementById(

        "searchBtn"

    );



    if(searchBtn){


        searchBtn.onclick=()=>{


            runSearch();


        };


    }





    // 검색 초기화


    const clearBtn = document.getElementById(

        "clearSearch"

    );



    if(clearBtn){


        clearBtn.onclick=()=>{


            clearSearch();


        };


    }






    // 전체 버튼


    const allBtn=document.getElementById(

        "allBtn"

    );



    if(allBtn){


        allBtn.onclick=()=>{


            renderAllWords();


        };


    }







    // 알파벳 버튼


    document

    .querySelectorAll(

        ".alphabet-btn"

    )

    .forEach(btn=>{


        btn.onclick=()=>{


            filterAlphabet(

                btn.dataset.letter

            );


        };


    });








    // 백업


    const backupBtn=document.getElementById(

        "backupBtn"

    );



    if(backupBtn){


        backupBtn.onclick=()=>{


            backupDownload();


        };


    }







    // 복원


    const restoreBtn=document.getElementById(

        "restoreBtn"

    );



    if(restoreBtn){


        restoreBtn.onclick=()=>{


            openBackupFile();


        };


    }






    // 퀴즈 버튼


    document

    .querySelectorAll(

        ".quiz-btn"

    )

    .forEach(btn=>{


        btn.onclick=()=>{


            startQuiz(

                btn.dataset.type

            );


        };


    });



}







/* ==========================================
   페이지 이동
========================================== */


function showPage(id){



    document

    .querySelectorAll(

        ".page"

    )

    .forEach(page=>{


        page.style.display="none";


    });



    const target=document.getElementById(id);



    if(target){


        target.style.display="block";


    }



}







/* ==========================================
   메뉴 이동
========================================== */


function openWordPage(){


    showPage(

        "wordPage"

    );


}



function openQuizPage(){


    showPage(

        "quizPage"

    );


}



function openProgressPage(){


    showPage(

        "progressPage"

    );


}







/* ==========================================
   앱 종료 전 저장
========================================== */


window.addEventListener(

"beforeunload",

()=>{


    if(typeof autoBackup==="function"){


        autoBackup();


    }


}

);







/* ==========================================
   실행
========================================== */


window.addEventListener(

"DOMContentLoaded",

()=>{


    initApp();


});
