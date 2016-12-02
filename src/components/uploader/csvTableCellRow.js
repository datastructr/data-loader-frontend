import React, {Component, PropTypes} from 'react';

import Immutable, { List } from 'immutable';

import CSVTableCell from './csvTableCell';
import CSVTableCellSmart from './csvTableCellSmart';

class CSVTableCellRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.rowData.equals(nextProps.rowData)) {
      return true;
    }
    return false;
  }
  
  render() {
    const {
      rowData,
      count,

      // actions
      handleCellChangeAction,
      handleCellBlurAction,
      updateRenderProgress
    } = this.props;
    return (
        <tr>      
        <CSVTableCell isCount={true} value={count} />
        {rowData.map((cell,i) =>
          <CSVTableCellSmart 
            key={i.toString()} 
            cellData={cell}
            handleCellChangeAction={handleCellChangeAction}
            handleBlurAction={handleCellBlurAction}
            updateRenderProgress={updateRenderProgress}
            progress={count}
          />
        )}
        </tr>
      );
  }
}

CSVTableCellRow.propTypes = {
  rowData: PropTypes.object.isRequired
};

export default CSVTableCellRow;