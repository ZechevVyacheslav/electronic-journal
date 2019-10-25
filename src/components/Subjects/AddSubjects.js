import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import uuid from 'uuid/v4';

import '../../styles/Subjects.less';

import NumberedInput from '../../containers/NumberedtInput';
import Flash from '../../containers/Flash';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class AddSubjects extends Component {
  state = {
    subjects: [{ id: uuid(), number: 1, title: '' }],
    showMessage: false
  };

  handleSubjectAdding = e => {
    if (e.key === 'Enter') {
      const { subjects } = this.state;
      const [lastSubject] = subjects.slice(-1);
      const updatedSubjects = [
        ...this.state.subjects,
        { id: uuid(), number: lastSubject.number + 1, title: '' }
      ];
      this.setState({ subjects: updatedSubjects }, () => {
        wait(1).then(() => {
          const subjects = document.querySelectorAll('.numbered-input__name');
          const newSubject = subjects[subjects.length - 1];
          newSubject.focus();
        });
      });
    }
  };

  handleSubjectRemoving = id => () => {
    const { subjects } = this.state;
    if (subjects.length < 2) {
      return;
    }
    const filteredSubjects = subjects.filter(subject => subject.number !== id);
    const updatedSubjects = filteredSubjects.reduce(
      (acc, subject) =>
        subject.number > id
          ? [...acc, { ...subject, number: subject.number - 1 }]
          : [...acc, { ...subject }],
      []
    );
    this.setState({ subjects: updatedSubjects });
  };

  handleSubjectNameChange = id => e => {
    const { subjects } = this.state;
    const updatedSubjects = subjects.reduce(
      (acc, student) =>
        student.number === id
          ? [...acc, { ...student, title: e.target.value }]
          : [...acc, { ...student }],
      []
    );
    this.setState({ subjects: updatedSubjects });
  };

  handleMessageAppearance = () => {
    this.setState(
      {
        subjects: [{ id: uuid(), number: 1, title: '' }],
        showMessage: !this.state.showMessage
      },
      () => {
        let message;
        wait(1)
          .then(() => {
            message = document.querySelector('.flash-control');
            message.classList.toggle('visible');
            return wait(2000);
          })
          .then(() => {
            message.classList.toggle('visible');
            return wait(2000);
          })
          .then(() => this.setState({ showMessage: !this.state.showMessage }));
      }
    );
  };

  handleSubjectsAdding = () => {
    const { subjects } = this.state;
    const subjectsWithoutNumber = subjects.map(subject => ({id: subject.id, title: subject.title}));
    console.log(subjects);
    console.log(subjectsWithoutNumber);
    const { addSubjects } = this.props;
    addSubjects(subjectsWithoutNumber);
    this.handleMessageAppearance();
  };

  render() {
    const subjectsList = this.state.subjects.map(subject => {
      return (
        <NumberedInput
          key={subject.number}
          number={subject.number}
          name={subject.title}
          placeholder="Hit enter to add new input field"
          adding={this.handleSubjectAdding}
          editing={this.handleSubjectNameChange(subject.number)}
          removing={this.handleSubjectRemoving(subject.number)}
        />
      );
    });
    return (
      <>
        <h1 className="content_title">Start entering subjects:</h1>
        <hr />
        {subjectsList}
        <Flash show={this.state.showMessage}></Flash>
        <button className="btn" onClick={this.handleSubjectsAdding}>
          Finish entering
        </button>
      </>
    );
  }
}

const mapActionsToProps = {
  addSubjects: actions.addSubjects
}

export default connect(null, mapActionsToProps)(AddSubjects);
