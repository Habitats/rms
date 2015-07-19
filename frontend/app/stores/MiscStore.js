import Marty from 'marty';
import MiscConstants from './../constants/MiscConstants.js';

class MiscStore extends Marty.Store {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlers = {
      updateMap: MiscConstants.UPDATE_MAP
    };
  }

  updateMap(map) {
    this.state.map = map;
    this.hasChanged();
  }

  getMap() {
    return this.state.map;
  }
}

export default MiscStore;
