import React, {Component, PropTypes} from 'react';

import CSVTableHeader from './csvTableHeader';
import CSVTableCell from './csvTableCell';

class CSVTableRow extends Component {
  render() {
    const {
      isHeader,
      values,
      
      // actions
      beginHeaderDrag
    } = this.props;

    let cells = [];
    
    values.forEach((cell,i) => {
      if(isHeader) {
        cells.push(<CSVTableHeader key={i} beginHeaderDrag={beginHeaderDrag} cell={cell} />);
      } else {
        cells.push(<CSVTableCell key={i} value={cell.value} />);
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