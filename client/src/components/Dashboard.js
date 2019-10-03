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
        <div className='headerpage jumbotron'>
          <div className='container'>
            <h1 className='display-3'>
              Welcome back,{' ' + this.props.username}
            </h1>
          </div>
        </div>
        <div className='row 2'>
          <Chat username={this.props.username} />
          <GameMode />
        </div>
      </div>
    );
  }
}

export default Dashboard;
