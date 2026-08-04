/* ==========================================
   history.js FINAL

   퀴즈 누적기록 화면

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
// 누적기록 화면 열기
// ==========================================


function openQuizHistory(){



    openTab(

        "quizHistoryPage"

    );



    renderQuizHistory();


}









// ==========================================
// 기록 출력
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








    if(dates.length===0){



        box.innerHTML = `


        <div class="history-card">


        📚 아직 퀴즈 기록이 없습니다.


        </div>


        `;



        return;


    }









    let html="";








    dates.forEach(date=>{



        const data = history[date];






        html += `



        <div class="history-card">


        <h3>

        📅 ${date}

        </h3>



        `;








        if(data.meaning){



            html += `


            <h4>

            1️⃣ 단어의 뜻 맞추기

            </h4>



            <p>

            총 ${data.meaning.total}문제

            </p>



            <p>

            ⭕ 정답 ${data.meaning.correct}개

            </p>



            <p>

            ❌ 오답 ${data.meaning.wrong}개

            </p>


            `;



        }









        if(data.spell){



            html += `


            <h4>

            2️⃣ 단어의 스펠링 맞추기

            </h4>



            <p>

            총 ${data.spell.total}문제

            </p>



            <p>

            ⭕ 정답 ${data.spell.correct}개

            </p>



            <p>

            ❌ 오답 ${data.spell.wrong}개

            </p>



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
