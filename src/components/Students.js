import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import '../styles/Students.less';

import NumberedInput from '../containers/NumberedtInput';
import Flash from '../containers/Flash';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class Students extends Component {
  state = {
    students: [{ number: 1, name: '' }],
    groupTitle: '',
    showMessage: false
  };

  handleGroupTitleChange = e => {
    const updatedGroupTitle = e.target.value;
    this.setState({ groupTitle: updatedGroupTitle });
  };

  handleStudentAdding = e => {
    if (e.key === 'Enter') {
      const { students } = this.state;
      const [lastStudent] = students.slice(-1);
      const updatedStudents = [
        ...this.state.students,
        { number: lastStudent.number + 1, name: '' }
      ];
      this.setState({ students: updatedStudents }, () => {
        wait(1).then(() => {
          const students = document.querySelectorAll('.numbered-input__name');
          const newStudent = students[students.length - 1];
          newStudent.focus();
        });
      });
    }
  };

  handleStudentNameChange = id => e => {
    const { students } = this.state;
    const updatedStudents = students.reduce(
      (acc, student) =>
        student.number === id
          ? [...acc, { ...student, name: e.target.value }]
          : [...acc, { ...student }],
      []
    );
    this.setState({ students: updatedStudents });
  };

  handleMessageAppearance = () => {
    this.setState(
      {
        students: [{ number: 1, name: '' }],
        groupTitle: '',
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

  handleGroupAdding = () => {
    const { groupTitle, students } = this.state;
    const { addGroup } = this.props;
    addGroup(groupTitle, students);
    this.handleMessageAppearance();
  };

  render() {
    const studentsList = this.state.students.map(student => {
      return (
        <NumberedInput
          key={student.number}
          number={student.number}
          name={student.name}
          placeholder="Hit enter to add new input field"
          adding={this.handleStudentAdding}
          editing={this.handleStudentNameChange(student.number)}
        />
      );
    });
    return (
      <>
        <h1 className="content_title">Start entering students:</h1>
        <div className="group-input">
          <label htmlFor="group-title">Group title: </label>
          <input
            type="text"
            id="group-title"
            onChange={this.handleGroupTitleChange}
            value={this.state.groupTitle}
          ></input>
        </div>
        <hr />
        {studentsList}
        {/* <button className="btn" onClick={this.addingButtonHandler}>
          Add 1 more student
        </button> */}
        <Flash show={this.state.showMessage}></Flash>
        <button className="btn" onClick={this.handleGroupAdding}>
          Finish entering
        </button>
      </>
    );
  }
}

const mapActionsToProps = {
  addGroup: actions.addGroup
};

export default connect(
  null,
  mapActionsToProps
)(Students);
