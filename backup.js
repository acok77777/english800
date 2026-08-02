// =========================================
// backup.js
// 백업 / 복원
// =========================================

'use strict';

// =========================================
// 백업
// =========================================

function backupData(){

    const data={

        version:"1.0",

        date:new Date().toLocaleString(),

        checked:getCheckedWords(),

        favorite:getFavoriteWords(),

        wrong:getWrongWords(),

        bestScore:getBestScore(),

        bestStreak:bestStreak,

        darkMode:loadDarkMode(),

        speechSpeed:loadSpeechSpeed(),

        voice:loadVoice()

    };

    const json=

        JSON.stringify(data,null,2);

    const blob=new Blob(

        [json],

        {

            type:"application/json"

        }

    );

    const url=

        URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download=

        "english800_backup.json";

    a.click();

    URL.revokeObjectURL(url);

    localStorage.setItem(

        "lastBackup",

        data.date

    );

    updateBackupInfo();

}

// =========================================
// 복원
// =========================================

function restoreData(file){

    if(!file) return;

    const reader=

        new FileReader();

    reader.onload=e=>{

        const data=

            JSON.parse(e.target.result);

        localStorage.setItem(

            "english800_checked",

            JSON.stringify(data.checked||[])

        );

        localStorage.setItem(

            "english800_favorite",

            JSON.stringify(data.favorite||[])

        );

        localStorage.setItem(

            "wrongWords",

            JSON.stringify(data.wrong||[])

        );

        localStorage.setItem(

            "bestQuizScore",

            data.bestScore||0

        );

        localStorage.setItem(

            "bestStreak",

            data.bestStreak||0

        );

        saveDarkMode(

            data.darkMode||false

        );

        saveSpeechSpeed(

            data.speechSpeed||1

        );

        saveVoice(

            data.voice||"en-US"

        );

        loadStorage();

        updateProgress();

        renderWordList(words);

        alert("복원이 완료되었습니다.");

    };

    reader.readAsText(file);

}

// =========================================
// 마지막 백업
// =========================================

function updateBackupInfo(){

    const el=

        document.getElementById(

            "backupInfo"

        );

    if(!el) return;

    const date=

        localStorage.getItem(

            "lastBackup"

        );

    if(date){

        el.textContent=

            "마지막 백업 : "

            +date;

    }

    else{

        el.textContent=

            "백업 없음";

    }

}

// =========================================
// 전체 삭제
// =========================================

function deleteAllData(){

    if(

        !confirm(

            "모든 데이터를 삭제할까요?"

        )

    ) return;

    localStorage.clear();

    checkedWords=[];

    favoriteWords=[];

    wrongList=[];

    renderWordList(words);

    updateProgress();

    alert("삭제되었습니다.");

}

// =========================================
// 백업 자동 저장
// =========================================

function autoBackup(){

    backupData();

}

// =========================================
// 시작
// =========================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateBackupInfo();

    }

);
