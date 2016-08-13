import React, {Component, PropTypes} from "react";
import Footer from "./../components/Footer.jsx";
import Header from "./../components/Header.jsx";
import Radium from "radium";
import * as V from "../vars";

class Layout extends Component {

  render() {
    let style = {
      maxWidth: 1000,
      '@media only screen and (max-width: 767px)': {
        marginTop: V.HEADER_HEIGHT_XS,
        marginBottom: V.FOOTER_HEIGHT_XS,
        padding: 0
      },
      '@media only screen and (min-width: 768px)': {
        marginTop: V.HEADER_HEIGHT_SM + 20,
        marginBottom: V.FOOTER_HEIGHT_SM + 10
      }
    }
    return (
      <div>
        <div style={style} className="container" id="root">
          <Header />
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
}

export default Radium(Layout)
