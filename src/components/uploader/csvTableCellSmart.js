import React, {Component, PropTypes} from 'react';




class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellData: props.cellData
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      cellData: props.cellData
    })
  }

  handleChange(e) {
    this.props.handleChangeAction(e.target.value,this.state.cellData);
  }

  handleBlur(e) {
    this.props.handleBlurAction(this.state.cellData);
  }

  render() {
    const {
      cellData,
      handleChangeAction
    } = this.props;

    return (
      <input 
        value={cellData.value || ''} 
        onChange={this.handleChange.bind(this)} 
        onBlur={this.handleBlur.bind(this)}
      />
    );
  }
}


/**
 * 
 */
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
          handleChangeAction={this.props.handleCellChangeAction}
          handleBlurAction={this.props.handleBlurAction} 
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
  handleCellChangeAction: PropTypes.func.isRequired
};

export default CSVTableCellSmart;