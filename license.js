/* ==========================================
   license.js
========================================== */

const LICENSE_KEYS = [
    "EN800-ABCD-1234",
    "EN800-EFGH-5678",
    "EN800-IJKL-9012",
    "EN800-MNOP-3456",
    "EN800-QRST-7890"
];

const LICENSE_STORAGE_KEY = "english800_license";

function isLicenseActivated() {
    return localStorage.getItem(LICENSE_STORAGE_KEY) === "true";
}

function saveLicense() {
    localStorage.setItem(LICENSE_STORAGE_KEY, "true");
}

function clearLicense() {
    localStorage.removeItem(LICENSE_STORAGE_KEY);
}

function checkLicense(key) {

    key = key.trim().toUpperCase();

    return LICENSE_KEYS.includes(key);

}

function activateLicense() {

    const input = document.getElementById("licenseInput");

    const message = document.getElementById("licenseMessage");

    const key = input.value;

    if (checkLicense(key)) {

        saveLicense();

        message.style.color = "#22aa44";

        message.innerText = "라이선스 인증 완료";

        setTimeout(() => {

            showMainPage();

        },800);

    } else {

        message.style.color = "#ff4444";

        message.innerText = "라이선스 키가 올바르지 않습니다.";

    }

}

function showLicensePage(){

    document.getElementById("licensePage").style.display="flex";

    document.getElementById("mainPage").style.display="none";

}

function showMainPage(){

    document.getElementById("licensePage").style.display="none";

    document.getElementById("mainPage").style.display="block";

}

function initLicense(){

    if(isLicenseActivated()){

        showMainPage();

    }else{

        showLicensePage();

    }

}

window.addEventListener("load",()=>{

    initLicense();

});
