import React, {Component, PropTypes} from "react";
import Photo from "./../photo/Photo.jsx";
import Radium from "radium";

class Person extends Component {

  render() {
    let title = this.props.title ? <p><i className="fa fa-user"/>{this.props.title}</p> : ''
    let phone = this.props.phone ? <p><i className="fa fa-phone"/>{this.props.phone}</p> : ''
    let {photo, name} = this.props
    let mailTo = 'mailto:' + this.props.mail
    let mail = this.props.mail ? <p><i className="fa fa-envelope"/><a href={mailTo}>{this.props.mail}</a></p> : ''
    let style = {
      box: {
        margin: '0 auto',
        '@media only screen and (max-width: 767px)': {
          height: 150,
          maxWidth: 320
        },
        '@media only screen and (min-width: 768px)': {
          height: 170,
          paddingLeft: 30,
          maxWidth: 350,
        },
        '@media only screen and (min-width: 992px)': {
          height: 170,
          paddingLeft: 50,
          maxWidth: 410,
        }
      },
      photo: {
        '@media only screen and (max-width: 767px)': {
          height: 90,
          width: 90
        },
        '@media only screen and (min-width: 768px)': {
          height: 90,
          width: 90
        },
        '@media only screen and (min-width: 992px)': {
          height: 110,
          width: 110,
        },
        marginTop: 23,
        float: 'left',
        marginRight: 15,
      },
      text: {
        '@media only screen and (max-width: 767px)': {
          maxWidth: 210,
        },
        '@media only screen and (min-width: 768px)': {
          maxWidth: 210,
        },
        '@media only screen and (min-width: 992px)': {
          maxWidth: 240,
        },
        float: 'left',
        margin: '0 auto'
      }
    }
    return (
      <div className="row" style={style.box}>
        <div style={style.photo}>
          <Photo clickable={false} src={photo}/>
        </div>
        <div style={style.text}>
          <h3>{name}</h3>
          {title}
          {mail}
          {phone}
        </div>
      </div>
    )
  }
}

Person.propTypes = {
  mail: PropTypes.string,
  title: PropTypes.string,
  phone: PropTypes.string,
  name: PropTypes.string,
  photo: PropTypes.string
}

export default Radium(Person)
