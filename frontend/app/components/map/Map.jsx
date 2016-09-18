import React, {Component, PropTypes} from 'react'
import Radium from 'radium'

class Map extends Component {

  componentDidUpdate() {
    window.initialize()
  }

  componentDidMount() {
    window.initialize = () => {
      const home = {lat: 60.255074, lng: 11.026707}

      try {
        const map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: this.props.zoom, center: home}) //eslint-disable-line
        let styles =
          [{stylers: [{saturation: -100}, {gamma: 1}]}, {elementType: 'labels.content.stroke', stylers: [{visibility: 'off'}]},
            {featureType: 'poi.business', elementType: 'labels.content', stylers: [{visibility: 'off'}]},
            {featureType: 'poi.business', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
            {featureType: 'poi.place_of_worship', elementType: 'labels.content', stylers: [{visibility: 'off'}]},
            {featureType: 'poi.place_of_worship', elementType: 'labels.icon', stylers: [{visibility: 'off'}]},
            {featureType: 'road', elementType: 'geometry', stylers: [{visibility: 'simplified'}]},
            {featureType: 'water', stylers: [{visibility: 'on'}, {saturation: 50}, {gamma: 0}, {hue: '#50a5d1'}]},
            {featureType: 'administrative.neighborhood', elementType: 'labels.content.fill', stylers: [{color: '#333333'}]},
            {featureType: 'road.local', elementType: 'labels.content', stylers: [{weight: 0.5}, {color: '#333333'}]},
            {featureType: 'transit.station', elementType: 'labels.icon', stylers: [{gamma: 1}, {saturation: 50}]}]

        map.setOptions({styles: styles})
        const marker = new google.maps.Marker({position: home, map: map}) //eslint-disable-line
      } catch (ex) {
      }
    }
  }

  render() {
    const {height, style} = this.props
    const mapStyle = {
      ...style,
      height: height,
      width: '100%',
      color: '#e9e9e9'
    }
    return (
      <div id="map-canvas" style={mapStyle}/>
    )
  }
}

Map.defaultProps = {
  zoom: 10,
  height: 450,
  style: {}
}

Map.propTypes = {
  zoom: PropTypes.number,
  style: PropTypes.number,
  height: PropTypes.number
}

export default Radium(Map)