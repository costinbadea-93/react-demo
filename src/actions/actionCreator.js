import {ADD_NOTE, DELETE_NOTE, MARK_AS_DONE} from "./actionsTypes";

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