// =========================================
// search.js
// 검색 기능
// =========================================

'use strict';

// ===============================
// 검색
// ===============================

function searchWords(keyword){

    keyword = keyword.trim().toLowerCase();

    if(keyword===""){

        renderWordList(words);

        updateSearchCount(words.length);

        return;

    }

    const result = words.filter(item=>{

        return(

            item.word.toLowerCase().includes(keyword)

            ||

            item.meaning.includes(keyword)

            ||

            String(item.id).includes(keyword)

        );

    });

    renderWordList(result);

    updateSearchCount(result.length);

}

// ===============================
// 검색창 이벤트
// ===============================

function initSearch(){

    const input=document.getElementById("searchInput");

    if(!input) return;

    input.addEventListener("input",()=>{

        searchWords(input.value);

    });

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            searchWords(input.value);

        }

    });

}

// ===============================
// 검색 초기화
// ===============================

function clearSearch(){

    const input=document.getElementById("searchInput");

    if(input){

        input.value="";

    }

    renderWordList(words);

    updateSearchCount(words.length);

}

// ===============================
// 검색 결과 개수
// ===============================

function updateSearchCount(count){

    const el=document.getElementById("searchCount");

    if(!el) return;

    el.textContent=`검색결과 : ${count}개`;

}

// ===============================
// 영어만 검색
// ===============================

function searchEnglish(keyword){

    keyword=keyword.trim().toLowerCase();

    const list=words.filter(item=>

        item.word.toLowerCase().includes(keyword)

    );

    renderWordList(list);

    updateSearchCount(list.length);

}

// ===============================
// 뜻만 검색
// ===============================

function searchMeaning(keyword){

    keyword=keyword.trim();

    const list=words.filter(item=>

        item.meaning.includes(keyword)

    );

    renderWordList(list);

    updateSearchCount(list.length);

}

// ===============================
// 번호 검색
// ===============================

function searchNumber(number){

    const id=parseInt(number);

    if(isNaN(id)) return;

    const list=words.filter(item=>item.id===id);

    renderWordList(list);

    updateSearchCount(list.length);

}

// ===============================
// 검색 종료
// ===============================

function exitSearch(){

    clearSearch();

}

// ===============================
// 페이지 시작
// ===============================

window.addEventListener("DOMContentLoaded",()=>{

    initSearch();

});
