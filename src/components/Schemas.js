import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { DndTypes } from './shared/Constants';
import Accordion from './shared/Accordion';

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
  
  
  
  baseViewRender(schemaProperties) {
    console.log(schemaProperties)
    return (<h1>hey</h1>)
  }
  
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

          <Accordion 
            newLevel={availableSchemas}
            uniqueSelector={"name"}
            childrenSelector={null}
            renderBaseFunc={this.baseViewRender}
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
