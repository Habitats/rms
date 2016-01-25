import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as GeneralActionCreators from '../../redux/actions/generalActions'
import Radium from 'radium'

export default class ContactForm extends Component {

  constructor(props) {
    super(props)
    this.state = {clicked: false, sent: false, subject: props.subject}
    this.valid = {subject: !!props.subject}

    this.onNameChange = (e) => {
      let name = e.target.value
      this.setState({name: name})
      this.valid.name = name.length > 0
    }
    this.onPhoneChange = (e) => {
      let contactPhone = e.target.value
      this.setState({contactPhone: contactPhone})
      this.valid.contactPhone = contactPhone.length > 0
    }
    this.onAddressChange = (e) => {
      let contactEmail = e.target.value
      this.setState({contactEmail: contactEmail})
      this.valid.contactEmail = contactEmail.match('.+\@.+\..+')
    }
    this.onMessageChange = (e) => {
      let message = e.target.value
      this.setState({message: message})
      this.valid.message = message.length > 0
    }
    this.onSubjectChange = (e) => {
      let subject = e.target.value
      this.setState({subject: subject})
      this.valid.subject = subject.length > 0
    }
    this.handleSubmit = (e) => {
      e.preventDefault()
      let {name, contactPhone, contactEmail, subject, message} = this.state
      let mail = {
        name: name,
        contactPhone: contactPhone,
        contactEmail: contactEmail,
        subject: 'Kontaktskjema: ' + (this.props.subject || subject),
        message: message
      }
      this.setState({clicked: true})
      if (this.isValid()) {
        this.props.dispatch(GeneralActionCreators.sendMail(mail))
        console.log('Sending email ...')
        this.setState({sent: true})
      }
    }
  }

  isValid() {
    let valid = this.valid
    return valid.name && valid.contactEmail && valid.contactPhone && valid.subject && valid.message
  }

  render() {
    let {subject} = this.props
    let valid = this.valid
    var clicked = this.state.clicked
    var sent = this.state.sent
    let nameClasses = 'col-xs-12 col-sm-6 ' + (!clicked || sent ? '' : (valid.name ? 'has-success' : 'has-error'))
    let contactPhoneClasses = 'col-xs-12 col-sm-6 ' + (!clicked || sent ? '' : (valid.contactPhone ? 'has-success' : 'has-error'))
    let contactEmailClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.contactEmail ? 'has-success' : 'has-error'))
    let subjectClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.subject ? 'has-success' : 'has-error'))
    let messageClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.message ? 'has-success' : 'has-error'))
    let disabled = sent ? 'disabled' : undefined
    let error = this.isValid() || !clicked || sent ? '' : (<p>Fyll inn alle feltene!</p>)
    let button = sent ? <h4>Din forespørsel er sendt!</h4> :
                 (<button className="btn btn-default btn-block" onClick={this.handleSubmit} type="submit">Send</button>)

    return (
      <div>
        <form className="form-horizontal" method="post">
          <div className="form-group">
            <div className="row">
              <div className={nameClasses}>
                <input className="form-control " disabled={disabled} onChange={this.onNameChange} placeholder="Navn" type="text"/>
              </div>
              <div className={contactPhoneClasses}>
                <input className="form-control " disabled={disabled} onChange={this.onPhoneChange} placeholder="Telefon" type="text"/>
              </div>
              <div className={contactEmailClasses}>
                <input className="form-control " disabled={disabled} onChange={this.onAddressChange} placeholder="Epost" type="text"/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group">
              {!subject ?
               <div className={subjectClasses}>
                 <input className="form-control " disabled={disabled} onChange={this.onSubjectChange} placeholder="Emne" type="text"/>
               </div> : null}
            </div>
            <div className="form-group">
              <div className={messageClasses}>
            <textarea className="form-control" disabled={disabled} onChange={this.onMessageChange} rows="6"
                      placeholder="Send oss en forespørsel, og vi vil komme tilbake til deg så fort som mulig."/>
              </div>
            </div>
            <div className="text-center">
              {button}
            </div>
          </div>
        </form>
        {error}
      </div>
    )
  }
}

ContactForm.defaultProps = {
  subject: null
}

ContactForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  subject: PropTypes.string
}

export default connect()(Radium(ContactForm))
