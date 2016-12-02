import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    Button,
    Intent,
    ProgressBar,
    Toaster,
} from "@blueprintjs/core";

import * as ReporterActions from '../actions/reporter';


class Reporter extends Component {
  componentDidMount() {
    //this.props.beginLoadFileData();
     this.setState({
       toasterKey: this.refs.uploadProgressToaster.show(this.renderUploadProgress(0)),
     });
  }

  componentWillReceiveProps(props) {
    if(props.fileUploadProgress) {
      this.refs.uploadProgressToaster.update(this.state.toasterKey, this.renderUploadProgress(props.fileUploadProgress*100));
    }
  }

  renderUploadProgress(amount) {
      return {
          iconName: "cloud-upload",
          message: (
              <ProgressBar
                  className={amount >= 100 ? "pt-no-stripes" : '' }
                  intent={amount < 100 ? Intent.PRIMARY : Intent.SUCCESS}
                  value={amount / 100}
              />
          ),
          timeout: amount < 100 ? 0 : 2000,
      };
  }

  render() {
    return (
      <div className="Reporter">
      <Toaster {...this.state} ref='uploadProgressToaster'/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { 
    reporter,
    uploader: {present}
  } = state;

  // const {

  // } = reporter || {

  // };
  // return 

  const 
    fileUploadProgress = present.get('fileUploadProgress')

  return {
    fileUploadProgress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReporterActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Reporter);

