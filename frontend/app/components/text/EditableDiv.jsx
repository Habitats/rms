import React, {PropTypes, Component} from 'react'
import EventListener from '../../util/EventListener'

export default class EditableDiv extends Component {

  constructor(props) {
    super(props)
    this.state = {html: this.props.content}
  }

  componentDidMount(){
    let editor = this.refs.editor.getDOMNode()
    editor.addEventListener('paste', this.handlePaste.bind(this), false)
  }

  handlePaste(e)     {
      // cancel paste
      e.preventDefault()
      // get text representation of clipboard
      let text = text = (event.originalEvent || event).clipboardData.getData('text/plain')
      // insert text manually
      document.execCommand('insertHTML', false, text)
  }

  componentWillUnmount() {
    let editor = this.refs.editor.getDOMNode()
    editor.removeEventListener('paste')
  }

  emitChange() {
    let editor = this.refs.editor.getDOMNode()
    let newHtml = editor.innerHTML

    this.setState({html: newHtml}, (() => {
        this.props.onChange({
          target: {
            value: newHtml
          }
        })
      }).bind(this)
    )
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.content !== this.state.html
  }

  execCommand(command, arg) {
    document.execCommand(command, false, arg)
  }

  render() {
    let {paragraphs, lists, textSize, headings} = this.props
    let buttonSpacing = {marginRight: 2}
    let editorStyle = {
      paddingTop: 13,
      overflow: 'auto',
      background: '#F1F1F1',
      height: 'auto'
    }

    return (
      <div>
        <div style={{marginTop: -35}}>
          {headings ?
           <div className="btn-group" style={buttonSpacing}>
             <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded={true}>
               <i className="fa fa-paragraph"/>
               <i className="fa fa-caret-down"/>
             </button>
             <ul className="dropdown-menu" role="menu">
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'formatBlock', 'P')}>Paragraf</a></li>
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'formatBlock', 'BLOCKQUOTE')}>
                 <blockquote>Sitat</blockquote>
               </a></li>
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'formatBlock', 'H2')}><h2>Overskrift</h2></a></li>
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'formatBlock', 'H3')}><h3>Underoverskrift</h3></a></li>
             </ul>
           </div> : null}

          <div className="btn-group btn-group-xs" role="group" style={buttonSpacing}>
            <button type="button" className="btn btn-default" onClick={this.execCommand.bind(this, 'bold')}><i className="fa fa-bold"/>
            </button>
            <button type="button" className="btn btn-default" onClick={this.execCommand.bind(this, 'italic')}><i
              className="fa fa-italic"/></button>
            <button type="button" className="btn btn-default" onClick={this.execCommand.bind(this, 'underline')}><i
              className="fa fa-underline"/></button>
            <button type="button" className="btn btn-default" onClick={this.execCommand.bind(this, 'strikeThrough')}><i
              className="fa fa-strikethrough"/></button>
            {textSize ? <div className="btn-group" role="group">
              <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded={true}>
                <i className="fa fa-text-height"/><i className="fa fa-caret-down"/></button>
              <ul className="dropdown-menu" role="menu">
                <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'fontSize', 1)}>1</a></li>
                <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'fontSize', 2)}>2</a></li>
                <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'fontSize', 3)}>3</a></li>
                <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'fontSize', 4)}>4</a></li>
                <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'fontSize', 5)}>5</a></li>
                <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'fontSize', 6)}>6</a></li>
                <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'fontSize', 7)}>7</a></li>
              </ul>
            </div> : null}
            {lists ? <div className="btn-group btn-group-xs" role="group" style={buttonSpacing}>
              <button type="button" className="btn btn-default" onClick={this.execCommand.bind(this, 'insertOrderedList')}><i
                className="fa fa-list-ol"/></button>
              <button type="button" className="btn btn-default" onClick={this.execCommand.bind(this, 'insertUnorderedList')}><i
                className="fa fa-list-ul"/></button>
            </div> : null}
          </div>
          {paragraphs ?
           <div className="btn-group" style={buttonSpacing}>
             <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded={false}><i
               className="fa fa-align-left"/><i className="fa fa-caret-down"/></button>
             <ul className="dropdown-menu" role="menu">
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'justifyLeft')}>Align Left</a></li>
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'justifyRight')}>Align Right</a></li>
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'justifyCenter')}>Align Center</a></li>
               <li><a href="javascript:;" onClick={this.execCommand.bind(this, 'justifyFull')}>Align Justify</a></li>
             </ul>
           </div> : null}
          <button type="button" className="btn btn-default btn-xs" onClick={this.execCommand.bind(this, 'removeFormat')}><i
            className="fa fa-eraser"/></button>
        </div>
        <div style={editorStyle} ref="editor" contentEditable={true} dangerouslySetInnerHTML={{__html : this.state.html}}
             onInput={this.emitChange.bind(this)}/>
      </div>
    );
  }
}

EditableDiv.defaultProps = {
  textSize: false,
  paragraphs: false,
  lists: true,
  headings: true
}
EditableDiv.propTypes = {
  content: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  textSize: PropTypes.bool,
  paragraphs: PropTypes.bool,
  lists: PropTypes.bool,
  headings: PropTypes.bool
}

