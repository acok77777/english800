// =========================================
// license.js
// English800 License
// =========================================

'use strict';

const LICENSE_KEY = "english800_license";
const LICENSE_VERSION = "1.0";

// =========================================
// 허용 라이선스
// (판매 시 여기 추가)
// =========================================

const VALID_LICENSES = [

    "ENG800-2026-ABCD-1234",
    "ENG800-2026-EFGH-5678",
    "ENG800-2026-IJKL-9012"

];

// =========================================
// 시작
// =========================================

window.addEventListener("DOMContentLoaded",()=>{

    checkLicense();

});

// =========================================
// 라이선스 확인
// =========================================

function checkLicense(){

    const key = localStorage.getItem(LICENSE_KEY);

    if(key && VALID_LICENSES.includes(key)){

        hideLicenseScreen();

        return;

    }

    showLicenseScreen();

}

// =========================================
// 입력
// =========================================

function submitLicense(){

    const input=document.getElementById("licenseInput");

    if(!input) return;

    const key=input.value.trim();

    if(VALID_LICENSES.includes(key)){

        localStorage.setItem(

            LICENSE_KEY,

            key

        );

        alert("✅ 라이선스 인증 완료");

        hideLicenseScreen();

    }

    else{

        alert("❌ 잘못된 라이선스입니다.");

    }

}

// =========================================
// 화면
// =========================================

function showLicenseScreen(){

    const screen=document.getElementById(

        "licenseScreen"

    );

    if(screen){

        screen.style.display="flex";

    }

}

// =========================================
// 숨기기
// =========================================

function hideLicenseScreen(){

    const screen=document.getElementById(

        "licenseScreen"

    );

    if(screen){

        screen.style.display="none";

    }

}

// =========================================
// 삭제
// =========================================

function removeLicense(){

    if(confirm("라이선스를 삭제할까요?")){

        localStorage.removeItem(

            LICENSE_KEY

        );

        location.reload();

    }

}

// =========================================
// 정보
// =========================================

function showLicenseInfo(){

    alert(

`초등 필수 영단어 800

Version ${LICENSE_VERSION}

Licensed

© 2026`

    );

}

// =========================================
// 현재 키
// =========================================

function currentLicense(){

    return localStorage.getItem(

        LICENSE_KEY

    );

}
