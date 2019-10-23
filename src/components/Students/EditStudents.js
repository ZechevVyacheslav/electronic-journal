import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import '../../styles/Students.less';

import NumberedInput from '../../containers/NumberedtInput';
import Flash from '../../containers/Flash';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class VeiwStudents extends Component {
  state = {
    showGroupsList: true,
    currentGroup: null,
    showMessage: false
  };

  handleOnGroupClick = groupName => () => {
    const { groups } = this.props;
    const [currentGroup] = groups.filter(
      group => group.groupTitle === groupName
    );
    this.setState({ showGroupsList: !this.state.showGroupsList, currentGroup });
  };

  handleGroupTitleChange = e => {
    const updatedGroupTitle = e.target.value;
    this.setState({
      currentGroup: {
        ...this.state.currentGroup,
        groupTitle: updatedGroupTitle
      }
    });
  };

  handleStudentAdding = e => {
    if (e.key === 'Enter') {
      const { studentsList: students } = this.state.currentGroup;
      const [lastStudent] = students.slice(-1);
      const updatedStudents = [
        ...this.state.currentGroup.studentsList,
        { number: lastStudent.number + 1, name: '' }
      ];

      this.setState(
        {
          currentGroup: {
            ...this.state.currentGroup,
            studentsList: updatedStudents
          }
        },
        () => {
          wait(1).then(() => {
            const students = document.querySelectorAll('.numbered-input__name');
            const newStudent = students[students.length - 1];
            newStudent.focus();
          });
        }
      );
    }
  };

  handleStudentNameChange = id => e => {
    const { studentsList: students } = this.state.currentGroup;
    const updatedStudents = students.reduce(
      (acc, student) =>
        student.number === id
          ? [...acc, { ...student, name: e.target.value }]
          : [...acc, { ...student }],
      []
    );
    this.setState({
      currentGroup: {
        ...this.state.currentGroup,
        studentsList: updatedStudents
      }
    });
  };

  handleStudentRemoving = id => () => {
    const { studentsList: students } = this.state.currentGroup;
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
    this.setState({
      currentGroup: {
        ...this.state.currentGroup,
        studentsList: updatedStudents
      }
    });
  };

  handleMessageAppearance = () => {
    this.setState(
      {
        showGroupsList: !this.state.showGroupsList,
        currentGroup: null,
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

  handleBackButtonClick = () => {
    this.setState({
      showGroupsList: !this.state.showGroupsList,
      currentGroup: null
    });
  };

  handleChangesSave = () => {
    const { currentGroup } = this.state;
    const { editGroup } = this.props;
    editGroup(currentGroup);
    this.handleMessageAppearance();
  };

  render() {
    const { groupTitles } = this.props;
    const titles = (
      <ul className="group-list">
        {groupTitles.map(title => (
          <li
            className="group-list__item"
            key={title}
            onClick={this.handleOnGroupClick(title)}
          >
            {title}
          </li>
        ))}
      </ul>
    );
    const groupsList = (
      <>
        <h1>List of groups:</h1>
        <Flash show={this.state.showMessage}></Flash>
        {groupTitles.length > 0 ? titles : <h1>Nothing to edit =(</h1>}
      </>
    );
    return this.state.showGroupsList ? (
      groupsList
    ) : (
      <>
        <h1 className="content_title">Start editing students:</h1>
        <div className="group-input">
          <label htmlFor="group-title">Group title: </label>
          <input
            type="text"
            id="group-title"
            onChange={this.handleGroupTitleChange}
            value={this.state.currentGroup.groupTitle}
          ></input>
        </div>
        <hr />
        {this.state.currentGroup.studentsList.map(student => {
          return (
            <NumberedInput
              key={student.number}
              number={student.number}
              name={student.name}
              placeholder="Hit enter to add new input field and click on number to remove field"
              adding={this.handleStudentAdding}
              editing={this.handleStudentNameChange(student.number)}
              removing={this.handleStudentRemoving(student.number)}
            />
          );
        })}
        <div className="btn-contol">
          <button className="btn" onClick={this.handleBackButtonClick}>
            Back to list
          </button>
          <button className="btn" onClick={this.handleChangesSave}>
            Confirm changes
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { groups } = state;
  const groupTitles = groups.map(group => group.groupTitle);
  const props = {
    groupTitles: groupTitles,
    groups
  };
  return props;
};

const mapActionsToProps = {
  editGroup: actions.editGroup
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(VeiwStudents);
