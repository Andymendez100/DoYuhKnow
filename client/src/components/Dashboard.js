import React, { Component, Fragment } from 'react';
import Chat from './socketComponents/Chat';
import GameMode from './socketComponents/GameMode';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <div className='row'>
          <div className='col s3'>
            <h1 className='display-3'>Welcome,{' ' + this.props.username}</h1>
          </div>
          <div className='col s3'>
            <Chat username={this.props.username} />
            <GameMode />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;
