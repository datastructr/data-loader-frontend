import React, {Component, PropTypes} from 'react';

import { DropTarget } from 'react-dnd';
import { DndTypes } from '../shared/Constants';
import _ from 'lodash';

import { 
  Icon
} from 'antd';

const schemaTarget = {
  canDrop(props) {
    return _.isEmpty(props.field.fieldMap);
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
  
  generateIconClass(isOver, canDrop, validating) {
    if(isOver && canDrop) {
      return "Schema-field-icon-dropping";
    } else if(isOver && !canDrop) {
      return "Schema-field-icon-nodrop"
    } else if(validating) {
      return "Schema-field-icon-validating";
    } else {
      return "Schema-field-icon-neglet";
    }
  }
  
  render() {
    const {
      field,
      
      connectDropTarget,
      isOver,
      canDrop
    } = this.props;

    let fieldIconClassName = this.generateIconClass(isOver, canDrop, field.fieldValidating)

    return connectDropTarget(
      <tr className={isOver ? 'Schema-field-isover' : 'Schema-field' }>
        <td><span><Icon type="link" className={fieldIconClassName} /> </span>{' ' + field.column}</td>
        <td>{field.type}</td>
        <td><b>{field.nullable === "False" ? 'Required' : ''}</b></td>
      </tr>
    );
  }
}

SchemaField.propTypes = {

  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(DndTypes.HEADER, schemaTarget, collect)(SchemaField);
