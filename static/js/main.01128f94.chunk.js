(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){},19:function(e,t,n){e.exports=n.p+"static/media/overlay.c4334bec.png"},23:function(e,t,n){e.exports=n(38)},28:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(18),r=n.n(o),c=(n(28),n(5)),s=n(6),l=n(9),d=n(8),u=n(10),m=n(20),h=n(7),g=["".concat("/web-bridge-playground","/web_bridge.js")],p=new(function(){function e(){Object(c.a)(this,e),this.libs=g,this.loadedLib=[],this.numOfLib=0}return Object(s.a)(e,[{key:"enable",value:function(){var e="_gatap_force_disable_";"function"===typeof window[e]&&window[e](!0);var t=window.WebViewJavascriptBridge;t.init(),window.bridgeRegisterHandler=t.registerHandler,window.bridgeCallHandler=t.callHandler,(0,window.bridgeCallHandler)("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1}})}},{key:"load",value:function(){var e=this;this.numOfLib=this.libs.length,this.libs.forEach(function(t){e.createScriptTag(t).then(function(){e.loadedLib.push(t),e.numOfLib===e.loadedLib.length&&e.enable()}).catch(function(){})})}},{key:"createScriptTag",value:function(e){return new Promise(function(t,n){var a=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.async=!1,i.src=e;var o=!1,r=!1,c=i.onreadystatechange=function(){return o?s():r?l("err"):void("complete"===i.readyState?s():"error"===i.readyState&&l("err"))},s=function(){o=!0,t(e)},l=function(t){r=!0,void 0!==t.type&&"error"===t.type?console.error("Failed load resource from ".concat(e)):console.error("Failed create element"),n(e)};return i.addEventListener("load",s),i.addEventListener("error",l),a.appendChild(i),c()})}}]),e}()),w=n(19),b=n.n(w),v=(n(16),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).showShare=function(){var e=document.getElementById("myImage").src;window.bridgeCallHandler("showSharingPanel",{title:"Share Title",sharingAppIDsTop:["facebookPhoto","facebookMessenger","twitter","instagram","lineChat"]},function(t){var n=t.status,a=t.sharingAppID;console.log(n,a),window.bridgeCallHandler("shareData",{sharingAppID:a,sharingData:{image:{imageBase64:e}}},function(e){var t=e.errorCode,n=e.errorMessage;console.log("Share result: "+t,n)})})},n.getRecentImage=function(){window.bridgeCallHandler("getRecentImage",{width:0,height:600,tnWidth:200,tnHeight:200},function(e){console.log(e),n.setState({image:e.data.image})})},n.addScreenshotListener=function(){window.bridgeCallHandler("registerScreenshotDetection",{},function(e){console.log(e),0===e.error&&(console.log("registered"),window.bridgeRegisterHandler("SCREENSHOT_EVENT",function(e){console.log(e),0===e.error&&n.getRecentImage()}))})},n.addShare=function(){window.bridgeCallHandler("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1,rightItemsConfig:{items:[{type:"button",key:"share"}]}}}),window.bridgeRegisterHandler("onEventCallback",function(e){"share"===e.key&&n.showShare()})},n.removeShare=function(){window.bridgeCallHandler("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1,rightItemsConfig:{items:[]}}})},n.checkPermission=function(){window.bridgeCallHandler("checkAppPermission",{permissionList:["contact"]},function(e){var t=e.resultList,a=JSON.parse(t);a&&a[0]?n.showToast("Contact permission is alredy given  "):n.requestAppPermission()})},n.requestAppPermission=function(){window.bridgeCallHandler("requestAppPermission",{permissionList:["contact"],popupText:"In order to use this feature, Shopee needs to access your contact information."},function(e){"string"===typeof e?alert(e):alert(JSON.stringify(e))})},n.showPopup=function(){window.bridgeCallHandler("showPopUp",{popUp:{title:"This is a popup title!",message:"This is popup message, unfortunately this popup can't show any image.",cancelText:"Cancel Text",okText:"Ok text"}},function(e){0===e.buttonClicked&&n.showShare()})},n.showToast=function(e){window.bridgeCallHandler("showToast",{toast:{iconType:"success",message:e}})},n.navigate=function(){var e="".concat(window.location.href,"other");window.bridgeCallHandler("navigate",{url:e})},n.dimNavbar=function(){window.bridgeCallHandler("dimNavbar",{isDim:!0,color:"000000",alpha:.5}),n.setState({isDim:!0})},n.undimNavbar=function(){window.bridgeCallHandler("dimNavbar",{isDim:!1,color:"000000",alpha:.5}),n.setState({isDim:!1})},n.copy=function(e){window.bridgeCallHandler("copyTextToClipboard",{text:e})},n.pickImage=function(){window.bridgeCallHandler("pickImage",{maxCount:1,type:1},function(e){var t=document.getElementById("myCanvas"),n=t.getContext("2d"),a=new Image,i=new Image;a.src=e.image,a.onload=function(){n.drawImage(a,0,0,300,300),i.src=b.a,i.onload=function(){n.drawImage(i,0,0,i.naturalHeight,i.naturalWidth);var e=t.toDataURL("image/png");document.getElementById("myImage").src=e}}})},n.saveImage=function(){window.bridgeCallHandler("saveImage",{imageUrl:document.getElementById("myImage").src})},n.state={isDim:!1,visitCount:0,image:null},n}return Object(u.a)(t,e),Object(s.a)(t,[{key:"toUTF8Array",value:function(e){for(var t=[],n=0;n<e.length;n++){var a=e.charCodeAt(n);a<128?t.push(a):a<2048?t.push(192|a>>6,128|63&a):a<55296||a>=57344?t.push(224|a>>12,128|a>>6&63,128|63&a):(n++,a=(1023&a)<<10|1023&e.charCodeAt(n),t.push(240|a>>18,128|a>>12&63,128|a>>6&63,128|63&a))}return t}},{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){return e.addScreenshotListener()},1e3),this.setState({visitCount:this.state.visitCount+1})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement("div",null),i.a.createElement("div",{className:"item",onClick:this.getRecentImage},"Share Image Click",i.a.createElement("img",{src:this.state.image})),i.a.createElement("div",{className:"overlay",onClick:this.undimNavbar,style:{display:this.state.isDim?"block":"none"}},i.a.createElement("div",{className:"overlay-text"},"Click anywhere to undim")),i.a.createElement("div",{className:"item",onClick:this.checkPermission},"Check contact permission"),i.a.createElement("div",{className:"item",onClick:this.showShare},"Show share menu"),i.a.createElement("div",{className:"item",onClick:this.addShare},"Add share menu to navbar"),i.a.createElement("div",{className:"item",onClick:this.removeShare},"Remove share menu to navbar"),i.a.createElement("div",{className:"item",onClick:this.showPopup},"Show popup"),i.a.createElement("div",{className:"item",onClick:this.showToast},"Show toast"),i.a.createElement("div",{className:"item",onClick:this.navigate},"Move to another page"),i.a.createElement("div",{className:"item",onClick:this.dimNavbar},"Dim navbar"),i.a.createElement("div",{className:"item",onClick:function(){return e.copy("Copy this text to clipboard!")}},"Copy this text to clipboard!"))}}]),t}(a.Component)),f=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},"Try clicking the close button on the navbar or touch your phone back button!")}}]),t}(a.Component),C=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){p.load()}},{key:"render",value:function(){return i.a.createElement(m.a,null,i.a.createElement(i.a.Fragment,null,i.a.createElement(h.a,{exact:!0,path:"/",component:v}),i.a.createElement(h.a,{exact:!0,path:"/other",component:f})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[23,1,2]]]);
//# sourceMappingURL=main.01128f94.chunk.js.map