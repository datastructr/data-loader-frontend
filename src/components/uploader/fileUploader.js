import React, {Component, PropTypes} from 'react';

import Dropzone from 'react-dropzone';


class FileUploader extends Component {

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
  }

  render() {
    const {

    } = this.props;

    return (
        <Dropzone 
          onDrop={this.onDrop}
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

};

export default FileUploader;