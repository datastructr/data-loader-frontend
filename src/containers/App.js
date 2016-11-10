import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Reporter from '../components/Reporter';
import Schemas from '../components/Schemas';
import Uploader from '../components/Uploader';

import '../styles/App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        canvasOn: false
      }
    }

  render() {

     let testData = {
      headerData: ['Field1','Field2','Field3','Field4','Field5','Field6','Field7','Field8'],
      tableData: [
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5]
      ]
    }

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
                csvData={testData} 
              />

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
