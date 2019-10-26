import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import '../../styles/Subjects.less';

import NumberedInput from '../../containers/NumberedtInput';
import Flash from '../../containers/Flash';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class EditSubjects extends Component {
  state = {
    subjects: this.props.subjects,
    showMessage: false
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

  handleMessageAppearance = () => {
    this.setState(
      {
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

  handleRollback = () => {
    this.setState({
      subjects: this.props.subjects
    });
  };

  handleChangesSave = () => {
    const { subjects } = this.state;
    const { editSubjects } = this.props;
    editSubjects(subjects);
    this.handleMessageAppearance();
  };

  render() {
    if (this.state.subjects.length < 1) {
      return <h1>Nothith to edit <span role="img">😔</span></h1>;
    }
    return (
      <>
        <h1 className="content_title">Start editing subjects:</h1>
        <hr />
        {this.state.subjects.map(subject => {
          return (
            <NumberedInput
              key={subject.number}
              number={subject.number}
              name={subject.title}
              placeholder="Click on number to remove field"
              editing={this.handleSubjectNameChange(subject.number)}
              removing={this.handleSubjectRemoving(subject.number)}
            />
          );
        })}
        <Flash show={this.state.showMessage}></Flash>
        <div className="btn-contol">
          <button className="btn" onClick={this.handleRollback}>
            Rollback changes
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
  const { subjects } = state;
  const numberedSubjects = subjects.map((subject, index) => ({
    ...subject,
    number: index + 1
  }));
  const props = {
    subjects: numberedSubjects
  };
  return props;
};

const mapActionsToProps = {
  editSubjects: actions.editSubjects
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditSubjects);
