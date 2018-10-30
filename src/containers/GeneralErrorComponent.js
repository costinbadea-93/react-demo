import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {dismissError} from "../actions/actionCreator";
import {connect} from 'react-redux'

class GeneralErrorComponent extends Component {
    render () {
        console.log(this.props.error.length)
        return(
            <div className={"alert alert-warning alert-dismissible fade " + (this.props.error.length > 0 ? "show" : "hide")} role="alert">
                <button type="button" className="close" aria-label="Close" onClick={() => this.props.dismissError()}>
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>{this.props.error}</strong>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      dismissError
    },dispatch)
};

export default connect(null,mapDispatchToProps)(GeneralErrorComponent);