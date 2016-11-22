import React, {Component, PropTypes} from 'react';

import CSVTableRow from './csvTableRow';

class CSVTable extends Component {

  render() {
    const {
      tableData,
      headerData,

      // actions
      beginHeaderDrag,
      endHeaderDragDropped
    } = this.props;

    var rows = [];

    let header = (
      <CSVTableRow 
        values={headerData} 
        isHeader={true}
        beginHeaderDrag={beginHeaderDrag}
        endHeaderDragDropped={endHeaderDragDropped}
      />
    );
    
    tableData.forEach((row,i) => {
      rows.push(
        <CSVTableRow 
          key={i} 
          count={i} 
          values={row} 
          isHeader={false}
        />
      );
    });

    return (
      <table className="Uploader-csvtable pt-table pt-bordered">
        <thead>
          {header}
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

CSVTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  headerData: PropTypes.array.isRequired
};

export default CSVTable;