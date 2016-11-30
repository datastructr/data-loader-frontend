import React, {Component, PropTypes} from 'react';

import CSVTableRow from './csvTableRow';


class CSVTableHeaderContain extends Component {
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
      endHeaderDragDropped,
    } = this.props;

    return (
      <thead>
      <CSVTableRow 
        values={headerData} 
        isHeader={true}
        beginHeaderDrag={beginHeaderDrag}
        endHeaderDragDropped={endHeaderDragDropped}
      />
      </thead>
    );
  }

}

class CSVTableBodyContain extends Component {
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
      handleCellBlurAction
    } = this.props;

    let rows = [];
    

    return (
      <tbody>
      {tableData.map((row,i) => 
        <CSVTableRow 
          key={i.toString()} 
          count={i} 
          values={row} 
          isHeader={false}
          handleCellChangeAction={handleCellChangeAction}
          handleCellBlurAction={handleCellBlurAction}
        />
      )}
      </tbody>
    );

  }

}


class CSVTable extends Component {

  render() {
    const {
      tableData,
      headerData,

      // actions
      beginHeaderDrag,
      endHeaderDragDropped,
      handleCellChangeAction,
      handleCellBlurAction
    } = this.props;
    

    return (
      <table className="Uploader-csvtable pt-table pt-bordered">
        
          <CSVTableHeaderContain {...this.props} />
        
          <CSVTableBodyContain {...this.props} />
      </table>
    );
  }
}

CSVTable.propTypes = {
  tableData: PropTypes.object.isRequired,
  headerData: PropTypes.object.isRequired
};

export default CSVTable;