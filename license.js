/* ==========================================
   license.js

   초등 필수 영단어 800

   라이선스 관리 시스템

========================================== */





// 저장 키


const LICENSE_KEY_NAME =

"english800_license_key";



const LICENSE_DATA_NAME =

"english800_license_data";









// 앱 정보


const APP_INFO = {



    appName:

    "초등 필수 영단어 800",



    version:

    "1.0.0",



    developer:

    "English800",



    licenseType:

    "Standard"



};









/* ==========================================
   라이선스 확인
========================================== */


function isLicensed(){



    const key =

    localStorage.getItem(

        LICENSE_KEY_NAME

    );




    if(!key){


        return false;


    }





    return verifyLicenseKey(key);



}









/* ==========================================
   라이선스 키 가져오기
========================================== */


function getLicenseKey(){



    return localStorage.getItem(

        LICENSE_KEY_NAME

    ) || "";



}









/* ==========================================
   라이선스 저장
========================================== */


function saveLicenseKey(key){



    localStorage.setItem(

        LICENSE_KEY_NAME,

        key

    );



    saveLicenseData();



}









/* ==========================================
   라이선스 데이터 저장
========================================== */


function saveLicenseData(){



    const data = {



        app:

        APP_INFO.appName,



        version:

        APP_INFO.version,



        licensedDate:

        new Date()

        .toISOString(),



        key:

        getLicenseKey()



    };





    localStorage.setItem(

        LICENSE_DATA_NAME,

        JSON.stringify(data)

    );



}









/* ==========================================
   라이선스 정보 불러오기
========================================== */


function getLicenseData(){



    const data =

    localStorage.getItem(

        LICENSE_DATA_NAME

    );





    if(!data){


        return null;


    }





    try{


        return JSON.parse(data);


    }


    catch(e){


        return null;


    }



}









/* ==========================================
   라이선스 키 검증

   예:

   ENG800-XXXX-XXXX

========================================== */


function verifyLicenseKey(key){



    if(!key || typeof key !== "string"){


        return false;


    }





    // 최소 길이 확인


    if(key.length < 10){


        return false;


    }





    // ENG800 포함 확인


    if(!key.includes("ENG800")){


        return false;


    }





    return true;



}









/* ==========================================
   라이선스 입력
========================================== */


function openLicenseInput(){



    const key = prompt(


        "라이선스 키를 입력하세요.\n\n예: ENG800-XXXX-XXXX"


    );





    if(!key){


        return;


    }







    if(verifyLicenseKey(key)){



        saveLicenseKey(key);





        alert(

        "라이선스 인증이 완료되었습니다 😊"

        );





        location.reload();



    }

    else{



        alert(

        "올바른 라이선스 키가 아닙니다."

        );



    }



}









/* ==========================================
   라이선스 삭제
========================================== */


function clearLicense(){



    const result = confirm(


        "라이선스를 삭제하시겠습니까?"

    );





    if(result){



        localStorage.removeItem(

            LICENSE_KEY_NAME

        );



        localStorage.removeItem(

            LICENSE_DATA_NAME

        );





        alert(

        "라이선스가 삭제되었습니다."

        );





        location.reload();



    }



}









/* ==========================================
   상태 표시
========================================== */


function getLicenseStatusText(){



    if(isLicensed()){



        return "✅ 라이선스 인증됨";



    }

    else{



        return "❌ 라이선스 미인증";



    }



}









/* ==========================================
   초기 실행
========================================== */


function initLicense(){



    console.log(

    "License Ready"

    );



}
