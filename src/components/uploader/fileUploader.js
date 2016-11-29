import React, {Component, PropTypes} from 'react';

import Dropzone from 'react-dropzone';
import Papa from 'papaparse';


class FileUploader extends Component {

  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    if(acceptedFiles.length > 0) {
      let file = acceptedFiles[0];
      Papa.parse(file, {
        header:true,
        complete: function(results) {
          console.log("Finished:", results.data);
        }
      });
    }
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