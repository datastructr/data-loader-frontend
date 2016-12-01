import React, {Component, PropTypes} from 'react';

class TableToolbar extends Component {

  render() {
    let toolbarItems = [
      {"text": 'Cancel', "icon": 'pt-icon-trash App-failure-text'},
      {"text": 'Reset All', "icon": 'pt-icon-refresh App-warning-text'},
      {"text": 'Undo', "icon": 'pt-icon-undo'},
      {"text": 'Redo', "icon": 'pt-icon-redo'},
      {"text": 'History', "icon": 'pt-icon-history'},
      {"text": 'Compare', "icon": 'pt-icon-comparison'},
      {"text": 'Search File', "icon": 'pt-icon-search-template'},
      {"text": 'Submit', "icon": 'pt-icon-changes App-success-text'}
    ];

    return (
      <div className="App-toolbar">
            {toolbarItems.map((item,i) => 
              <div  key={i} className="App-toolbar-item text-center">
                <span className={`pt-icon App-toolbar-item-icon ${item.icon}`}></span>
                <p className="App-toolbar-item-text">{item.text}</p>
              </div>
            )}
      </div>
    );
  }
}

TableToolbar.propTypes = {
  // TODO
  someAction: PropTypes.func
};

export default TableToolbar;