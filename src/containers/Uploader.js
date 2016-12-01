import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as  UploaderActions from '../actions/uploader';
import * as  SchemaActions from '../actions/schemas';

import {
    Button,
    Intent,
    ProgressBar,
    Toaster,
} from "@blueprintjs/core";

import FileUploader from '../components/uploader/fileUploader';
import CSVTable from '../components/uploader/csvTable';

class Uploader extends Component {
  componentDidMount() {
    //this.props.beginLoadFileData();
  }

  
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

  renderProgress(amount) {
        return {
            iconName: "cloud-upload",
            message: (
                <ProgressBar
                    className={amount >= 100 ? "pt-no-stripes" : '' }
                    intent={amount < 100 ? Intent.PRIMARY : Intent.SUCCESS}
                    value={amount / 100}
                />
            ),
            timeout: amount < 100 ? 0 : 2000,
        };
    }

  handleProgressToast() {
        let progress = 0;
        const key = this.refs.uploadToaster.show(this.renderProgress(0));
        const interval = setInterval(() => {
            if (this.refs.uploadToaster == null || progress > 100) {
                clearInterval(interval);
            } else {
                progress += 10 + Math.random() * 20;
                this.refs.uploadToaster.update(key, this.renderProgress(progress));
            }
        }, 1000);
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
      beginLoadFileData
    } = this.props;

    return (
      <div className="Uploader">
      <Button onClick={this.handleProgressToast.bind(this)} text="Upload file" />
      <Toaster {...this.state} ref='uploadToaster'/>
        <div className="Uploader-table-container">
        {fileLoaded && !fileLoading && !fileLoadError &&
          <CSVTable
            tableData={tableData} 
            headerData={headerData}
            beginHeaderDrag={beginHeaderDrag}
            headerDroppedAction={this.evaluateDraggedHeader.bind(this)}
            handleCellChangeAction={this.cellValueChange.bind(this)}
            handleCellBlurAction={this.cellValueBlur.bind(this)}
          />
        }
        {!fileLoaded &&
          <FileUploader
            beginLoadFileData={beginLoadFileData}
            fileLoadError={fileLoadError}
          />  
        }
        </div>
      
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

  