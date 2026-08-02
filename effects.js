// effects.js

// ======================
// 버튼 눌림 효과
// ======================

export function clickEffect(el){

    if(!el) return;

    el.style.transform="scale(0.94)";

    setTimeout(()=>{

        el.style.transform="scale(1)";

    },120);

}



// ======================
// 카드 등장
// ======================

export function showCard(el){

    if(!el) return;

    el.style.opacity=0;

    el.style.transform="translateY(20px)";

    setTimeout(()=>{

        el.style.transition="0.35s";

        el.style.opacity=1;

        el.style.transform="translateY(0px)";

    },30);

}



// ======================
// 정답 효과
// ======================

export function correct(el){

    if(!el) return;

    el.style.background="#b9f6ca";

    el.style.transform="scale(1.05)";

    setTimeout(()=>{

        el.style.background="";

        el.style.transform="scale(1)";

    },700);

}



// ======================
// 오답 효과
// ======================

export function wrong(el){

    if(!el) return;

    el.style.background="#ffcdd2";

    shake(el);

    setTimeout(()=>{

        el.style.background="";

    },700);

}



// ======================
// 흔들림
// ======================

export function shake(el){

    if(!el) return;

    el.animate([

        {transform:"translateX(-6px)"},

        {transform:"translateX(6px)"},

        {transform:"translateX(-6px)"},

        {transform:"translateX(6px)"},

        {transform:"translateX(0px)"}

    ],{

        duration:300

    });

}



// ======================
// 체크 완료
// ======================

export function checked(el){

    if(!el) return;

    el.animate([

        {transform:"scale(0.8)"},

        {transform:"scale(1.15)"},

        {transform:"scale(1)"}

    ],{

        duration:400

    });

}



// ======================
// 페이드 인
// ======================

export function fadeIn(el){

    if(!el) return;

    el.style.opacity=0;

    setTimeout(()=>{

        el.style.transition="0.4s";

        el.style.opacity=1;

    },20);

}



// ======================
// 페이드 아웃
// ======================

export function fadeOut(el){

    if(!el) return;

    el.style.transition="0.3s";

    el.style.opacity=0;

}
