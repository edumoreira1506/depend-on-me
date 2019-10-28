import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import CreateAccountPage from './pages/accounts/create-account';
import LoginAccountPage from './pages/accounts/login-account';

import { HomePage } from './pages/home';
import LandingPage from './pages/landing-page';
import { NotFoundPage } from './pages/not-found';
import { ForgotAccountPage } from './pages/accounts/forgot-account';

// different modes to render the application for testing and development purposes
export enum MODE { 
  DEVELOPMENT, PRODUCTION, PLAYGROUND, NONE
}

// render function for the stable branch build
function Production() {
    return (
      <Router >
        <Route exact path='/' render={(props) => <LoginAccountPage history={props.history}></LoginAccountPage>} />
        <Route path='/login' render={(props) => <LoginAccountPage history={props.history}></LoginAccountPage>} />
        <Route path='/createaccount' render={(props) => <CreateAccountPage history={props.history}></CreateAccountPage>} />
      </Router>
    );
}

// render function for the nightly branch build
function Development() {
  return (
    <Router>
      <Switch >
        <Route exact path='/' render={(props) => <LandingPage history={props.history}></LandingPage>} />
        <Route path='/login' render={(props) => <LoginAccountPage history={props.history}></LoginAccountPage>} />
        <Route path='/createaccount' render={(props) => <CreateAccountPage history={props.history}></CreateAccountPage>} />
        <Route path='/forgotaccount' render={(props) => <ForgotAccountPage history={props.history}></ForgotAccountPage>} />
        <Route path='/home/:userid' render={(props) => <HomePage history={props.history}></HomePage>} />
        <Route render={(props) => <NotFoundPage history={props.history}></NotFoundPage>} />
      </Switch>
    </Router>
  );
}

// render function for incomplete experimental features. should be used for testing individual rendering and
// functionality of sub parts of the program.
function Playground() {
    return None();
}

// render function for when no app mode is defined
function None() {
    return (
      <div style={{ display: 'table', height: '100vh', width: '100vw'}}>
        <h1 style={{textAlign: 'center', display: 'table-cell', verticalAlign: 'middle'}}>
          an internal error has occurred
        </h1>
      </div>
    );
}

/**
 * current mode to use when rendering the website
 */
export const mode: MODE = MODE.DEVELOPMENT;

/**
 * renders the complete website
 */
function App() {
  switch (mode) {
      case MODE.PRODUCTION:   return Production();
      case MODE.DEVELOPMENT:  return Development();
      case MODE.PLAYGROUND:   return Playground();
      case MODE.NONE:
      default:                return None();
  }
}

export default App;