import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import * as  UploaderActions from '../actions/uploader';
import * as  SchemaActions from '../actions/schemas';

import FileUploader from '../components/uploader/fileUploader';
import CSVTable from '../components/uploader/csvTable';
import HeaderMapper from '../components/uploader/headerMapper';

class Uploader extends Component {

  evaluateDraggedHeader(header, dropTarget) {
    this.props.endHeaderDragDropped(header);
    if(dropTarget) {
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

  callback(key) {
    console.log(key);
  }

  render() {
    
    const {
      headerData,
      tableData,
      fileLoading,
      fileLoaded,
      fileLoadError,

      // actions
      beginHeaderDrag,
      beginLoadFileData,
      dispatchUploadFileProgress
    } = this.props;

    let display = fileLoaded && !fileLoading && !fileLoadError;

    return (
      <div className="Uploader">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Upload Table" key="1">
            <div className="Uploader-table-container">
        
              {display &&
                <CSVTable
                  tableData={tableData} 
                  headerData={headerData}
                  beginHeaderDrag={beginHeaderDrag}
                  headerDroppedAction={this.evaluateDraggedHeader.bind(this)}
                  handleCellChangeAction={this.cellValueChange.bind(this)}
                  handleCellBlurAction={this.cellValueBlur.bind(this)}
                  updateRenderProgress={dispatchUploadFileProgress}
                />
              }
              {!fileLoaded &&
                <FileUploader
                  beginLoadFileData={beginLoadFileData}
                  fileLoadError={fileLoadError}
                />  
              }
              </div>
          
          </TabPane>
          <TabPane tab="Map Headers" key="2">
          
            {display &&
              <HeaderMapper
                headerData={headerData}
              />
            }
          
          </TabPane>
        </Tabs>      
      </div>
    );
  }
}

Uploader.propTypes = {
  fileLoaded: PropTypes.bool.isRequired,
  fileLoading: PropTypes.bool.isRequired,
  fileLoadError: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  let { uploader: {present} } = state;
  
  const 
    tableData = present.get('tableData'),
    headerData  = present.get('headerData'),
    fileLoading  = present.get('fileLoading'),
    fileLoaded  = present.get('fileLoaded'),
    fileLoadError = present.get('fileLoadError'),
    fileErrorMessage = present.get('fileErrorMessage');

  return {
    tableData,
    headerData,
    fileLoading,
    fileLoaded,
    fileLoadError,
    fileErrorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},UploaderActions,SchemaActions), dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Uploader);

  