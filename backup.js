/* ==========================================
   backup.js

   초등 필수 영단어 800

   백업 / 복원 시스템

========================================== */





// ==========================================
// 백업 저장
// ==========================================


function backupData(){



    let data = {

        appName:

        "초등 필수 영단어 800",


        date:

        new Date().toLocaleString(),



        completedWords:

        getCompletedWords(),



        wrongWords:

        getWrongWords(),




        studyHistory:

        JSON.parse(

            localStorage.getItem(

                "studyHistory"

            )

            ||

            "{}"

        ),




        todayGoal:

        localStorage.getItem(

            "todayGoal"

        )

        ||

        ""

    };








    const json = JSON.stringify(

        data,

        null,

        2

    );







    const blob = new Blob(

        [json],

        {

            type:"application/json"

        }

    );







    const url =

    URL.createObjectURL(blob);






    const a = document.createElement(

        "a"

    );



    a.href=url;



    a.download=

    "english800_backup.json";





    a.click();






    URL.revokeObjectURL(url);







    alert(

    "백업 파일이 저장되었습니다 😊"

    );



}









// ==========================================
// 복원 버튼
// ==========================================


function restoreData(){



    const input = document.createElement(

        "input"

    );



    input.type="file";



    input.accept=

    ".json";







    input.onchange=function(e){



        const file =

        e.target.files[0];





        if(!file){

            return;

        }







        const reader =

        new FileReader();






        reader.onload=function(){



            try{



                const data =

                JSON.parse(

                    reader.result

                );







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








                if(data.studyHistory){



                    localStorage.setItem(

                        "studyHistory",

                        JSON.stringify(

                            data.studyHistory

                        )

                    );


                }







                if(data.todayGoal !== undefined){



                    localStorage.setItem(

                        "todayGoal",

                        data.todayGoal

                    );



                }







                alert(

                "복원이 완료되었습니다 😊"

                );






                location.reload();






            }

            catch(error){



                alert(

                "백업 파일이 올바르지 않습니다."

                );



            }



        };






        reader.readAsText(file);



    };







    input.click();



}









// ==========================================
// 백업 데이터 미리보기
// ==========================================


function showBackupInfo(){



    const data={



        외운단어:

        getCompletedWords().length,



        오답:

        getWrongWords().length,



        날짜:

        new Date().toLocaleDateString()



    };





    alert(

        JSON.stringify(

            data,

            null,

            2

        )

    );



}
