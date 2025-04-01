import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'

const ContactForm = ({ subject: initialSubject }) => {
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const isSmall = useMediaQuery('only screen and (max-width: 767px)')
  const isMedium = useMediaQuery('only screen and (min-width: 768px) and (max-width: 991px)')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ subject: initialSubject || '', name: '', contactPhone: '', contactEmail: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const style = {
    container: {
      maxWidth: isSmall ? '100%' : isMedium ? '80%' : '60%',
      margin: '0 auto',
      padding: isSmall ? 15 : isMedium ? 20 : 30,
      backgroundColor: '#fff',
      borderRadius: 8,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 15
    },
    input: {
      padding: 10,
      border: '1px solid #ddd',
      borderRadius: 4,
      fontSize: isSmall ? '14px' : '16px'
    },
    textarea: {
      padding: 10,
      border: '1px solid #ddd',
      borderRadius: 4,
      minHeight: 150,
      fontSize: isSmall ? '14px' : '16px'
    },
    button: {
      padding: isSmall ? '8px 16px' : '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      fontSize: isSmall ? '14px' : '16px',
      transition: 'background-color 0.3s ease'
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed'
    },
    status: {
      padding: 10,
      borderRadius: 4,
      marginTop: 10,
      textAlign: 'center'
    },
    success: {
      backgroundColor: '#d4edda',
      color: '#155724'
    },
    error: {
      backgroundColor: '#f8d7da',
      color: '#721c24'
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10
    }
  }

  return (
    <div className="row">
      <div className="col-xs-12" style={style.container}>
        <form onSubmit={handleSubmit} style={style.form}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Navn"
              required
              style={style.input}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="E-post"
              required
              style={style.input}
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Telefon"
              style={style.input}
            />
          </div>
          <div className="form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              placeholder="Melding"
              required
              style={style.textarea}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{...style.button, ...(isSubmitting ? style.buttonDisabled : {})}}
          >
            {isSubmitting ? (
              <div style={style.loading}>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Sender...</span>
              </div>
            ) : (
              'Send'
            )}
          </button>
          {submitStatus === 'success' && (
            <div style={{ ...style.status, ...style.success }}>
              Meldingen din er sendt! Vi vil kontakte deg snart.
            </div>
          )}
          {submitStatus === 'error' && (
            <div style={{ ...style.status, ...style.error }}>
              Det oppstod en feil. Vennligst prøv igjen senere.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

ContactForm.propTypes = {
  subject: PropTypes.string
}

export default ContactForm
