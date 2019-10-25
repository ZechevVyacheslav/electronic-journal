import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import NumberedInput from '../../containers/NumberedtInput';
import '../../styles/Subjects.less';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class AddSubjects extends Component {
  state = {
    subjects: [{ number: 1, name: '' }]
  };

  handleSubjectAdding = e => {
    if (e.key === 'Enter') {
      const { subjects } = this.state;
      const [lastSubject] = subjects.slice(-1);
      const updatedSubjects = [
        ...this.state.subjects,
        { number: lastSubject.number + 1, name: '' }
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

  handleSubjectNameChange = id => e => {
    const { subjects } = this.state;
    const updatedSubjects = subjects.reduce(
      (acc, student) =>
        student.number === id
          ? [...acc, { ...student, name: e.target.value }]
          : [...acc, { ...student }],
      []
    );
    this.setState({ subjects: updatedSubjects });
  };

  render() {
    const subjectsList = this.state.subjects.map(subject => {
      return (
        <NumberedInput
          key={subject.number}
          number={subject.number}
          name={subject.name}
          placeholder="Hit enter to add new input field"
          adding={this.handleSubjectAdding}
          editing={this.handleSubjectNameChange(subject.number)}
        />
      );
    });
    return (
      <>
        <h1 className="content_title">Start entering subjects:</h1>
        <hr />
        {subjectsList}
        <button className="btn">Finish entering</button>
      </>
    );
  }
}

export default AddSubjects;
