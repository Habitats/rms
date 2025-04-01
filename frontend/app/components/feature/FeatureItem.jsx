import React from 'react'
import PropTypes from 'prop-types'

const FeatureItem = ({ icon, title, description }) => {
  const classes = 'fa fa-4x ' + icon

  return (
    <div className="text-center" style={{maxWidth: 250, margin: '0 auto'}}>
      <i className={classes}/>

      <h3>{title}</h3>

      <div>
        <p className="text-center">{description}</p>
      </div>
    </div>
  )
}

FeatureItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default FeatureItem
