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
  endDrag(props) {
    //props.endHeaderDrag(props.cell);
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
  
  render() {
    const {
      connectDragSource,
      cell
    } = this.props;

    return connectDragSource(
        <th className={`Uploader-table-header mdl-data-table__cell--non-numeric active-${cell.colorScheme.name}`}>
          {cell.id}
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

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource(DndTypes.HEADER, headerSource, collect)(CSVTableHeader);