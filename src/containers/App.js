import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Reporter from '../components/Reporter';
import Schemas from '../components/Schemas';
import Uploader from '../components/Uploader';

import '../styles/App.css';

// Sample tests
import {testCsvData, schemaSamples} from '../tests/App.samples.js';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        canvasOn: false
      }
    }

  render() {

    let canvas = this.state.canvasOn
      ? (<canvas id="App-canvas"></canvas>)
      : null;

    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row App-main-view">
            {canvas}
            <div className="App-left-view col-md-7 col-sm-6">

              <Uploader 
                csvData={testCsvData} 
              />

            </div>
            <div className="App-right-view col-md-5 col-sm-6">

              <Schemas 
                availableSchemas={schemaSamples.availableSchemas}
                activeSchemaId={schemaSamples.activeSchemaId}
              />

              <Reporter />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
