import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={BoardList}/>
        <Route exact path="/:boardId" component={ThreadsList}/>
        <Route exact path="/:boardId/:threadId" component={ThreadView}/>
      </Switch>
    );
  }
}

export default App;
