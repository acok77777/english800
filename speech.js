/* ==========================================
   speech.js

   초등 필수 영단어 800

   영어 학습 음성 시스템

========================================== */



let englishVoice = null;





// ==========================================
// 음성 목록 불러오기
// ==========================================


function loadEnglishVoice(){



    const voices =

    window.speechSynthesis.getVoices();





    if(!voices.length){

        return;

    }






    // 자연스러운 영어 음성 우선순위


    const priority = [

        "Google US English",

        "Microsoft Zira",

        "Microsoft David",

        "Samantha",

        "Alex",

        "en-US"

    ];








    for(let name of priority){



        const voice = voices.find(v=>{


            return v.name.includes(name);


        });



        if(voice){



            englishVoice = voice;

            break;


        }


    }







    // 못 찾으면 영어 아무거나


    if(!englishVoice){



        englishVoice = voices.find(v=>{


            return v.lang.startsWith(

                "en"

            );


        });



    }



}








// ==========================================
// 단어 발음
// ==========================================


function speakWord(word){



    if(!word){

        return;

    }






    window.speechSynthesis.cancel();






    const utter =

    new SpeechSynthesisUtterance(

        word

    );





    utter.lang="en-US";







    utter.rate = 0.75; 

    // 학습용 느린 속도



    utter.pitch = 1.05;



    utter.volume = 1;







    if(englishVoice){



        utter.voice = englishVoice;



    }







    window.speechSynthesis.speak(

        utter

    );



}








// ==========================================
// 문장 발음
// ==========================================


function speakSentence(text){



    if(!text){

        return;

    }




    window.speechSynthesis.cancel();





    const utter =

    new SpeechSynthesisUtterance(

        text

    );




    utter.lang="en-US";



    utter.rate=0.8;



    utter.pitch=1;





    if(englishVoice){



        utter.voice = englishVoice;



    }






    window.speechSynthesis.speak(

        utter

    );



}









// ==========================================
// 반복 듣기
// ==========================================


function repeatWord(word,count=3){



    let i=0;





    function play(){



        if(i>=count){

            return;

        }





        speakWord(word);



        i++;





        setTimeout(

            play,

            1500

        );



    }






    play();



}









// ==========================================
// 초기 실행
// ==========================================


window.speechSynthesis.onvoiceschanged =

function(){



    loadEnglishVoice();



};





window.addEventListener(

"DOMContentLoaded",

function(){



    loadEnglishVoice();



});
