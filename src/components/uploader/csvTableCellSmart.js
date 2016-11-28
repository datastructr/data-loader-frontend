import React, {Component, PropTypes} from 'react';




class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellValue: props.cellData.value,
      cellData: props.cellData
    }
  }

  handleChange(e, cell) {
    this.setState({
      cellData: this.state.cellData,
      cellValue: e.target.value
    }, () => {
      this.props.handleChangeAction(this.state.cellValue,this.state.cellData);
    })
  }

  render() {
    const {
      cellData
    } = this.props;

    return (
      <input 
        value={this.state.cellValue || ''} 
        onChange={this.handleChange.bind(this)} 
      />
    );
  }
}


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
      rulesFailed,
      cellData,
      value
    } = this.props;

    let passedRulesCount = rulesPassed.length;
    let failedRulesCount = rulesFailed.length;

    let colorClass = this.generateCellColor(passedRulesCount, failedRulesCount);
    
    let innerHtml = failedRulesCount > 0 
      ? (
        <InputField 
          cellData={cellData}
          handleChangeAction={this.props.handleChangeAction} 
        />
      )
      : (value)


    return (
        <td className={`Uploader-table-cell ${colorClass}`}>
          {innerHtml}
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
  rulesFailed: PropTypes.array.isRequired,
  handleChangeAction: PropTypes.func.isRequired
};

export default CSVTableCellSmart;