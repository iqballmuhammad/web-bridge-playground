(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){},14:function(e,t,a){e.exports=a.p+"static/media/overlay.c4334bec.png"},16:function(e,t,a){e.exports=a(28)},22:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(13),r=a.n(o),c=(a(22),a(4)),l=a(5),s=a(8),d=a(7),m=a(9),u=a(30),h=a(31),p=["".concat("/web-bridge-playground","/web_bridge.js")],g=new(function(){function e(){Object(c.a)(this,e),this.libs=p,this.loadedLib=[],this.numOfLib=0}return Object(l.a)(e,[{key:"enable",value:function(){var e="_gatap_force_disable_";"function"===typeof window[e]&&window[e](!0);var t=window.WebViewJavascriptBridge;t.init(),window.bridgeRegisterHandler=t.registerHandler,window.bridgeCallHandler=t.callHandler,(0,window.bridgeCallHandler)("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1}})}},{key:"load",value:function(){var e=this;this.numOfLib=this.libs.length,this.libs.forEach(function(t){e.createScriptTag(t).then(function(){e.loadedLib.push(t),e.numOfLib===e.loadedLib.length&&e.enable()}).catch(function(){})})}},{key:"createScriptTag",value:function(e){return new Promise(function(t,a){var n=document.getElementsByTagName("head")[0],i=document.createElement("script");i.type="text/javascript",i.async=!1,i.src=e;var o=!1,r=!1,c=i.onreadystatechange=function(){return o?l():r?s("err"):void("complete"===i.readyState?l():"error"===i.readyState&&s("err"))},l=function(){o=!0,t(e)},s=function(t){r=!0,void 0!==t.type&&"error"===t.type?console.error("Failed load resource from ".concat(e)):console.error("Failed create element"),a(e)};return i.addEventListener("load",l),i.addEventListener("error",s),n.appendChild(i),c()})}}]),e}()),w=a(14),b=a.n(w),v=(a(12),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).showShare=function(){var e=document.getElementById("myImage").src;window.bridgeCallHandler("share",{shareType:4,genericImageUrl:e})},a.addShare=function(){window.bridgeCallHandler("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1,rightItemsConfig:{items:[{type:"button",key:"share"}]}}}),window.bridgeRegisterHandler("onEventCallback",function(e){"share"==e.key&&a.showShare()})},a.removeShare=function(){window.bridgeCallHandler("configurePage",{navbar:{title:"Web Bridge Showcase",hideBackButton:1,showCloseIcon:1,rightItemsConfig:{items:[]}}})},a.showPopup=function(){window.bridgeCallHandler("showPopUp",{popUp:{title:"This is a popup title!",message:"This is popup message, unfortunately this popup can't show any image.",cancelText:"Cancel Text",okText:"Ok text"}},function(e){0===e.buttonClicked&&a.showShare()})},a.showToast=function(){window.bridgeCallHandler("showToast",{toast:{iconType:"success",message:"This is a toast!"}})},a.navigate=function(){var e="".concat(window.location.href,"other");window.bridgeCallHandler("navigate",{url:e})},a.dimNavbar=function(){window.bridgeCallHandler("dimNavbar",{isDim:!0,color:"000000",alpha:.5}),a.setState({isDim:!0})},a.undimNavbar=function(){window.bridgeCallHandler("dimNavbar",{isDim:!1,color:"000000",alpha:.5}),a.setState({isDim:!1})},a.copy=function(e){window.bridgeCallHandler("copyTextToClipboard",{text:e})},a.pickImage=function(){window.bridgeCallHandler("pickImage",{maxCount:1,type:1},function(e){var t=document.getElementById("myCanvas"),a=t.getContext("2d"),n=new Image,i=new Image;n.src=e.image,n.onload=function(){a.drawImage(n,0,0,300,300),i.src=b.a,i.onload=function(){a.drawImage(i,0,0,i.naturalHeight,i.naturalWidth);var e=t.toDataURL("image/png");document.getElementById("myImage").src=e}}})},a.state={isDim:!1,visitCount:0},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.setState({visitCount:this.state.visitCount+1})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"overlay",onClick:this.undimNavbar,style:{display:this.state.isDim?"block":"none"}},i.a.createElement("div",{className:"overlay-text"},"Click anywhere to undim")),i.a.createElement("div",{className:"item",onClick:this.showShare},"Show share menu"),i.a.createElement("div",{className:"item",onClick:this.addShare},"Add share menu to navbar"),i.a.createElement("div",{className:"item",onClick:this.removeShare},"Remove share menu to navbar"),i.a.createElement("div",{className:"item",onClick:this.showPopup},"Show popup"),i.a.createElement("div",{className:"item",onClick:this.showToast},"Show toast"),i.a.createElement("div",{className:"item",onClick:this.navigate},"Move to another page"),i.a.createElement("div",{className:"item",onClick:this.dimNavbar},"Dim navbar"),i.a.createElement("div",{className:"item",onClick:this.pickImage},"Pick Image"),i.a.createElement("canvas",{id:"myCanvas"}),i.a.createElement("img",{id:"myImage",style:{display:"none"},alt:"myImage"}),i.a.createElement("div",{className:"item",onClick:function(){return e.copy("Copy this text to clipboard!")}},"Copy this text to clipboard!"))}}]),t}(n.Component)),f=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},"Try clicking the close button on the navbar or touch your phone back button!")}}]),t}(n.Component),y=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){g.load()}},{key:"render",value:function(){return i.a.createElement(u.a,null,i.a.createElement(i.a.Fragment,null,i.a.createElement(h.a,{exact:!0,path:"/",component:v}),i.a.createElement(h.a,{exact:!0,path:"/other",component:f})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,1,2]]]);
//# sourceMappingURL=main.5cff4a68.chunk.js.map