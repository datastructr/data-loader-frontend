import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import Reporter from '../containers/Reporter';
import Schemas from '../containers/Schemas';
import Uploader from '../containers/Uploader';

import AppToolbar from '../components/app/appToolbar';

import { 
  Row,
  Col
} from 'antd';

import '../styles/index.css';

class App extends Component {

  render() {
    return (
      <div className="App">
      
      <AppToolbar />

        <Row className="App-main-view">

            <Col span={14} className="App-left-view">
              <Uploader />
            </Col>

            <Col span={10} className="App-right-view">
              <Schemas />
              <Reporter />
            </Col>

        </Row>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
