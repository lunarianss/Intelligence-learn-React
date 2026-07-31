self.addEventListener('install', function (event) {
  /* 通过这个方法可以防止缓存未完成，就关闭serviceWorker */
  event.waitUntil(
    /* 创建一个名叫V1的缓存版本 */
    caches.open('v1').then(function (cache) {
      /* 指定要缓存的内容，地址为相对于跟域名的访问路径 */
      return cache.addAll([
        'index'
      ]);
    })
  );
});



/** 应用缓存方案 */
// self.addEventListener('fetch', (e) => {
//   console.log('现在正在请求：' + e.request.url);
//   const currentUrl = e.request.url;
//   // 匹配上页面路径
//   if (matchHtml(currentUrl)) {
//     const requestToCache = e.request.clone();
//     e.respondWith(
//       // 加载网络上的资源
//       fetch(requestToCache).then((response) => {
//         // 加载失败
//         if (!response || response.status !== 200) {
//           throw Error('response error');
//         }
//         // 加载成功，更新缓存
//         const responseToCache = response.clone();
//         caches.open(cacheName).then((cache) => {
//           cache.put(requestToCache, responseToCache);
//         });
//         console.log(response);
//         return response;
//       }).catch(function () {
//         // 获取对应缓存中的数据，获取不到则退化到获取默认首页
//         return caches.match(e.request).then((response) => {
//           return response || caches.match('/home');
//         });
//       })
//     );
//   }
// });

