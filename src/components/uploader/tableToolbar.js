import React, {Component, PropTypes} from 'react';

class TableToolbar extends Component {
  render() {
    return (
      <div className="Uploader-table-toolbar">
      
      <button type="button" className="pt-button pt-intent-danger">
        Cancel
        <span className="pt-icon-standard pt-icon-trash pt-align-right"></span>
      </button>
      <button type="button" className="pt-button pt-intent-warning">
        Reset All
        <span className="pt-icon-standard pt-icon-refresh pt-align-right"></span>
      </button>
      <button type="button" className="pt-button">
        Undo
        <span className="pt-icon-standard pt-icon-undo pt-align-right"></span>
      </button>
      <button type="button" className="pt-button">
        Redo
        <span className="pt-icon-standard pt-icon-redo pt-align-right"></span>
      </button>
      <button type="button" className="pt-button">
        History
        <span className="pt-icon-standard pt-icon-history pt-align-right"></span>
      </button>
      <button type="button" className="pt-button">
        Compare Changes
        <span className="pt-icon-standard pt-icon-comparison pt-align-right"></span>
      </button>
      <button type="button" className="pt-button">
        Search File
        <span className="pt-icon-standard pt-icon-search-template pt-align-right"></span>
      </button>
      <button type="button" className="pt-button pt-intent-success">
        Submit
        <span className="pt-icon-standard pt-icon-changes pt-align-right"></span>
      </button>

      </div>
    );
  }
}

TableToolbar.propTypes = {

};

export default TableToolbar;