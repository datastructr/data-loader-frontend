import React, {Component, PropTypes} from 'react';

import CSVTableHeader from './csvTableHeader';
import CSVTableCell from './csvTableCell';
import CSVTableCellSmart from './csvTableCellSmart';

class CSVTableRow extends Component {
  
  cellValueChange(newVal, cell) {
    console.log(newVal, cell)
  }
  
  render() {
    const {
      isHeader,
      values,
      count,
      
      // actions
      beginHeaderDrag,
      endHeaderDragDropped
    } = this.props;

    let cells = [
      <CSVTableCell key={+(new Date())} isCount={true} value={isHeader ? null : count} />
    ];

    values.forEach((cell,i) => {
      if(isHeader) {
        cells.push(
          <CSVTableHeader 
            key={i}
            cell={cell} 
            beginHeaderDrag={beginHeaderDrag}
            endHeaderDragDropped={endHeaderDragDropped}
          />);
      } else {
        cells.push(
          <CSVTableCellSmart 
            key={i} 
            value={cell.value} 
            rulesPassed={cell.rulesPassed}
            rulesFailed={cell.rulesFailed}
            cellData={cell}
            handleChangeAction={this.cellValueChange.bind(this)}
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
  values: PropTypes.array.isRequired
};

export default CSVTableRow;