import React, {Component, PropTypes} from 'react';

import CSVTableHeader from './csvTableHeader';
import CSVTableCell from './csvTableCell';
import CSVTableCellSmart from './csvTableCellSmart';

class CSVTableRow extends Component {
  
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

    let cells = [
      <CSVTableCell key={+(new Date())} isCount={true} value={isHeader ? null : count} />
    ];

    values.map((cell,i) => {
      if(isHeader) {
        cells.push(
          <CSVTableHeader 
            key={i.toString()}
            cell={cell} 
            beginHeaderDrag={beginHeaderDrag}
            headerDroppedAction={headerDroppedAction}
          />);
      } else {
        cells.push(
          <CSVTableCellSmart 
            key={i.toString()} 
            value={cell.get('value')} 
            rulesPassed={cell.get('rulesPassed')}
            rulesFailed={cell.get('rulesFailed')}
            cellData={cell}
            handleCellChangeAction={handleCellChangeAction}
            handleBlurAction={handleCellBlurAction} 
          />
        );
      }  
    });

    return (
      <tr>
        {cells}
      </tr>
    );
  }
}

CSVTableRow.propTypes = {
  isHeader: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired
};

export default CSVTableRow;