import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import EditableDiv from './EditableDiv.jsx'

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
    <div className="row wysiwyg">
      {enabled ? (
        <div>
          <div className="col-xs-12">
            <EditableDiv content={content} onChange={handleChange}/>
          </div>
          <div className="col-xs-6">
            <button style={{marginTop: 5}} className="btn btn-default btn-block" onClick={handleSave} type="submit">
              Lagre
            </button>
          </div>
          <div className="col-xs-6">
            <button style={{marginTop: 5}} className="btn btn-default btn-block" onClick={handleCancel} type="submit">
              Angre
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div dangerouslySetInnerHTML={{__html: content}} className="col-xs-12"/>
          <div className="col-xs-12">
            <button style={{marginTop: 45}} className="btn btn-default btn-block" onClick={() => toggle(true)} type="submit">
              Endre beskrivelse
            </button>
          </div>
        </div>
      )}
    </div>
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

