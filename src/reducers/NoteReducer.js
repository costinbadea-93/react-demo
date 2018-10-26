import {ADD_NOTE,DELETE_NOTE, MARK_AS_DONE,ADD_MULTIPLE_NOTES, UPDATE_NOTE_STATE_ON_EDITING} from "../actions/actionsTypes";

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
        case ADD_MULTIPLE_NOTES:
            return state.concat(action.notesArray);
        case UPDATE_NOTE_STATE_ON_EDITING:
            let index = state.findIndex(note => note.id === action.id);
            let currentNote = state.filter(note => note.id === action.id)[0];
            if (action.inputType === "TEXT") {
                currentNote.noteText = action.value;
            }
            state[index] = {
                ...state[index],
                noteText : action.value
            }
            return{
                state
            }
        default:
            return state;
    }
};

export default NotesReducer;


