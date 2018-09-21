import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import BoardsList from './components/BoardsList.jsx';
import ThreadsList from './components/ThreadsList.jsx';
import ThreadView from './components/Thread.jsx';
import ErrorHandler from './components/ErrorHandler.jsx';
import NotFound from './components/NotFound.jsx';

class App extends Component {
  render() {
    return (
      <ErrorHandler>
      <Switch>
        <Route exact path="/" component={BoardsList}/>
        <Route exact path="/:boardId" component={ThreadsList}/>
        <Route exact path="/:boardId/:threadId" component={ThreadView}/>
        <Route component={NotFound}/>
      </Switch>
      </ErrorHandler>
    );
  }
}

export default App;
