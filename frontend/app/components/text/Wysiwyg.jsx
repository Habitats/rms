import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Column } from '../styled/Common'
import EditableDiv from './EditableDiv.jsx'

const WysiwygContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ContentContainer = styled.div`
  width: 100%;
`

const Button = styled.button`
  margin-top: ${props => props.marginTop || '5px'};
  width: 100%;
  display: block;
`

const ActionButtonContainer = styled.div`
  width: 50%;
  padding: 0 15px;
`

const EditButtonContainer = styled.div`
  width: 100%;
  padding: 0 15px;
`

const Wysiwyg = ({ content: initialContent, onSave }) => {
  const [state, setState] = useState({
    enabled: false,
    content: initialContent
  })

  useEffect(() => {
    setState(prev => ({ ...prev, enabled: false, content: initialContent }))
  }, [initialContent])

  const handleChange = (e) => {
    setState(prev => ({ ...prev, content: e.target.value }))
  }

  const toggle = (toggle) => {
    setState(prev => ({ ...prev, enabled: toggle }))
  }

  const handleSave = () => {
    toggle(false)
    onSave(state.content)
  }

  const handleCancel = () => {
    toggle(false)
    setState(prev => ({ ...prev, content: initialContent }))
  }

  const { content, enabled } = state

  return (
    <WysiwygContainer className="row wysiwyg">
      {enabled ? (
        <ContentContainer>
          <Column className="col-xs-12">
            <EditableDiv content={content} onChange={handleChange}/>
          </Column>
          <ActionButtonContainer className="col-xs-6">
            <Button className="btn btn-default btn-block" onClick={handleSave} type="submit">
              Lagre
            </Button>
          </ActionButtonContainer>
          <ActionButtonContainer className="col-xs-6">
            <Button className="btn btn-default btn-block" onClick={handleCancel} type="submit">
              Angre
            </Button>
          </ActionButtonContainer>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <Column className="col-xs-12" dangerouslySetInnerHTML={{__html: content}} />
          <EditButtonContainer className="col-xs-12">
            <Button 
              marginTop="45px" 
              className="btn btn-default btn-block" 
              onClick={() => toggle(true)} 
              type="submit"
            >
              Endre beskrivelse
            </Button>
          </EditButtonContainer>
        </ContentContainer>
      )}
    </WysiwygContainer>
  )
}

Wysiwyg.defaultProps = {
  content: '',
  enabled: false
}

Wysiwyg.propTypes = {
  content: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

export default Wysiwyg

