const libs = [`${process.env.PUBLIC_URL}/web_bridge.js`];

class WebBridgeLoader {
  libs;
  loadedLib;
  numOfLib;
  constructor() {
    this.libs = libs;
    this.loadedLib = [];
    this.numOfLib = 0;
  }

  enable() {
    const gatap = "_gatap_force_disable_";
    if (typeof window[gatap] === "function") {
      window[gatap](true);
    }
    const bridge = window["WebViewJavascriptBridge"];
    bridge.init();
    window["bridgeCallHandler"] = bridge.callHandler;
    const bridgeCallHandler = window["bridgeCallHandler"];
    bridgeCallHandler("configurePage", {
      navbar: {
        title: "Web Bridge Showcase",
        hideBackButton: 1, // if you need to hide the back button
        showCloseIcon: 1 // if you need to show the close button
      }
    });
  }

  load() {
    this.numOfLib = this.libs.length;
    this.libs.forEach(src => {
      this.createScriptTag(src)
        .then(() => {
          this.loadedLib.push(src);
          if (this.numOfLib === this.loadedLib.length) {
            this.enable();
          }
        })
        .catch(() => {
          // cannot use WebBridge
        });
    });
  }

  createScriptTag(src) {
    return new Promise((res, rej) => {
      const head = document.getElementsByTagName("head")[0];
      const tag = document.createElement("script");
      tag.type = "text/javascript";
      tag.async = false;
      tag.src = src;

      const onreadystatechange = "onreadystatechange";
      const readyState = "readyState";
      let resolved = false;
      let rejected = false;

      const callback = (tag[onreadystatechange] = () => {
        if (resolved) {
          return successHandler();
        }
        if (rejected) {
          return errorHandler("err");
        }

        if (tag[readyState] === "complete") {
          successHandler();
        } else if (tag[readyState] === "error") {
          errorHandler("err");
        }
      });

      const successHandler = () => {
        resolved = true;
        res(src);
      };
      const errorHandler = e => {
        rejected = true;
        if (e.type !== undefined && e.type === "error") {
          // tslint:disable-next-line:no-console
          console.error(`Failed load resource from ${src}`);
        } else {
          // tslint:disable-next-line:no-console
          console.error("Failed create element");
        }
        rej(src);
      };

      tag.addEventListener("load", successHandler);
      tag.addEventListener("error", errorHandler);

      head.appendChild(tag);
      return callback();
    });
  }
}

export default new WebBridgeLoader();
