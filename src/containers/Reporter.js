import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ReporterActions from '../actions/reporter';


class Reporter extends Component {
  render() {
    return (
      <div className="Reporter">
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { reporter } = state;

  // const {

  // } = reporter || {

  // };
  // return 
  return reporter;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReporterActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Reporter);

