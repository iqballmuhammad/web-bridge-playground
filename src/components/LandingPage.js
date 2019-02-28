import React, { Component } from "react";
import "../App.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDim: false
    };
  }

  componentDidMount() {
    window.addEventListener("share", e => {
      this.showShare();
    });
  }
  showShare = () => {
    window["bridgeCallHandler"]("share", {
      shareType: 4
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
    const url = `http://192.168.1.104:3000/other`;
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
