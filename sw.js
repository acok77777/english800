// =========================================
// English800 PWA
// Service Worker
// =========================================

const CACHE_NAME = "english800-v1.0.0";

const FILES_TO_CACHE = [

    "./",

    "./index.html",

    "./style.css",

    "./data.js",

    "./script.js",

    "./render.js",

    "./search.js",

    "./speech.js",

    "./storage.js",

    "./progress.js",

    "./backup.js",

    "./calendar.js",

    "./quiz.js",

    "./license.js",

    "./manifest.json",

    "./icons/icon-192.png",

    "./icons/icon-512.png",

    "./icons/title.png"

];

// =========================================
// 설치
// =========================================

self.addEventListener("install",(event)=>{

    console.log("Service Worker Install");

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache=>{

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});

// =========================================
// 활성화
// =========================================

self.addEventListener("activate",(event)=>{

    console.log("Service Worker Activate");

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

// =========================================
// 요청 처리
// =========================================

self.addEventListener("fetch",(event)=>{

    event.respondWith(

        caches.match(event.request)

        .then(response=>{

            if(response){

                return response;

            }

            return fetch(event.request)

            .then(networkResponse=>{

                return caches.open(CACHE_NAME)

                .then(cache=>{

                    cache.put(

                        event.request,

                        networkResponse.clone()

                    );

                    return networkResponse;

                });

            })

            .catch(()=>{

                return caches.match("./index.html");

            });

        })

    );

});
