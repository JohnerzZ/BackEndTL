import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Header from './Header';
import Main from './Search';
import Home from './Home';
import Results from './Results'
import Test from './Test'
import { UserProvider } from './UserContext';
import { Login, Logout} from './Auth'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token: props.userData.token,
      username: props.userData.username,
      setUserData: (token, username) => this.setState({
        token: token,
        username: username
      }),
    };
  }

  renderProtectedComponent(ProtectedComponent) {
    if (this.state.username !== null) {
      return  (props) => <ProtectedComponent {...props} />;
    }
    else {
      return (props) => <Redirect to='/login' />;
    }
  }

  render() {
    return (
        <React.Fragment>
          <UserProvider value={this.state}>
            <Router>
            
                <Route render = {({location}) => (
                  <React.Fragment>
                  <Header />
                  <TransitionGroup>
                    <CSSTransition
                      key = {location.key}
                      timeout = {300}
                      classNames = "fade">
                      <Switch location = {location}>
            
                        <Route path="/main" render={this.renderProtectedComponent(Main)} />
                        <Route path="/test" render={this.renderProtectedComponent(Test)} />
                        <Route path="/login" component={Login} />
                        <Route exact path="/" component={Home} />
                        <Route path="/logout" render={this.renderProtectedComponent(Logout)} />
                        <Route path="/res" render={this.renderProtectedComponent(Results)} />
                      </Switch>
                      </CSSTransition>
                    </TransitionGroup>
                    
                </React.Fragment>
                )} />
            </Router>
          </UserProvider>
        </React.Fragment>
    );
  }
}

export default App;
