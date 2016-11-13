import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as  SchemaActions from '../actions/uploader';

import CSVTable from '../components/uploader/csvTable';
import TableToolbar from '../components/uploader/tableToolbar';

import '../styles/Uploader.css';

class Uploader extends Component {
  render() {

    const {
      fileData
    } = this.props;

    return (
      <div className="Uploader">
        <TableToolbar />
        <CSVTable
          tableData={fileData.tableData} 
          headerData={fileData.headerData} 
        />
      
      </div>
    );
  }
}

Uploader.propTypes = {
  fileData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  let { uploader } = state;

  const {
    fileData
  } = uploader || {
    fileData: {}
  };
  return {
    fileData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SchemaActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Uploader);