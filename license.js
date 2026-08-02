// license.js

import { save, load } from "./storage.js";

const STORAGE_KEY = "english800_license";

// 테스트용 라이선스 5개
const LICENSE_KEYS = [
  "EN800-ABCD-1234",
  "EN800-EFGH-5678",
  "EN800-IJKL-9012",
  "EN800-MNOP-3456",
  "EN800-QRST-7890"
];

// 인증 여부 확인
export function isLicensed() {
  return load(STORAGE_KEY) === true;
}

// 라이선스 확인
export async function checkLicense() {

  if (isLicensed()) return true;

  const key = prompt("라이선스 키를 입력하세요.");

  if (!key) {
    alert("라이선스가 필요합니다.");
    return false;
  }

  const input = key.trim().toUpperCase();

  if (LICENSE_KEYS.includes(input)) {

    save(STORAGE_KEY, true);

    alert("인증되었습니다.");

    return true;

  }

  alert("잘못된 라이선스 키입니다.");

  return false;

}

// 라이선스 삭제
export function removeLicense() {

  localStorage.removeItem(STORAGE_KEY);

}
