// script.js (Part 1)

import { WORDS } from "./data.js";

import { renderList, renderWord } from "./render.js";

import { searchWords } from "./search.js";

import { startQuiz } from "./quiz.js";

import { speak } from "./speech.js";

import {

saveProgress,

loadProgress,

getProgress,

getCheckedCount

} from "./progress.js";

import {

checkLicense

} from "./license.js";

import {

exportBackup,

importBackup

} from "./backup.js";

import {

clickEffect,

showCard

} from "./effects.js";



let current=null;



// ===========================
// 앱 시작
// ===========================

window.addEventListener("DOMContentLoaded",async()=>{

    // 라이선스 확인

    const ok=await checkLicense();

    if(!ok) return;



    // 저장된 진도 불러오기

    const saved=loadProgress();

    if(saved){

        WORDS.forEach((w,index)=>{

            if(saved[index]){

                w.checked=saved[index].checked;

            }

        });

    }



    // 첫 목록 출력

    renderList(WORDS);



    // 첫 단어 표시

    if(WORDS.length>0){

        current=1;

        renderWord(WORDS[0]);

    }



    // 진행률

    updateProgress();



});



// ===========================
// 진행률
// ===========================

function updateProgress(){

    const bar=document.getElementById("progressBar");

    const text=document.getElementById("progressText");



    if(!bar||!text) return;



    const percent=getProgress(WORDS);



    bar.style.width=percent+"%";



    text.innerHTML=

    `${getCheckedCount(WORDS)} / ${WORDS.length} (${percent}%)`;

}
// ===========================
// 단어 열기
// ===========================

window.openWord=function(id){

    current=id;

    const word=WORDS.find(v=>v.id===id);

    if(!word) return;

    renderWord(word);

    showCard(document.getElementById("wordView"));

    localStorage.setItem("english800_last",id);

}



// ===========================
// 이전 단어
// ===========================

window.prevWord=function(){

    if(current<=1) return;

    openWord(current-1);

}



// ===========================
// 다음 단어
// ===========================

window.nextWord=function(){

    if(current>=WORDS.length) return;

    openWord(current+1);

}



// ===========================
// 체크
// ===========================

window.toggleCheck=function(){

    const word=WORDS.find(v=>v.id===current);

    if(!word) return;

    word.checked=!word.checked;

    saveProgress(WORDS);

    renderWord(word);

    updateProgress();

    const btn=document.querySelector(".check-btn");

    if(btn){

        clickEffect(btn);

    }

}



// ===========================
// 발음
// ===========================

window.playWord=function(){

    const word=WORDS.find(v=>v.id===current);

    if(!word) return;

    speak(word.word);

}



// ===========================
// 마지막 단어 열기
// ===========================

window.openLastWord=function(){

    const last=

        Number(localStorage.getItem("english800_last"));

    if(last){

        openWord(last);

    }

}
// ===========================
// 검색
// ===========================

window.search=function(){

    const keyword=document
        .getElementById("search")
        .value
        .trim();

    if(keyword===""){

        renderList(WORDS);

        return;

    }

    const result=searchWords(keyword);

    renderList(result);

}



// ===========================
// 퀴즈
// ===========================

window.startQuizMode=function(){

    startQuiz(WORDS);

}



// ===========================
// 백업
// ===========================

window.backup=function(){

    exportBackup();

}



// ===========================
// 복원
// ===========================

window.restore=function(file){

    if(!file) return;

    importBackup(file);

}



// ===========================
// 전체 초기화
// ===========================

window.resetAll=function(){

    if(!confirm("모든 진도와 설정을 삭제할까요?"))

        return;

    localStorage.clear();

    location.reload();

}



// ===========================
// 새로고침
// ===========================

window.refreshList=function(){

    renderList(WORDS);

    updateProgress();

}



// ===========================
// 체크한 단어만 보기
// ===========================

window.showChecked=function(){

    const result=

        WORDS.filter(v=>v.checked);

    renderList(result);

}



// ===========================
// 체크 안한 단어만 보기
// ===========================

window.showUnchecked=function(){

    const result=

        WORDS.filter(v=>!v.checked);

    renderList(result);

}



// ===========================
// 전체 보기
// ===========================

window.showAll=function(){

    renderList(WORDS);

}



// ===========================
// 처음으로
// ===========================

window.goHome=function(){

    renderList(WORDS);

    if(WORDS.length){

        openWord(1);

    }

}



// ===========================
// 단축키
// ===========================

document.addEventListener("keydown",e=>{

    if(e.key==="ArrowLeft"){

        prevWord();

    }

    else if(e.key==="ArrowRight"){

        nextWord();

    }

    else if(e.key==="Enter"){

        search();

    }

});
