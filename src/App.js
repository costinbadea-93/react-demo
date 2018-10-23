import React, { Component } from 'react'
import MainComponent from './containers/MainComponent';
import NotFoundComponent from './containers/NotFoundComponent';
import {Route, Switch, BrowserRouter} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container" style={{ marginTop: "80px"}} >
          <div className="row">
            <div className="col-lg-10 offset-lg-2 col-md-10 col-sm-12 col-xs-12">
              <BrowserRouter>
                <Switch>
                    <Route exact path="/notFound" component={NotFoundComponent} />
                    <Route component={MainComponent} />
                    {/*<MainComponent/>*/}
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
