export const ADD_GROUP = 'ADD_GROUP';

export const addGroup = (groupTitle, studentsList) => {
    return {
        type: ADD_GROUP,
        payload: {
            groupTitle,
            studentsList
        }
    }
}