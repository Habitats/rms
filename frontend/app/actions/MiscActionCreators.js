import Marty from 'marty';
import MiscConstants from './../constants/MiscConstants.js';

class MiscActionCreators extends Marty.ActionCreators {

  updateMap(map) {
    this.dispatch(MiscConstants.UPDATE_MAP, map);
  }
}

export default MiscActionCreators;
