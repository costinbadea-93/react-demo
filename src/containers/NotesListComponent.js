import React, {Component} from 'react';
import {connect} from 'react-redux'
import {deleteNote, markAsDone} from "../actions/actionCreator";
import {bindActionCreators} from "redux";

let noteText;
let noteDeadline;
class NotesListComponent extends Component {
    constructor(props){
        super(props)
        this.updateTodoState = this.updateTodoState.bind(this);
    }

    updateTodoState(id, input) {
        console.log(id, input);
    }

    render() {
        return (
            <div className="main-listing-container container">
                {this.props.notes.map(
                    note => (<div className="col-sm-12" key={note.id}>
                        <div className="row">
                            <input type="text" onChange={(e)=> this.updateTodoState(note.id, e)} className="col-sm-2" style={{
                                textDecoration: note.isDone ? "line-through" : "none",
                            }} value={note.noteText} disabled={true} ref={(e)=>noteText = e}>
                                {/*<h5>{note.noteText}</h5>*/}
                            </input>
                            <input className="col-sm-2" style={{
                                textDecoration: note.isDone ? "line-through" : "none",
                            }} value={note.noteDeadlineDay} disabled={true} ref={(e)=>noteDeadline = e}>
                                {/*<h5>{note.noteDeadlineDay}</h5>*/}
                            </input>
                            <div className="col-sm-1 spacer"></div>
                            <button className="btn btn-success pull-left"
                                    onClick={()=> {noteText.disabled=!noteText.disabled; noteDeadline.disabled=!noteDeadline.disabled}}>Update note
                            </button>
                            <div className="col-sm-1 spacer"></div>
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