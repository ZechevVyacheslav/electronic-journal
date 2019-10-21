import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

import '../styles/Students.less';

import NumberedInput from '../containers/NumberedtInput';
import Flash from '../containers/Flash';

class Students extends Component {
  state = {
    students: [{ number: 1, name: '' }],
    showMessage: false
  };

  handleStudentAdding = e => {
    if (e.key === 'Enter') {
      const { students } = this.state;
      const [lastStudent] = students.slice(-1);
      const updatedStudents = [
        ...this.state.students,
        { number: lastStudent.number + 1, name: '' }
      ];
      this.setState({ students: updatedStudents });
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
    let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    this.setState({ showMessage: !this.state.showMessage }, () => {
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
    });
    // this.setState({ showMessage: !this.state.showMessage }, () => {
    //   setTimeout(() => {
    //     const message = document.querySelector('.flash-control');
    //     message.classList.toggle('visible');
    //     setTimeout(() => message.classList.toggle('visible'), 3000);
    //     setTimeout(() => this.setState({ showMessage: !this.state.showMessage }), 1);
    //   }, 1);
    // });
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
        <Flash show={this.state.showMessage}></Flash>
        <h1 className="content_title">Start entering students:</h1>
        <div className="group-input">
          <label htmlFor="group-title">Group title: </label>
          <input type="text" id="group-title"></input>
        </div>
        <hr />
        {studentsList}
        {/* <button className="btn" onClick={this.addingButtonHandler}>
          Add 1 more student
        </button> */}
        <button className="btn" onClick={this.handleMessageAppearance}>
          Finish entering
        </button>
      </>
    );
  }
}

export default Students;
