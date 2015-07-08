import Marty from 'marty';
import HelloConstants from './HelloConstants.js';

class HelloActionCreators extends Marty.ActionCreators {

  hello(msg) {
    console.log('FLUX > action > Hello world');
    this.dispatch(HelloConstants.HELLO_WORLD, msg);
  }
}

export default HelloActionCreators;
