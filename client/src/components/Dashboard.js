import React, { Component } from 'react';
import Chat from './socketComponents/Chat';
import GameMode from './socketComponents/GameMode';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1 className='display-3'>
                Welcome back,{' ' + this.props.username}
              </h1>
            </div>
          </div>
        </div>
        <Chat username={this.props.username} />
        <GameMode />
      </div>
    );
  }
}

export default Dashboard;
