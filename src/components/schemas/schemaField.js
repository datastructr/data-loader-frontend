import React, {Component, PropTypes} from 'react';

import { DropTarget } from 'react-dnd';
import { DndTypes } from '../shared/Constants';

const schemaTarget = {
  canDrop(props) {
    // STUB (will rely on schema rules)
    return true;
  },

  drop(props) {
    console.log(props)
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
      isOver
    } = this.props;

    return connectDropTarget(
      <span className={isOver ? 'Schema-field-isover' : 'Schema-field' }><b>Column Name</b> {field.column_name}<b>Type</b> {field.type}<b>Required</b> {field.nullable}</span>
    );
  }
}

SchemaField.propTypes = {

  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(DndTypes.HEADER, schemaTarget, collect)(SchemaField);
