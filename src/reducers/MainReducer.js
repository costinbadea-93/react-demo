import { combineReducers } from 'redux'
import notesReducer from "./NoteReducer";
import errorHandlerReducer from "./ErrorHandligReducer";


export default combineReducers({
    notesReducer,
    errorHandlerReducer
})