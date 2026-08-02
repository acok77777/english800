// license.js

import { save, load } from "./storage.js";

const KEY="english800_license";

// 사용할 라이선스 키
const LICENSES=[

"EN800-2026-1001",
"EN800-2026-1002",
"EN800-2026-1003",
"EN800-2026-1004",
"EN800-2026-1005"

];



// 이미 인증되었는지 확인
export function isLicensed(){

    return load(KEY)===true;

}



// 인증창
export function checkLicense(){

    if(isLicensed()) return true;

    const code=prompt(

"라이선스 키를 입력하세요."

    );

    if(!code){

        alert("라이선스가 필요합니다.");

        location.reload();

        return false;

    }

    if(LICENSES.includes(code.trim())){

        save(KEY,true);

        alert("인증되었습니다.");

        return true;

    }

    alert("잘못된 라이선스입니다.");

    location.reload();

    return false;

}



// 인증 삭제
export function removeLicense(){

    localStorage.removeItem(KEY);

}
