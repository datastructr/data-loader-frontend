import Immutable, {List} from 'immutable';
import React, { Component, PropTypes } from 'react';

// import styles from './Table.css';
// import TableHeader from './TableHeader';
// import TableCell from './TableCell';

import {
  AutoSizer,
  Grid
} from 'react-virtualized';

import shallowCompare from 'react-addons-shallow-compare'
import DataSmartCell from './DataSmartCell'
import DataHeaderCell from './DataHeaderCell'

export default class DataTable extends Component {

  constructor(props) {
    super(props);
    this.state={
      headerData: props.headerData,
      tableData: props.tableData
    }
  }

  headerRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div
        key={key}
        style={style}
      >
        <DataHeaderCell cell={this.state.headerData.get(columnIndex)} />
      </div>
    )  
  }
  

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div
        key={key}
        style={style}
      >
        <DataSmartCell cellData={this.state.tableData.get(rowIndex).get(columnIndex)} />
      </div>
    )  
  }

  render () {
    let {
      headerData,
      tableData
    } = this.state;

    return (
        <div>

          <Grid
            cellRenderer={this.headerRenderer.bind(this)}
            columnCount={headerData.size}
            columnWidth={100}
            height={30}
            rowCount={1}
            rowHeight={30}
            width={1000}
          />
          <Grid
            cellRenderer={this.cellRenderer.bind(this)}
            columnCount={headerData.size}
            columnWidth={100}
            height={1000}
            rowCount={tableData.size}
            rowHeight={30}
            width={1000}
          />

        </div>
    )
  }
}