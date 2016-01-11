import React, {Component, PropTypes} from 'react'

export default class Map extends Component {

  componentDidUpdate() {
    window.initialize()
  }

  componentDidMount() {
    window.initialize = () => {
      let home = {lat: 60.255074, lng: 11.026707}
      let map = new google.maps.Map(document.getElementById('map-canvas'), {zoom: 15, center: home}) //eslint-disable-line
      let marker = new google.maps.Marker({position: home, map: map}) //eslint-disable-line
    }
  }

  render() {
    let style = {  height: 450, width: '100%'}
    return (
      <div id="map-canvas" style={style}/>
    )
  }
}
