import React, {Component, PropTypes} from 'react';

import Dropzone from 'react-dropzone';

class FileUploader extends Component {

  onDrop(acceptedFiles, rejectedFiles) {
    if(acceptedFiles.length > 0) {
      let file = acceptedFiles[0];
      this.props.beginLoadFileData(file);
    } else {
      // TODO report error
      console.log("DID NOT ACCEPT FILE")
    }
  }

  render() {
    return (
        <Dropzone 
          onDrop={this.onDrop.bind(this)}
          accept=".csv"
          disableClick={false}
          className="Uploader-dropzone"
          >
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
    );
  }
}

FileUploader.propTypes = {
  beginLoadFileData: PropTypes.func.isRequired
};

export default FileUploader;