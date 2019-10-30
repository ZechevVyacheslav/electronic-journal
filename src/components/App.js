import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import '../styles/App.less';

import Header from './Header';

import AddStudents from './Students/AddStudents';
import EditStudents from './Students/EditStudents';
import ViewStudents from './Students/VeiwStudents';

import AddSubjects from './Subjects/AddSubjects';
import EditSubjects from './Subjects/EditSubjects';

import AddJournal from './Journal/AddJournal';
import EditJournal from './Journal/EditJournal';
import ViewJournal from './Journal/ViewJournal';

class App extends Component {
  render() {
    const { numbers } = this.props;
    return (
      <>
        <Header />
        <main className="main-content">
          <Switch>
            <Route path="/" exact>
              <h1 className="centered">
                Hello there! Welcome to electronic journal starting page{' '}
                <span role="img">🙂</span>
              </h1>
            </Route>
            <Route path="/create-student-list" exact>
              <AddStudents />
            </Route>
            <Route path="/edit-students" exact>
              <EditStudents />
            </Route>
            <Route path="/view-students" exact>
              <ViewStudents />
            </Route>
            <Route path="/create-subjects" exact>
              <AddSubjects />
            </Route>
            <Route path="/edit-subjects" exact>
              <EditSubjects />
            </Route>
            <Route path="/create-journal" exact>
              <AddJournal />
            </Route>
            <Route path="/edit-journal" exact>
              <EditJournal />
            </Route>
            <Route path="/view-journal" exact>
              <ViewJournal />
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
