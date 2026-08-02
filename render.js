/* ==========================================

   render.js



   초등 필수 영단어 800

   단어 출력 시스템



========================================== */





let currentWords = [];











/* ==========================================

   전체 단어 출력

========================================== */





function renderAllWords(){





    currentWords = WORDS;





    renderWords(currentWords);





}















/* ==========================================

   단어 목록 출력

========================================== */





function renderWords(words){







    const container = document.getElementById(



        "wordList"



    );







    if(!container){



        return;



    }







    container.innerHTML = "";







    words.forEach(word=>{





        const item = createWordRow(word);





        container.appendChild(item);





    });







}















/* ==========================================

   단어 한 줄 생성

========================================== */





function createWordRow(word){







    const row = document.createElement(



        "div"



    );







    row.className = "word-row";









    const checked = isCompleted(word.id)



    ? "checked"



    : "";











    row.innerHTML = `





<div class="check-box">





<input



type="checkbox"



${checked}



onchange="toggleComplete(${word.id})">





</div>









<div class="word-number">



${word.id}



</div>











<div class="word-info">





<div class="english-word">



${word.word}



</div>







<div class="pronunciation">



${word.pronunciation}



</div>





</div>













<button



class="sound-btn"



onclick="speakWord('${word.word}')">





🔊





</button>













<div class="meaning">





${word.meaning}





</div>







`;







return row;







}















/* ==========================================

   학습 체크

========================================== */





function toggleComplete(id){







    if(isCompleted(id)){





        removeCompletedWord(id);





    }



    else{





        completeWord(id);





        addHistory(id);





        saveStudyDate();





    }







    renderWords(currentWords);







    if(typeof renderProgress==="function"){





        renderProgress();





    }







}















/* ==========================================

   알파벳 검색

========================================== */





function filterAlphabet(letter){







    if(letter==="ALL"){





        renderAllWords();





        return;





    }









    const result = WORDS.filter(word=>{





        return word.word



        .charAt(0)



        .toUpperCase()



        === letter;





    });







    currentWords=result;







    renderWords(result);







}















/* ==========================================

   즐겨찾기 대신 사용

========================================== */





function renderFavorites(){







    const list=getFavorites();







    const result=WORDS.filter(word=>{





        return list.includes(word.id);





    });







    currentWords=result;







    renderWords(result);







}















/* ==========================================

   오답노트

========================================== */





function renderWrongWords(){







    const list=getWrongWords();







    const result=WORDS.filter(word=>{





        return list.includes(word.id);





    });







    const box=document.getElementById(



        "wrongList"



    );







    if(box){





        box.innerHTML="";





        result.forEach(word=>{





            box.appendChild(



                createWordRow(word)



            );





        });







    }







}















/* ==========================================

   초기 실행

========================================== */





function initRender(){







    if(typeof WORDS==="undefined"){





        console.error(



        "data.js 없음"



        );





        return;





    }







    renderAllWords();







}
