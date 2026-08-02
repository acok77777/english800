// backup.js

import { save, load } from "./storage.js";

const BACKUP_NAME = "english800_backup.json";



// =========================
// 백업
// =========================

export function exportBackup(){

    const backup={

        progress:load("english800_progress"),

        license:load("english800_license"),

        lastWord:load("english800_last"),

        option:load("english800_option"),

        quiz:load("english800_quiz"),

        version:"1.0",

        date:new Date().toLocaleString()

    };

    const blob=new Blob(

        [JSON.stringify(backup,null,2)],

        {type:"application/json"}

    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download=BACKUP_NAME;

    a.click();

    URL.revokeObjectURL(url);

}



// =========================
// 복원
// =========================

export function importBackup(file){

    const reader=new FileReader();

    reader.onload=e=>{

        try{

            const data=JSON.parse(e.target.result);

            if(data.progress)
                save("english800_progress",data.progress);

            if(data.license)
                save("english800_license",data.license);

            if(data.lastWord)
                save("english800_last",data.lastWord);

            if(data.option)
                save("english800_option",data.option);

            if(data.quiz)
                save("english800_quiz",data.quiz);

            alert("복원이 완료되었습니다.");

            location.reload();

        }catch(err){

            alert("백업 파일이 올바르지 않습니다.");

        }

    };

    reader.readAsText(file);

}



// =========================
// 백업 존재 여부
// =========================

export function hasBackup(){

    return load("english800_progress")!=null;

}



// =========================
// 초기화
// =========================

export function clearBackup(){

    localStorage.removeItem("english800_progress");

    localStorage.removeItem("english800_last");

    localStorage.removeItem("english800_option");

    localStorage.removeItem("english800_quiz");

}
