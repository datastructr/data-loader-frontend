import React, {Component, PropTypes} from 'react';

class CSVTableCell extends Component {
  render() {
    return (
        <td className="Uploader-table-cell">
          {this.props.value}
        </td>
    );
  }
}

CSVTableCell.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ])
};

export default CSVTableCell;