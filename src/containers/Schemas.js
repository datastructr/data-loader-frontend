import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SchemaActions from '../actions/schemas';

import Accordion from '../components/shared/Accordion';
import SchemaField from '../components/schemas/schemaField';

import '../styles/Schemas.css';

class Schemas extends Component {
  
  
  
  baseViewRender(schema) {
    return(
      <table className="Schema-choices">
      <tbody>
        {schema.properties.map((field,i) =>
          <SchemaField
            key={i}
            field={field}
          />
        )}
        </tbody>
      </table>
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

function mapStateToProps(state) {
  let { schemas } = state;

  const {
    availableSchemas,
    activeSchemaId
  } = schemas || {
    availableSchemas: [],
    activeSchemaId: ''
  };
  return {
    availableSchemas,
    activeSchemaId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SchemaActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Schemas);
