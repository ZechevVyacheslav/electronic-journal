import * as actions from '../actions/index';
import { combineReducers } from 'redux';

// const initialState = {
//   groups: [],
//   subjects: []
// };

const groups = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_GROUP:
      const { id, groupTitle, studentsList } = action.payload;
      return [...state, { id, groupTitle, studentsList }];
    case actions.EDIT_GROUP:
      return [
        ...state.map(group =>
          group.id === action.payload.updatedGroup.id
            ? { ...action.payload.updatedGroup }
            : { ...group }
        )
      ];
    default:
      return state;
  }
};

const subjects = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_SUBJECTS:
      return [...state, ...action.payload.subjects];
    default:
      return state;
  }
};

export default combineReducers({ groups, subjects });
