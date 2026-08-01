/* ===================================
   초등 필수 영단어 800
   Service Worker
=================================== */


const CACHE_NAME = "english800-v1";


const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./data.js",
    "./manifest.json",

    "./icons/icon-192.png",
    "./icons/icon-512.png"

];



// 설치

self.addEventListener(

"install",

event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => {

            return cache.addAll(
                FILES_TO_CACHE
            );

        })

    );


    self.skipWaiting();

});




// 활성화

self.addEventListener(

"activate",

event => {


    event.waitUntil(

        caches.keys()

        .then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(
                        key !== CACHE_NAME
                    ){

                        return caches.delete(key);

                    }

                })

            );

        })

    );


    self.clients.claim();

});





// 요청 처리

self.addEventListener(

"fetch",

event => {


    event.respondWith(

        caches.match(event.request)

        .then(response => {


            // 저장된 파일 있으면 사용

            if(response){

                return response;

            }


            // 없으면 인터넷 요청

            return fetch(event.request);


        })

    );


});
