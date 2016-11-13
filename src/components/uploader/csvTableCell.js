import React, {Component, PropTypes} from 'react';

class CSVTableCell extends Component {
  render() {
    return (
        <td className="Uploader-table-cell mdl-data-table__cell--non-numeric">
          {this.props.value}
        </td>
    );
  }
}

CSVTableCell.propTypes = {
  value: React.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
};

export default CSVTableCell;