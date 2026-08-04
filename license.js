/* ==========================================
   초기 실행
========================================== */


function initLicense(){


    console.log(
        "License Check"
    );



    // 이미 인증된 경우 앱 실행

    if(isLicensed()){

        return;

    }



    // 미인증이면 입력창 표시

    setTimeout(()=>{


        openLicenseInput();


    },300);



}
