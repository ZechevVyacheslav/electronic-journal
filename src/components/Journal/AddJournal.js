import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import uuid from 'uuid/v4';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NumberedInput from '../../containers/NumberedtInput';
import '../../styles/Journal.less';
import MyAutosuggest from '../MyAutosuggest';
import Flash from '../../containers/Flash';

const generateLessonsFields = () => [
  { id: uuid(), number: 1, title: '' },
  { id: uuid(), number: 2, title: '' },
  { id: uuid(), number: 3, title: '' },
  { id: uuid(), number: 4, title: '' }
];

const generateDayFields = () => {
  return {
    evenWeekLessons: generateLessonsFields(),
    oddWeekLessons: generateLessonsFields()
  };
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class AddJournal extends Component {
  state = {
    groupTitle: '',
    semester: '',
    year: '',
    weekIsEven: true,
    weekIsOdd: false,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    id: uuid(),
    monday: generateDayFields(),
    tuesday: generateDayFields(),
    wednesday: generateDayFields(),
    thursday: generateDayFields(),
    friday: generateDayFields()
  };

  handleLessonTitleChange = (day, week, id) => (_, newValue) => {
    const lessons = this.state[day][week];
    const updatedLessons = lessons.map(lesson => {
      return lesson.id === id ? { ...lesson, title: newValue } : lesson;
    });
    const updatedDay = { ...this.state[day], [week]: updatedLessons };
    this.setState({ [day]: updatedDay });
  };

  handleWeekToggle = () => {
    this.setState({
      weekIsEven: !this.state.weekIsEven,
      weekIsOdd: !this.state.weekIsOdd
    });
  };

  handleGroupTitleChange = (id, newValue) => {
    this.setState({ groupTitle: newValue });
  };

  handleSemesterChange = e => {
    const updatedSemester = e.target.value;
    this.setState({ semester: updatedSemester });
  };

  handleYearChange = e => {
    const updatedYear = e.target.value;
    this.setState({ year: updatedYear });
  };

  handleMessageAppearance = () => {
    this.setState(
      {
        groupTitle: '',
        semester: '',
        year: '',
        id: uuid(),
        monday: generateDayFields(),
        tuesday: generateDayFields(),
        wednesday: generateDayFields(),
        thursday: generateDayFields(),
        friday: generateDayFields(),
        showMessage: !this.state.showMessage
      },
      () => {
        let message;
        wait(1)
          .then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

  handleJournalAdding = () => {
    const { monday, tuesday, wednesday, thursday, friday } = this.state;
    const timetable = { monday, tuesday, wednesday, thursday, friday };
    const { id, groupTitle, semester, year } = this.state;
    const { addJournal } = this.props;
    addJournal(id, groupTitle, semester, year, timetable);
    this.handleMessageAppearance()
  };

  render() {
    const { days } = this.state;
    const timetable = days.map((dayTitle, index) => {
      const day = dayTitle.toLowerCase();
      return (
        <div className="journal-week-control" key={index}>
          <h2>{dayTitle}</h2>
          {this.state.weekIsEven
            ? this.state[day].evenWeekLessons.map(lesson => (
                <NumberedInput key={lesson.id} number={lesson.number}>
                  <MyAutosuggest
                    id={lesson.id}
                    value={lesson.title}
                    array={this.props.subjects.map(el => ({ name: el.title }))}
                    onChange={this.handleLessonTitleChange(
                      day,
                      'evenWeekLessons',
                      lesson.id
                    )}
                  />
                </NumberedInput>
              ))
            : this.state[day].oddWeekLessons.map(lesson => (
                <NumberedInput key={lesson.id} number={lesson.number}>
                  <MyAutosuggest
                    id={lesson.id}
                    value={lesson.title}
                    array={this.props.subjects.map(el => ({ name: el.title }))}
                    onChange={this.handleLessonTitleChange(
                      day,
                      'oddWeekLessons',
                      lesson.id
                    )}
                  />
                </NumberedInput>
              ))}
        </div>
      );
    });
    const generateIcon = iconTitle => {
      return (
        <FontAwesomeIcon
          icon={iconTitle}
          style={{ marginLeft: '10px', fontSize: '24px' }}
        />
      );
    };
    const currentWeek = this.state.weekIsEven ? (
      <div className="even-week">
        <span onClick={this.handleWeekToggle} className="week-title">
          Even week
          <div className="tooltip">
            {generateIcon(faQuestionCircle)}
            <span className="tooltiptext">Click to change week</span>
          </div>
        </span>
      </div>
    ) : (
      <div className="odd-week">
        <span onClick={this.handleWeekToggle} className="week-title">
          Odd week
          <div className="tooltip">
            {generateIcon(faQuestionCircle)}
            <span className="tooltiptext">Click to change week</span>
          </div>
        </span>
      </div>
    );
    return (
      <>
        <h1 className="content_title">Enter journal info:</h1>
        <div className="journal-input">
          <div className="journal-input__element">
            <label htmlFor="group-title">Group title: </label>
            <MyAutosuggest
              id="group-title"
              placeholder="LL-NNN"
              value={this.state.groupTitle}
              array={this.props.groups.map(el => ({ name: el.groupTitle }))}
              onChange={this.handleGroupTitleChange}
            />
          </div>
          <div className="journal-input__element">
            <label htmlFor="semester">Semester: </label>
            <input
              type="text"
              id="semester"
              placeholder="1 - 12"
              onChange={this.handleSemesterChange}
              value={this.state.semester}
            ></input>
          </div>
          <div className="journal-input__element">
            <label htmlFor="year">Year: </label>
            <input
              type="text"
              id="year"
              placeholder="YYYY"
              onChange={this.handleYearChange}
              value={this.state.year}
            ></input>
          </div>
        </div>
        <hr />
        <h1>{currentWeek}</h1>
        <div className="journal-control">{timetable}</div>
        <Flash show={this.state.showMessage}></Flash>
        <button className="btn" onClick={this.handleJournalAdding}>
          Create
        </button>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { groups, subjects } = state;
  const props = {
    groups,
    subjects
  };
  return props;
};

const mapActionsToProps = {
  addJournal: actions.addJournal
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AddJournal);
