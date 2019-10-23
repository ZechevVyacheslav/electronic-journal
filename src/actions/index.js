export const ADD_GROUP = 'ADD_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP'

export const addGroup = (id, groupTitle, studentsList) => {
    return {
        type: ADD_GROUP,
        payload: {
            id,
            groupTitle,
            studentsList
        }
    }
}

export const editGroup = updatedGroup => {
    return {
        type: EDIT_GROUP,
        payload: {
            updatedGroup
        }
    }
}