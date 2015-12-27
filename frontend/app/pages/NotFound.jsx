import React from 'react';
import BigHeadline from './../components/text/BigHeadline.jsx';

export default class NotFound extends React.Component {

  render() {
    return (
        <div className="container">
          <div className="box">
            <BigHeadline big="Denne siden finnes ikke." small="404"/>
        </div>
      </div>
    );
  }
}
