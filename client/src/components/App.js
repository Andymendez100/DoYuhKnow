import React, { Component } from 'react'
// import Header from './Header';
import Hamburger from './hamburgerMenu/drawer'
import Footer from './Footer';
import Landing from './landing';
import Login from './Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registration from '../components/registrationform/Registration';
import Guidelines from './guidelines/guideLines'
import Game from './socketComponents/Game';
import GameQuiz from './socketComponents/GameQuiz';
import pagenotfound from './pagenotfound';


class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>

                    <div>


                        <Hamburger />
                        <Switch>

                            <Route exact path='/' component={Landing} />
                            <Route path='/login' component={Login} />
                            <Route path='/register' component={registration} />
                            <Route path='/gamestart' component={Game} />
                            <Route path='/gamequiz:match' component={GameQuiz} />
                            <Route path='/guidelines' component={Guidelines} />
                            <Route path='*' component={pagenotfound} />

                        </Switch>

                    </div>

                </BrowserRouter>
                <Footer />
            </div>
        )
    }
}


export default App
