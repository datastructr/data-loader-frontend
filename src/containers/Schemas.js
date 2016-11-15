import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SchemaActions from '../actions/schemas';

import Accordion from '../components/shared/Accordion';
import SchemaField from '../components/schemas/schemaField';

class Schemas extends Component {
  componentDidMount() {
    this.props.getSchemaData();
  }
  
  
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
      activeSchemaId,
      schemasLoaded
    } = this.props;

    return (
      <div className="Schemas">
        <div className="Schemas-view">

          {schemasLoaded && 
          <Accordion 
            newLevel={availableSchemas}
            uniqueSelector={"name"}
            rowClassName={"Schema-list-row"}
            rowIconClassName={"pt-icon-standard pt-icon-database"}
            rowOpenClassName={"pt-tree-node-caret pt-tree-node-caret-open pt-icon-standard"}
            rowCloseClassName={"pt-tree-node-caret pt-icon-standard"}
            childrenSelector={null}
            renderBaseFunc={this.baseViewRender}
          />}
          
        </div>
      </div>
    );
  }
}

Schemas.propTypes = {
  availableSchemas: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  let { schemas } = state;

  const {
    availableSchemas,
    activeSchemaId,
    schemasLoaded
  } = schemas || {
    availableSchemas: [],
    activeSchemaId: '',
    schemasLoaded: false
  };
  return {
    availableSchemas,
    activeSchemaId,
    schemasLoaded
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SchemaActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Schemas);
