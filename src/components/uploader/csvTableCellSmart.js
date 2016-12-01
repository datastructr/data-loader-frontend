import React, {Component, PropTypes} from 'react';




class InputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cellData: props.cellData
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value !== nextProps.value) {
      return true;
    }
    return false;
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
      value
    } = this.props;

    return (
      <input 
        value={value} 
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
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value !== nextProps.value) {
      return true;
    }
    if (this.props.rulesPassed !== nextProps.rulesPassed) {
      return true;
    }
    if (this.props.rulesFailed !== nextProps.rulesFailed) {
      return true;
    }
    return false;
  }

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

    let passedRulesCount = rulesPassed.size;
    let failedRulesCount = rulesFailed.size;

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
  rulesPassed: PropTypes.object.isRequired,
  rulesFailed: PropTypes.object.isRequired,
  handleCellChangeAction: PropTypes.func.isRequired
};

export default CSVTableCellSmart;