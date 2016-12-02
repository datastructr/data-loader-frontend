import React, {Component, PropTypes} from 'react';

import CSVTableHeader from './csvTableHeader';
import CSVTableCell from './csvTableCell';


class CSVTableHeaderRow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.values.equals(nextProps.values)) {
      return true;
    }
    return false;
  }
  
  render() {
    const {
      values,
      // actions
      beginHeaderDrag,
      headerDroppedAction,
    } = this.props;

    return (
      <tr>
        <CSVTableCell isCount={true} value={null} />
          {values.map((cell,i) =>
            <CSVTableHeader 
              key={i.toString()}
              cell={cell} 
              beginHeaderDrag={beginHeaderDrag}
              headerDroppedAction={headerDroppedAction}
            />
          )}
      </tr>
    );
  }
}

CSVTableHeaderRow.propTypes = {
  values: PropTypes.object.isRequired
};

export default CSVTableHeaderRow;