import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as GeneralActionCreators from '../../redux/actions/GeneralActions'
import Radium from 'radium'

class ContactForm extends Component {

  constructor(props) {
    super(props)
    this.state = {clicked: false, sent: false, subject: props.subject}
    this.valid = {subject: !!props.subject}

    this.onNameChange = (e) => {
      const name = e.target.value
      this.setState({name: name})
      this.valid.name = name.length > 0
    }
    this.onPhoneChange = (e) => {
      const contactPhone = e.target.value
      this.setState({contactPhone: contactPhone})
      this.valid.contactPhone = contactPhone.length > 0
    }
    this.onAddressChange = (e) => {
      const contactEmail = e.target.value
      this.setState({contactEmail: contactEmail})
      this.valid.contactEmail = contactEmail.match('.+\@.+\..+')
    }
    this.onMessageChange = (e) => {
      const message = e.target.value
      this.setState({message: message})
      this.valid.message = message.length > 0
    }
    this.onSubjectChange = (e) => {
      const subject = e.target.value
      this.setState({subject: subject})
      this.valid.subject = subject.length > 0
    }
    this.handleSubmit = (e) => {
      e.preventDefault()
      const {name, contactPhone, contactEmail, subject, message} = this.state
      const mail = {
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
    const valid = this.valid
    return valid.name && valid.contactEmail && valid.contactPhone && valid.subject && valid.message
  }

  render() {
    const {subject} = this.props
    const valid = this.valid
    const clicked = this.state.clicked
    const sent = this.state.sent
    const nameClasses = 'col-xs-12 col-sm-6 ' + (!clicked || sent ? '' : (valid.name ? 'has-success' : 'has-error'))
    const contactPhoneClasses = 'col-xs-12 col-sm-6 ' + (!clicked || sent ? '' : (valid.contactPhone ? 'has-success' : 'has-error'))
    const contactEmailClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.contactEmail ? 'has-success' : 'has-error'))
    const subjectClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.subject ? 'has-success' : 'has-error'))
    const messageClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.message ? 'has-success' : 'has-error'))
    const disabled = sent ? 'disabled' : undefined
    const error = this.isValid() || !clicked || sent ? '' : (<p>Fyll inn alle feltene!</p>)
    const button = sent ? <h4>Din forespørsel er sendt!</h4> :
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
