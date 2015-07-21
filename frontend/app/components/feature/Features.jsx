import React from 'react';
import FeatureItem from './FeatureItem.jsx';

export default class Features extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <FeatureItem />
        </div>
        <div className="col-md-4">
          <FeatureItem />
        </div>
        <div className="col-md-4">
          <FeatureItem />
        </div>
      </div>
    );
  }
}

