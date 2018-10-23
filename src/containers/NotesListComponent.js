import React, {Component} from 'react';
import {connect} from 'react-redux'
import {deleteNote, markAsDone} from "../actions/actionCreator";
import {bindActionCreators} from "redux";

class NotesListComponent extends Component {

    render() {
        return (
            <div className="main-listing-container container">
                {this.props.notes.map(
                    note => (<div className="col-sm-12" key={note.id}>
                        <div className="row">
                            <div className="col-sm-2" style={{
                                textDecoration: note.isDone ? "line-through" : "none",
                            }}>
                                <h5>{note.noteText}</h5>
                            </div>
                            <div className="col-sm-3" style={{
                                textDecoration: note.isDone ? "line-through" : "none",
                            }}>
                                <h5>{note.noteDeadlineDay}</h5>
                            </div>
                            <button className="btn btn-warning pull-left"
                                    onClick={() => this.props.deleteNote(note.id)}>Delete Note
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
        markAsDone
    }, dispatch)
};

export default connect(mapStateToProps, mapPropsToDispatch)(NotesListComponent)