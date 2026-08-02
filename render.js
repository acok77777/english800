// render.js

const list=document.getElementById("wordList");
const view=document.getElementById("wordView");

export function renderList(words){

    list.innerHTML="";

    words.forEach(item=>{

        const div=document.createElement("div");

        div.className="word-item";

        div.onclick=()=>openWord(item.id);

        div.innerHTML=`
        <div class="num">${item.id}</div>
        <div class="eng">${item.word}</div>
        <div class="check">${item.checked?"✅":""}</div>
        `;

        list.appendChild(div);

    });

}



export function renderWord(item){

    view.innerHTML=`

    <div class="word-card">

        <div class="word-number">
            ${item.id} / 800
        </div>

        <div class="word-title">
            ${item.word}
        </div>

        <div class="word-pron">
            ${item.p}
        </div>

        <div class="word-mean">
            ${item.m}
        </div>

        <div class="btn-group">

            <button onclick="playWord()">
            🔊 듣기
            </button>

            <button onclick="toggleCheck()">
            ${item.checked?"✅ 암기완료":"☑ 체크"}
            </button>

        </div>

        <div class="move">

            <button onclick="prevWord()">
            ◀ 이전
            </button>

            <button onclick="nextWord()">
            다음 ▶
            </button>

        </div>

    </div>

    `;

}
