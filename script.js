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
        "English800 Start"
    );



    // 저장 초기화

    if(typeof initStorage === "function"){

        initStorage();

    }




    // 라이선스

    if(typeof initLicense === "function"){

        initLicense();

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





    setupEvents();


}







/* ==========================================
   화면 전환
========================================== */


function openTab(tabName){



    document

    .querySelectorAll(

        ".content-page"

    )

    .forEach(page=>{


        page.style.display="none";


    });





    const target = document.getElementById(

        tabName

    );





    if(target){


        target.style.display="block";


    }






    // 퀴즈 화면

    if(tabName==="quizPage"){


        const box=document.getElementById(

            "quizBox"

        );


        if(box){


            box.innerHTML="";


        }


    }






    // 오답노트

    if(tabName==="wrongPage"){


        renderWrongWords();


    }



}








/* ==========================================
   버튼 연결
========================================== */


function setupEvents(){



    // 검색


    const searchBtn=document.getElementById(

        "searchBtn"

    );



    if(searchBtn){


        searchBtn.onclick=()=>{


            runSearch();


        };


    }






    // 전체 보기


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

    .forEach(button=>{


        button.onclick=()=>{


            filterAlphabet(

                button.dataset.letter

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







}









/* ==========================================
   페이지 처음 실행
========================================== */


window.addEventListener(

"DOMContentLoaded",

()=>{


    initApp();


});
