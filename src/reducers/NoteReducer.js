import {
    ADD_NOTE,
    DELETE_NOTE,
    MARK_AS_DONE,
    ADD_MULTIPLE_NOTES,
    UPDATE_NOTE_STATE_ON_EDITING,
    SET_SHOW_UPDATE_NOTE,
    UPDATE_NOTE_RESPONSE
} from "../actions/actionsTypes";

const initialToDoList = [];
const errorMessage = "";

const NotesReducer = (state = initialToDoList, action) => {
    switch (action.type) {
        case ADD_NOTE:
            return [...state, {
                id: action.id,
                noteText: action.noteText,
                noteDeadlineDay: action.noteDeadlineDay,
                noteDone:false,
                showUpdate:true
            }];
        case DELETE_NOTE:
            return state.filter(note => action.id !== parseInt(note.id));
        case MARK_AS_DONE:
            return state.map(note => action.id === note.id ? {...note, noteDone: !note.noteDone} : note);
        case ADD_MULTIPLE_NOTES:
            return state.concat(action.notesArray);
        case UPDATE_NOTE_STATE_ON_EDITING:
            return state.map(note => {
                if(note.id === action.id) {
                    if(action.inputType === "TEXT") {
                        return {
                            ...note,
                            noteText:action.value,
                            noteDeadlineDay: note.noteDeadlineDay
                        }
                    }else {
                        return {
                            ...note,
                            noteText:note.noteText,
                            noteDeadlineDay: action.noteDeadlineDay
                        }
                    }
                }else {
                    return note;
                }
            });
        case SET_SHOW_UPDATE_NOTE :
            return state.map(note => action.id === note.id? {...note, showUpdate: !note.showUpdate}: note);
        case UPDATE_NOTE_RESPONSE :
            return state.map(note => action.id === note.id? {...note, noteText: action.noteText, noteDeadlineDay: action.noteDeadlineDay, showUpdate: action.showUpdate} : note);
        default:
            return state;
    }
};

export default NotesReducer;


