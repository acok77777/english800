// =========================================
// quiz.js
// 초등 필수 영단어 800
// Quiz Engine
// =========================================

'use strict';

// ==============================
// 전역변수
// ==============================

let quizList = [];
let currentQuiz = 0;
let score = 0;

let quizMode = "engKor";

let quizCount = 20;

let currentAnswer = "";

let wrongList = [];

let currentHint = 0;

// ==============================
// 퀴즈 시작
// ==============================

function startQuizGame(mode){

    quizMode = mode;

    score = 0;

    currentQuiz = 0;

    wrongList = [];

    currentHint = 0;

    createQuizList();

    showQuiz();

}

// ==============================
// 문제목록 생성
// ==============================

function createQuizList(){

    let source = [...words];

    source.sort(()=>Math.random()-0.5);

    quizList = source.slice(0,quizCount);

}

// ==============================
// 문제수 변경
// ==============================

function setQuizCount(count){

    quizCount = Number(count);

}

// ==============================
// 문제출력
// ==============================

function showQuiz(){

    if(currentQuiz>=quizList.length){

        finishQuiz();

        return;

    }

    currentHint=0;

    const q=quizList[currentQuiz];

    document.getElementById("quizNumber").textContent=

        `${currentQuiz+1} / ${quizList.length}`;

    switch(quizMode){

        case "engKor":

            showEnglishMeaningQuiz(q);

            break;

        case "korEng":

            showMeaningEnglishQuiz(q);

            break;

        case "listen":

            showListeningQuiz(q);

            break;

        case "spell":

            showSpellingQuiz(q);

            break;

    }

}

// ==============================
// 다음문제
// ==============================

function nextQuiz(){

    currentQuiz++;

    showQuiz();

}

// ==============================
// 이전문제
// ==============================

function prevQuiz(){

    if(currentQuiz>0){

        currentQuiz--;

        showQuiz();

    }

}

// ==============================
// 점수
// ==============================

function updateScore(){

    document.getElementById("quizScore").textContent=

        score;

}

// ==============================
// 진행률
// ==============================

function updateQuizProgress(){

    const bar=document.getElementById("quizProgress");

    if(!bar) return;

    const percent=

        ((currentQuiz)/quizList.length)*100;

    bar.style.width=percent+"%";

}

// ==============================
// 랜덤보기
// ==============================

function shuffle(array){

    return array.sort(()=>Math.random()-0.5);

}

// ==============================
// 보기생성
// ==============================

function getRandomChoices(answer,type){

    let list=[];

    if(type==="meaning"){

        list=

            words.map(w=>w.meaning);

    }

    else{

        list=

            words.map(w=>w.word);

    }

    list=list.filter(v=>v!==answer);

    list=shuffle(list);

    list=list.slice(0,3);

    list.push(answer);

    return shuffle(list);

}
// =========================================
// 영어 → 뜻
// =========================================

function showEnglishMeaningQuiz(q){

    currentAnswer=q.meaning;

    document.getElementById("quizQuestion").innerHTML=`

        <h2>${q.word}</h2>

    `;

    const choices=getRandomChoices(q.meaning,"meaning");

    renderChoiceButtons(choices);

}

// =========================================
// 뜻 → 영어
// =========================================

function showMeaningEnglishQuiz(q){

    currentAnswer=q.word;

    document.getElementById("quizQuestion").innerHTML=`

        <h2>${q.meaning}</h2>

    `;

    const choices=getRandomChoices(q.word,"word");

    renderChoiceButtons(choices);

}

// =========================================
// 보기 출력
// =========================================

function renderChoiceButtons(list){

    const area=document.getElementById("quizChoices");

    area.innerHTML="";

    list.forEach(choice=>{

        const btn=document.createElement("button");

        btn.className="quiz-choice";

        btn.textContent=choice;

        btn.onclick=()=>{

            checkChoice(choice,btn);

        };

        area.appendChild(btn);

    });

}

// =========================================
// 정답 확인
// =========================================

function checkChoice(choice,button){

    const buttons=document.querySelectorAll(".quiz-choice");

    buttons.forEach(btn=>btn.disabled=true);

    if(choice===currentAnswer){

        button.classList.add("correct");

        score++;

        updateScore();

    }

    else{

        button.classList.add("wrong");

        buttons.forEach(btn=>{

            if(btn.textContent===currentAnswer){

                btn.classList.add("correct");

            }

        });

        saveWrongWord(quizList[currentQuiz].id);

        wrongList.push(quizList[currentQuiz]);

    }

    updateQuizProgress();

    setTimeout(()=>{

        nextQuiz();

    },1000);

}

// =========================================
// 정답 여부
// =========================================

function isCorrect(answer){

    return answer===currentAnswer;

}

// =========================================
// 정답표시
// =========================================

function showCorrectAnswer(){

    const buttons=document.querySelectorAll(".quiz-choice");

    buttons.forEach(btn=>{

        if(btn.textContent===currentAnswer){

            btn.classList.add("correct");

        }

    });

}

// =========================================
// 오답표시
// =========================================

function showWrongAnswer(button){

    button.classList.add("wrong");

}

// =========================================
// 버튼 비활성
// =========================================

function disableChoices(){

    document.querySelectorAll(".quiz-choice").forEach(btn=>{

        btn.disabled=true;

    });

}

// =========================================
// 버튼 활성
// =========================================

function enableChoices(){

    document.querySelectorAll(".quiz-choice").forEach(btn=>{

        btn.disabled=false;

    });

}
// =========================================
// 발음 듣고 단어 맞추기
// =========================================

function showListeningQuiz(q){

    currentAnswer = q.word;

    document.getElementById("quizQuestion").innerHTML = `

        <h2>🔊 발음을 듣고 알맞은 단어를 선택하세요.</h2>

        <button class="listen-btn"
            onclick="speakWord('${q.word}')">

            🔊 다시 듣기

        </button>

    `;

    speakWord(q.word);

    const choices = getRandomChoices(q.word,"word");

    renderChoiceButtons(choices);

}

// =========================================
// 철자쓰기
// =========================================

function showSpellingQuiz(q){

    currentAnswer=q.word;

    document.getElementById("quizQuestion").innerHTML=`

        <h2>${q.meaning}</h2>

        <button class="listen-btn"

            onclick="speakWord('${q.word}')">

            🔊 듣기

        </button>

        <br><br>

        <input

            id="spellInput"

            class="spell-input"

            placeholder="영어 철자를 입력하세요"

            autocomplete="off"

        >

        <br><br>

        <button

            onclick="submitSpelling()">

            제출

        </button>

        <button

            onclick="showHint()">

            힌트

        </button>

        <div id="hintArea"></div>

    `;

    setTimeout(()=>{

        const input=document.getElementById("spellInput");

        if(input){

            input.focus();

        }

    },100);

}

// =========================================
// 철자 제출
// =========================================

function submitSpelling(){

    const input=document.getElementById("spellInput");

    if(!input) return;

    const answer=input.value.trim().toLowerCase();

    if(answer===currentAnswer.toLowerCase()){

        score++;

        updateScore();

        input.classList.add("correct");

    }

    else{

        input.classList.add("wrong");

        saveWrongWord(quizList[currentQuiz].id);

        wrongList.push(quizList[currentQuiz]);

        alert(

            "❌ 정답 : "+currentAnswer

        );

    }

    updateQuizProgress();

    setTimeout(()=>{

        nextQuiz();

    },1000);

}

// =========================================
// Enter 제출
// =========================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        const input=document.getElementById("spellInput");

        if(input){

            submitSpelling();

        }

    }

});

// =========================================
// 힌트
// =========================================

function showHint(){

    const area=document.getElementById("hintArea");

    if(!area) return;

    currentHint++;

    if(currentHint>currentAnswer.length){

        currentHint=currentAnswer.length;

    }

    area.textContent=

        currentAnswer.substring(0,currentHint)

        +

        "_".repeat(

            currentAnswer.length-currentHint

        );

}

// =========================================
// 입력 초기화
// =========================================

function clearSpellInput(){

    const input=document.getElementById("spellInput");

    if(input){

        input.value="";

        input.classList.remove("correct");

        input.classList.remove("wrong");

    }

}

// =========================================
// 다시 듣기
// =========================================

function replaySound(){

    speakWord(currentAnswer);

}
// =========================================
// 퀴즈 옵션
// =========================================

let quizSource = "all";

// =========================================
// 전체 단어
// =========================================

function useAllWords(){

    quizSource="all";

}

// =========================================
// 외운 단어
// =========================================

function useCheckedWords(){

    quizSource="checked";

}

// =========================================
// 안 외운 단어
// =========================================

function useUncheckedWords(){

    quizSource="unchecked";

}

// =========================================
// 즐겨찾기
// =========================================

function useFavoriteWords(){

    quizSource="favorite";

}

// =========================================
// 틀린 단어
// =========================================

function useWrongWords(){

    quizSource="wrong";

}

// =========================================
// 문제 생성
// =========================================

function createQuizList(){

    let source=[];

    switch(quizSource){

        case "checked":

            source=words.filter(w=>isChecked(w.id));

            break;

        case "unchecked":

            source=words.filter(w=>!isChecked(w.id));

            break;

        case "favorite":

            source=words.filter(w=>isFavorite(w.id));

            break;

        case "wrong":

            const wrong=getWrongWords();

            source=words.filter(w=>wrong.includes(w.id));

            break;

        default:

            source=[...words];

    }

    if(source.length===0){

        alert("선택한 단어가 없습니다.");

        source=[...words];

    }

    source=shuffle(source);

    if(quizCount==="ALL"){

        quizList=source;

    }

    else{

        quizList=source.slice(0,Number(quizCount));

    }

}

// =========================================
// 문제수
// =========================================

function quiz10(){

    quizCount=10;

}

function quiz20(){

    quizCount=20;

}

function quiz50(){

    quizCount=50;

}

function quiz100(){

    quizCount=100;

}

function quizAll(){

    quizCount="ALL";

}

// =========================================
// 옵션 표시
// =========================================

function updateQuizOption(){

    const el=document.getElementById("quizOption");

    if(!el) return;

    let text="";

    switch(quizSource){

        case "all":

            text="전체 단어";

            break;

        case "checked":

            text="외운 단어";

            break;

        case "unchecked":

            text="안 외운 단어";

            break;

        case "favorite":

            text="즐겨찾기";

            break;

        case "wrong":

            text="틀린 단어";

            break;

    }

    el.textContent=

        `출제 : ${text} / 문제수 : ${quizCount}`;

}

// =========================================
// 랜덤 재생성
// =========================================

function reshuffleQuiz(){

    createQuizList();

    currentQuiz=0;

    score=0;

    updateScore();

    showQuiz();

}

// =========================================
// 퀴즈 다시 시작
// =========================================

function restartQuiz(){

    currentQuiz=0;

    score=0;

    wrongList=[];

    createQuizList();

    updateScore();

    showQuiz();

}
// =========================================
// 퀴즈 종료
// =========================================

function finishQuiz(){

    saveBestScore();

    showQuizResult();

}

// =========================================
// 결과 화면
// =========================================

function showQuizResult(){

    const total = quizList.length;

    const correct = score;

    const wrong = total - correct;

    const rate = Math.round((correct / total) * 100);

    let star = "";

    if(rate >= 95){

        star="⭐⭐⭐⭐⭐";

    }

    else if(rate >= 85){

        star="⭐⭐⭐⭐";

    }

    else if(rate >= 70){

        star="⭐⭐⭐";

    }

    else if(rate >= 50){

        star="⭐⭐";

    }

    else{

        star="⭐";

    }

    document.getElementById("quizArea").innerHTML = `

        <div class="quiz-result">

            <h2>🎉 퀴즈 완료</h2>

            <h3>${star}</h3>

            <br>

            <p>총 문제 : ${total}</p>

            <p>정답 : ${correct}</p>

            <p>오답 : ${wrong}</p>

            <p>정답률 : ${rate}%</p>

            <br>

            <button onclick="restartQuiz()">

                다시 풀기

            </button>

            <button onclick="showWrongNote()">

                오답노트

            </button>

            <button onclick="goWordBook()">

                단어장

            </button>

        </div>

    `;

}

// =========================================
// 최고점 저장
// =========================================

function saveBestScore(){

    const total = quizList.length;

    const rate = Math.round((score/total)*100);

    const best = Number(

        localStorage.getItem("bestQuizScore") || 0

    );

    if(rate > best){

        localStorage.setItem(

            "bestQuizScore",

            rate

        );

    }

}

// =========================================
// 최고점 읽기
// =========================================

function getBestScore(){

    return Number(

        localStorage.getItem("bestQuizScore") || 0

    );

}

// =========================================
// 최고점 표시
// =========================================

function updateBestScore(){

    const el=document.getElementById("bestScore");

    if(!el) return;

    el.textContent=

        "🏆 최고점 : "

        +getBestScore()

        +"%";

}

// =========================================
// 정답률
// =========================================

function getCorrectRate(){

    return Math.round(

        (score/quizList.length)*100

    );

}

// =========================================
// 결과창 닫기
// =========================================

function closeQuizResult(){

    document.getElementById("quizArea").style.display="none";

}

// =========================================
// 단어장 이동
// =========================================

function goWordBook(){

    renderWordList(words);

}

// =========================================
// 결과 복사
// =========================================

function copyQuizResult(){

    const text=

`초등 필수 영단어 800

점수 : ${score}/${quizList.length}

정답률 : ${getCorrectRate()}%`;

    navigator.clipboard.writeText(text);

    alert("결과가 복사되었습니다.");

}
// =========================================
// 오답노트
// =========================================

function showWrongNote(){

    if(wrongList.length===0){

        alert("오답이 없습니다.");

        return;

    }

    renderWordList(wrongList);

}

// =========================================
// 오답 저장
// =========================================

function saveWrongWord(id){

    let list=

        JSON.parse(

            localStorage.getItem("wrongWords")||"[]"

        );

    if(!list.includes(id)){

        list.push(id);

    }

    localStorage.setItem(

        "wrongWords",

        JSON.stringify(list)

    );

}

// =========================================
// 오답 불러오기
// =========================================

function getWrongWords(){

    return JSON.parse(

        localStorage.getItem("wrongWords")||"[]"

    );

}

// =========================================
// 오답 삭제
// =========================================

function clearWrongWords(){

    localStorage.removeItem("wrongWords");

    wrongList=[];

}

// =========================================
// 오답만 다시풀기
// =========================================

function retryWrongQuiz(){

    const ids=getWrongWords();

    if(ids.length===0){

        alert("오답노트가 비어 있습니다.");

        return;

    }

    quizList=

        words.filter(w=>ids.includes(w.id));

    quizList=shuffle(quizList);

    currentQuiz=0;

    score=0;

    updateScore();

    showQuiz();

}

// =========================================
// 현재 문제 즐겨찾기
// =========================================

function favoriteCurrentWord(){

    if(currentQuiz>=quizList.length) return;

    toggleFavoriteWord(

        quizList[currentQuiz].id

    );

}

// =========================================
// 현재 문제 체크
// =========================================

function checkCurrentWord(){

    if(currentQuiz>=quizList.length) return;

    toggleChecked(

        quizList[currentQuiz].id

    );

}

// =========================================
// 오답 개수
// =========================================

function getWrongCount(){

    return getWrongWords().length;

}

// =========================================
// 오답 화면
// =========================================

function updateWrongCount(){

    const el=document.getElementById(

        "wrongCount"

    );

    if(!el) return;

    el.textContent=

        "오답 : "

        +getWrongCount()

        +"개";

}

// =========================================
// 오답 복습
// =========================================

function reviewWrongWords(){

    const ids=getWrongWords();

    const list=

        words.filter(w=>ids.includes(w.id));

    renderWordList(list);

}

// =========================================
// 오답 랜덤
// =========================================

function reviewWrongRandom(){

    let ids=getWrongWords();

    let list=

        words.filter(w=>ids.includes(w.id));

    list=shuffle(list);

    renderWordList(list);

}

// =========================================
// 오답 모두 체크
// =========================================

function checkWrongWords(){

    getWrongWords().forEach(id=>{

        toggleChecked(id);

    });

}

// =========================================
// 오답 모두 즐겨찾기
// =========================================

function favoriteWrongWords(){

    getWrongWords().forEach(id=>{

        toggleFavoriteWord(id);

    });

}

// =========================================
// 오답 초기화
// =========================================

function deleteWrongNote(){

    if(confirm("오답노트를 모두 삭제하시겠습니까?")){

        clearWrongWords();

        updateWrongCount();

        alert("삭제되었습니다.");

    }

}// =========================================
// 오늘의 20단어 퀴즈
// =========================================

function startTodayQuiz(){

    if(!todayWords || todayWords.length===0){

        loadTodayWords();

    }

    quizList = words.filter(w=>

        todayWords.includes(w.id)

    );

    quizList = shuffle(quizList);

    currentQuiz = 0;

    score = 0;

    updateScore();

    showQuiz();

}

// =========================================
// 즐겨찾기 퀴즈
// =========================================

function startFavoriteQuiz(){

    quizList = words.filter(w=>

        isFavorite(w.id)

    );

    if(quizList.length===0){

        alert("즐겨찾기 단어가 없습니다.");

        return;

    }

    quizList = shuffle(quizList);

    currentQuiz = 0;

    score = 0;

    updateScore();

    showQuiz();

}

// =========================================
// 체크한 단어 퀴즈
// =========================================

function startCheckedQuiz(){

    quizList = words.filter(w=>

        isChecked(w.id)

    );

    if(quizList.length===0){

        alert("체크한 단어가 없습니다.");

        return;

    }

    quizList = shuffle(quizList);

    currentQuiz = 0;

    score = 0;

    updateScore();

    showQuiz();

}

// =========================================
// 오늘 복습
// =========================================

function reviewTodayWords(){

    renderWordList(

        words.filter(w=>

            todayWords.includes(w.id)

        )

    );

}

// =========================================
// 연속 정답
// =========================================

let streak = 0;

let bestStreak = Number(

    localStorage.getItem("bestStreak") || 0

);

// =========================================
// 정답
// =========================================

function addCorrect(){

    streak++;

    if(streak>bestStreak){

        bestStreak=streak;

        localStorage.setItem(

            "bestStreak",

            bestStreak

        );

    }

    updateStreak();

}

// =========================================
// 오답
// =========================================

function addWrong(){

    streak=0;

    updateStreak();

}

// =========================================
// 화면 표시
// =========================================

function updateStreak(){

    const el=document.getElementById("streak");

    if(!el) return;

    el.textContent=

        "🔥 "

        +streak

        +" 연속 정답";

}

// =========================================
// 최고 스트릭
// =========================================

function updateBestStreak(){

    const el=document.getElementById("bestStreak");

    if(!el) return;

    el.textContent=

        "🏆 최고 "

        +bestStreak

        +"연속";

}

// =========================================
// 업적
// =========================================

function getBadge(){

    if(bestStreak>=100)

        return "👑 영어왕";

    if(bestStreak>=50)

        return "🥇 금메달";

    if(bestStreak>=30)

        return "🥈 은메달";

    if(bestStreak>=10)

        return "🥉 동메달";

    return "🌱 시작";

}

// =========================================
// 업적 표시
// =========================================

function updateBadge(){

    const el=document.getElementById("badge");

    if(!el) return;

    el.textContent=

        getBadge();

}

// =========================================
// 최고기록 초기화
// =========================================

function resetBadge(){

    if(confirm("기록을 초기화할까요?")){

        streak=0;

        bestStreak=0;

        localStorage.removeItem(

            "bestStreak"

        );

        updateBadge();

        updateStreak();

    }

}

// =========================================
// 시작 시
// =========================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateBadge();

        updateBestStreak();

        updateStreak();

    }

);
// =========================================
// quiz.js
// Final Part
// =========================================

'use strict';

// =========================================
// 퀴즈 통계
// =========================================

function updateQuizStatistics(){

    const total = Number(

        localStorage.getItem("quizTotal") || 0

    );

    const correct = Number(

        localStorage.getItem("quizCorrect") || 0

    );

    const wrong = total - correct;

    const rate = total===0 ? 0 :

        Math.round(correct/total*100);

    const totalEl=document.getElementById("statTotal");
    const correctEl=document.getElementById("statCorrect");
    const wrongEl=document.getElementById("statWrong");
    const rateEl=document.getElementById("statRate");

    if(totalEl) totalEl.textContent=total;
    if(correctEl) correctEl.textContent=correct;
    if(wrongEl) wrongEl.textContent=wrong;
    if(rateEl) rateEl.textContent=rate+"%";

}

// =========================================
// 통계 저장
// =========================================

function saveQuizStatistics(){

    let total=Number(

        localStorage.getItem("quizTotal")||0

    );

    let correct=Number(

        localStorage.getItem("quizCorrect")||0

    );

    total += quizList.length;

    correct += score;

    localStorage.setItem("quizTotal",total);

    localStorage.setItem("quizCorrect",correct);

}

// =========================================
// 통계 초기화
// =========================================

function resetQuizStatistics(){

    if(!confirm("퀴즈 통계를 초기화할까요?")){

        return;

    }

    localStorage.removeItem("quizTotal");

    localStorage.removeItem("quizCorrect");

    updateQuizStatistics();

}

// =========================================
// 퀴즈 초기화
// =========================================

function resetQuiz(){

    currentQuiz=0;

    score=0;

    wrongList=[];

    quizList=[];

    updateScore();

}

// =========================================
// 퀴즈 백업(JSON)
// =========================================

function exportQuizData(){

    const data={

        wrong:getWrongWords(),

        favorite:getFavoriteWords(),

        checked:getCheckedWords(),

        bestScore:getBestScore(),

        bestStreak:bestStreak

    };

    const blob=new Blob(

        [

            JSON.stringify(data,null,2)

        ],

        {

            type:"application/json"

        }

    );

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="english800_quiz_backup.json";

    a.click();

}

// =========================================
// 퀴즈 복원
// =========================================

function importQuizData(file){

    const reader=new FileReader();

    reader.onload=e=>{

        const data=

            JSON.parse(e.target.result);

        localStorage.setItem(

            "wrongWords",

            JSON.stringify(data.wrong||[])

        );

        localStorage.setItem(

            "favoriteWords",

            JSON.stringify(data.favorite||[])

        );

        localStorage.setItem(

            "checkedWords",

            JSON.stringify(data.checked||[])

        );

        localStorage.setItem(

            "bestQuizScore",

            data.bestScore||0

        );

        localStorage.setItem(

            "bestStreak",

            data.bestStreak||0

        );

        alert("복원이 완료되었습니다.");

    };

    reader.readAsText(file);

}

// =========================================
// 전체 기록 삭제
// =========================================

function deleteQuizHistory(){

    if(!confirm("모든 퀴즈 기록을 삭제할까요?"))

        return;

    localStorage.removeItem("quizTotal");

    localStorage.removeItem("quizCorrect");

    localStorage.removeItem("bestQuizScore");

    localStorage.removeItem("bestStreak");

    localStorage.removeItem("wrongWords");

    updateQuizStatistics();

}

// =========================================
// 종료 처리
// =========================================

const originalFinishQuiz = finishQuiz;

finishQuiz = function(){

    saveQuizStatistics();

    updateQuizStatistics();

    originalFinishQuiz();

};

// =========================================
// 시작 시
// =========================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateQuizStatistics();

        updateBestScore();

        updateBestStreak();

        updateBadge();

    }

);

// =========================================
// End
// =========================================
