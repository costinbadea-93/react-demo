import React, {Component} from 'react';
import {connect} from 'react-redux'
import {addMultipleNotes, deleteNote, markAsDone, updateNoteOnEditing, showUpdateNote, updateNoteResponse} from "../actions/actionCreator";
import {bindActionCreators} from "redux";
import {fc} from "../utils/utils";

class NotesListComponent extends Component {
    constructor(props) {
        super(props);
        this.deleteNote = this.deleteNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.updateNoteOnChangeById = this.updateNoteOnChangeById.bind(this);
        this.performNoteUpdate = this.performNoteUpdate.bind(this);
    }

    componentDidMount() {
        fc.makeRequest('GET', 'http://localhost:8181/note/getNotes')
            .then(function (datums) {
                this.props.addMultipleNotes(JSON.parse(datums));
            }.bind(this))
            .catch(function (err) {
                console.error(err);
            });
    }

    performNoteUpdate(id, noteShowUpdate, noteDone) {
        let markAsDone = noteDone !== undefined;
        let data = {
            id:id,
            noteText: this.refs[id].childNodes[0].value,
            noteDeadlineDay: this.refs[id].childNodes[1].value,
            showUpdate: noteShowUpdate,
        };

        if(markAsDone) {
            data.noteDone = noteDone;
            this.props.markAsDone(id);
        }else {
            this.props.showUpdateNote(id);
            this.refs[id].childNodes.forEach(inputItem => inputItem.disabled = !inputItem.disabled);
        }

        fc.makeRequest("POST","http://localhost:8181/note/addNote", data).then(resp => {
            this.props.updateNoteResponse(JSON.parse(resp));
        });
    }

    editNote(id) {
        this.props.showUpdateNote(id);
        this.refs[id].childNodes.forEach(inputItem => inputItem.disabled = !inputItem.disabled);
    }

    updateNoteOnChangeById(value, inputType, id) {
        this.props.updateNoteOnEditing(value, inputType, id);

    }

    deleteNote(id) {
        fc.makeRequest("DELETE", "http://localhost:8181/note/deleteNote/" + id).then(
            this.props.deleteNote(id)
        )
    }

    render() {
        return (
            <div className="main-listing-container container">
                {this.props.notes.map(
                    note => (<div className="col-sm-12" key={note.id}>
                        <div className="row">
                            <div ref={note.id}>
                                <input type="text"
                                       onChange={(e) => this.updateNoteOnChangeById(e.target.value, "TEXT", note.id)}
                                       className="col-sm-4" style={{
                                    textDecoration: note.noteDone ? "line-through" : "none",
                                }} value={note.noteText} disabled={true}>
                                </input>
                                <input type="text"
                                       onChange={(e) => this.updateNoteOnChangeById(e.target.value, "DEADLINE", note.id)}
                                       className="col-sm-3" style={{
                                    textDecoration: note.noteDone ? "line-through" : "none",
                                }} value={note.noteDeadlineDay} disabled={true}>
                                </input>
                            </div>
                            <div className="col-sm-1 spacer"></div>
                            <button style={{
                                display: note.showUpdate ? "inline-block" : "none"
                            }} className="btn btn-success pull-left"
                                    onClick={() => {
                                        this.editNote(note.id);
                                    }}>Edit Note
                            </button>
                            <button style={{
                                display: note.showUpdate ? "none" : "inline-block"
                            }} className="btn btn-success pull-left"
                                    onClick={() => {
                                        this.performNoteUpdate(note.id, !note.showUpdate);
                                    }}>Update note
                            </button>
                            <div className="col-sm-1 spacer"></div>
                            <button className="btn btn-warning pull-left"
                                    onClick={() => this.deleteNote(note.id)}>Delete Note
                            </button>
                            <div className="col-sm-1 spacer"></div>
                            <button className="btn btn-primary pull-left"
                                    onClick={() => this.performNoteUpdate(note.id, note.showUpdate, !note.noteDone)}>Mark as done
                            </button>
                        </div>
                        <br/>
                    </div>)
                )}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        notes: state.notesReducer
    }
};

const mapPropsToDispatch = (dispatch) => {
    return bindActionCreators({
        deleteNote,
        markAsDone,
        addMultipleNotes,
        updateNoteOnEditing,
        showUpdateNote,
        updateNoteResponse
    }, dispatch)
};

export default connect(mapStateToProps, mapPropsToDispatch)(NotesListComponent)