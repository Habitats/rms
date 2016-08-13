import React, {Component, PropTypes} from "react";
import App from "./../../App.jsx";
import DevTools from "./../Devtools.jsx";

export default class Root extends Component {

  render() {
    return (
      <div>
        <App />
        <DevTools/>
      </div>
    )
  }
}
