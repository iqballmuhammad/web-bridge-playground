(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){},19:function(e,t,n){e.exports=n.p+"static/media/overlay.c4334bec.png"},24:function(e,t,n){e.exports=n(39)},29:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(18),r=n.n(o),c=(n(29),n(5)),l=n(6),s=n(9),d=n(8),u=n(10),h=n(21),g=n(7),m=["".concat("/web-bridge-playground","/web_bridge.js")],p=new(function(){function e(){Object(c.a)(this,e),this.libs=m,this.loadedLib=[],this.numOfLib=0}return Object(l.a)(e,[{key:"enable",value:function(){var e="_gatap_force_disable_";"function"===typeof window[e]&&window[e](!0);var t=window.WebViewJavascriptBridge;t.init(),window.bridgeRegisterHandler=t.registerHandler,window.bridgeCallHandler=t.callHandler,(0,window.bridgeCallHandler)("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1}})}},{key:"load",value:function(){var e=this;this.numOfLib=this.libs.length,this.libs.forEach(function(t){e.createScriptTag(t).then(function(){e.loadedLib.push(t),e.numOfLib===e.loadedLib.length&&e.enable()}).catch(function(){})})}},{key:"createScriptTag",value:function(e){return new Promise(function(t,n){var a=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.async=!1,i.src=e;var o=!1,r=!1,c=i.onreadystatechange=function(){return o?l():r?s("err"):void("complete"===i.readyState?l():"error"===i.readyState&&s("err"))},l=function(){o=!0,t(e)},s=function(t){r=!0,void 0!==t.type&&"error"===t.type?console.error("Failed load resource from ".concat(e)):console.error("Failed create element"),n(e)};return i.addEventListener("load",l),i.addEventListener("error",s),a.appendChild(i),c()})}}]),e}()),f=n(19),w=n.n(f),b=(n(16),n(20)),v=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(d.a)(t).call(this,e))).showShare=function(){var e=document.getElementById("myImage").src;window.bridgeCallHandler("showSharingPanel",{title:"Share Title",sharingAppIDsTop:["facebookPhoto","facebookMessenger","twitter","instagram","lineChat"]},function(t){var n=t.status,a=t.sharingAppID;console.log(n,a),window.bridgeCallHandler("shareData",{sharingAppID:a,sharingData:{image:{imageBase64:e}}},function(e){var t=e.errorCode,n=e.errorMessage;console.log("Share result: "+t,n)})})},n.getRecentImage=function(){window.bridgeCallHandler("getRecentImage",{width:0,height:1500,tnWidth:200,tnHeight:200},function(e){n.setState({image:e.data.image})})},n.addScreenshotListener=function(){window.bridgeCallHandler("registerScreenshotDetection",{},function(e){0===e.error&&window.bridgeRegisterHandler("SCREENSHOT_EVENT",function(e){0===e.error&&n.getRecentImage()})})},n.addShare=function(){window.bridgeCallHandler("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1,rightItemsConfig:{items:[{type:"button",key:"share"}]}}}),window.bridgeRegisterHandler("onEventCallback",function(e){"share"===e.key&&n.showShare()})},n.removeShare=function(){window.bridgeCallHandler("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1,rightItemsConfig:{items:[]}}})},n.checkPermission=function(){window.bridgeCallHandler("checkAppPermission",{permissionList:["contact"]},function(e){var t=e.resultList,a=JSON.parse(t);a&&a[0]?n.showToast("Contact permission is alredy given  "):n.requestAppPermission()})},n.requestAppPermission=function(){window.bridgeCallHandler("requestAppPermission",{permissionList:["contact"],popupText:"In order to use this feature, Shopee needs to access your contact information."},function(e){"string"===typeof e?alert(e):alert(JSON.stringify(e))})},n.showPopup=function(){window.bridgeCallHandler("showPopUp",{popUp:{title:"This is a popup title!",message:"This is popup message, unfortunately this popup can't show any image.",cancelText:"Cancel Text",okText:"Ok text"}},function(e){0===e.buttonClicked&&n.showShare()})},n.showToast=function(e){window.bridgeCallHandler("showToast",{toast:{iconType:"success",message:e}})},n.navigate=function(){var e="".concat(window.location.href,"other");window.bridgeCallHandler("navigate",{url:e})},n.dimNavbar=function(){window.bridgeCallHandler("dimNavbar",{isDim:!0,color:"000000",alpha:.5}),n.setState({isDim:!0})},n.undimNavbar=function(){window.bridgeCallHandler("dimNavbar",{isDim:!1,color:"000000",alpha:.5}),n.setState({isDim:!1})},n.copy=function(e){window.bridgeCallHandler("copyTextToClipboard",{text:e})},n.getDeviceInfo=function(){window.bridgeCallHandler("getAppInfo",{},function(e){n.copy(e.deviceID),alert(e.deviceID)})},n.pickImage=function(){window.bridgeCallHandler("pickImage",{maxCount:1,type:1},function(e){var t=document.getElementById("myCanvas"),n=t.getContext("2d"),a=new Image,i=new Image;a.src=e.image,a.onload=function(){n.drawImage(a,0,0,300,300),i.src=w.a,i.onload=function(){n.drawImage(i,0,0,i.naturalHeight,i.naturalWidth);var e=t.toDataURL("image/png");document.getElementById("myImage").src=e}}})},n.saveImage=function(){window.bridgeCallHandler("saveImage",{imageUrl:document.getElementById("myImage").src})},n.handleUrlChange=function(e){n.setState({url:e.target.value})},n.generateShortenedUrl=function(e){new b.a("FfXqXeCJ8I0lQbLlDz","id","test").generateShortLink(e,{title:"share title",desc:"share desc",imgUrl:"https://cf.shopee.co.id/file/eca6e6060d408a6b6f97461a5b8c0c8e"}).then(function(e){console.log(e),e.data&&n.setState({shortenedUrl:e.data.shortLink})})},n.state={isDim:!1,visitCount:0,image:null,url:"",shortenedUrl:""},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"toUTF8Array",value:function(e){for(var t=[],n=0;n<e.length;n++){var a=e.charCodeAt(n);a<128?t.push(a):a<2048?t.push(192|a>>6,128|63&a):a<55296||a>=57344?t.push(224|a>>12,128|a>>6&63,128|63&a):(n++,a=(1023&a)<<10|1023&e.charCodeAt(n),t.push(240|a>>18,128|a>>12&63,128|a>>6&63,128|63&a))}return t}},{key:"componentDidMount",value:function(){this.setState({visitCount:this.state.visitCount+1})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement("div",null),i.a.createElement("div",null,i.a.createElement("input",{type:"text",value:this.state.url,onChange:this.handleUrlChange})),i.a.createElement("div",null,i.a.createElement("button",{onClick:function(){return e.generateShortenedUrl(e.state.url)}},"Shorten Url")),i.a.createElement("div",null,this.state.shortenedUrl),i.a.createElement("div",null,i.a.createElement("button",{onClick:this.getDeviceInfo},"Get Device Id")))}}]),t}(a.Component),y=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},"Try clicking the close button on the navbar or touch your phone back button!")}}]),t}(a.Component),C=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){p.load()}},{key:"render",value:function(){return i.a.createElement(h.a,null,i.a.createElement(i.a.Fragment,null,i.a.createElement(g.a,{exact:!0,path:"/",component:v}),i.a.createElement(g.a,{exact:!0,path:"/other",component:y})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[24,1,2]]]);
//# sourceMappingURL=main.26284965.chunk.js.map