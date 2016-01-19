import React, {Component, PropTypes} from 'react'
import EditableDiv from './EditableDiv.jsx'

export default class Wysiwyg extends Component {

  constructor(props) {
    super(props)
    this.state = this.props
  }

  handleChange(e) {
    console.log(e)
    this.setState({content: e.target.value})
  }

  toggle(toggle) {
    this.setState({enabled: toggle})
  }

  onSave(content) {
    this.toggle(false)
    this.props.onSave(content)
  }

  render() {
    let {content, enabled} = this.state
    let style = {paddingTop: 20, paddingBottom: 20}
    return (
      <div className="row">
        {enabled ?
         <div>
           <div className="col-xs-12" style={style}>
             <EditableDiv content={content} onChange={this.handleChange.bind(this)}/>
           </div>
           <div className="col-xs-6">
             <button style={{marginTop: 5}} className="btn btn-default btn-block" onClick={this.onSave.bind(this, content)} type="submit">
               Lagre
             </button>
           </div>
           <div className="col-xs-6">
             <button style={{marginTop: 5}} className="btn btn-default btn-block" onClick={this.toggle.bind(this, false)} type="submit">Angre
             </button>
           </div>
         </div>
          :
         <div>
           <div dangerouslySetInnerHTML={{__html: content}} className="col-xs-12" style={style}/>
           <div className="col-xs-12">
             <button style={{marginTop: 5}} className="btn btn-default btn-block" onClick={this.toggle.bind(this, true)} type="submit">Endre
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

