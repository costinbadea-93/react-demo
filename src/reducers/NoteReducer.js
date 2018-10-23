import {ADD_NOTE,DELETE_NOTE, MARK_AS_DONE} from "../actions/actionsTypes";

const initialToDoList = [];

const NotesReducer = (state = initialToDoList, action) => {
    switch (action.type) {
        case ADD_NOTE:
            return [...state, {
                id: action.id,
                noteText: action.noteText,
                noteDeadlineDay: action.noteDeadlineDay,
                isDone:false
            }];
        case DELETE_NOTE:
            return state.filter(note => action.id !== parseInt(note.id));
        case MARK_AS_DONE:
            return state.map(note => action.id === note.id ? {...note, isDone: !note.isDone} : note);
        default:
            return state;
    }
};

export default NotesReducer;


