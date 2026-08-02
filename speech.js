/* ==========================================
   speech.js

   초등 필수 영단어 800

   영어 발음 시스템

========================================== */



let englishVoice = null;





/* ==========================================
   음성 목록 가져오기
========================================== */


function loadVoices(){



    const voices = speechSynthesis.getVoices();



    if(!voices.length){

        return;

    }






    englishVoice = voices.find(voice=>{


        return (

            voice.lang === "en-US"

            &&

            (

            voice.name.includes("Google")

            ||

            voice.name.includes("Microsoft")

            ||

            voice.name.includes("Samantha")

            ||

            voice.name.includes("Jenny")

            )

        );


    });







    // 위 음성이 없으면 미국 영어 선택


    if(!englishVoice){



        englishVoice = voices.find(voice=>{


            return voice.lang === "en-US";


        });



    }





    // 그래도 없으면 영어 전체


    if(!englishVoice){



        englishVoice = voices.find(voice=>{


            return voice.lang.startsWith(

                "en"

            );


        });



    }



}





/* ==========================================
   단어 발음
========================================== */


function speakWord(word){



    if(!word){

        return;

    }





    speechSynthesis.cancel();





    if(!englishVoice){


        loadVoices();


    }





    const text = new SpeechSynthesisUtterance(

        word

    );




    text.lang="en-US";





    if(englishVoice){


        text.voice = englishVoice;


    }





    // 초등 학습용 속도


    text.rate = 0.75;


    text.pitch = 1.05;


    text.volume = 1;







    speechSynthesis.speak(

        text

    );



}








/* ==========================================
   단어 2번 반복

========================================== */


function speakWordRepeat(word){



    if(!word){

        return;

    }





    speechSynthesis.cancel();





    let count=0;





    function repeat(){



        if(count>=2){


            return;


        }





        const utterance =

        new SpeechSynthesisUtterance(

            word

        );





        utterance.lang="en-US";





        if(englishVoice){


            utterance.voice = englishVoice;


        }





        utterance.rate=0.75;

        utterance.pitch=1.05;






        utterance.onend=()=>{


            count++;


            setTimeout(

                repeat,

                300

            );


        };





        speechSynthesis.speak(

            utterance

        );



    }





    repeat();



}








/* ==========================================
   문장 읽기
========================================== */


function speakSentence(sentence){



    if(!sentence){

        return;

    }



    speechSynthesis.cancel();




    const utterance =

    new SpeechSynthesisUtterance(

        sentence

    );





    utterance.lang="en-US";



    if(englishVoice){


        utterance.voice=englishVoice;


    }





    utterance.rate=0.85;

    utterance.pitch=1;



    speechSynthesis.speak(

        utterance

    );



}








/* ==========================================
   음성 초기화
========================================== */


function initSpeech(){



    loadVoices();



    speechSynthesis.onvoiceschanged=function(){


        loadVoices();


    };


}







/* 실행 */


window.addEventListener(

"DOMContentLoaded",

()=>{


    initSpeech();


});
