/* ==========================================
   speech.js

   초등 필수 영단어 800

   영어 발음 시스템

========================================== */


let englishVoice = null;





/* ==========================================
   음성 찾기
========================================== */


function loadEnglishVoice(){



    const voices =

    speechSynthesis.getVoices();





    if(!voices.length){

        return;

    }







    // 우선순위 음성


    const priorityNames = [


        "Google US English",

        "Microsoft Zira",

        "Microsoft Jenny",

        "Samantha",

        "Ava",

        "Karen"


    ];







    for(let name of priorityNames){



        const voice = voices.find(v=>{


            return (

                v.name.includes(name)

            );


        });





        if(voice){


            englishVoice = voice;


            return;


        }



    }







    // 미국 영어


    englishVoice = voices.find(v=>{


        return v.lang==="en-US";


    });







    // 영어 전체


    if(!englishVoice){



        englishVoice = voices.find(v=>{


            return v.lang.startsWith("en");


        });



    }



}









/* ==========================================
   단어 읽기

   🔊 버튼용
========================================== */


function speakWord(word){



    if(!word){

        return;

    }




    speechSynthesis.cancel();





    const utterance =

    new SpeechSynthesisUtterance(

        word

    );





    utterance.lang="en-US";





    if(englishVoice){


        utterance.voice = englishVoice;


    }







    // 초등 영어 학습 최적 속도


    utterance.rate = 0.72;


    utterance.pitch = 1.05;


    utterance.volume = 1;







    speechSynthesis.speak(

        utterance

    );



}









/* ==========================================
   단어 반복 듣기

   학습용
========================================== */


function speakWordRepeat(word){



    let count = 0;





    speechSynthesis.cancel();






    function play(){



        if(count >= 2){

            return;

        }





        const utterance =

        new SpeechSynthesisUtterance(

            word

        );






        utterance.voice = englishVoice;


        utterance.lang="en-US";


        utterance.rate=0.7;


        utterance.pitch=1.05;







        utterance.onend=()=>{



            count++;





            setTimeout(

                play,

                500

            );



        };






        speechSynthesis.speak(

            utterance

        );



    }






    play();



}









/* ==========================================
   단어 + 뜻 읽기

========================================== */


function speakWordMeaning(word, meaning){



    speechSynthesis.cancel();





    const text =

    word +

    ". " +

    meaning;







    const utterance =

    new SpeechSynthesisUtterance(

        text

    );






    utterance.voice = englishVoice;


    utterance.lang="en-US";


    utterance.rate=0.7;


    utterance.pitch=1;






    speechSynthesis.speak(

        utterance

    );



}









/* ==========================================
   문장 읽기
========================================== */


function speakSentence(sentence){



    speechSynthesis.cancel();





    const utterance =

    new SpeechSynthesisUtterance(

        sentence

    );





    utterance.voice = englishVoice;


    utterance.lang="en-US";


    utterance.rate=0.8;


    utterance.pitch=1;






    speechSynthesis.speak(

        utterance

    );



}









/* ==========================================
   초기 실행
========================================== */


function initSpeech(){



    loadEnglishVoice();






    speechSynthesis.onvoiceschanged = ()=>{


        loadEnglishVoice();


    };



}







window.addEventListener(

"DOMContentLoaded",

()=>{


    initSpeech();


});
