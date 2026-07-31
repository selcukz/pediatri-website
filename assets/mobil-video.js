/* ---------------------------------------------------------------------------
   Ortam videoları için mobil-önce davranış.
   HTML'de hiçbir video "autoplay" DEĞİLDİR ve preload="none" ile gelir; yani
   telefonda hiçbir video, kullanıcı dokunmadan indirilmez (mobil veri koruması).
   Geniş ekranda ve hareket azaltma kapalıysa, ortam videoları (data-ambient)
   sessizce kendiliğinden oynatılır — masaüstündeki eski davranış korunur.
   Telefonda ise poster görünür ve oynatma denetimleri eklenir.
--------------------------------------------------------------------------- */
(function () {
  var kucukEkran = window.matchMedia('(max-width:820px)').matches;
  var dokunmatik = window.matchMedia('(hover:none) and (pointer:coarse)').matches;
  var azHareket = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var mobil = kucukEkran || dokunmatik;

  document.querySelectorAll('video[data-ambient]').forEach(function (v) {
    if (mobil || azHareket) {
      // Dokunana kadar tek bayt inmez; poster karesi görünür.
      v.setAttribute('controls', '');
      v.preload = 'none';
      return;
    }
    v.preload = 'auto';
    v.loop = true;
    v.muted = true;
    v.autoplay = true;
    var oynat = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    if (v.readyState >= 2) oynat(); else v.addEventListener('loadeddata', oynat, { once: true });
  });
})();
