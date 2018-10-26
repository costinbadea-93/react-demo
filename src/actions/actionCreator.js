import {ADD_NOTE, DELETE_NOTE, MARK_AS_DONE, UPDATE_NOTE_STATE_ON_EDITING, ADD_MULTIPLE_NOTES} from "./actionsTypes";

let noteIndex = 0;
export const addNote = (note) => ({
    type: ADD_NOTE,
    id: note.id,
    noteText: note.noteText,
    noteDeadlineDay: note.noteDeadlineDay,
    isDone: false
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

export const updateNoteOnEditing = (value, inputType,id) => ({
    type: UPDATE_NOTE_STATE_ON_EDITING,
    id:id,
    value: value,
    inputType: inputType
});
