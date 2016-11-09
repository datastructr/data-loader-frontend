import React, { Component } from 'react';

import Reporter from '../components/Reporter';
import Schemas from '../components/Schemas';
import Uploader from '../components/Uploader';

import '../styles/App.css';

class App extends Component {
  render() {


    let testData = {
      headerData: ['Field1','Field2','Field3','Field4'],
      tableData: [
        [25,1,4,5],
        [25,1,4,5],
        [25,1,4,5],
        [25,1,4,5]]
    }



    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <Uploader csvData={testData} />
            <Schemas />
            <Reporter />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
