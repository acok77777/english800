/* ==========================================
   sw.js

   초등 필수 영단어 800

   Service Worker

========================================== */


const CACHE_NAME =

"english800-v2";





const FILES_TO_CACHE = [


"./",

"./index.html",

"./style.css",

"./script.js",


"./data.js",

"./render.js",

"./search.js",

"./quiz.js",

"./speech.js",

"./storage.js",

"./progress.js",

"./backup.js",

"./effects.js",

"./license.js",


"./manifest.json",



"./icons/icon-192.png",

"./icons/icon-512.png"



];









/* ==========================================
   설치
========================================== */


self.addEventListener(

"install",

event=>{



    event.waitUntil(



        caches.open(

            CACHE_NAME

        )

        .then(cache=>{


            return cache.addAll(

                FILES_TO_CACHE

            );


        })



    );





    // 새 버전 즉시 적용


    self.skipWaiting();



});









/* ==========================================
   활성화

   이전 캐시 삭제

========================================== */


self.addEventListener(

"activate",

event=>{



    event.waitUntil(



        caches.keys()

        .then(keys=>{



            return Promise.all(



                keys.map(key=>{



                    if(

                    key !== CACHE_NAME

                    ){



                        return caches.delete(

                            key

                        );



                    }



                })



            );



        })



    );





    self.clients.claim();



});









/* ==========================================
   요청 처리

========================================== */


self.addEventListener(

"fetch",

event=>{



    event.respondWith(



        caches.match(

            event.request

        )

        .then(response=>{



            return response ||



            fetch(

                event.request

            );



        })



    );



});
