import Map from './Map.jsx'
import makeAsyncScriptLoader from 'react-async-script'

const URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDb_jsmHVPfJ3XvAYggQJ_SWqkFx9Okmpk&v=3.exp&callback=initialize'

export default makeAsyncScriptLoader(Map, URL)
