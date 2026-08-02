import { WORDS } from "./data.js";
import { renderList, renderWord } from "./render.js";
import { searchWords } from "./search.js";
import { startQuiz } from "./quiz.js";
import { speak } from "./speech.js";
import { saveProgress, loadProgress } from "./progress.js";

let current = null;

// 앱 시작
window.addEventListener("DOMContentLoaded", () => {

    // 저장된 체크 불러오기
    const saved = loadProgress();

    if(saved){
        WORDS.forEach(w=>{
            w.checked = saved[w.id] || false;
        });
    }

    // 첫 화면
    renderList(WORDS);

});

// ======================
// 목록 클릭
// ======================

window.openWord = function(id){

    current=id;

    const word = WORDS.find(v=>v.id==id);

    renderWord(word);

}

// ======================
// 체크
// ======================

window.toggleCheck=function(){

    if(current==null)return;

    const word=WORDS.find(v=>v.id==current);

    word.checked=!word.checked;

    saveProgress(WORDS);

    renderWord(word);

}

// ======================
// 이전
// ======================

window.prevWord=function(){

    if(current<=1)return;

    openWord(current-1);

}

// ======================
// 다음
// ======================

window.nextWord=function(){

    if(current>=WORDS.length)return;

    openWord(current+1);

}

// ======================
// 발음
// ======================

window.playWord=function(){

    if(current==null)return;

    const word=WORDS.find(v=>v.id==current);

    speak(word.word);

}

// ======================
// 검색
// ======================

window.search=function(){

    const text=document.getElementById("search").value;

    const result=searchWords(text);

    renderList(result);

}

// ======================
// 퀴즈
// ======================

window.startQuiz=function(){

    startQuiz(WORDS);

}
