// @flow
/* eslint-disable */
var CUSTOM_PROTOCOL_SCHEME = "wvjbscheme";
var QUEUE_HAS_MESSAGE = "__WVJB_QUEUE_MESSAGE__";

(function() {
  window.inBeeShop = function() {
    return (
      window &&
      window.navigator &&
      window.navigator.userAgent &&
      window.navigator.userAgent.toLowerCase().indexOf("beeshop") != -1
    );
  };

  // prevent error in server-rendering when trying to access window object
  if (
    window.WebViewJavascriptBridge ||
    !window ||
    !window.navigator ||
    !window.navigator.userAgent ||
    window.navigator.userAgent.indexOf("Beeshop") == -1
  ) {
    return;
  }

  var messagingIframe;
  var sendMessageQueue = [];
  var receiveMessageQueue = [];
  var messageHandlers = {};

  var responseCallbacks = {};
  var uniqueId = 1;

  function reset() {
    sendMessageQueue = [];
    receiveMessageQueue = [];
    messageHandlers = {};

    responseCallbacks = {};
    uniqueId = 1;

    window.WebViewJavascriptBridge._messageHandler = null;
  }

  function _createQueueReadyIframe(doc) {
    messagingIframe = doc.createElement("iframe");
    messagingIframe.style.display = "none";
    messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + "://" + QUEUE_HAS_MESSAGE;
    doc &&
      doc.documentElement &&
      doc.documentElement.appendChild(messagingIframe);
  }

  function init(messageHandler) {
    if (window.WebViewJavascriptBridge._messageHandler) {
      // it's not really an error, fix for many duplicate call cases
      console.warn("WebViewJavascriptBridge.init called twice");
      return null;
    }
    window.WebViewJavascriptBridge._messageHandler = [messageHandler];
    var receivedMessages = receiveMessageQueue;
    receiveMessageQueue = null;
    setTimeout(function() {
      if (receivedMessages) {
        for (var i = 0; i < receivedMessages.length; i++) {
          _dispatchMessageFromObjC(receivedMessages[i]);
        }
      }
    }, 0);
  }

  function send(data, responseCallback) {
    _doSend({ data: data }, responseCallback);
  }

  function registerHandler(handlerName, handler, handlerId) {
    if (typeof messageHandlers[handlerName] === "undefined") {
      messageHandlers[handlerName] = {};
    }
    handlerId = handlerId || handler.toString();
    messageHandlers[handlerName][handlerId] = handler;
    // We have to do this because Android app will only call hasHandler once inside pageFinished(), and thus later handlers won't be able to register with Android if we don't do this.
    hasHandlerCB(handlerName);
  }
  function unregisterHandler(handlerName, handlerId) {
    if (!handlerId) return;
    var handler = messageHandlers[handlerName];
    if (!handler) return;
    delete handler[handlerId];
    var stillHasHandler = false;
    for (var _temp in handler) {
      if (handler.hasOwnProperty(_temp)) {
        stillHasHandler = true;
        break;
      }
    }
    if (!stillHasHandler) {
      delete messageHandlers[handlerName];
      hasHandlerCB(handlerName);
    }
  }

  var hooks_map = {};
  function addHook(hookFunc) {
    var key = hookFunc.toString();
    if (hooks_map[key]) return;
    hooks_map[key] = hookFunc;
  }
  function delHook(hookFunc) {
    var key = hookFunc.toString();
    delete hooks_map[key];
  }

  function callHandler(handlerName, data, responseCallback) {
    // for(var i=0; i<hooks.length; i++)
    for (var k in hooks_map) {
      if (!hooks_map.hasOwnProperty(k)) continue;
      try {
        hooks_map[k](handlerName, data);
      } catch (ex) {}
    }

    //!!! Disabled because messing up with the URL caused too many problems in many places. All logics that appending new things to location.href would fail (for example delete credit credit card page).
    ////For BI tracking purpose.
    //if(handlerName == 'navigate')
    //{
    //	bridgeCallHandler("save", {key : KEY_SHOW_LESS_CATE, data : show ? '0' : '1', persist : 1}, function() {});
    //	if(data.hasOwnProperty('url'))
    //	{
    //		data['url'] = addSourceToUrl(data['url']);
    //	}
    //	if(data.hasOwnProperty('tabs'))
    //	{
    //		var tabs = data['tabs'];
    //		if(tabs)
    //		{
    //			for(var i=0; i<tabs.length; i++)
    //			{
    //				var tab = tabs[i];
    //				if(tab.hasOwnProperty('url'))
    //					tab['url'] = addSourceToUrl(tab['url']);
    //			}
    //		}
    //	}
    //}

    // !!! When going to full-screen mode, we MUST provide non-webp URL because we do NOT want user to save webp file and share later due to its limited support on iOS devices.
    if (handlerName == "fullScreenImage" && data) {
      var imageUrls = data["imageUrls"];
      if (imageUrls && imageUrls.length) {
        try {
          for (var i = 0; i < imageUrls.length; i++) {
            var url = imageUrls[i];
            if (
              typeof url !== "string" ||
              url.indexOf(window.ITEM_IMAGE_BASE_URL) < 0
            )
              continue;
            imageUrls[i] = url.replace("/webp/", "/");
          }
        } catch (e) {}
      }
    }
    _doSend({ handlerName: handlerName, data: data }, responseCallback);
  }

  function _doSend(message, responseCallback) {
    // Skip bridge cmd if app has pending page update.
    if (window.__appHasPendingCacheUpdate__) return;
    //if(destroyed) return;
    if (responseCallback) {
      var callbackId = "cb_" + uniqueId++ + "_" + +new Date();
      responseCallbacks[callbackId] = responseCallback;
      message["callbackId"] = callbackId;
    }
    if (window.navigator.userAgent.toLowerCase().indexOf("android") == -1) {
      // ios
      sendMessageQueue.push(message);
      messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + "://" + QUEUE_HAS_MESSAGE;
    } else {
      window.gabridge.sendMsg(JSON.stringify(message));
    }
  }

  function _fetchQueue() {
    var messageQueueString = JSON.stringify(sendMessageQueue);
    sendMessageQueue = [];

    //if(destroyed) return [];
    return messageQueueString;
  }

  function _dispatchMessageFromObjC(messageJSON) {
    // Skip bridge cmd if app has pending page update.
    if (window.__appHasPendingCacheUpdate__) return;
    //if(destroyed) return;
    try {
      var message = JSON.parse(messageJSON);
    } catch (err) {
      var message = {};
      console.warn("Bridge dispatch failed. err = " + err);
    }
    var messageHandler;

    if (message.responseId) {
      var responseCallback = responseCallbacks[message.responseId];
      if (!responseCallback) {
        return;
      }
      //isCBInProgress = true;
      responseCallback(message.responseData);
      //isCBInProgress = false;
      delete responseCallbacks[message.responseId];
    } else {
      var responseCallback;
      if (message.callbackId) {
        var callbackResponseId = message.callbackId;
        responseCallback = function(responseData) {
          _doSend({
            responseId: callbackResponseId,
            responseData: responseData
          });
        };
      }

      var handler = window.WebViewJavascriptBridge._messageHandler;
      if (message.handlerName) {
        handler = messageHandlers[message.handlerName];
      }
      if (typeof handler === "undefined") return;

      //isCBInProgress = true;
      for (var k in handler) {
        if (!handler.hasOwnProperty(k)) continue;
        try {
          handler[k](message.data, responseCallback);
        } catch (exception) {
          if (typeof console !== "undefined") {
            console.log(
              "WebViewJavascriptBridge: WARNING: javascript handler threw.",
              message,
              exception
            );
          }
        }
      }
      //isCBInProgress = false;
    }
  }

  function _handleMessageFromObjC(messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON);
    } else {
      _dispatchMessageFromObjC(messageJSON);
    }
  }

  function hasHandler(handlerName) {
    let has = false;
    try {
      has = null != messageHandlers[handlerName];
    } catch (exception) {
      has = false;
    }
    //On iOS, return String value only!
    return has ? "true" : "false";
  }

  function hasHandlerCB(handlerName) {
    if (!window.gabridge) return;
    //On Android, DO NOT RETURN ANYTHING!
    //Because Android can only call JS by loadUrl('javascript:....'), returned values WILL BECOME THE WEBPAGE AND WILL BE DISPLAYED!!!
    window.gabridge.onHasHandler(handlerName, hasHandler(handlerName));
  }

  // !!! NOTE: Currently only supported by iOS app >= 2.3. NOT SUPPORTED BY ANDROID APP!!!
  // This is a new way for App to inject handler definitions directly into JS context on page load.
  // In this way, JS won't need to chain callbacks for .callHandler('hasHandler', {handler: <handler>}, function(){.callHandler('<handler>', ... function(){});});
  // Chained JS calls could freeze iOS app if page reloads during the chained calls.
  function appHasHandler(name) {
    return (
      window.WebViewJavascriptBridge._appHandlers &&
      window.WebViewJavascriptBridge._appHandlers.indexOf(name) >= 0
    );
  }

  // These are failed attempts to avoid iOS deadlock during page reloading. Kept for reference.
  //var destroyed = false;
  //var isCBInProgress = false;
  //function hasPending()
  //{
  //	if(receiveMessageQueue && receiveMessageQueue.length > 0)
  //		return true;
  //	if(!$.isEmptyObject(responseCallbacks))
  //		return true;
  //	return isCBInProgress;
  //
  //}

  //var reloadFromCacheIfNeededCalled = false;
  //function reloadFromCacheIfNeeded()
  //{
  //	if(!window.__appHasPendingCacheUpdate__)
  //		return false;
  //
  //	// Should never happen.
  //	if(!appHasHandler('reloadFromCacheIfNeeded'))
  //	{
  //		window.__appHasPendingCacheUpdate__ = false;
  //		return false;
  //	}
  //
  //	var screenHeight = screen.height;
  //	var scrollTop = scrollTopFunc();
  //	// If user has already scrolled down, don't reload.
  //	if(scrollTop > screenHeight)
  //	{
  //		window.__appHasPendingCacheUpdate__ = false;
  //		return false;
  //	}
  //
  //	// Call this multiple times apparently would freeze iOS app.
  //	if(!reloadFromCacheIfNeededCalled)
  //	{
  //		reloadFromCacheIfNeededCalled = true;
  //
  //		//Just do the raw message sending.
  //		sendMessageQueue.push({ handlerName:'reloadFromCacheIfNeeded', data:{} });
  //		messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
  //		// NOTE: DO NOT callHandler() because it calls reloadFromCacheIfNeeded(), resulting in infinite loop.
  //		//callHandler("reloadFromCacheIfNeeded", {}, null);
  //	}
  //	// Note: Should NOT reset the value of __appHasPendingCacheUpdate__ here because:
  //	// 1) The page will be reloaded soon, and the value will be gone.
  //	// 2) More importantly, we want to let all future callers of reloadFromCacheIfNeeded() to have "true" as returned value so that they won't carry on with possible deadlocking operations.
  //	return true;
  //}

  window.WebViewJavascriptBridge = {
    init: init,
    send: send,
    registerHandler: registerHandler,
    unregisterHandler: unregisterHandler,
    callHandler: callHandler,
    hasHandler: hasHandler,
    hasHandlerCB: hasHandlerCB,
    addHook: addHook,
    delHook: delHook,
    appHasHandler: appHasHandler,
    _fetchQueue: _fetchQueue,
    _handleMessageFromObjC: _handleMessageFromObjC,
    reset: reset
    //reloadFromCacheIfNeeded: reloadFromCacheIfNeeded,
    // These are failed attempts to avoid iOS deadlock during page reloading. Kept for reference.
    //hasPending: hasPending,
    //destroy: function(){destroyed = true; responseCallbacks = []; receiveMessageQueue = [];},
  };

  var doc = document;
  _createQueueReadyIframe(doc);
  var readyEvent = doc.createEvent("Events");
  // $FlowIgnoreNextLine because our bridge implementation is hacky
  readyEvent.initEvent("WebViewJavascriptBridgeReady");
  readyEvent.bridge = window.WebViewJavascriptBridge;
  doc.dispatchEvent(readyEvent);

  var timerTriggerIOS = null;
  var intervalTriggerIOS = null;
  /*
	// !!! Tricky. When network is really slow, the iOS app's didFinishLoad won't be called soon, and all bridge responses will be pending for a long time.
	// So we wait for 100ms and if iOS app didFinishLoad still hasn't been called, we force to trigger it.
	if(isIOS() && isShopeeApp())
	{
		// Wait for 2 secs and start trying.
		timerTriggerIOS = setTimeout(function(){
			timerTriggerIOS = null;
			// This means didFinishLoad has run.
			if(window.__gawindow__) return;
			intervalTriggerIOS = setInterval(function(){
				// This is the magic variable injected by iOS app after didFinishLoad. We use this to detect whether didFinishLoad has been triggered.
				if(window.__gawindow__ || triggerIOSAppPageReInit())
				{
					clearInterval(intervalTriggerIOS);
					intervalTriggerIOS = null;
				}
			}, 300);
		}, 2000);
	}

	var RNCachingUpdateStatus_INITED = 0;
	var RNCachingUpdateStatus_STARTED = 1;
	var RNCachingUpdateStatus_UPDATED = 2;
	var RNCachingUpdateStatus_NOCHANGE = 3;
	function checkCacheStatus()
	{
		//console.log('checkCacheStatus: ' + window.__appCacheStatus__);
		// Keep polling if current page is indeed from cache.
		if(window.__appCacheStatus__ == RNCachingUpdateStatus_STARTED || window.__appCacheStatus__ == RNCachingUpdateStatus_INITED)
		{
			setTimeout(checkCacheStatus, 50);
		}
		else if(window.__appCacheStatus__ == RNCachingUpdateStatus_UPDATED)
		{
			// This is important to avoid reloading twice.
			window.__appCacheStatus__ = RNCachingUpdateStatus_NOCHANGE;
			var htmlstr = window.__appCacheUpdatedData__;
			window.__appCacheUpdatedData__ = null;
			if(scrollTopFunc() > screen.height) return;

			// Remove any potential interferences.
			if(window.GTimeoutAndInterval)
			{
				GTimeoutAndInterval.clearAll();
			}
			window.__appHasPendingCacheUpdate__ = true;
			// To turn off all events.
			offAllEvents();
			// !!!Note: MUST unhook the event funcs!!! When we do document.write(), the hookEventTarget() funcs in base.html will be rerun and will call infinite recursion when it uses the hooked func as the base func.
			try
			{
				unhookEventTarget(Window);
				unhookEventTarget(Document);
				unhookEventTarget(Element);
			}
			catch(e)
			{
				console.log('unhookEventTarget.ex', e);
			}
			// Use JS-only reload. This is the heavy lifting.
			if(htmlstr)
			{
				// Save these two funcs.
				var funcRun = window.runAfterDomReady;
				var funcInit = window.triggerIOSAppPageReInit;
				// Delete all custom fields in global scope.
				_resetGlobals_(window.ORIGINAL_GLOBAL_VARS);
				window.runAfterDomReady = funcRun;
				// The page will go empty right after this line.
				document.open();
				window.__appHasPendingCacheUpdate__ = null;
				document.write(decodeURIComponent(htmlstr.replace(/\\'/g, "'"))); // <-- Here's the magic.
				document.close();
				// MUST run after domready!!! Otherewise won't take effect.
				runAfterDomReady(function(){
					// Tricky: We call this func twice to both flush message queue, and to trigger didFinishLoad.
					// It is essential to trigger iOS didFinishLoad (mimicking a page load from network), which will do all necessary initialization of the whole page.
					funcInit(true, true);
					funcInit(true, false);
				});
			}
			//Fallback to native reload. This is potentially deadlocking.
			//Need to fallback for earlier 2.3.36 iOS apps which had a bug of not always sending htmlstr.
			else
			{
				// Run this after layouting/painting done.
				window.requestAnimationFrame(function(){
					// The following code will trigger iOS app to do things on its main thread, potentialy deadlocking with WebCoreThread.
					// This will sometimes hang iOS app but not always. We use this as temporary solution until we make the htmlstr solution work fine.
					sendMessageQueue.push({ handlerName:'reloadFromCacheIfNeeded', data:{} });
					messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
					window.__appHasPendingCacheUpdate__ = null;
				});
			}
		}
		else if(window.__appCacheStatus__ == RNCachingUpdateStatus_NOCHANGE)
		{
			//Do nothing.
		}
	}
	if(isIOS() && isShopeeApp() && isVer23Plus())
	{
		runAfterDomReady(checkCacheStatus, 50);
	}
  */
})();

window.connectWebViewJavascriptBridge = function(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function() {
        // This is to avoid being confused by other Garena apps who natively emit this event but don't handle shopee bridge commands. For example Gas.
        // $FlowIgnoreNextLine
        if (dismissNonShopeeBridge()) return;
        callback(window.WebViewJavascriptBridge);
      },
      false
    );
  }
};
