import {
    ADD_NOTE,
    DELETE_NOTE,
    MARK_AS_DONE,
    UPDATE_NOTE_STATE_ON_EDITING,
    ADD_MULTIPLE_NOTES,
    SET_SHOW_UPDATE_NOTE,
    UPDATE_NOTE_RESPONSE,
    CREATE_ERROR,
    DISMISS_ERROR
} from "./actionsTypes";

let noteIndex = 0;
export const addNote = (note) => ({
    type: ADD_NOTE,
    id: note.id,
    noteText: note.noteText,
    noteDeadlineDay: note.noteDeadlineDay,
    noteDone: false
});

export const deleteNote = id => ({
    type: DELETE_NOTE,
    id: id
});

export const markAsDone = id => ({
    type: MARK_AS_DONE,
    id: id
});

export const addMultipleNotes = notesArray => ({
    type: ADD_MULTIPLE_NOTES,
    notesArray: notesArray
});

export const updateNoteOnEditing = (value, inputType, id) => ({
    type: UPDATE_NOTE_STATE_ON_EDITING,
    id: id,
    value: value,
    inputType: inputType
});

export const updateNoteResponse = (note) => ({
    type: UPDATE_NOTE_RESPONSE,
    note: note
});

export const showUpdateNote = (id) => ({
    id: id,
    type: SET_SHOW_UPDATE_NOTE
});

export const createError = error => ({
    error: error,
    type: CREATE_ERROR
});

export const dismissError = () => ({
   type : DISMISS_ERROR
});