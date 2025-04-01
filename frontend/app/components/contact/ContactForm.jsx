import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, useActionData, useNavigation } from 'react-router-dom'
import Radium from 'radium'

const ContactForm = ({ subject: initialSubject }) => {
  const actionData = useActionData()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const [formData, setFormData] = useState({
    subject: initialSubject || '',
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    setValid(prev => ({
      ...prev,
      [name]: name === 'contactEmail' ? value.match('.+@.+\\..+') :
              value.length > 0
    }))
  }

  const isValid = () => {
    return Object.values(valid).every(Boolean)
  }

  return (
    <Form method="post" action="/api/contact">
      <div className="form-group">
        <label htmlFor="subject">Emne</label>
        <input
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Emne"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Navn</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Navn"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactPhone">Telefon</label>
        <input
          type="tel"
          className="form-control"
          id="contactPhone"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          placeholder="Telefon"
        />
      </div>

      <div className="form-group">
        <label htmlFor="contactEmail">E-post</label>
        <input
          type="email"
          className="form-control"
          id="contactEmail"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="E-post"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Melding</label>
        <textarea
          className="form-control"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          placeholder="Melding"
        />
      </div>

      {actionData?.error && (
        <div className="alert alert-danger" role="alert">
          {actionData.error}
        </div>
      )}

      {actionData?.success && (
        <div className="alert alert-success" role="alert">
          Meldingen din er sendt! Vi vil kontakte deg så snart som mulig.
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isValid() || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <i className="fa fa-spinner fa-spin" /> Sender...
          </>
        ) : (
          'Send melding'
        )}
      </button>
    </Form>
  )
}

ContactForm.propTypes = {
  subject: PropTypes.string
}

export default Radium(ContactForm)
