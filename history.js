/* ==========================================
   history.js FINAL

   퀴즈 누적 기록 표시

========================================== */





// ==========================================
// 퀴즈 기록 가져오기
// ==========================================


function getQuizHistoryData(){



    if(typeof getQuizHistory === "function"){


        return getQuizHistory();


    }





    return JSON.parse(

        localStorage.getItem(

            "quizHistory"

        )

        ||

        "{}"

    );


}









// ==========================================
// 누적기록 열기
// ==========================================


function openQuizHistory(){



    openTab(

        "quizHistoryPage"

    );



    renderQuizHistory();



}









// ==========================================
// 누적 기록 출력
// ==========================================


function renderQuizHistory(){



    const box = document.getElementById(

        "quizHistoryList"

    );





    if(!box){

        return;

    }







    const history = getQuizHistoryData();





    const dates = Object.keys(history)

    .reverse();








    if(dates.length === 0){



        box.innerHTML = `



        <div class="history-card">


        📚 아직 퀴즈 기록이 없습니다.


        </div>



        `;



        return;


    }








    let html = "";







    dates.forEach(date=>{



        const quiz = history[date];






        html += `



        <div class="history-card">


        <h3>

        📅 ${date}

        </h3>




        `;









        // 1번 퀴즈


        if(quiz.meaning){



            html += `



            <div class="quiz-history-box">


            <h4>

            1️⃣ 단어의 뜻 맞추기

            </h4>




            <p>

            총 ${quiz.meaning.total}문제

            </p>



            <p>

            ⭐ 점수 ${quiz.meaning.score}점

            </p>



            <p>

            ⭕ 정답 ${quiz.meaning.correct}개

            </p>



            <p>

            ❌ 오답 ${quiz.meaning.wrong}개

            </p>



            </div>



            `;


        }









        // 2번 퀴즈


        if(quiz.spell){



            html += `



            <div class="quiz-history-box">


            <h4>

            2️⃣ 단어의 스펠링 맞추기

            </h4>




            <p>

            총 ${quiz.spell.total}문제

            </p>



            <p>

            ⭐ 점수 ${quiz.spell.score}점

            </p>



            <p>

            ⭕ 정답 ${quiz.spell.correct}개

            </p>



            <p>

            ❌ 오답 ${quiz.spell.wrong}개

            </p>



            </div>



            `;


        }







        html += `

        </div>

        `;



    });








    box.innerHTML = html;



}









// ==========================================
// 기록 삭제
// ==========================================


function clearQuizHistory(){



    localStorage.removeItem(

        "quizHistory"

    );



    renderQuizHistory();



}









// ==========================================
// 시작
// ==========================================


window.addEventListener(

"DOMContentLoaded",

function(){



    renderQuizHistory();



});
