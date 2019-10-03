import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';
import { Button } from '@material-ui/core';
import './homepage/homepage.css';



class Landing extends Component {

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  renderComponent() {
    if (!this.props.auth) {
      return (
        <div className="container">
          <div className="logo" />
          <div className='one-line-header'>
            <p>Lorem Ipsum is simply dummy text for people</p>
          </div>
          <div className='mission-statement'>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's more writing more
          writing</p>
          </div>
          <Button variant='contained' color='primary' component={Link} to='register'> Sign Up</Button>
          <Button variant='contained' color='primary' component={Link} to='login'> Login </Button>

        </div >


      );
    }
    else {
      return (
        <Dashboard username={this.props.auth.username} />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderComponent()}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    auth: auth
  }
}

export default connect(mapStateToProps, { fetchCurrentUser })(Landing);