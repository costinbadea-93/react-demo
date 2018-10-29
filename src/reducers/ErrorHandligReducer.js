import {CREATE_ERROR} from "../actions/actionsTypes";


let initialErrorMessage = ""

const ErrorHandlingReducer = (state = initialErrorMessage, action) => {

    switch (action.type) {
        case CREATE_ERROR:
            state = action.error
            return state;
        default:
            return state;

    }

};

export default ErrorHandlingReducer;