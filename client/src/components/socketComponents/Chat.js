import React, { Component } from 'react';
import io from 'socket.io-client';
import _ from 'lodash';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      message: '',
      messages: []
    };

    if (process.env.NODE_ENV === 'production') {
      this.socket = io('/');
    } else if (process.env.NODE_ENV === 'development') {
      this.socket = io('localhost:3000');
    }

    this.socket.on('onRecieve_Message', function (data) {
      Addingmsg(data);
    });

    const Addingmsg = data => {
      this.setState({ messages: [...this.state.messages, data] });
    };
  }

  sendMessage(e) {
    e.preventDefault()
    this.socket.emit('onSending_Message', {
      username: this.state.username,
      message: this.state.message
    });

    this.setState({ message: '' });
  }

  renderMessages() {
    return this.state.messages.map((message, index) => {
      return (
        <div key={index}>
          {' '}
          {
            <b>
              <em>{message.username}:</em>
            </b>
          }{' '}
          {message.message}{' '}
        </div>
      );
    });
  }

  render() {
    return (
      <div className='row mb-8'>
        <div className='col s12'>
          <div className='card chat wrapper'>
            <div className='card-body'>
              <span className='card-title'>Group Chat</span>
            </div>

            <div className='all-messages left-align'>
              {this.renderMessages()}
            </div>
            <form onSubmit={this.sendMessage.bind(this)}>
              <div className='card-action'>
                <input
                  type='text'
                  placeholder='Message'
                  className='form-control'
                  value={this.state.message}
                  onChange={ev => this.setState({ message: ev.target.value })}
                />
                <button
                  type='submit'
                  className='btn btn-large indigo darken-1 chat-btn form-control'
                  onClick={this.sendMessage.bind(this)}
                >
                  Send
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
