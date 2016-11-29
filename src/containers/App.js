import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Reporter from '../containers/Reporter';
import Schemas from '../containers/Schemas';
import Uploader from '../containers/Uploader';

import AppToolbar from '../components/app/appToolbar';

import '../styles/index.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        canvasOn: false
      }
    }

  render() {
    return (
      <div className="App">
      
      <AppToolbar />

        <div className="container-fluid">
          <div className="row App-main-view">
            <div className="App-left-view col-md-7 col-sm-6">

              <Uploader />

            </div>
            <div className="App-right-view col-md-5 col-sm-6">

              <Schemas />
              <Reporter />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
