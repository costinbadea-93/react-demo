import React, {Component} from 'react'

class GeneralErrorComponent extends Component {
    render () {
        return(
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>{this.props.error}</strong>
            </div>
        )
    }
}

export default GeneralErrorComponent;