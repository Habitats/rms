import React, {Component, PropTypes} from 'react'

export default class Map extends Component {

  componentDidUpdate() {
    window.initialize()
  }

  componentDidMount() {
    window.initialize = () => {
      let home = {lat: 60.255074, lng: 11.026707}
      let map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: this.props.zoom, center: home}) //eslint-disable-line
      var styles =
        [{stylers: [{saturation: -100}, {gamma: 1}]}, {elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
          {featureType: 'poi.business', elementType: 'labels.text', stylers: [{visibility: 'off'}]},
          {featureType: 'poi.business', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
          {featureType: 'poi.place_of_worship', elementType: 'labels.text', stylers: [{visibility: 'off'}]},
          {featureType: 'poi.place_of_worship', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
          {featureType: 'road', elementType: 'geometry', stylers: [{visibility: 'simplified'}]},
          {featureType: 'water', stylers: [{visibility: 'on'}, {saturation: 50}, {gamma: 0}, {hue: '#50a5d1'}]},
          {featureType: 'administrative.neighborhood', elementType: 'labels.text.fill', stylers: [{color: '#333333'}]},
          {featureType: 'road.local', elementType: 'labels.text', stylers: [{weight: 0.5}, {color: '#333333'}]},
          {featureType: 'transit.station', elementType: 'labels.icon', stylers: [{gamma: 1}, {saturation: 50}]}]

      map.setOptions({styles: styles});
      let marker = new google.maps.Marker({position: home, map: map}) //eslint-disable-line
    }
  }

  render() {
    let {height} = this.props
    let style = {
      height: height,
      width: '100%',
      color: '#e9e9e9'
    }
    return (
      <div id="map-canvas" style={style}/>
    )
  }
}

Map.defaultProps = {
  zoom: 10,
  height: 450
}

Map.propTypes = {
  zoom: PropTypes.number,
  height: PropTypes.number
}
