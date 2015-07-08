import Marty from 'marty';
import UserConstants from './HelloConstants.js';
import HelloActionCreators from './HelloActionCreators.js';

export default class HelloStore extends Marty.Store {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'hello',
      world: 'world'
    };
    this.handlers = {
      helloWorld: UserConstants.HELLO_WORLD
    };

  }

  helloWorld(msg) {
    console.log('FLUX > updating helloStore > ' + msg);
    this.setState({hello: this.state.hello + ' ' + msg});
  }

  getHelloWorld() {
    return this.state.hello;
  }

  setHello(id, msg) {
    this.state[id] = msg;
    this.hasChanged();
  }
}