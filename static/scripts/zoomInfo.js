function initZoomInfo(){
  window['ZIProjectKey']='e86bc745611694468564';
  var zi=document.createElement('script');
  zi.type='text/javascript',
  zi.async=!0,
  zi.src='https://js.zi-scripts.com/zi-tag.js',
  document.readyState==='complete'?document.body.appendChild(zi):window.addEventListener('load',function(){
    document.body.appendChild(zi)
  })
}
initZoomInfo();
