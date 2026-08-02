/* ==========================================
   effects.js

   초등 필수 영단어 800
   퀴즈 효과 시스템

========================================== */


/* ==========================================
   결과 표시
========================================== */


function showResultIcon(type){


    const old = document.querySelector(

        ".result-effect"

    );


    if(old){

        old.remove();

    }



    const div=document.createElement(

        "div"

    );



    div.className="result-effect";



    if(type==="correct"){


        div.innerHTML="⭕";


        div.classList.add(

            "correct"

        );


    }

    else{


        div.innerHTML="❌";


        div.classList.add(

            "wrong"

        );


    }



    document.body.appendChild(div);



    setTimeout(()=>{


        div.remove();


    },1200);



}





/* ==========================================
   정답 효과
========================================== */


function showCorrectEffect(){


    showResultIcon(

        "correct"

    );



    createFireworks();


}





/* ==========================================
   오답 효과
========================================== */


function showWrongEffect(){


    showResultIcon(

        "wrong"

    );



    createRain();

}





/* ==========================================
   폭죽 효과
========================================== */


function createFireworks(){


    const container=document.createElement(

        "div"

    );


    container.className=

    "firework-container";



    document.body.appendChild(

        container

    );



    for(let i=0;i<40;i++){



        const particle=document.createElement(

            "span"

        );



        particle.className=

        "firework";



        particle.style.left=

        "50%";



        particle.style.top=

        "45%";



        const x=(Math.random()-0.5)*300;

        const y=(Math.random()-0.5)*300;



        particle.style.setProperty(

            "--x",

            x+"px"

        );



        particle.style.setProperty(

            "--y",

            y+"px"

        );



        container.appendChild(

            particle

        );


    }



    setTimeout(()=>{


        container.remove();


    },1500);



}





/* ==========================================
   비 효과
========================================== */


function createRain(){


    const container=document.createElement(

        "div"

    );



    container.className=

    "rain-container";



    document.body.appendChild(

        container

    );




    for(let i=0;i<60;i++){



        const drop=document.createElement(

            "span"

        );



        drop.className=

        "rain-drop";



        drop.style.left=

        Math.random()*100+"%";



        drop.style.animationDelay=

        Math.random()+"s";



        container.appendChild(

            drop

        );


    }



    setTimeout(()=>{


        container.remove();


    },2000);



}





/* ==========================================
   진동 효과 (모바일)
========================================== */


function vibrateResult(){


    if(navigator.vibrate){


        navigator.vibrate(

            200

        );


    }


}





/* ==========================================
   CSS 자동 추가
========================================== */


function loadEffectStyle(){


    const style=document.createElement(

        "style"

    );



    style.innerHTML=`


.result-effect{


position:fixed;

left:50%;

top:50%;

transform:translate(-50%,-50%);

font-size:100px;

z-index:9999;

animation:resultPop .8s ease;

}



@keyframes resultPop{


0%{

transform:translate(-50%,-50%) scale(0);

}


70%{

transform:translate(-50%,-50%) scale(1.3);

}


100%{

transform:translate(-50%,-50%) scale(1);

}


}





.firework-container{


position:fixed;

inset:0;

pointer-events:none;

z-index:9998;


}



.firework{


position:absolute;

width:10px;

height:10px;

background:#ffcc00;

border-radius:50%;

animation:explode 1s forwards;


}



@keyframes explode{


to{


transform:

translate(var(--x),var(--y));


opacity:0;


}


}





.rain-container{


position:fixed;

inset:0;

overflow:hidden;

pointer-events:none;

z-index:9998;


}



.rain-drop{


position:absolute;

top:-20px;

width:3px;

height:20px;

background:#6bbcff;

animation:rainFall 1.5s linear forwards;


}



@keyframes rainFall{


to{


transform:translateY(100vh);


}


}


`;



document.head.appendChild(

    style

    );



}





/* 실행 */

window.addEventListener(

"load",

()=>{


    loadEffectStyle();


}

);
