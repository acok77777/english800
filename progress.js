// =========================================
// progress.js
// 학습현황
// =========================================

'use strict';

// =========================================
// 진행률 업데이트
// =========================================

function updateProgress(){

    const total = words.length;

    const checked = getCheckedWords().length;

    const favorite = getFavoriteWords().length;

    const wrong = getWrongWords().length;

    const remain = total - checked;

    const percent = Math.round((checked / total) * 100);

    updateProgressText(checked,total);

    updateProgressBar(percent);

    updateCheckedCount(checked);

    updateRemainCount(remain);

    updateFavoriteCount(favorite);

    updateWrongWordCount(wrong);

    updatePercent(percent);

    updateFinishMessage(percent);

}

// =========================================
// 학습진도
// =========================================

function updateProgressText(checked,total){

    const el=document.getElementById("progressText");

    if(!el) return;

    el.textContent=

        `${checked} / ${total}`;

}

// =========================================
// 진행바
// =========================================

function updateProgressBar(percent){

    const bar=document.getElementById("progressBar");

    if(!bar) return;

    bar.style.width=percent+"%";

    bar.textContent=percent+"%";

}

// =========================================
// 외운 단어
// =========================================

function updateCheckedCount(count){

    const el=document.getElementById("checkedCount");

    if(!el) return;

    el.textContent=count;

}

// =========================================
// 남은 단어
// =========================================

function updateRemainCount(count){

    const el=document.getElementById("remainCount");

    if(!el) return;

    el.textContent=count;

}

// =========================================
// 즐겨찾기
// =========================================

function updateFavoriteCount(count){

    const el=document.getElementById("favoriteCount");

    if(!el) return;

    el.textContent=count;

}

// =========================================
// 오답
// =========================================

function updateWrongWordCount(count){

    const el=document.getElementById("wrongWordCount");

    if(!el) return;

    el.textContent=count;

}

// =========================================
// 진행률
// =========================================

function updatePercent(percent){

    const el=document.getElementById("percentText");

    if(!el) return;

    el.textContent=percent+"%";

}

// =========================================
// 완료메시지
// =========================================

function updateFinishMessage(percent){

    const el=document.getElementById("finishMessage");

    if(!el) return;

    if(percent===100){

        el.innerHTML="🎉 축하합니다! 800단어를 모두 학습했습니다.";

    }

    else if(percent>=80){

        el.innerHTML="🔥 거의 다 왔어요!";

    }

    else if(percent>=50){

        el.innerHTML="💪 절반 이상 완료했습니다.";

    }

    else if(percent>=20){

        el.innerHTML="📚 꾸준히 학습 중입니다.";

    }

    else{

        el.innerHTML="🌱 첫걸음을 시작했습니다.";

    }

}

// =========================================
// 오늘 학습 개수
// =========================================

function updateTodayCount(){

    const el=document.getElementById("todayCount");

    if(!el) return;

    if(!todayWords){

        el.textContent="0";

        return;

    }

    const checked=getCheckedWords();

    const count=todayWords.filter(id=>

        checked.includes(id)

    ).length;

    el.textContent=count;

}

// =========================================
// 전체 초기화
// =========================================

function refreshProgress(){

    updateProgress();

    updateTodayCount();

}

// =========================================
// 시작 시
// =========================================

window.addEventListener("DOMContentLoaded",()=>{

    refreshProgress();

});
