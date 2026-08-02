/* ==========================================
   speech.js

   초등 필수 영단어 800
   영어 발음 기능

   Web Speech API 사용

========================================== */



let speechVoice = null;



let speechRate = 0.8;



let speechPitch = 1;



/* ==========================================
   음성 목록 가져오기
========================================== */


function loadSpeechVoices(){


    const voices = speechSynthesis.getVoices();



    if(!voices.length){

        return;

    }



    // 영어 원어민 우선 선택

    speechVoice = voices.find(voice=>{


        return (

            voice.lang === "en-US"

            ||

            voice.lang === "en-GB"

        );


    });



    if(!speechVoice){


        speechVoice = voices.find(voice=>{


            return voice.lang

            .startsWith("en");


        });


    }


}




/* ==========================================
   브라우저 음성 준비
========================================== */


if("speechSynthesis" in window){


    speechSynthesis.onvoiceschanged = ()=>{


        loadSpeechVoices();


    };


    loadSpeechVoices();


}




/* ==========================================
   단어 발음
========================================== */


function speakWord(word){



    if(!("speechSynthesis" in window)){


        alert(

            "이 기기는 음성 기능을 지원하지 않습니다."

        );


        return;

    }



    // 기존 음성 중지

    speechSynthesis.cancel();



    const utterance = new SpeechSynthesisUtterance();



    utterance.text = word;



    utterance.lang = "en-US";



    utterance.rate = speechRate;



    utterance.pitch = speechPitch;



    utterance.volume = 1;



    if(speechVoice){


        utterance.voice = speechVoice;


    }



    speechSynthesis.speak(

        utterance

    );


}





/* ==========================================
   문장 발음
========================================== */


function speakSentence(sentence){


    if(!sentence){

        return;

    }



    speechSynthesis.cancel();



    const utterance = new SpeechSynthesisUtterance(

        sentence

    );



    utterance.lang="en-US";



    utterance.rate=speechRate;



    utterance.pitch=speechPitch;



    if(speechVoice){


        utterance.voice=speechVoice;


    }



    speechSynthesis.speak(

        utterance

    );


}



/* ==========================================
   정지
========================================== */


function stopSpeech(){


    if("speechSynthesis" in window){


        speechSynthesis.cancel();


    }


}




/* ==========================================
   속도 조절
========================================== */


function setSpeechRate(rate){


    speechRate = Number(rate);


}




/* ==========================================
   음높이 조절
========================================== */


function setSpeechPitch(pitch){


    speechPitch = Number(pitch);


}





/* ==========================================
   테스트 발음
========================================== */


function testSpeech(){


    speakWord(

        "Hello"

    );


}
