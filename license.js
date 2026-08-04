/* ==========================================
   license.js

   초등 필수 영단어 800

   라이선스 관리

========================================== */



// 판매용 라이선스 키
// 나중에 구매자별로 변경 가능


const VALID_LICENSE_KEYS = [


    "ENGLISH800-2026-001",


    "ENGLISH800-2026-002",


    "ENGLISH800-2026-003"


];





const LICENSE_KEY_NAME =

"english800_license";









// ==========================================
// 앱 시작시 라이선스 확인
// ==========================================


function initLicense(){



    const saved =

    localStorage.getItem(

        LICENSE_KEY_NAME

    );







    if(saved){



        return true;



    }






    showLicenseScreen();




    return false;



}









// ==========================================
// 라이선스 입력 화면
// ==========================================


function showLicenseScreen(){



    const box = document.createElement(

        "div"

    );



    box.id="licenseScreen";





    box.innerHTML=`



<div class="license-box">


<h2>

🔐 라이선스 인증

</h2>



<p>

사용 전 라이선스 키를 입력해주세요.

</p>



<input

id="licenseInput"

placeholder="라이선스 키 입력">



<button

onclick="checkLicense()">

확인

</button>



<p id="licenseMessage">

</p>



</div>



`;





    document.body.appendChild(box);



}









// ==========================================
// 키 확인
// ==========================================


function checkLicense(){



    const input =

    document.getElementById(

        "licenseInput"

    );





    if(!input){

        return;

    }







    const key =

    input.value.trim();








    if(

    VALID_LICENSE_KEYS.includes(key)

    ){



        localStorage.setItem(

            LICENSE_KEY_NAME,

            key

        );





        document.getElementById(

            "licenseScreen"

        ).remove();






        alert(

        "인증 완료되었습니다 😊"

        );





        openTab("homePage");



    }

    else{



        document.getElementById(

            "licenseMessage"

        ).innerHTML=

        "❌ 올바른 라이선스 키가 아닙니다.";



    }



}









// ==========================================
// 라이선스 삭제
// ==========================================


function removeLicense(){



    localStorage.removeItem(

        LICENSE_KEY_NAME

    );



    alert(

    "라이선스가 초기화되었습니다."

    );



    location.reload();



}
