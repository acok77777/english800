// speech.js

let voice = null;

// 음성 불러오기
function loadVoice() {

    const voices = speechSynthesis.getVoices();

    // 영어 음성 우선 선택
    voice =
        voices.find(v => v.lang === "en-US") ||
        voices.find(v => v.lang.startsWith("en")) ||
        voices[0];

}

// 처음 실행
loadVoice();

// 모바일 대응
speechSynthesis.onvoiceschanged = loadVoice;



// ===========================
// 단어 읽기
// ===========================

export function speak(text) {

    if (!text) return;

    speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.voice = voice;

    msg.lang = "en-US";

    msg.rate = 0.85;

    msg.pitch = 1;

    msg.volume = 1;

    speechSynthesis.speak(msg);

}



// ===========================
// 문장 읽기
// ===========================

export function speakSentence(text){

    if(!text) return;

    speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance(text);

    msg.voice=voice;

    msg.lang="en-US";

    msg.rate=0.9;

    msg.pitch=1;

    msg.volume=1;

    speechSynthesis.speak(msg);

}



// ===========================
// 중지
// ===========================

export function stopSpeak(){

    speechSynthesis.cancel();

}
