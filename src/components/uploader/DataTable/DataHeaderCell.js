import React, {Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';

import { DndTypes } from '../../shared/Constants';

import { 
  Icon
} from 'antd';

/**
 * Implements the drag source contract.
 */
const headerSource = {
  beginDrag(props) {
    props.beginHeaderDrag(props.cell);
    return {
      text: props.text
    };
  },
  endDrag(props,monitor) {
    // dropResults aren't guarenteed
    props.headerDroppedAction(props.cell,monitor.getDropResult());
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DataHeaderCell extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.cell.equals(nextProps.cell)) {
      return true;
    }
    return false;
  }
  
  generateIconClass(cell) {
    let 
      dragging = cell.get('headerDragging'),
      validating = cell.get('validating'),
      validated = cell.get('validated'),
      validColumn = cell.get('rowsPassedFailed') === 0;

    if (dragging) {
      return "Uploader-table-header-icon-dragging";
    } else if (validating) {
      return "Uploader-table-header-icon-validating"
    } else if (validated && validColumn) {
      return "Uploader-table-header-icon-validColumn"
    }  else if (validated && !validColumn) {
      return "Uploader-table-header-icon-nonValidColumn"
    } else { 
      return "Uploader-table-header-icon-neglet";
    }
  }

  render() {
    const {
      connectDragSource,
      cell
    } = this.props;

    let headerIconClassName = this.generateIconClass(cell)//.get('headerDragging'), cell.get('validating'));
    
    return connectDragSource(
        <th className={`Uploader-table-header`}>
          {cell.get('id')} <Icon type="link" className={headerIconClassName} />
        </th>
    );
  }
}

DataHeaderCell.propTypes = {
  value: React.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  beginHeaderDrag: PropTypes.func.isRequired,
  headerDroppedAction: PropTypes.func.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource(DndTypes.HEADER, headerSource, collect)(DataHeaderCell);