import * as actions from '../actions/index';

const initialState = {
  numbers: [1, 2, 3]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_RANDOM_NUMBER:
      return {
        ...state,
        numbers: [...state.numbers, action.payload.num]
      };
    default:
      return state;
  }
};

export default reducer;
