import {ADD_NOTE, DELETE_NOTE, MARK_AS_DONE, UPDATE_NOTE_STATE_ON_EDITING} from "./actionsTypes";

let noteIndex = 0;
export const addNote = (noteText, noteDeadlineDay) => ({
    type:ADD_NOTE,
    id: noteIndex ++,
    noteText : noteText,
    noteDeadlineDay: noteDeadlineDay,
    isDone:false
});

export const deleteNote = id => ({
    type: DELETE_NOTE,
    id:id
});

export const markAsDone = id => ({
   type:MARK_AS_DONE,
   id:id
});

export const updateNoteOnEditing = (id, newText, newDeadline) => ({
    id:id,
    type:UPDATE_NOTE_STATE_ON_EDITING,
    noteText: newText,
    noteDeadlineDay: newDeadline
});
