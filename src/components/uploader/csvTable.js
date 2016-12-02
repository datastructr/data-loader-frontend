import React, {Component, PropTypes} from 'react';

import CSVTableHeaderRow from './csvTableHeaderRow';
import CSVTableCellRow from './csvTableCellRow';

class CSVTableHeaderSection extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.headerData.equals(nextProps.headerData)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      headerData,
      // actions
      beginHeaderDrag,
      headerDroppedAction,
    } = this.props;

    return (
      <thead>
        <CSVTableHeaderRow 
          values={headerData} 
          beginHeaderDrag={beginHeaderDrag}
          headerDroppedAction={headerDroppedAction}
        />
      </thead>
    );
  }

}


class CSVTableBodySection extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.tableData.equals(nextProps.tableData)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      tableData,
      // actions
      handleCellChangeAction,
      handleCellBlurAction,
      updateRenderProgress
    } = this.props;

    return (
      <tbody >
      {tableData.map((row,i) => 
        <CSVTableCellRow 
          key={i.toString()} 
          count={i} 
          rowData={row} 
          handleCellChangeAction={handleCellChangeAction}
          handleCellBlurAction={handleCellBlurAction}
          updateRenderProgress={updateRenderProgress}
        />
      )}
      </tbody>
    );

  }

}


class CSVTable extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.tableData.equals(nextProps.tableData)) {
      return true;
    }
    if (!this.props.headerData.equals(nextProps.tableData)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      tableData,
      headerData,

      // actions
      beginHeaderDrag,
      headerDroppedAction,
      handleCellChangeAction,
      handleCellBlurAction,
      updateRenderProgress
    } = this.props;
    

    return (
      <table className="Uploader-csvtable pt-table pt-bordered">
          
          <CSVTableHeaderSection 
            headerData={headerData}
            beginHeaderDrag={beginHeaderDrag}
            headerDroppedAction={headerDroppedAction}
          />

          <CSVTableBodySection 
            tableData={tableData}
            handleCellChangeAction={handleCellChangeAction}
            handleCellBlurAction={handleCellBlurAction}
            updateRenderProgress={updateRenderProgress}
          />

      </table>
    );
  }
}

CSVTable.propTypes = {
  tableData: PropTypes.object.isRequired,
  headerData: PropTypes.object.isRequired
};

export default CSVTable;