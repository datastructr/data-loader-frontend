import React, {Component, PropTypes} from 'react';

import CSVTableHeader from './csvTableHeader';
import CSVTableCell from './csvTableCell';
import CSVTableCellSmart from './csvTableCellSmart';

class CSVTableRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.values.equals(nextProps.values)) {
      return true;
    }
    return false;
  }
  
  render() {
    const {
      isHeader,
      values,
      count,
      
      // actions
      beginHeaderDrag,
      headerDroppedAction,
      handleCellChangeAction,
      handleCellBlurAction
    } = this.props;

    
    return (
      <tr>
        <CSVTableCell isCount={true} value={isHeader ? null : count} />
          {isHeader && values.map((cell,i) =>
              <CSVTableHeader 
                key={i.toString()}
                cell={cell} 
                beginHeaderDrag={beginHeaderDrag}
                headerDroppedAction={headerDroppedAction}
              />
          )}
          
          {!isHeader && values.map((cell,i) =>
              <CSVTableCellSmart 
                key={i.toString()} 
                value={cell.get('value')} 
                rulesPassed={cell.get('rulesPassed')}
                rulesFailed={cell.get('rulesFailed')}
                cellData={cell}
                handleCellChangeAction={handleCellChangeAction}
                handleBlurAction={handleCellBlurAction} 
              />
            )}
      </tr>
    );
  }
}

CSVTableRow.propTypes = {
  isHeader: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired
};

export default CSVTableRow;