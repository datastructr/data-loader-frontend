import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as  UploaderActions from '../actions/uploader';
import * as  SchemaActions from '../actions/schemas';

import CSVTable from '../components/uploader/csvTable';
import TableToolbar from '../components/uploader/tableToolbar';

class Uploader extends Component {
  componentDidMount() {
    this.props.beginLoadFileData();
  }
  
  mapDraggedHeaderToDropTarget(header, dropTarget) {
    this.props.endHeaderDragDropped(header,dropTarget);
    this.props.dropTargetRecieveHeader(dropTarget,header);
  }

  render() {
    
    const {
      fileData,

      // actions
      beginHeaderDrag
    } = this.props;

    return (
      <div className="Uploader">
        <TableToolbar />
        <div className="Uploader-table-container">
          <CSVTable
            tableData={fileData.tableData || []} 
            headerData={fileData.headerData || []}
            beginHeaderDrag={beginHeaderDrag}
            endHeaderDragDropped={this.mapDraggedHeaderToDropTarget.bind(this)}
          />
        </div>
      
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
    fileData,
    fileLoading,
    fileLoaded,
    fileLoadError,
    fileErrorMessage,
    headerIsDragging,
    headerBeingDragged
  } = uploader || {
    fileData: {
      tableData: [],
      headerData: []
    },
    fileLoading: false,
    fileLoaded: false,
    fileLoadError: false,
    fileErrorMessage: '',
    headerIsDragging: false,
    headerBeingDragged: null
  };
  return {
    fileData,
    fileLoading,
    fileLoaded,
    fileLoadError,
    fileErrorMessage,
    headerIsDragging,
    headerBeingDragged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},UploaderActions,SchemaActions), dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Uploader);

  