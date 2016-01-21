import React, {Component, PropTypes} from 'react'
import Photo from './../photo/Photo.jsx'

export default class Person extends Component {

  render() {
    let title = this.props.title ? <p><i className="fa fa-user"/>{this.props.title}</p> : ''
    let phone = this.props.phone ? <p><i className="fa fa-phone"/>{this.props.phone}</p> : ''
    let mailTo = 'mailto:' + this.props.mail
    let mail = this.props.mail ? <p><i className="fa fa-envelope"/><a href={mailTo}>{this.props.mail}</a></p> : ''
    return (
      <div className="row" style={{height: 200}}>
        <div className="col-xs-4" style={{marginTop: 23}}>
          <Photo clickable={false} height={120} src={this.props.photo}/>
        </div>
        <div className="col-sm-8 col-xs-8">
          <h3>{this.props.name}</h3>
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
