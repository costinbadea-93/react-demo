import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addNote,deleteNote,createError} from "../actions/actionCreator";
import NotesListComponent from "./NotesListComponent";
import {fc} from "../utils/utils";
import GeneralErrorComponent from "./GeneralErrorComponent";

class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteText:'',
            noteDeadlineDay:''
        };
        this.updateNoteModel = this.updateNoteModel.bind(this);
        this.addNoteToState = this.addNoteToState.bind(this);
    }

    updateNoteModel (input) {
        const { target: { name, value } } = input;
        this.setState({ [name]: value })
    }

    addNoteToState() {
        if(this.state.noteText && this.state.noteDeadlineDay) {
            let note = {
                id:null,
                noteText: this.state.noteText,
                noteDeadlineDay: this.state.noteDeadlineDay
            };
            fc.makeRequest("POST","http://localhost:8181/note/addNote", note).then(resp => {
                this.props.addNote(JSON.parse(resp));
            });
        } else {
            this.props.createError("Please complete all the data fields")
        }
    }

    render() {
        return (
            <div className='main-form'>
                <div>
                    <div className="form-group col-sm-6">
                        <label>Note description</label>
                        <input type="text" className="form-control " name="noteText"
                               placeholder="Enter note description" onChange={this.updateNoteModel} value={this.state.noteText}/>
                    </div>
                    <div className="form-group col-sm-6">
                        <label>Deadline day</label>
                        <input type="text" className="form-control" name="noteDeadlineDay"
                               placeholder="Deadline Day" onChange={this.updateNoteModel} value={this.state.noteDeadlineDay}/>
                    </div>
                    <div className="col-sm-6">
                        <button className="btn btn-primary" onClick={() => this.addNoteToState()}>Add Note</button>
                    </div><br/>
                    <GeneralErrorComponent error = {this.props.error}/>
                    <NotesListComponent/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.errorHandlerReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addNote,
        deleteNote,
        createError
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MainComponent)