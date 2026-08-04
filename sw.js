// ==========================================
// Service Worker FINAL
// ==========================================


const CACHE_NAME = "english800-v3";



const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./data.js",

    "./script.js",

    "./render.js",

    "./quiz.js",

    "./storage.js",

    "./history.js",

    "./search.js",

    "./speech.js",

    "./effects.js",

    "./progress.js",

    "./backup.js",

    "./license.js",

    "./manifest.json",

    "./icons/icon-192.png",

    "./icons/icon-512.png",

    "./icons/title.png"

];








// 설치

self.addEventListener(

"install",

event => {


    self.skipWaiting();


    event.waitUntil(


        caches.open(CACHE_NAME)

        .then(cache=>{


            return cache.addAll(

                FILES_TO_CACHE

            );


        })

    );


}

);









// 활성화

self.addEventListener(

"activate",

event=>{


    event.waitUntil(


        caches.keys()

        .then(keys=>{


            return Promise.all(


                keys.map(key=>{


                    if(key !== CACHE_NAME){


                        return caches.delete(key);


                    }


                })


            );


        })


    );



    self.clients.claim();


}

);









// 파일 요청

self.addEventListener(

"fetch",

event=>{


    event.respondWith(


        fetch(event.request)

        .catch(()=>{


            return caches.match(

                event.request

            );


        })


    );


}

);
