import React, {Component, PropTypes} from 'react';
import { DragSource } from 'react-dnd';

import { DndTypes } from '../shared/Constants';

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
    props.endHeaderDragDropped(props.cell);
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

class CSVTableHeader extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.cell.equals(nextProps.cell)) {
      return true;
    }
    return false;
  }
  
  generateIconClass(dragging, validating) {
    if(dragging) {
      return "Uploader-table-header-dragging";
    } else if(validating) {
      return "Uploader-table-header-validating"
    } else {
      return "Uploader-table-header-neglet";
    }
  }

  render() {
    const {
      connectDragSource,
      cell
    } = this.props;

    let headerIconClassName = this.generateIconClass(cell.get('headerDragging'), cell.get('validating'));

    return connectDragSource(
        <th className={`Uploader-table-header`}>
          {cell.get('id')} <span className={`${headerIconClassName} pt-icon-standard pt-icon-ungroup-objects`}></span>
        </th>
    );
  }
}

CSVTableHeader.propTypes = {
  value: React.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  beginHeaderDrag: PropTypes.func.isRequired,
  endHeaderDragDropped: PropTypes.func.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource(DndTypes.HEADER, headerSource, collect)(CSVTableHeader);