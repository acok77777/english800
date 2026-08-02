/* ==========================================
   speech.js

   초등 필수 영단어 800

   영어 발음 시스템
   학습용 최적화

========================================== */


let selectedVoice = null;



/* ==========================================
   음성 찾기
========================================== */


function loadEnglishVoice(){



    const voices = speechSynthesis.getVoices();



    if(!voices.length){

        return;

    }





    // 1순위 : 자연스러운 영어 음성


    selectedVoice = voices.find(voice=>{


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

                voice.name.includes("Ava")

                ||

                voice.name.includes("Jenny")

            )

        );


    });







    // 2순위 : 미국 영어


    if(!selectedVoice){


        selectedVoice = voices.find(voice=>{


            return voice.lang === "en-US";


        });


    }







    // 3순위 : 영어 전체


    if(!selectedVoice){


        selectedVoice = voices.find(voice=>{


            return voice.lang.startsWith("en");


        });


    }



}








/* ==========================================
   단어 읽기

   🔊 버튼 연결
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





    if(selectedVoice){


        utterance.voice = selectedVoice;


    }





    // 초등 영어 학습 속도


    utterance.rate = 0.75;


    utterance.pitch = 1.05;


    utterance.volume = 1;






    speechSynthesis.speak(

        utterance

    );


}








/* ==========================================
   단어 반복 읽기

   학습용
========================================== */


function speakWordRepeat(word){



    let count = 0;



    speechSynthesis.cancel();






    function repeat(){



        if(count>=2){

            return;

        }





        const utterance =

        new SpeechSynthesisUtterance(

            word

        );





        utterance.lang="en-US";



        utterance.voice = selectedVoice;



        utterance.rate=0.72;



        utterance.pitch=1.05;





        utterance.onend=function(){



            count++;



            setTimeout(

                repeat,

                400

            );



        };






        speechSynthesis.speak(

            utterance

        );



    }






    repeat();



}









/* ==========================================
   뜻 읽기

   예:
   apple
   사과
========================================== */


function speakMeaning(word, meaning){



    const text =

    word +

    ". " +

    meaning;





    const utterance =

    new SpeechSynthesisUtterance(

        text

    );





    utterance.lang="en-US";



    utterance.voice=selectedVoice;



    utterance.rate=0.7;



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





    utterance.lang="en-US";



    utterance.voice=selectedVoice;



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




    speechSynthesis.onvoiceschanged=function(){


        loadEnglishVoice();


    };


}






window.addEventListener(

"DOMContentLoaded",

()=>{


    initSpeech();


});
