import React, {Component, PropTypes} from 'react';

import { DropTarget } from 'react-dnd';
import { DndTypes } from '../shared/Constants';

const schemaTarget = {
  canDrop(props) {
    // STUB
    return true;
  },

  drop(props) { 
    // gets picked up by endDrag of dragSource
    return props.field;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class SchemaField extends Component {
  render() {
    const {
      field,
      
      connectDropTarget,
      isOver,
      canDrop
    } = this.props;

    let fieldIconClassName = isOver 
      ? "Schema-field-mapped"
      : "Schema-field-neglet";

    return connectDropTarget(
      <tr className={isOver ? 'Schema-field-isover' : 'Schema-field' }>
        <td><span className={`${fieldIconClassName} pt-icon-standard pt-icon-ungroup-objects`}></span>{' ' + field.column_name}</td>
        <td>{field.type}</td>
        <td><b>{field.nullable == "False" ? 'Required' : ''}</b></td>
      </tr>
    );
  }
}

SchemaField.propTypes = {

  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(DndTypes.HEADER, schemaTarget, collect)(SchemaField);
