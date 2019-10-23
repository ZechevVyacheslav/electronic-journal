import * as actions from '../actions/index';

const initialState = {
  groups: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_GROUP:
      const { groups } = state;
      const { id, groupTitle, studentsList } = action.payload;
      const updatedGroups = [...groups, { id, groupTitle, studentsList }];
      return {
        ...state,
        groups: updatedGroups
      };
    case actions.EDIT_GROUP:
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.payload.updatedGroup.id
            ? { ...action.payload.updatedGroup }
            : { ...group }
        )
      };
    default:
      return state;
  }
};

export default reducer;
