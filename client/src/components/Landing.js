import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/index';
import { Button } from '@material-ui/core';
import '../style/landing.css';
import logo from '../static/Images/KnowMe.png';

class Landing extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  renderComponent() {
    if (!this.props.auth) {
      return (
        <div className='container center-align vertical-center'>
          <div className='row'>
            <div className='col s12'>
              <img className='logo' src={logo} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='one-line-header'>
                <p>Are you smarter then your friends?</p>
              </div>
              <div className='mission-statement'>
                <p> You think you're smart? Play this to double check...</p>
              </div>
              <br />
              <br />
              <Button
                variant='contained'
                color='primary'
                id='mainPageButton'
                component={Link}
                to='register'
              >
                Sign Up
              </Button>
              <br />
              <br />
              <Button
                variant='contained'
                color='primary'
                id='mainPageButton'
                component={Link}
                to='login'
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return <Dashboard username={this.props.auth.username} />;
    }
  }

  render() {
    return <div>{this.renderComponent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return {
    auth: auth
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentUser }
)(Landing);
