// =========================================
// render.js
// 화면 출력
// =========================================

'use strict';

// ==============================
// 단어 목록 출력
// ==============================

function renderWordList(list = words) {

    const tbody = document.getElementById("wordList");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (list.length === 0) {

        tbody.innerHTML = `
        <tr>
            <td colspan="6" class="empty">
                검색 결과가 없습니다.
            </td>
        </tr>
        `;

        return;

    }

    list.forEach(item => {

        const tr = document.createElement("tr");

        const checked = isChecked(item.id);
        const favorite = isFavorite(item.id);

        tr.innerHTML = `

        <td>

            <input
                type="checkbox"
                ${checked ? "checked" : ""}
                onchange="toggleCheck(${item.id})">

        </td>

        <td>${item.id}</td>

        <td class="word">

            ${item.word}

        </td>

        <td>

            <button
                class="speaker-btn"
                onclick="speak('${item.word}')">

                🔊

            </button>

        </td>

        <td>

            ${item.meaning}

        </td>

        <td>

            <button
                class="favorite-btn"
                onclick="toggleFavorite(${item.id})">

                ${favorite ? "⭐" : "☆"}

            </button>

        </td>

        `;

        tbody.appendChild(tr);

    });

}

// ==============================
// 전체보기
// ==============================

function showAllWords() {

    renderWordList(words);

}

// ==============================
// 알파벳 분류
// ==============================

function showAlphabet(letter) {

    if (letter === "ALL") {

        renderWordList(words);

        return;

    }

    const list = words.filter(item => {

        return item.word
            .toUpperCase()
            .startsWith(letter);

    });

    renderWordList(list);

}

// ==============================
// 체크한 단어만
// ==============================

function showCheckedWords() {

    const list = words.filter(item => isChecked(item.id));

    renderWordList(list);

}

// ==============================
// 안 외운 단어
// ==============================

function showUncheckedWords() {

    const list = words.filter(item => !isChecked(item.id));

    renderWordList(list);

}

// ==============================
// 즐겨찾기
// ==============================

function showFavoriteWords() {

    const list = words.filter(item => isFavorite(item.id));

    renderWordList(list);

}

// ==============================
// 틀린 단어
// ==============================

function showWrongWords() {

    const wrong = getWrongWords();

    const list = words.filter(item => {

        return wrong.includes(item.id);

    });

    renderWordList(list);

}

// ==============================
// 오늘의 20단어
// ==============================

function updateTodayWords() {

    if (!todayWords || todayWords.length === 0) return;

    const list = words.filter(item => {

        return todayWords.includes(item.id);

    });

    renderWordList(list);

}

// ==============================
// 랜덤 20단어
// ==============================

function showRandomWords() {

    const shuffled = [...words];

    shuffled.sort(() => Math.random() - 0.5);

    renderWordList(shuffled.slice(0,20));

}

// ==============================
// 번호 이동
// ==============================

function moveToWord(id){

    const row=document.querySelector(`[data-id='${id}']`);

    if(row){

        row.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

}

// ==============================
// 새로고침
// ==============================

function refreshWordList(){

    renderWordList(words);

}
