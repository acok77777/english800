/* ==========================================
   backup.js

   초등 필수 영단어 800
   백업 / 복원 시스템

========================================== */



/* ==========================================
   백업 파일 만들기
========================================== */


function createBackupData(){


    const data = {


        app:"초등 필수 영단어 800",


        version:"1.0",


        date:new Date()

        .toISOString(),


        storage:getAllStorageData()


    };



    return data;


}





/* ==========================================
   JSON 파일 다운로드
========================================== */


function backupDownload(){



    const data = createBackupData();



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



    const url = URL.createObjectURL(

        blob

    );



    const a=document.createElement(

        "a"

    );



    const today = new Date()

    .toISOString()

    .split("T")[0];



    a.href=url;



    a.download =

    `english800_backup_${today}.json`;



    document.body.appendChild(a);



    a.click();



    document.body.removeChild(a);



    URL.revokeObjectURL(url);



}







/* ==========================================
   복원 파일 선택
========================================== */


function openBackupFile(){



    const input=document.createElement(

        "input"

    );



    input.type="file";



    input.accept=".json";



    input.onchange=(event)=>{



        const file=

        event.target.files[0];



        if(file){


            restoreBackupFile(file);


        }



    };



    input.click();



}







/* ==========================================
   JSON 복원
========================================== */


function restoreBackupFile(file){



    const reader=new FileReader();



    reader.onload=(event)=>{



        try{


            const data=

            JSON.parse(

                event.target.result

            );



            if(

            restoreStorageData(

                data.storage

            )

            ){



                alert(

                "백업 데이터 복원이 완료되었습니다."

                );



                location.reload();



            }

            else{


                alert(

                "복원 실패"

                );


            }



        }


        catch(error){



            alert(

            "올바른 백업 파일이 아닙니다."

            );



            console.error(error);



        }



    };



    reader.readAsText(file);



}







/* ==========================================
   백업 데이터 확인
========================================== */


function showBackupInfo(){



    const data=createBackupData();



    console.log(

        "Backup Data",

        data

    );



}







/* ==========================================
   자동 백업
========================================== */


function autoBackup(){



    const data=createBackupData();



    localStorage.setItem(

        "english800_auto_backup",

        JSON.stringify(data)

    );



}







/* ==========================================
   자동 백업 불러오기
========================================== */


function loadAutoBackup(){



    const data=

    localStorage.getItem(

        "english800_auto_backup"

    );



    if(!data){


        return false;


    }



    try{


        const backup=

        JSON.parse(data);



        return restoreStorageData(

            backup.storage

        );



    }


    catch(error){


        return false;


    }



}







/* ==========================================
   초기 실행
========================================== */


function initBackup(){


    autoBackup();


}
