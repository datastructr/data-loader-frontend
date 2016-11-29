import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as  UploaderActions from '../actions/uploader';
import * as  SchemaActions from '../actions/schemas';

import FileUploader from '../components/uploader/fileUploader';
import CSVTable from '../components/uploader/csvTable';

class Uploader extends Component {
  componentDidMount() {
    //this.props.beginLoadFileData();
  }

  
  evaluateDraggedHeader(header, dropTarget) {
      this.props.endHeaderDragDropped(header);
      if(dropTarget) {
        /** FOR NOW THIS HAPPENS FIRST */
        this.props.dropTargetRecieveHeader(dropTarget,header);

        this.props.endHeaderDragDroppedMapped(header,dropTarget);
      }
  }

  cellValueChange(newVal, cell) {
    this.props.dispatchUpdateCellValue(newVal, cell)
  }

  cellValueBlur(cell) {
    this.props.revalidateSingleCell(cell)
  }

  render() {
    
    const {
      fileData,
      fileLoading,
      fileLoaded,
      fileLoadError,

      // actions
      beginHeaderDrag
    } = this.props;

    return (
      <div className="Uploader">
        <div className="Uploader-table-container">
        {fileLoaded && !fileLoading &&
          <CSVTable
            tableData={fileData.tableData || []} 
            headerData={fileData.headerData || []}
            beginHeaderDrag={beginHeaderDrag}
            endHeaderDragDropped={this.evaluateDraggedHeader.bind(this)}
            handleCellChangeAction={this.cellValueChange.bind(this)}
            handleCellBlurAction={this.cellValueBlur.bind(this)}
          />
        }
        {!fileLoaded &&
          <FileUploader />  
        }
        </div>
      
      </div>
    );
  }
}

Uploader.propTypes = {
  fileData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  let { uploader: {present} } = state;
  
  const {
    fileData,
    fileLoading,
    fileLoaded,
    fileLoadError,
    fileErrorMessage,
  } = present || {
    fileData: {
      tableData: [],
      headerData: []
    },
    fileLoading: false,
    fileLoaded: false,
    fileLoadError: false,
    fileErrorMessage: '',
  };
  return {
    fileData,
    fileLoading,
    fileLoaded,
    fileLoadError,
    fileErrorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},UploaderActions,SchemaActions), dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Uploader);

  