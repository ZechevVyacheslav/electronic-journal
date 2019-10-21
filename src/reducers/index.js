import * as actions from '../actions/index';

const initialState = {
  groups: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_GROUP:
      const { groups } = state;
      const { groupTitle, studentsList } = action.payload;
      const updatedGroups = [...groups, {groupTitle, studentsList}]
      return {
        ...state,
        groups: updatedGroups
      };
    default:
      return state;
  }
};

export default reducer;
