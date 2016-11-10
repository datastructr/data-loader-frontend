import React, { Component, PropTypes } from 'react';

import Accordion from './shared/Accordion';
import SchemaField from './schemas/schemaField';

import '../styles/Schemas.css';

class Schemas extends Component {
  
  
  
  baseViewRender(schema) {
    return(
      <div>
        {schema.properties.map((field,i) =>
          <SchemaField
            key={i}
            field={field}
          />
        )}
      </div>
    );
  }
  
  render() {
    const {
      availableSchemas,
      activeSchemaId
    } = this.props;

    return (
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
  ])
};

export default Schemas;
