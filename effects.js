/* ==========================================
   effects.js

   초등 필수 영단어 800

   정답 / 오답 효과

========================================== */







/* ==========================================
   효과 표시
========================================== */


function showEffect(message){



    const div = document.createElement(

        "div"

    );



    div.className = "result-effect";



    div.innerText = message;





    document.body.appendChild(

        div

    );








    setTimeout(()=>{



        div.remove();



    },1000);



}









/* ==========================================
   정답 효과
========================================== */


function showCorrectEffect(){



    showEffect(

        "⭕ 정답!"

    );



}








/* ==========================================
   오답 효과
========================================== */


function showWrongEffect(){



    showEffect(

        "❌ 다시 도전!"

    );



}








/* ==========================================
   콤보 효과
========================================== */


function showCombo(count){



    if(count<2){

        return;

    }




    showEffect(

        "🔥 "+count+" 연속 정답!"

    );



}








/* ==========================================
   축하 효과
========================================== */


function showCompleteEffect(){



    showEffect(

        "🎉 완료!"

    );



}
