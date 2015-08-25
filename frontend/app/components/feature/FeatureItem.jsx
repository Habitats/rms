import React from 'react';

export default class FeatureItem extends React.Component {

  render() {
    let classes = 'fa fa-4x ' + this.props.icon;
    return (
      <div className="text-center">
        <i className={classes}/>

        <h2>{this.props.title}</h2>

        <div className="">
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}

FeatureItem.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired
};
