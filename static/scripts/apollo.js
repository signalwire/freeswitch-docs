function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
  o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
    o.onload=function(){window.trackingFunctions.onLoad({appId:"66314dd45dbb1701c7850f76"})},
    document.head.appendChild(o)}initApollo();