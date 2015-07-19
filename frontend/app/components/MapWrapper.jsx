import Map from './Map.jsx';
import makeAsyncScriptLoader from 'react-async-script';

const URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initialize';

export default makeAsyncScriptLoader(Map, URL);
