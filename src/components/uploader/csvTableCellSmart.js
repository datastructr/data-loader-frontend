import React, {Component, PropTypes} from 'react';

class CSVTableCellSmart extends Component {
  
  generateCellColor(rulesPassed) {
    if(rulesPassed > 0) {
      return 'Uploader-table-cell-valid';
    } else {
      return '';
    }
  }

  render() {
    const {
      rulesPassed
    } = this.props;

    let passedRulesCount = rulesPassed.length;
    let colorClass = this.generateCellColor(passedRulesCount)
    return (
        <td className={`Uploader-table-cell ${colorClass}`}>
          {this.props.value}
        </td>
    );
  }
}

CSVTableCellSmart.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
};

export default CSVTableCellSmart;