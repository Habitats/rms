import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const EditableDiv = ({ content, onChange }) => {
  const [html, setHtml] = useState(content)
  const editorRef = useRef(null)

  useEffect(() => {
    const editor = editorRef.current
    const handlePaste = (e) => {
      // cancel paste
      e.preventDefault()
      // get text representation of clipboard
      const text = (e.originalEvent || e).clipboardData.getData('text/plain')
      // insert text manually
      document.execCommand('insertHTML', false, text)
    }

    editor.addEventListener('paste', handlePaste, false)
    return () => {
      editor.removeEventListener('paste', handlePaste, false)
    }
  }, [])

  const emitChange = () => {
    const editor = editorRef.current
    const newHtml = editor.innerHTML

    setHtml(newHtml)
    onChange({
      target: {
        value: newHtml
      }
    })
  }

  const execCommand = (command, arg) => {
    document.execCommand(command, false, arg)
  }

  return (
    <div
      ref={editorRef}
      contentEditable={true}
      dangerouslySetInnerHTML={{__html: html}}
      onInput={emitChange}
      onBlur={emitChange}
    />
  )
}

EditableDiv.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default EditableDiv

