import React, { Component, PropTypes } from 'react';

import CSVTable from './uploader/csvTable';

class Uploader extends Component {
  render() {

    const {
      csvData
    } = this.props;

    return (
      <div className="Uploader col-md-7">

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