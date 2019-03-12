import React, { Component } from "react";
import overlay from "../images/overlay.png";
import "../App.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDim: false,
      visitCount: 0
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

  showToast = () => {
    window["bridgeCallHandler"]("showToast", {
      toast: {
        iconType: "success", // Image on toast message. Ignored by Android. Only used by iOS. Available types: success & failure
        message: "This is a toast!"
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

  render() {
    return (
      <div className="App">
        <div
          className="overlay"
          onClick={this.undimNavbar}
          style={{ display: this.state.isDim ? "block" : "none" }}
        >
          <div className="overlay-text">Click anywhere to undim</div>
        </div>
        <div className="item" onClick={this.showShare}>
          Show share menu
        </div>
        <div className="item" onClick={this.addShare}>
          Add share menu to navbar
        </div>
        <div className="item" onClick={this.removeShare}>
          Remove share menu to navbar
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
        <div className="item" onClick={this.saveImage}>
          Save Image
        </div>
        <div className="item" onClick={this.pickImage}>
          Pick Image
        </div>
        <canvas id="myCanvas" height="300" width="300" />
        <img id="myImage" style={{ display: "none" }} alt="myImage" />
        <div
          className="item"
          onClick={() => this.copy("Copy this text to clipboard!")}
        >
          Copy this text to clipboard!
        </div>
      </div>
    );
  }
}

export default LandingPage;
