// progress.js

import { save, load } from "./storage.js";

const KEY="english800_progress";



// 저장
export function saveProgress(words){

    save(KEY,words);

}



// 불러오기
export function loadProgress(){

    return load(KEY);

}



// 암기 완료 개수
export function getCheckedCount(words){

    return words.filter(v=>v.checked).length;

}



// 암기 안한 개수
export function getUncheckedCount(words){

    return words.filter(v=>!v.checked).length;

}



// 진행률(%)
export function getProgress(words){

    if(words.length===0) return 0;

    return Math.round(

        getCheckedCount(words)

        /words.length

        *100

    );

}



// 전체 초기화
export function resetProgress(words){

    words.forEach(v=>{

        v.checked=false;

    });

    saveProgress(words);

}
