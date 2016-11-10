import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { DndTypes } from './shared/Constants';
import Accordian from './shared/Accordian';

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

import '../styles/Schemas.css';

class Schemas extends Component {
  render() {
    const {
      availableSchemas,
      activeSchemaId,

      connectDropTarget,
      isOver
    } = this.props;

    

    return connectDropTarget(
      <div className="Schemas">
        <div className="Schemas-view">

          <Accordian 
            newLevel={availableSchemas}
            uniqueSelector={"name"}
            childrenSelector={null}
          />
          
        </div>
      </div>
    );
  }
}

Schemas.propTypes = {
  availableSchemas: PropTypes.array.isRequired,
  activeSchemaId: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),

  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(DndTypes.HEADER, schemaTarget, collect)(Schemas);
