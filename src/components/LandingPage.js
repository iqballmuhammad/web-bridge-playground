import React, { Component } from "react";
import overlay from "../images/overlay.png";
import "../App.css";
import ShareSDK from "@gameplatform-sdk/share";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDim: false,
      visitCount: 0,
      image: null,
      url: "",
      shortenedUrl: ""
    };
  }

  toUTF8Array(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
      var charcode = str.charCodeAt(i);
      if (charcode < 0x80) utf8.push(charcode);
      else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(
          0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        );
      }
      // surrogate pair
      else {
        i++;
        charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff);
        utf8.push(
          0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f)
        );
      }
    }
    return utf8;
  }

  componentDidMount() {
    // setTimeout(() => this.addScreenshotListener(), 1000);
    this.setState({ visitCount: this.state.visitCount + 1 });
  }

  showShare = () => {
    // const shareImage = `https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
    const shareImage = document.getElementById("myImage").src;
    // window["bridgeCallHandler"]("share", {
    //   shareType: 4,
    //   genericImageUrl: shareImage
    // });
    window["bridgeCallHandler"](
      "showSharingPanel",
      {
        title: "Share Title",
        sharingAppIDsTop: [
          "facebookPhoto",
          "facebookMessenger",
          "twitter",
          "instagram",
          "lineChat"
        ]
      },
      ({ status, sharingAppID }) => {
        console.log(status, sharingAppID);
        window["bridgeCallHandler"](
          "shareData",
          {
            sharingAppID,
            sharingData: {
              image: {
                imageBase64: shareImage
              }
            }
          },
          ({ errorCode, errorMessage }) => {
            console.log("Share result: " + errorCode, errorMessage);
          }
        );
      }
    );
  };

  getRecentImage = () => {
    window["bridgeCallHandler"](
      "getRecentImage",
      {
        width: 0,
        height: 1500,
        tnWidth: 200,
        tnHeight: 200
      },
      res => {
        this.setState({ image: res.data.image });
      }
    );
  };

  addScreenshotListener = () => {
    window["bridgeCallHandler"]("registerScreenshotDetection", {}, res => {
      if (res.error === 0) {
        window["bridgeRegisterHandler"]("SCREENSHOT_EVENT", res => {
          res.error === 0 && this.getRecentImage();
        });
      }
    });
  };

  addShare = () => {
    window["bridgeCallHandler"]("configurePage", {
      navbar: {
        title: "Web Bridge Showcase",
        hideBackButton: 1, // if you need to hide the back button
        showCloseIcon: 1, // if you need to show the close button
        rightItemsConfig: {
          items: [
            {
              type: "button",
              key: "share"
            }
          ]
        }
      }
    });

    window["bridgeRegisterHandler"]("onEventCallback", e => {
      if (e.key === "share") {
        this.showShare();
      }
    });
  };

  removeShare = () => {
    window["bridgeCallHandler"]("configurePage", {
      navbar: {
        title: "Web Bridge Showcase",
        hideBackButton: 1, // if you need to hide the back button
        showCloseIcon: 1, // if you need to show the close button
        rightItemsConfig: {
          items: []
        }
      }
    });
  };

  checkPermission = () => {
    window["bridgeCallHandler"](
      "checkAppPermission",
      {
        permissionList: ["contact"]
      },
      ({ resultList }) => {
        const list = JSON.parse(resultList);
        if (list && list[0]) {
          this.showToast("Contact permission is alredy given  ");
        } else {
          this.requestAppPermission();
        }
      }
    );
  };

  requestAppPermission = () => {
    window["bridgeCallHandler"](
      "requestAppPermission",
      {
        permissionList: ["contact"],
        popupText:
          "In order to use this feature, Shopee needs to access your contact information."
      },
      data => {
        typeof data === "string" ? alert(data) : alert(JSON.stringify(data));
      }
    );
  };

  showPopup = () => {
    window["bridgeCallHandler"](
      "showPopUp",
      {
        popUp: {
          title: "This is a popup title!",
          message: `This is popup message, unfortunately this popup can't show any image.`,
          cancelText: "Cancel Text",
          okText: "Ok text"
        }
      },
      ({ buttonClicked }) => {
        // 0 - Clicked OK
        // 1 - Clicked Cancel
        // 2 - (Android only) Clicked Other part of screen
        // or back button is pressed
        if (buttonClicked === 0) {
          this.showShare();
        }
      }
    );
  };

  showToast = message => {
    window["bridgeCallHandler"]("showToast", {
      toast: {
        iconType: "success", // Image on toast message. Ignored by Android. Only used by iOS. Available types: success & failure
        message
      }
    });
  };

  navigate = () => {
    const url = `${window.location.href}other`;
    window["bridgeCallHandler"]("navigate", {
      url
    });
  };

  dimNavbar = () => {
    window["bridgeCallHandler"]("dimNavbar", {
      isDim: true,
      color: "000000",
      alpha: 0.5
    });
    this.setState({ isDim: true });
  };

  undimNavbar = () => {
    window["bridgeCallHandler"]("dimNavbar", {
      isDim: false,
      color: "000000",
      alpha: 0.5
    });
    this.setState({ isDim: false });
  };

  copy = text => {
    window["bridgeCallHandler"]("copyTextToClipboard", {
      text
    });
  };

  pickImage = () => {
    window["bridgeCallHandler"](
      "pickImage",
      {
        maxCount: 1,
        type: 1
      },
      res => {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var imageObj1 = new Image();
        var imageObj2 = new Image();
        imageObj1.src = res.image;
        imageObj1.onload = function() {
          ctx.drawImage(imageObj1, 0, 0, 300, 300);
          imageObj2.src = overlay;
          imageObj2.onload = function() {
            ctx.drawImage(
              imageObj2,
              0,
              0,
              imageObj2.naturalHeight,
              imageObj2.naturalWidth
            );
            var img = c.toDataURL("image/png");
            document.getElementById("myImage").src = img;
          };
        };
      }
    );
  };

  saveImage = () => {
    window["bridgeCallHandler"]("saveImage", {
      imageUrl: document.getElementById("myImage").src
    });
  };

  handleUrlChange = event => {
    this.setState({ url: event.target.value });
  };

  generateShortenedUrl = url => {
    const shareSdk = new ShareSDK("FfXqXeCJ8I0lQbLlDz", "id", "test");
    shareSdk
      .generateShortLink(url, {
        title: "share title",
        desc: "share desc",
        imgUrl: "https://cf.shopee.co.id/file/eca6e6060d408a6b6f97461a5b8c0c8e"
      })
      .then(res => {
        console.log(res);
        //{
        //  code: 0,
        //  msg: '',
        //  data: {
        //      shortLink: 'https://test.shp.ee/c8ghb67'
        //  }
        //}
        res.data && this.setState({ shortenedUrl: res.data.shortLink });
      });
  };

  render() {
    return (
      <div className="App">
        <div></div>
        <div>
          <input
            type="text"
            value={this.state.url}
            onChange={this.handleUrlChange}
          />
        </div>
        <div>
          <button onClick={() => this.generateShortenedUrl(this.state.url)}>
            Shorten Url
          </button>
        </div>
        <div>{this.state.shortenedUrl}</div>
        {/* <div className="item" onClick={this.getRecentImage}>
          Screenshot Image
          {this.state.image && (
            <img alt="asd" src={this.state.image} height="300" />
          )}
        </div>
        <div
          className="overlay"
          onClick={this.undimNavbar}
          style={{ display: this.state.isDim ? "block" : "none" }}
        >
          <div className="overlay-text">Click anywhere to undim</div>
        </div>
        <div className="item" onClick={this.checkPermission}>
          Check contact permission
        </div>
        <div className="item" onClick={this.showPopup}>
          Show popup
        </div>
        <div className="item" onClick={this.showToast}>
          Show toast
        </div>
        <div className="item" onClick={this.navigate}>
          Move to another page
        </div>
        <div className="item" onClick={this.dimNavbar}>
          Dim navbar
        </div>
        <div
          className="item"
          onClick={() => this.copy("Copy this text to clipboard!")}
        >
          Copy this text to clipboard!
        </div> */}
      </div>
    );
  }
}

export default LandingPage;
