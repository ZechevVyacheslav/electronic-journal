export const ADD_RANDOM_NUMBER = 'ADD_RANDOM_NUMBER';

export const addRandomNumber = () => {
    return {
        type: ADD_RANDOM_NUMBER,
        payload: {
            num: Math.floor(Math.random() * 10)
        }
    }
}