import React, {Component, PropTypes} from 'react';

class CSVTableCellSmart extends Component {
  
  generateCellColor(passCount, failCount) {
    if(failCount > 0) {
      return 'Uploader-table-cell-invalid';
    } else if (passCount > 0){
      return 'Uploader-table-cell-valid';
    } else {
      return '';
    }
  }

  render() {
    const {
      rulesPassed,
      rulesFailed
    } = this.props;

    let passedRulesCount = rulesPassed.length;
    let failedRulesCount = rulesFailed.length;

    let colorClass = this.generateCellColor(passedRulesCount, failedRulesCount);

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
  ]),
  rulesPassed: PropTypes.array.isRequired,
  rulesFailed: PropTypes.array.isRequired
};

export default CSVTableCellSmart;