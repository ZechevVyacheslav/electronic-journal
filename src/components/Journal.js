import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import uuid from 'uuid/v4';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NumberedInput from '../containers/NumberedtInput';
import '../styles/Journal.less';

class Journal extends Component {
  state = {
    weekIsEven: true,
    weekIsOdd: false,
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    monday: {
      evenWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ],
      oddWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ]
    },
    tuesday: {
      evenWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ],
      oddWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ]
    },
    wednesday: {
      evenWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ],
      oddWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ]
    },
    thursday: {
      evenWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ],
      oddWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ]
    },
    friday: {
      evenWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ],
      oddWeekLessons: [
        { id: uuid(), number: 1, title: '' },
        { id: uuid(), number: 2, title: '' },
        { id: uuid(), number: 3, title: '' },
        { id: uuid(), number: 4, title: '' }
      ]
    }
  };

  handleLessonTitleChange = (day, week, id) => e => {
    const lessons = this.state[day][week];
    const updatedLessons = lessons.map(lesson => {
      return lesson.id === id ? { ...lesson, title: e.target.value } : lesson;
    });
    const updatedDay = { ...this.state[day], [week]: updatedLessons };
    this.setState({ [day]: updatedDay });
  };

  handleWeekToggle = () => {
    console.log(this.state);
    this.setState({
      weekIsEven: !this.state.weekIsEven,
      weekIsOdd: !this.state.weekIsOdd
    });
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
                <NumberedInput
                  key={lesson.id}
                  number={lesson.number}
                  name={lesson.title}
                  editing={this.handleLessonTitleChange(
                    day,
                    'evenWeekLessons',
                    lesson.id
                  )}
                />
              ))
            : this.state[day].oddWeekLessons.map(lesson => (
                <NumberedInput
                  key={lesson.id}
                  number={lesson.number}
                  name={lesson.title}
                  editing={this.handleLessonTitleChange(
                    day,
                    'oddWeekLessons',
                    lesson.id
                  )}
                />
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
        <span>Even week</span>
        <div className="tooltip">
          {generateIcon(faQuestionCircle)}
          <span className="tooltiptext">Click to change week</span>
        </div>
      </div>
    ) : (
      <div className="odd-week">
        <span>Odd week</span>
        <div className="tooltip">
          {generateIcon(faQuestionCircle)}
          <span className="tooltiptext">Click to change week</span>
        </div>
      </div>
    );
    return (
      <>
        <h1 onClick={this.handleWeekToggle}>{currentWeek}</h1>
        <div className="journal-control">{timetable}</div>
        <button className="btn">Next step</button>
      </>
    );
  }
}

export default Journal;
