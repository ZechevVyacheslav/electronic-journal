import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import '../../styles/Students.less';

class VeiwStudents extends Component {
  state = {
    showGroupsList: true,
    currentGroup: null
  };

  handleOnGroupClick = groupName => () => {
    const { groups } = this.props;
    const [currentGroup] = groups.filter(
      group => group.groupTitle === groupName
    );
    this.setState({ showGroupsList: !this.state.showGroupsList, currentGroup });
  };

  handleBackButtonClick = () => {
    this.setState({
      showGroupsList: !this.state.showGroupsList,
      currentGroup: null
    });
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
        {groupTitles.length > 0 ? titles : <h1>Nothing to edit =(</h1>}
      </>
    );
    return this.state.showGroupsList ? (
      groupsList
    ) : (
      <>
        <h1>List of group {this.state.currentGroup.groupTitle}</h1>
        <button className="btn" onClick={this.handleBackButtonClick}>Back to list</button>
        {this.state.currentGroup.studentsList.map(student => (
          <div className="numbered-list" key={student.number}>
            <div className="numbered-list__number">{student.number}</div>
            <div className="numbered-list__name-control">
              <span className="name-control__name">{student.name}</span>
            </div>
          </div>
        ))}
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

export default connect(mapStateToProps)(VeiwStudents);