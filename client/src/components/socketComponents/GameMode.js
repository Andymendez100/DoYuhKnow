import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class GameMode extends Component {
  constructor(props) {
    super(props);
  }

  start() {
    this.props.history.push('/gamestart');
  }

  render() {
    return (
      <button
        className='btn btn-large indigo darken-1 start-button form-control'
        onClick={this.start.bind(this)}
      >
        Play Game
      </button>
    );
  }
}

export default withRouter(GameMode);
