import React, { Component } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import shuffle from 'shuffle-array';
import Timer from './Timer';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../../style/gamequiz.css';

class GameQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchtoken: '',
      question: '',
      category: '',
      answers: [],
      correct_answer: '',
      your_answer: '',
      timer: 0,
      points: 0,
      questionnumber: 0,
      roundrank: [],
      error: false
    };
    if (process.env.NODE_ENV === 'development') {
      this.socket = io('localhost:3000');
    } else if (process.env.NODE_ENV === 'production') {
      this.socket = io('/');
    }
    this.socket.on('game', res => {
      addingStates(res);
    });
    const addingStates = res => {
      this.setState({ question: res.question });
      this.setState({ category: res.category });
      this.setState({
        answers: [...res.incorrect_answers, res.correct_answer]
      });
      this.setState({ correct_answer: res.correct_answer });
      shuffle(this.state.answers);
      this.setState({ your_answer: '' });
    };
    this.socket.on('scoreranks', data => {
      if (data.matchtoken === this.state.matchtoken) {
        let value = {
          username: data.username,
          points: data.points
        };
        addingScoreRanks(value);
      }
    });
    const addingScoreRanks = value => {
      this.setState({ roundrank: [...this.state.roundrank, value] });
    };
    this.buttonClick = this.buttonClick.bind(this);
  }
  updateTimer(value) {
    this.setState({ timer: value });
  }
  updateQuestionNumber(value) {
    this.setState({ questionnumber: value });
  }
  componentDidMount() {
    const { match } = this.props.match.params;
    let value = {
      MatchIdentication: match
    };
    axios
      .post('/api/checkGameExist', value)
      .then(res => {
        this.setState({
          matchtoken: res.data.matchtoken
        });
      })
      .catch(err =>
        this.setState({
          error: true
        })
      );
  }
  buttonClick(e) {
    this.setState({ your_answer: e.target.id });
    if (this.state.correct_answer === e.target.id) {
      if (this.state.points === 0) {
        this.setState({ points: this.state.timer });
      } else {
        this.setState({ points: this.state.points * this.state.timer });
      }
    }
  }
  scoreRanks() {
    this.socket.emit('rank', {
      matchtoken: this.state.matchtoken,
      username: this.props.auth.username,
      points: this.state.points
    });
  }
  renderScores() {
    return _.map(this.state.roundrank, scores => {
      return (
        <li
          key={scores.username}
          className='list-group-item'
        >{`Name: ${scores.username} Points: ${scores.points}`}</li>
      );
    });
  }
  render() {
    if (this.state.questionnumber === 10 && this.state.timer === 0) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col s6' id='scoreboard'>
              <h3 className='center-align'>END OF THE QUIZ</h3>
              <h3 className='center-align' id='scoreboard-title'>
                Scoreboard
              </h3>
              <ul className='list-group'>{this.renderScores()}</ul>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.error) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div className='quiz'>
                <h3 className='center-align'>
                  Category: {this.state.category}
                </h3>
                <h6 className='center-align'>{`Your points ${this.state.points}`}</h6>
                <h6 className='center-align'>
                  {'Your answer: ' + this.state.your_answer}
                </h6>
                <h6 className='center-align'>
                  Correct answer is:{' '}
                  {this.state.your_answer ? this.state.correct_answer : ''}
                </h6>
                <div>
                  <Timer
                    data={this.updateTimer.bind(this)}
                    number={this.updateQuestionNumber.bind(this)}
                    score={this.scoreRanks.bind(this)}
                    matchtoken={this.state.matchtoken}
                  />
                </div>
                <div className='jumbotron'>
                  <h3 className='questiontext center-align'>
                    {this.state.question}
                  </h3>
                </div>
                <div>
                  <div className='row'>
                    <button
                      className='btn btn-large indigo darken-1 col'
                      disabled={this.state.your_answer}
                      onClick={this.buttonClick}
                      id={this.state.answers[0]}
                    >
                      {this.state.answers[0]}
                    </button>
                    <button
                      className='btn btn-large indigo darken-1  col'
                      disabled={this.state.your_answer}
                      onClick={this.buttonClick}
                      id={this.state.answers[1]}
                    >
                      {this.state.answers[1]}
                    </button>
                    <div className='w-100'></div>
                    <button
                      className='btn btn-large indigo darken-1  col'
                      disabled={this.state.your_answer}
                      onClick={this.buttonClick}
                      id={this.state.answers[2]}
                    >
                      {this.state.answers[2]}
                    </button>
                    <button
                      className='btn btn-large indigo darken-1  col'
                      disabled={this.state.your_answer}
                      onClick={this.buttonClick}
                      id={this.state.answers[3]}
                    >
                      {this.state.answers[3]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div className='container'>
          <div className='textbox'>
            <h4 className='messagegame center-align'>OOPS!</h4>
            <p className='center-align'>
              <b>
                I dont think you are supposed to be here.. Did you want to start
                a game?
              </b>
            </p>
          </div>
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(GameQuiz);
