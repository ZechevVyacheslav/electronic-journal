import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import uuid from 'uuid/v4';

import '../../styles/Students.less';

import NumberedInput from '../../containers/NumberedtInput';
import Flash from '../../containers/Flash';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const generateAttendanceForSemester = () => {
  const generateAttendanceForWeek = () => {
    const generateAttendanceForDay = () => {
      const lessonsNumbers = [1, 2, 3, 4];
      return lessonsNumbers.map(lessonNumber => ({
        lessonNumber,
        wasAbsentOnFirstHalfPair: false,
        wasAbsentOnSecondHalfPair: false
      }));
    };

    const daysTitles = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return daysTitles.map(dayTitle => ({
      dayTitle,
      dayAttendance: generateAttendanceForDay()
    }));
  };

  const weeksNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return weeksNumbers.map(weekNumber => ({
    weekNumber,
    weekAttendance: generateAttendanceForWeek()
  }));
};

class AddStudents extends Component {
  state = {
    students: [
      { number: 1, name: '', attendance: generateAttendanceForSemester() }
    ],
    groupTitle: '',
    id: uuid(),
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
        {
          number: lastStudent.number + 1,
          name: '',
          attendance: generateAttendanceForSemester()
        }
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

  handleStudentRemoving = id => () => {
    const { students } = this.state;
    if (students.length < 2) {
      return;
    }
    const filteredStudents = students.filter(student => student.number !== id);
    const updatedStudents = filteredStudents.reduce(
      (acc, student) =>
        student.number > id
          ? [...acc, { ...student, number: student.number - 1 }]
          : [...acc, { ...student }],
      []
    );
    this.setState({ students: updatedStudents });
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
        id: uuid(),
        students: [
          { number: 1, name: '', attendance: generateAttendanceForSemester() }
        ],
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
    const { id, groupTitle, students } = this.state;
    const { addGroup } = this.props;
    addGroup(id, groupTitle, students);
    this.handleMessageAppearance();
  };

  render() {
    const studentsList = this.state.students.map(student => {
      return (
        <NumberedInput
          key={student.number}
          number={student.number}
          name={student.name}
          placeholder="Hit enter to add new input field or click on number to remove field"
          adding={this.handleStudentAdding}
          editing={this.handleStudentNameChange(student.number)}
          removing={this.handleStudentRemoving(student.number)}
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
)(AddStudents);
