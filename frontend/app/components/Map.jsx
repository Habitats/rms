import React from 'react';

export default class Map extends React.Component {

  componentDidUpdate(){
    window.initialize();
  }

  componentDidMount(){
    window.initialize = () => {
      let home = {lat: 60.255074, lng: 11.026707};
      let map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        center: home
      });

      let marker = new google.maps.Marker({
        position: home,
        map: map
      });
    };
  }

  render() {
    return (
      <div id="map-canvas" />
    );
  }
}
