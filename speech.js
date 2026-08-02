// =========================================
// speech.js
// 음성 발음
// =========================================

'use strict';

let speechLanguage = "en-US";
let speechSpeed = 1.0;
let speechPitch = 1;
let speechVolume = 1;

let voices = [];

// ============================
// Voice 목록
// ============================

function loadVoices(){

    voices = speechSynthesis.getVoices();

}

loadVoices();

speechSynthesis.onvoiceschanged = loadVoices;

// ============================
// 단어 발음
// ============================

function speakWord(word){

    if(!word) return;

    speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(word);

    utter.lang = speechLanguage;

    utter.rate = speechSpeed;

    utter.pitch = speechPitch;

    utter.volume = speechVolume;

    const voice = voices.find(v=>v.lang===speechLanguage);

    if(voice){

        utter.voice = voice;

    }

    speechSynthesis.speak(utter);

}

// ============================
// 미국식
// ============================

function useAmerican(){

    speechLanguage="en-US";

    localStorage.setItem("voice","en-US");

}

// ============================
// 영국식
// ============================

function useBritish(){

    speechLanguage="en-GB";

    localStorage.setItem("voice","en-GB");

}

// ============================
// 속도
// ============================

function setSpeechSpeed(value){

    speechSpeed=parseFloat(value);

    localStorage.setItem("speechSpeed",speechSpeed);

}

// ============================
// 음높이
// ============================

function setPitch(value){

    speechPitch=parseFloat(value);

}

// ============================
// 볼륨
// ============================

function setVolume(value){

    speechVolume=parseFloat(value);

}

// ============================
// 중지
// ============================

function stopSpeech(){

    speechSynthesis.cancel();

}

// ============================
// 한 단어 반복
// ============================

function repeatWord(word){

    speakWord(word);

}

// ============================
// 전체 단어 연속재생
// ============================

async function playAllWords(list=words){

    stopSpeech();

    for(const item of list){

        await speakPromise(item.word);

    }

}

// ============================
// Promise
// ============================

function speakPromise(word){

    return new Promise(resolve=>{

        const utter=new SpeechSynthesisUtterance(word);

        utter.lang=speechLanguage;

        utter.rate=speechSpeed;

        utter.pitch=speechPitch;

        utter.volume=speechVolume;

        const voice=voices.find(v=>v.lang===speechLanguage);

        if(voice){

            utter.voice=voice;

        }

        utter.onend=()=>{

            resolve();

        };

        speechSynthesis.speak(utter);

    });

}

// ============================
// 오늘의20단어
// ============================

function playTodayWords(){

    const list=words.filter(item=>

        todayWords.includes(item.id)

    );

    playAllWords(list);

}

// ============================
// 랜덤20단어
// ============================

function playRandomWords(){

    const shuffled=[...words];

    shuffled.sort(()=>Math.random()-0.5);

    playAllWords(shuffled.slice(0,20));

}

// ============================
// 저장된 설정
// ============================

window.addEventListener("DOMContentLoaded",()=>{

    const lang=localStorage.getItem("voice");

    if(lang){

        speechLanguage=lang;

    }

    const speed=localStorage.getItem("speechSpeed");

    if(speed){

        speechSpeed=parseFloat(speed);

    }

});
