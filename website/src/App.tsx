import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import CreateAccountPage from './pages/create-account/create-account';
import LoginAccountPage from './pages/login-account/login-account';

function App() {
  return (
    <Router >
      <Route exact path='/' render={(props) => <LoginAccountPage history={props.history}></LoginAccountPage>} />
      <Route path='/login' render={(props) => <LoginAccountPage history={props.history}></LoginAccountPage>} />
      <Route path='/createaccount' render={(props) => <CreateAccountPage history={props.history}></CreateAccountPage>} />
    </Router>
  );
}

export default App;
