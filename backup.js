/* ==========================================
   backup.js

   초등 필수 영단어 800

   백업 / 복원 시스템

========================================== */





/* ==========================================
   백업 데이터 생성
========================================== */


function createBackupData(){



    let data = {



        appName:

        "초등 필수 영단어 800",




        backupDate:

        new Date()

        .toISOString(),





        completedWords:



        JSON.parse(


        localStorage.getItem(

            "completedWords"

        )

        || "[]"


        ),






        wrongWords:



        JSON.parse(


        localStorage.getItem(

            "wrongWords"

        )

        || "[]"


        ),






        todayGoal:



        localStorage.getItem(

            "todayGoal"

        )

        || "",






        studyHistory:{}



    };









    // 학습 날짜 저장


    for(let i=1;i<=800;i++){



        let date =

        localStorage.getItem(

            "study_word_"+i

        );




        if(date){



            data.studyHistory[i]=date;



        }



    }






    return data;



}









/* ==========================================
   백업 저장
========================================== */


function backupData(){



    const data = createBackupData();





    const json = JSON.stringify(

        data,

        null,

        2

    );







    const blob = new Blob(

        [

        json

        ],

        {

            type:

            "application/json"

        }

    );







    const url =

    URL.createObjectURL(

        blob

    );








    const link = document.createElement(

        "a"

    );





    link.href=url;





    link.download=

    "english800_backup.json";





    link.click();





    URL.revokeObjectURL(

        url

    );







    alert(

    "백업 파일이 저장되었습니다 😊"

    );



}









/* ==========================================
   복원 실행
========================================== */


function restoreData(){



    const input = document.createElement(

        "input"

    );



    input.type="file";



    input.accept=".json";








    input.onchange=function(e){



        const file = e.target.files[0];



        if(!file){

            return;

        }







        const reader = new FileReader();







        reader.onload=function(){



            try{



                const data =

                JSON.parse(

                    reader.result

                );





                restoreBackupData(

                    data

                );






                alert(

                "복원이 완료되었습니다 😊"

                );





                location.reload();




            }

            catch(error){



                alert(

                "올바른 백업 파일이 아닙니다."

                );


            }



        };







        reader.readAsText(

            file

        );



    };






    input.click();



}









/* ==========================================
   데이터 복원
========================================== */


function restoreBackupData(data){



    if(data.completedWords){



        localStorage.setItem(

            "completedWords",

            JSON.stringify(

                data.completedWords

            )

        );



    }







    if(data.wrongWords){



        localStorage.setItem(

            "wrongWords",

            JSON.stringify(

                data.wrongWords

            )

        );



    }







    if(data.todayGoal !== undefined){



        localStorage.setItem(

            "todayGoal",

            data.todayGoal

        );



    }







    if(data.studyHistory){



        Object.keys(

            data.studyHistory

        )

        .forEach(id=>{



            localStorage.setItem(

                "study_word_"+id,

                data.studyHistory[id]

            );



        });



    }



}









/* ==========================================
   초기화
========================================== */


function initBackup(){



    console.log(

    "Backup System Ready"

    );


}
