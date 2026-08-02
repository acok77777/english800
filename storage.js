// storage.js

// ======================
// 저장
// ======================

export function save(key,data){

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}



// ======================
// 불러오기
// ======================

export function load(key){

    const data=

        localStorage.getItem(key);

    if(!data) return null;

    return JSON.parse(data);

}



// ======================
// 삭제
// ======================

export function remove(key){

    localStorage.removeItem(key);

}



// ======================
// 전체삭제
// ======================

export function clear(){

    localStorage.clear();

}



// ======================
// 존재확인
// ======================

export function exists(key){

    return localStorage.getItem(key)!=null;

}
