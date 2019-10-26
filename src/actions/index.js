export const ADD_GROUP = 'ADD_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP';
export const ADD_SUBJECTS = 'ADD_SUBJECTS';
export const EDIT_SUBJECTS = 'EDIT_SUBJECTS';

export const addGroup = (id, groupTitle, studentsList) => {
  return {
    type: ADD_GROUP,
    payload: {
      id,
      groupTitle,
      studentsList
    }
  };
};

export const editGroup = updatedGroup => {
  return {
    type: EDIT_GROUP,
    payload: {
      updatedGroup
    }
  };
};

export const addSubjects = subjects => {
  return {
    type: ADD_SUBJECTS,
    payload: {
      subjects
    }
  };
};

export const editSubjects = subjects => {
    return {
        type: EDIT_SUBJECTS,
        payload: {
            subjects
        }
    }
}
