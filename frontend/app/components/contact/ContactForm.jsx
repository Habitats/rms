import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import * as GeneralActionCreators from '../../redux/actions/GeneralActions'
import Radium from 'radium'

const ContactForm = ({ subject: initialSubject }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    clicked: false,
    sent: false,
    subject: initialSubject,
    name: '',
    contactPhone: '',
    contactEmail: '',
    message: ''
  })

  const [valid, setValid] = useState({
    subject: !!initialSubject,
    name: false,
    contactPhone: false,
    contactEmail: false,
    message: false
  })

  const onNameChange = (e) => {
    const name = e.target.value
    setState(prev => ({ ...prev, name }))
    setValid(prev => ({ ...prev, name: name.length > 0 }))
  }

  const onPhoneChange = (e) => {
    const contactPhone = e.target.value
    setState(prev => ({ ...prev, contactPhone }))
    setValid(prev => ({ ...prev, contactPhone: contactPhone.length > 0 }))
  }

  const onAddressChange = (e) => {
    const contactEmail = e.target.value
    setState(prev => ({ ...prev, contactEmail }))
    setValid(prev => ({ ...prev, contactEmail: contactEmail.match('.+\@.+\..+') }))
  }

  const onMessageChange = (e) => {
    const message = e.target.value
    setState(prev => ({ ...prev, message }))
    setValid(prev => ({ ...prev, message: message.length > 0 }))
  }

  const onSubjectChange = (e) => {
    const subject = e.target.value
    setState(prev => ({ ...prev, subject }))
    setValid(prev => ({ ...prev, subject: subject.length > 0 }))
  }

  const isValid = () => {
    return valid.name && valid.contactEmail && valid.contactPhone && valid.subject && valid.message
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, contactPhone, contactEmail, subject, message } = state
    const mail = {
      name,
      contactPhone,
      contactEmail,
      subject: 'Kontaktskjema: ' + (initialSubject || subject),
      message
    }
    setState(prev => ({ ...prev, clicked: true }))
    if (isValid()) {
      dispatch(GeneralActionCreators.sendMail(mail))
      console.log('Sending email ...')
      setState(prev => ({ ...prev, sent: true }))
    }
  }

  const { clicked, sent } = state
  const nameClasses = 'col-xs-12 col-sm-6 ' + (!clicked || sent ? '' : (valid.name ? 'has-success' : 'has-error'))
  const contactPhoneClasses = 'col-xs-12 col-sm-6 ' + (!clicked || sent ? '' : (valid.contactPhone ? 'has-success' : 'has-error'))
  const contactEmailClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.contactEmail ? 'has-success' : 'has-error'))
  const subjectClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.subject ? 'has-success' : 'has-error'))
  const messageClasses = 'col-xs-12 ' + (!clicked || sent ? '' : (valid.message ? 'has-success' : 'has-error'))
  const disabled = sent ? 'disabled' : undefined
  const error = isValid() || !clicked || sent ? '' : (<p>Fyll inn alle feltene!</p>)
  const button = sent ? <h4>Din forespørsel er sendt!</h4> :
                (<button className="btn btn-default btn-block" onClick={handleSubmit} type="submit">Send</button>)

  return (
    <div>
      <form className="form-horizontal" method="post">
        <div className="form-group">
          <div className="row">
            <div className={nameClasses}>
              <input className="form-control" disabled={disabled} onChange={onNameChange} placeholder="Navn" type="text"/>
            </div>
            <div className={contactPhoneClasses}>
              <input className="form-control" disabled={disabled} onChange={onPhoneChange} placeholder="Telefon" type="text"/>
            </div>
            <div className={contactEmailClasses}>
              <input className="form-control" disabled={disabled} onChange={onAddressChange} placeholder="Epost" type="text"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            {!initialSubject ?
             <div className={subjectClasses}>
               <input className="form-control" disabled={disabled} onChange={onSubjectChange} placeholder="Emne" type="text"/>
             </div> : null}
          </div>
          <div className="form-group">
            <div className={messageClasses}>
              <textarea className="form-control" disabled={disabled} onChange={onMessageChange} rows="6"
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

ContactForm.defaultProps = {
  subject: null
}

ContactForm.propTypes = {
  subject: PropTypes.string
}

export default Radium(ContactForm)
