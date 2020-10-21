import { renderComponent } from '../react-dom';

export default class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }

  shouldComponentUpdate() {
    return true;
  }

  setState(stateChange) {
    Object.assign(this.state, stateChange);
    if (this.shouldComponentUpdate()) {
      renderComponent(this);
    }
  }
}