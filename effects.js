/* ==========================================
   effects.js

   초등 필수 영단어 800

   퀴즈 효과

========================================== */






// ==========================================
// 정답 효과
// ==========================================


function showCorrectEffect(){



    createEffect(

        "🎉 정답!",

        "correct"

    );



}









// ==========================================
// 오답 효과
// ==========================================


function showWrongEffect(){



    createEffect(

        "❌ 다시 도전!",

        "wrong"

    );



}









// ==========================================
// 효과 생성
// ==========================================


function createEffect(text,type){



    const div=document.createElement(

        "div"

    );



    div.className =

    "result-effect " + type;





    div.innerHTML=text;





    document.body.appendChild(div);








    setTimeout(()=>{



        div.remove();



    },1000);



}









// ==========================================
// 버튼 클릭 효과
// ==========================================


function buttonEffect(button){



    if(!button){

        return;

    }






    button.style.transform=

    "scale(0.95)";





    setTimeout(()=>{



        button.style.transform=

        "scale(1)";



    },150);





}









// ==========================================
// 축하 효과
// ==========================================


function showCompleteEffect(){



    createEffect(

        "🏆 완료!",

        "correct"

    );



}
