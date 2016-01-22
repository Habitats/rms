import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'
import Radium from 'radium'

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
          paddingLeft: 20,
          maxWidth: 400
        },
        '@media only screen and (min-width: 768px)': {
          height: 200,
          paddingLeft: 0
        },
        '@media only screen and (min-width: 992px)': {
          height: 200,
          paddingLeft: 40
        }
      },
      photo: {
        marginTop: 23,
        height: 90
      },
      text: {
        maxWidth: 270,
        margin: '0 auto'
      }
    }
    return (
      <div className="row" style={style.box}>
        <div className="col-sm-3 col-xs-4">
          <div className="row" style={style.photo}>
            <Photo clickable={false} src={photo}/>
          </div>
        </div>
        <div className="col-sm-9 col-xs-8" style={style.text}>
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
