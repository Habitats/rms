import React from 'react'
import Photo from './../photo/Photo.jsx'

export default class Person extends React.Component {

  render() {
    let title = this.props.title ? <p><i className="fa fa-user"/>&nbsp; {this.props.title} </p> : ''
    let phone = this.props.phone ? <p><i className="fa fa-phone"/>&nbsp; {this.props.phone} </p> : ''
    let mailTo = 'mailto:' + this.props.mail
    let mail = this.props.mail ? <p><i className="fa fa-envelope"/>&nbsp; <a href={mailTo}> {this.props.mail} </a></p> : ''
    return (
      <div className="row" style={{height: 200, marginLeft: 20}}>
        <div className="col-md-4 col-sm-4 col-xs-4" style={{marginTop: 23}}>
          <Photo clickable={false} height={120} src={this.props.photo}/>
        </div>
        <div className="col-md-8 col-sm-8 col-xs-8">
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
  mail: React.PropTypes.string,
  title: React.PropTypes.string,
  phone: React.PropTypes.string,
  name: React.PropTypes.string,
  photo: React.PropTypes.string
}
