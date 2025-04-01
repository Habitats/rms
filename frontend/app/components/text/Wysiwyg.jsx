import React, {Component} from 'react'
import PropTypes from 'prop-types'
import EditableDiv from './EditableDiv.jsx'

export default class Wysiwyg extends Component {

  constructor(props) {
    super(props)
    this.state = props
  }

  handleChange(e) {
    this.setState({content: e.target.value})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({enabled: false, content: nextProps.content})
  }

  toggle(toggle) {
    this.setState({enabled: toggle})
  }

  onSave() {
    this.toggle(false)
    this.props.onSave(this.state.content)
  }

  onCancel() {
    this.toggle(false)
    this.setState({content: this.props.content})
  }

  render() {
    const {content, enabled} = this.state
    return (
      <div className="row wysiwyg">
        {enabled ?
         <div>
           <div className="col-xs-12">
             <EditableDiv content={content} onChange={this.handleChange.bind(this)}/>
           </div>
           <div className="col-xs-6">
             <button style={{marginTop: 5}} className="btn btn-default btn-block" onClick={this.onSave.bind(this)} type="submit">
               Lagre
             </button>
           </div>
           <div className="col-xs-6">
             <button style={{marginTop: 5}} className="btn btn-default btn-block" onClick={this.onCancel.bind(this)} type="submit">Angre
             </button>
           </div>
         </div>
          :
         <div>
           <div dangerouslySetInnerHTML={{__html: content}} className="col-xs-12"/>
           <div className="col-xs-12">
             <button style={{marginTop: 45}} className="btn btn-default btn-block" onClick={this.toggle.bind(this, true)} type="submit">
               Endre beskrivelse
             </button>
           </div>
         </div>}
      </div>
    )
  }
}

Wysiwyg.defaultProps = {
  content: '',
  enabled: false
}

Wysiwyg.propTypes = {
  content: PropTypes.string,
  onSave: PropTypes.func.isRequired
}

