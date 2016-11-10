import React, { Component, PropTypes } from 'react';

import { DropTarget } from 'react-dnd';
import { DndTypes } from './shared/Constants';

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
      connectDropTarget,
      isOver
    } = this.props;

    return connectDropTarget(
      <div className="Schemas">

      </div>
    );
  }
}

Schemas.propTypes = {

  // Injected by React DnD:
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(DndTypes.HEADER, schemaTarget, collect)(Schemas);
