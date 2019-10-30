import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/Journal.less';

import NumberedInput from '../../containers/NumberedtInput';
import Flash from '../../containers/Flash';
import MyAutosuggest from '../MyAutosuggest';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class EditJournal extends Component {
  state = {
    showJournalsTitles: true,
    currentJournal: null,
    showMessage: false,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    weekIsEven: true,
    weekIsOdd: false
  };

  handleOnJournalClick = (groupTitle, semester, year) => () => {
    const { journals } = this.props;
    const [currentJournal] = journals.filter(
      ({ info }) =>
        info.groupTitle === groupTitle &&
        info.semester === semester &&
        info.year === year
    );
    this.setState({
      showJournalsTitles: !this.state.showJournalsTitles,
      currentJournal
    });
  };

  handleWeekToggle = () => {
    this.setState({
      weekIsEven: !this.state.weekIsEven,
      weekIsOdd: !this.state.weekIsOdd
    });
  };

  handleGroupTitleChange = (id, newValue) => {
    const { currentJournal } = this.state;
    this.setState({
      currentJournal: {
        ...currentJournal,
        info: { ...currentJournal.info, groupTitle: newValue }
      }
    });
  };

  handleSemesterChange = e => {
    const updatedSemester = e.target.value;
    const { currentJournal } = this.state;
    this.setState({
      currentJournal: {
        ...currentJournal,
        info: { ...currentJournal.info, semester: updatedSemester }
      }
    });
  };

  handleYearChange = e => {
    const updatedYear = e.target.value;
    const { currentJournal } = this.state;
    this.setState({
      currentJournal: {
        ...currentJournal,
        info: { ...currentJournal.info, year: updatedYear }
      }
    });
  };

  handleLessonTitleChange = (day, week, id) => (_, newValue) => {
    const { timetable } = this.state.currentJournal;
    const { currentJournal } = this.state;
    const lessons = timetable[day][week];
    const updatedLessons = lessons.map(lesson => {
      return lesson.id === id ? { ...lesson, title: newValue } : lesson;
    });
    const updatedTimetable = {
      ...timetable,
      [day]: { ...timetable[day], [week]: updatedLessons }
    };
    const updatedDay = { ...this.state[day], [week]: updatedLessons };
    this.setState({
      currentJournal: {
        ...currentJournal,
        timetable: updatedTimetable
      }
    });
  };

  handleMessageAppearance = () => {
    this.setState(
      {
        showJournalsTitles: !this.state.showJournalsTitles,
        currentJournal: null,
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
      showJournalsTitles: !this.state.showJournalsTitles,
      currentJournal: null
    });
  };

  handleChangesSave = () => {
    const { currentJournal } = this.state;
    const { editJournal } = this.props;
    editJournal(currentJournal.info.id, currentJournal);
    this.handleMessageAppearance();
  };

  render() {
    const { journals } = this.props;
    const titlesInfos = journals.map(journal => ({ ...journal.info }));
    const titles = (
      <ul className="titles-list">
        {titlesInfos.map(({ groupTitle, semester, year }) => (
          <li
            className="titles-list__item"
            key={`${groupTitle}/${semester}/${year}`}
            onClick={this.handleOnJournalClick(groupTitle, semester, year)}
          >
            {`${groupTitle} / ${semester} semester / ${year} year`}
          </li>
        ))}
      </ul>
    );
    const journalsTitles = (
      <>
        <h1>Pick journal for editing</h1>
        <Flash show={this.state.showMessage}></Flash>
        {journals.length > 0 ? (
          titles
        ) : (
          <h1>
            Nothing to edit <span role="img">😔</span>
          </h1>
        )}
      </>
    );

    const { days } = this.state;
    const { timetable: journalTimetable } = this.state.currentJournal
      ? this.state.currentJournal
      : { timetable: {} };
    const timetable =
      Object.values(journalTimetable).length < 1
        ? null
        : days.map((dayTitle, index) => {
            const day = dayTitle.toLowerCase();
            return (
              <div className="journal-week-control" key={index}>
                <h2>{dayTitle}</h2>
                {this.state.weekIsEven
                  ? journalTimetable[day].evenWeekLessons.map(lesson => (
                      <NumberedInput key={lesson.id} number={lesson.number}>
                        <MyAutosuggest
                          id={lesson.id}
                          value={lesson.title}
                          array={this.props.subjects.map(el => ({
                            name: el.title
                          }))}
                          onChange={this.handleLessonTitleChange(
                            day,
                            'evenWeekLessons',
                            lesson.id
                          )}
                        />
                      </NumberedInput>
                    ))
                  : journalTimetable[day].oddWeekLessons.map(lesson => (
                      <NumberedInput key={lesson.id} number={lesson.number}>
                        <MyAutosuggest
                          id={lesson.id}
                          value={lesson.title}
                          array={this.props.subjects.map(el => ({
                            name: el.title
                          }))}
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

    return this.state.showJournalsTitles ? (
      journalsTitles
    ) : (
      <>
        <h1 className="content_title">Start editing journal:</h1>
        <div className="journal-input">
          <div className="journal-input__element">
            <label htmlFor="group-title">Group title: </label>
            <MyAutosuggest
              id="group-title"
              placeholder="LL-NNN"
              value={this.state.currentJournal.info.groupTitle}
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
              value={this.state.currentJournal.info.semester}
            ></input>
          </div>
          <div className="journal-input__element">
            <label htmlFor="year">Year: </label>
            <input
              type="text"
              id="year"
              placeholder="YYYY"
              onChange={this.handleYearChange}
              value={this.state.currentJournal.info.year}
            ></input>
          </div>
        </div>
        <hr />
        <h1>{currentWeek}</h1>
        <div className="journal-control">{timetable}</div>
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
  const { journals, groups, subjects } = state;
  const props = {
    journals,
    groups,
    subjects
  };
  return props;
};

const mapActionsToProps = {
  editJournal: actions.editJournal
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditJournal);
