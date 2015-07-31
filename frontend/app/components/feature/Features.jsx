import React from 'react';
import FeatureItem from './FeatureItem.jsx';

export default class Features extends React.Component {

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <FeatureItem icon="fa-cogs"
                       title="Lang erfaring"
                       description="Lorem i amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."/>
        </div>
        <div className="col-md-4">
          <FeatureItem icon="fa-heart"
                       title="Kunden i sentrum"
                       description="Lorem i amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."/>
        </div>
        <div className="col-md-4">
          <FeatureItem icon="fa-star"
                       title="Smarte løsninger"
                       description="Lorem i amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad."/>
        </div>
      </div>
    );
  }
}

