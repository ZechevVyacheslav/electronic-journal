import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

import '../../styles/Students.less';
import MyCheckbox from '../../containers/MyCheckbox';
import MySelect from '../../containers/MySelect';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const daysTitles = days.map(day => (
  <div className="days-columns__day" key={day}>
    {day}
  </div>
));
let lessons = days.map(day => (
  <div className="lessons-columns__lessons-group" key={day}>
    <div className="lessons-group__lesson">1</div>
    <div className="lessons-group__lesson">2</div>
    <div className="lessons-group__lesson">3</div>
    <div className="lessons-group__lesson">4</div>
  </div>
));

const isEven = num => num % 2;

class ViewJournal extends Component {
  state = {
    showJournalsTitles: true,
    currentJournal: null,
    currentWeek: 0
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

  handleAttendanceChange = (
    groupTitle,
    number,
    weekNumber,
    dayTitle,
    lessonNumber,
    halfPair
  ) => e => {
    const { toggleStudentsAttendance } = this.props;
    toggleStudentsAttendance(
      groupTitle,
      number,
      weekNumber,
      dayTitle,
      lessonNumber,
      halfPair
    );
  };

  handleWeekChange = e => {
    this.setState({ currentWeek: e.target.value });
  };

  handleBackButtonClick = () => {
    this.setState({
      showJournalsTitles: !this.state.showJournalsTitles,
      currentJournal: null
    });
  };

  render() {
    const { journals, groups, subjects } = this.props;
    const { currentJournal } = this.state;

    const currentGroup = currentJournal
      ? groups.filter(
          group => group.groupTitle === currentJournal.info.groupTitle
        )
      : [];

    const currentStudents =
      currentGroup.length > 0 ? currentGroup[0].studentsList : [];

    let students = null;

    if (currentStudents.length > 0 && this.state.currentWeek != 0) {
      const { currentWeek } = this.state;
      const infoAboutStudenstAtCurrentWeek = currentStudents.map(student => ({
        ...student,
        attendance: student.attendance.filter(
          ({ weekNumber }) => weekNumber == currentWeek
        )[0]
      }));

      students = infoAboutStudenstAtCurrentWeek.map(student => {
        const { weekAttendance } = student.attendance;
        const attendance = weekAttendance.map(day => {
          const { dayAttendance } = day;
          return dayAttendance.map(lesson => {
            return (
              <div
                className="lessons-group__lesson"
                key={`${student.number}-${lesson.lessonNumber}-${day.dayTitle}`}
              >
                <div className="lesson__attendance">
                  <MyCheckbox
                    wasAbsent={lesson.wasAbsentOnFirstHalfPair}
                    change={this.handleAttendanceChange(
                      currentJournal.info.groupTitle,
                      student.number,
                      this.state.currentWeek,
                      day.dayTitle,
                      lesson.lessonNumber,
                      'wasAbsentOnFirstHalfPair'
                    )}
                  />
                </div>
                <div className="lesson__attendance">
                  <MyCheckbox
                    wasAbsent={lesson.wasAbsentOnSecondHalfPair}
                    change={this.handleAttendanceChange(
                      currentJournal.info.groupTitle,
                      student.number,
                      this.state.currentWeek,
                      day.dayTitle,
                      lesson.lessonNumber,
                      'wasAbsentOnSecondHalfPair'
                    )}
                  />
                </div>
              </div>
            );
          });
        });
        return (
          <div className="journal-students" key={student.number}>
            <div className="journal-control__column-title">{`${student.number}. ${student.name}`}</div>
            <div className="journal-students__lessons-group">{attendance}</div>
          </div>
        );
      });
    }

    if (currentJournal && this.state.currentWeek != 0) {
      const { timetable } = currentJournal;
      const weekAccess = isEven(this.state.currentWeek)
        ? 'evenWeekLessons'
        : 'oddWeekLessons';

      lessons = days.map(day => {
        const dayField = day.toLowerCase();
        return (
          <div className="lessons-columns__lessons-group" key={day}>
            {timetable[dayField][weekAccess].map(({ number, title }) => (
              <div
                className="lessons-group__lesson"
                key={`${this.state.currentWeek}-${dayField}-${number}`}
              >
                <div className="tooltip">
                  {number}
                  <span className="tooltiptext">
                    {title.length > 0 ? title : 'Nothing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      });
    }

    const journal = (
      <div className="wrapper">
        <button className="btn" onClick={this.handleBackButtonClick}>
          Back to list
        </button>
        <MySelect
          week={this.state.currentWeek}
          change={this.handleWeekChange}
        />
        <div className="journal-view">
          <div className="journal-control__column-title">Students</div>
          <div className="journal-control__days-columns">{daysTitles}</div>
          <div className="journal-control__lessons-columns">{lessons}</div>
        </div>
        {students}
      </div>
    );

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
        <h1>Pick journal for viewing</h1>
        {journals.length > 0 ? (
          titles
        ) : (
          <h1>
            Nothing to show <span role="img">😔</span>
          </h1>
        )}
      </>
    );

    return this.state.showJournalsTitles ? journalsTitles : journal;
  }
}

const mapStateToProps = state => {
  const { groups, subjects, journals } = state;
  const props = {
    groups,
    subjects,
    journals
  };
  return props;
};

const mapActionsToProps = {
  toggleStudentsAttendance: actions.toggleStudentsAttendance
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ViewJournal);
