import React, {Component, PropTypes} from 'react'

export default class FeatureItem extends Component {

  render() {
    let classes = 'fa fa-4x ' + this.props.icon
    return (
      <div className="text-center">
        <i className={classes}/>

        <h2>{this.props.title}</h2>

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
