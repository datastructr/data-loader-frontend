import React, {Component, PropTypes} from 'react';

import Immutable, { Map } from 'immutable';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellData: props.cellData
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.cellData.equals(nextProps.cellData)) {
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
    return (
      <input 
        value={this.props.cellData.get('value')} 
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
    if (!this.props.cellData.equals(nextProps.cellData)) {
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
      cellData
    } = this.props;
    
    let passedRulesCount = cellData.get('rulesPassed').size;
    let failedRulesCount = cellData.get('rulesFailed').size;

    let colorClass = this.generateCellColor(passedRulesCount, failedRulesCount);
    
    let innerJSX = failedRulesCount > 0 
      ? (
        <InputField 
          cellData={cellData}
          handleChangeAction={this.props.handleCellChangeAction}
          handleBlurAction={this.props.handleBlurAction} 
        />
      )
      : (cellData.get('value'))


    return (
        <td className={`Uploader-table-cell ${colorClass}`}>
          {innerJSX}
        </td>
    );
  }
}

CSVTableCellSmart.propTypes = {
  cellData: PropTypes.object.isRequired,
  handleCellChangeAction: PropTypes.func.isRequired
};

export default CSVTableCellSmart;