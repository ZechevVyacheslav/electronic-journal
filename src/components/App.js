import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import '../styles/App.less';

import Header from './Header';
import Students from './Students/AddStudents';
import Subjects from './Subjects';
import Journal from './Journal'

class App extends Component {

  render() {
    const { numbers } = this.props;
    return (
      <>
        <Header />
        <main className="main-content">
          <Switch>
            <Route path="/" exact>
              <h1>Hello there!</h1>
            </Route>
            <Route path="/create-student-list" exact>
              <Students />
            </Route>
            <Route path="/create-subjects" exact>
              <Subjects />
            </Route>
            <Route path="/create-journal" exact>
              <Journal />
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}



export default App;
