import React, { Component, PropTypes } from 'react';

import '../styles/Uploader.css';

import CSVTable from './uploader/csvTable';
import TableToolbar from './uploader/tableToolbar';

class Uploader extends Component {
  render() {

    const {
      csvData
    } = this.props;

    return (
      <div className="Uploader">
        <TableToolbar />
        <CSVTable
          tableData={csvData.tableData} 
          headerData={csvData.headerData} 
        />
      
      </div>
    );
  }
}

Uploader.propTypes = {
  csvData: PropTypes.object.isRequired,
};

export default Uploader;