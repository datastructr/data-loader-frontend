import React, {Component, PropTypes} from 'react';

class CSVTableCell extends Component {
  render() {
    const {
      isCount,
      rulesPassed
    } = this.props;
    return (
        <td className={isCount ? 'Uploader-table-cell-count' : 'Uploader-table-cell'}>
          {this.props.value}
        </td>
    );
  }
}

CSVTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  isCount: PropTypes.bool
};

export default CSVTableCell;