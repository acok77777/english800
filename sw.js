/* ==========================================
   초등 필수 영단어 800
   Service Worker
========================================== */

const CACHE_NAME = "english800-v1.0.0";

const FILES = [

    "./",

    "./index.html",

    "./style.css",

    "./manifest.json",

    "./data.js",

    "./script.js",

    "./render.js",

    "./search.js",

    "./quiz.js",

    "./speech.js",

    "./storage.js",

    "./backup.js",

    "./progress.js",

    "./license.js",

    "./effects.js",

    "./icons/title.png",

    "./icons/icon-192.png",

    "./icons/icon-512.png"

];



/* ===============================
   설치
================================ */

self.addEventListener("install",(event)=>{

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>{

            return cache.addAll(FILES);

        })

    );

    self.skipWaiting();

});



/* ===============================
   활성화
================================ */

self.addEventListener("activate",(event)=>{

    event.waitUntil(

        caches.keys()

        .then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(key!==CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});



/* ===============================
   요청
================================ */

self.addEventListener("fetch",(event)=>{

    event.respondWith(

        caches.match(event.request)

        .then(response=>{

            if(response){

                return response;

            }

            return fetch(event.request)

            .then(networkResponse=>{

                if(

                    !networkResponse ||

                    networkResponse.status!==200 ||

                    networkResponse.type!=="basic"

                ){

                    return networkResponse;

                }

                const responseClone=

                    networkResponse.clone();

                caches.open(CACHE_NAME)

                .then(cache=>{

                    cache.put(

                        event.request,

                        responseClone

                    );

                });

                return networkResponse;

            })

            .catch(()=>{

                return caches.match("./index.html");

            });

        })

    );

});
