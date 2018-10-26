import React, {Component} from 'react';
import {connect} from 'react-redux'
import {addMultipleNotes, deleteNote, markAsDone, updateNoteOnEditing} from "../actions/actionCreator";
import {bindActionCreators} from "redux";
import {fc} from "../utils/utils";

let noteText;
let noteDeadline;

class NotesListComponent extends Component {
    constructor(props) {
        super(props);
        this.deleteNote = this.deleteNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.updateNoteOnChangeById = this.updateNoteOnChangeById.bind(this);
        this.state = {
            isUpdateShown: false
        }
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

    updateNote(id) {
        let data = {
            noteText: this.refs[id].childNodes[0].value,
            noteDeadline: this.refs[id].childNodes[1].value
        };
      this.refs[id].childNodes.forEach(inputItem => inputItem.disabled = !inputItem.disabled);
    }

    updateNoteOnChangeById(value, inputType,id) {
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
                            <div  ref={note.id}>
                                <input type="text" onChange={(e) => this.updateNoteOnChangeById(e.target.value,"TEXT", note.id)}
                                       className="col-sm-4" style={{
                                    textDecoration: note.isDone ? "line-through" : "none",
                                }} value={note.noteText} disabled={true}>
                                    {/*<h5>{note.noteText}</h5>*/}
                                </input>
                                <input className="col-sm-3" style={{
                                    textDecoration: note.isDone ? "line-through" : "none",
                                }} value={note.noteDeadlineDay} disabled={true}>
                                    {/*<h5>{note.noteDeadlineDay}</h5>*/}
                                </input>
                            </div>
                            <div className="col-sm-1 spacer"></div>
                            <button className="btn btn-success pull-left"
                                    onClick={() => {
                                        this.updateNote(note.id)
                                    }}>Update note
                            </button>
                            <div className="col-sm-1 spacer"></div>
                            <button className="btn btn-warning pull-left"
                                    onClick={() => this.deleteNote(note.id)}>Delete Note
                            </button>
                            <div className="col-sm-1 spacer"></div>
                            <button className="btn btn-primary pull-left"
                                    onClick={() => this.props.markAsDone(note.id)}>Mark as done
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
        updateNoteOnEditing
    }, dispatch)
};

export default connect(mapStateToProps, mapPropsToDispatch)(NotesListComponent)