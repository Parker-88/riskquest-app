const CACHE="riskquest-1786521669045";
const ASSETS=[
  "./assets/curriculum.Ca37niSf.js",
  "./assets/home-BMySrwuU.css",
  "./assets/index-BCGZ7Hfs.css",
  "./assets/index-y1CuYjRy.js",
  "./assets/interview-DvjklYc5.css",
  "./assets/pages-home-home.Dut8U2EZ.js",
  "./assets/pages-interview-interview.E3Yc-QVE.js",
  "./assets/pages-profile-profile.JzpegkGY.js",
  "./assets/pages-roadmap-roadmap.DmxP5-Bt.js",
  "./assets/pages-train-train.BUri_nLD.js",
  "./assets/profile-CzhyCvLe.css",
  "./assets/roadmap-DL05_JKM.css",
  "./assets/train-B0lrwda-.css",
  "./assets/uni.9848b6a9.css",
  "./assets/_plugin-vue_export-helper.BCo6x5W8.js",
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