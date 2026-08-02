// search.js

import { WORDS } from "./data.js";

export function searchWords(keyword){

    if(!keyword) return WORDS;

    keyword = keyword
        .trim()
        .toLowerCase();

    return WORDS.filter(item=>{

        return(

            item.word.toLowerCase().includes(keyword)

            ||

            item.p.includes(keyword)

            ||

            item.m.includes(keyword)

            ||

            String(item.id).includes(keyword)

        );

    });

}



// 번호 검색

export function searchNumber(num){

    return WORDS.find(v=>v.id==num);

}



// 영어 정확검색

export function searchEnglish(word){

    word=word.toLowerCase();

    return WORDS.find(v=>

        v.word.toLowerCase()==word

    );

}



// 뜻 검색

export function searchMeaning(text){

    return WORDS.filter(v=>

        v.m.includes(text)

    );

}



// 발음 검색

export function searchPron(text){

    return WORDS.filter(v=>

        v.p.includes(text)

    );

}
