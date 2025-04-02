import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Row, Column, Input, TextArea, Button } from '../styled/Common'

const FormContainer = styled.div`
  max-width: ${props => 
    props.isSmall 
      ? '100%' 
      : props.isMedium 
        ? '80%' 
        : '60%'
  };
  margin: 0 auto;
  padding: ${props => 
    props.isSmall 
      ? '15px' 
      : props.isMedium 
        ? '20px' 
        : '30px'
  };
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const FormGroup = styled.div`
  margin-bottom: 15px;
`

const FormInput = styled(Input)`
  font-size: ${props => props.isSmall ? '14px' : '16px'};
`

const FormTextArea = styled(TextArea)`
  min-height: 150px;
  font-size: ${props => props.isSmall ? '14px' : '16px'};
`

const SubmitButton = styled(Button)`
  padding: ${props => props.isSmall ? '8px 16px' : '10px 20px'};
  background-color: ${props => props.disabled ? '#ccc' : '#007bff'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => props.isSmall ? '14px' : '16px'};
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const StatusMessage = styled.div`
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  text-align: center;
  background-color: ${props => 
    props.status === 'success' 
      ? '#d4edda' 
      : props.status === 'error' 
        ? '#f8d7da' 
        : 'transparent'
  };
  color: ${props => 
    props.status === 'success' 
      ? '#155724' 
      : props.status === 'error' 
        ? '#721c24' 
        : 'inherit'
  };
`

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
  const theme = useTheme();
  const isSmall = useMediaQuery(`only screen and (max-width: ${theme.breakpoints.xs})`);
  const isMedium = useMediaQuery(`only screen and (min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.md})`);

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

  return (
    <Row>
      <Column className="col-xs-12">
        <FormContainer isSmall={isSmall} isMedium={isMedium}>
          <StyledForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Navn"
                required
                isSmall={isSmall}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="E-post"
                required
                isSmall={isSmall}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Telefon"
                isSmall={isSmall}
              />
            </FormGroup>
            <FormGroup>
              <FormTextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Melding"
                required
                isSmall={isSmall}
              />
            </FormGroup>
            <SubmitButton
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              isSmall={isSmall}
            >
              {isSubmitting ? (
                <LoadingContainer>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span>Sender...</span>
                </LoadingContainer>
              ) : (
                'Send'
              )}
            </SubmitButton>
            {submitStatus && (
              <StatusMessage status={submitStatus}>
                {submitStatus === 'success' 
                  ? 'Meldingen din er sendt! Vi vil kontakte deg snart.'
                  : 'Det oppstod en feil. Vennligst prøv igjen senere.'
                }
              </StatusMessage>
            )}
          </StyledForm>
        </FormContainer>
      </Column>
    </Row>
  )
}

ContactForm.propTypes = {
  subject: PropTypes.string
}

export default ContactForm
