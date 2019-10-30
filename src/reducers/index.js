import * as actions from '../actions/index';
import { combineReducers } from 'redux';

const groups = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_GROUP: {
      const { id, groupTitle, studentsList } = action.payload;
      return [...state, { id, groupTitle, studentsList }];
    }
    case actions.EDIT_GROUP:
      return [
        ...state.map(group =>
          group.id === action.payload.updatedGroup.id
            ? { ...action.payload.updatedGroup }
            : { ...group }
        )
      ];
    case actions.TOGGLE_STUDENTS_ATTENDANCE: {
      const {
        groupTitle,
        number,
        weekNumber,
        dayTitle,
        lessonNumber,
        halfPair
      } = action.payload;
      const updatedState = state.map(group => {
        return group.groupTitle != groupTitle
          ? { ...group }
          : {
              ...group,
              studentsList: group.studentsList.map(student => {
                return student.number != number
                  ? { ...student }
                  : {
                      ...student,
                      attendance: student.attendance.map(week => {
                        return week.weekNumber != weekNumber
                          ? { ...week }
                          : {
                              ...week,
                              weekAttendance: week.weekAttendance.map(day => {
                                return day.dayTitle != dayTitle
                                  ? { ...day }
                                  : {
                                      ...day,
                                      dayAttendance: day.dayAttendance.map(
                                        lesson => {
                                          return lesson.lessonNumber !=
                                            lessonNumber
                                            ? { ...lesson }
                                            : {
                                                ...lesson,
                                                [halfPair]: !lesson[halfPair]
                                              };
                                        }
                                      )
                                    };
                              })
                            };
                      })
                    };
              })
            };
      });
      return updatedState;
    }
    default:
      return state;
  }
};

const subjects = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_SUBJECTS:
      return [...state, ...action.payload.subjects];
    case actions.EDIT_SUBJECTS:
      return [...action.payload.subjects];
    default:
      return state;
  }
};

const journals = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_JOURNAL:
      return [
        ...state,
        {
          info: {
            id: action.payload.id,
            groupTitle: action.payload.groupTitle,
            semester: action.payload.semester,
            year: action.payload.year
          },
          timetable: action.payload.timetable
        }
      ];
    case actions.EDIT_JOURNAL:
      const editedJournal = state.map(journal =>
        journal.info.id === action.payload.id
          ? action.payload.journal
          : { ...journal }
      );
      return editedJournal;
    default:
      return state;
  }
};

export default combineReducers({ groups, subjects, journals });
