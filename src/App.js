import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebBridgeLoader from "./helper/WebBridgeLoader";
import LandingPage from "./components/LandingPage";
import OtherPage from "./components/OtherPage";

class App extends Component {
  componentDidMount() {
    WebBridgeLoader.load();
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/other" component={OtherPage} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
