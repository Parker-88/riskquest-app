const CACHE="riskquest-1786605757055";
const ASSETS=[
  "./.nojekyll",
  "./assets/app-zAOCsvY_.js",
  "./assets/style-ARplaBJe.css",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./index.html",
  "./manifest.webmanifest",
  "./offline.html"
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  // Always prefer the latest HTML while online. This prevents a cached old
  // index from requesting hashed chunks that were removed by a new deploy.
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy))}
      return response;
    }).catch(()=>caches.match('./index.html').then(r=>r||caches.match('./offline.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response&&response.ok&&new URL(event.request.url).origin===self.location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}
    return response;
  }).catch(()=>caches.match('./offline.html'))));
});