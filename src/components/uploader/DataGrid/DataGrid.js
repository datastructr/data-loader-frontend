import Immutable, {List} from 'immutable';
import React, { Component, PropTypes } from 'react';

// import styles from './Table.css';
// import TableHeader from './TableHeader';
// import TableCell from './TableCell';

import {
  AutoSizer,
  Grid,
  ScrollSync
} from 'react-virtualized';

import shallowCompare from 'react-addons-shallow-compare'
import DataSmartCell from './DataSmartCell'
import DataHeaderCell from './DataHeaderCell'

export default class DataTable extends Component {

  constructor(props) {
    super(props);
  }

  _headerCellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <DataHeaderCell 
        cell={this.props.headerData.get(columnIndex)} 
        key={key}
        style={style}
        beginHeaderDrag={this.props.beginHeaderDrag}
        headerDroppedAction={this.props.headerDroppedAction}
      />
    )  
  }

  _bodyCellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <DataSmartCell
        key={key}
        style={style}
        cellData={this.props.tableData.get(rowIndex).get(columnIndex)}
        handleCellChangeAction={this.props.handleCellChangeAction}
        handleCellBlurAction={this.props.handleCellBlurAction}
        updateRenderProgress={this.props.updateRenderProgress}
      />
    )  
  }

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    return rowIndex === 0 
      ? this._headerCellRenderer.call(this, { columnIndex, key, rowIndex, style })
      : this._bodyCellRenderer.call(this,{ columnIndex, key, rowIndex, style })
  }

  render () {
    let {
      headerData,
      tableData
    } = this.props;
    // console.log("+==============================")
    // console.log(headerData.size)
    // console.log(tableData)
    // console.log("+==============================")

    return (
        <AutoSizer disableHeight>
          {({  width }) => (
          <Grid
            cellRenderer={this.cellRenderer.bind(this)}
            columnCount={headerData.size}
            columnWidth={150}
            rowCount={tableData.size}
            rowHeight={40}
            height={1000}
            width={width}
          />
        )}  
        </AutoSizer>     
    );
  }
}

// <Grid
//                 cellRenderer={this.cellRenderer.bind(this)}
//                 columnCount={headerData.size}
//                 columnWidth={100}
//                 rowCount={tableData.size}
//                 rowHeight={30}
//                 height={height}
//                 width={width}
//               />