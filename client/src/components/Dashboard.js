import React, { Component } from 'react';
import Chat from './socketComponents/Chat';
import GameMode from './socketComponents/GameMode';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12 m6'>
            <h1 className='display-4'>Welcome,{' ' + this.props.username}</h1>
          </div>
          <div className='col s12 m6'>
            <GameMode />
          </div>
        </div>
        <Chat username={this.props.username} />
      </div>
    );
  }
}

export default Dashboard;
