// =========================================
// calendar.js
// 학습 달력
// =========================================

'use strict';

let currentDate = new Date();

// =========================================
// 학습일 저장
// =========================================

function saveStudyDate(){

    const today = new Date().toISOString().slice(0,10);

    let list = JSON.parse(

        localStorage.getItem("studyDates") || "[]"

    );

    if(!list.includes(today)){

        list.push(today);

        localStorage.setItem(

            "studyDates",

            JSON.stringify(list)

        );

    }

}

// =========================================
// 학습일 읽기
// =========================================

function getStudyDates(){

    return JSON.parse(

        localStorage.getItem("studyDates") || "[]"

    );

}

// =========================================
// 달력 출력
// =========================================

function updateCalendar(){

    const calendar=document.getElementById("calendar");

    if(!calendar) return;

    calendar.innerHTML="";

    const year=currentDate.getFullYear();

    const month=currentDate.getMonth();

    document.getElementById("calendarTitle").textContent=

        `${year}년 ${month+1}월`;

    const firstDay=new Date(year,month,1).getDay();

    const lastDate=new Date(year,month+1,0).getDate();

    const studyDates=getStudyDates();

    for(let i=0;i<firstDay;i++){

        const empty=document.createElement("div");

        empty.className="calendar-empty";

        calendar.appendChild(empty);

    }

    for(let day=1;day<=lastDate;day++){

        const div=document.createElement("div");

        div.className="calendar-day";

        div.textContent=day;

        const date=

            `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

        if(studyDates.includes(date)){

            div.classList.add("study");

        }

        const today=new Date();

        const todayText=

            today.toISOString().slice(0,10);

        if(date===todayText){

            div.classList.add("today");

        }

        calendar.appendChild(div);

    }

    updateStudyCount();

}

// =========================================
// 이전달
// =========================================

function prevMonth(){

    currentDate.setMonth(

        currentDate.getMonth()-1

    );

    updateCalendar();

}

// =========================================
// 다음달
// =========================================

function nextMonth(){

    currentDate.setMonth(

        currentDate.getMonth()+1

    );

    updateCalendar();

}

// =========================================
// 이번달
// =========================================

function currentMonth(){

    currentDate=new Date();

    updateCalendar();

}

// =========================================
// 학습일 수
// =========================================

function updateStudyCount(){

    const el=document.getElementById("studyCount");

    if(!el) return;

    el.textContent=

        getStudyDates().length+"일";

}

// =========================================
// 모두 삭제
// =========================================

function clearStudyCalendar(){

    if(!confirm("학습 기록을 삭제할까요?"))

        return;

    localStorage.removeItem("studyDates");

    updateCalendar();

}

// =========================================
// 오늘 기록
// =========================================

function markTodayStudy(){

    saveStudyDate();

    updateCalendar();

}

// =========================================
// 시작
// =========================================

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        updateCalendar();

    }

);
