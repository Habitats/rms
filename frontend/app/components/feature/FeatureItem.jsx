import React, {Component, PropTypes} from 'react'

export default class FeatureItem extends Component {

  render() {
    const classes = 'fa fa-4x ' + this.props.icon
    return (
      <div className="text-center" style={{maxWidth: 250, margin: '0 auto'}}>
        <i className={classes}/>

        <h3>{this.props.title}</h3>

        <div>
          <p className="text-center">{this.props.description}</p>
        </div>
      </div>
    )
  }
}

FeatureItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
