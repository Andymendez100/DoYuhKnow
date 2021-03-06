import React, { Component } from 'react';
import Chat from './socketComponents/Chat';
import GameMode from './socketComponents/GameMode';
import '../style/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container center-align sizingContainer'>
        <div className='row mt-4'>
          <div className='col s12 m6'>
            <h1 className='display-4 wel-message'>
              Welcome,{' ' + this.props.username}
            </h1>
          </div>
          <div className='col s12 m6 valign-wrapper button-fix'>
            <GameMode />
          </div>
        </div>
        <Chat username={this.props.username} />
      </div>
    );
  }
}

export default Dashboard;
