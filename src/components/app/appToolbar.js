import React, {Component, PropTypes} from 'react';

import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

class TableToolbar extends Component {

  render() {

    let toolbarItems = [
      {
        "text": "File", 
        "subMenu": [
          {"name": 'Upload', "iconType": 'cloud-upload-o' },
          {"name": 'Reset All', "iconType": 'reload' },
          {"name": 'Cancel', "iconType": 'close-circle-o' },
          {"name": 'Submit', "iconType": 'save'}
        ]
      },
      {
        "text": "Edit", 
        "subMenu": [
          {"name": 'Undo', "iconType": 'rollback' },
          {"name": 'Redo', "iconType": 'rollback', "classExt": 'flip-horizontal' },
        ]
      },
      {
        "text": "Tools", 
        "subMenu": [
          {"name": 'History', "iconType": 'bars' },
          {"name": 'Search File', "iconType": 'search' }
        ]
      }
    ];

    return (
      <div className="App-toolbar">
        <Tabs animated={false} type="card" defaultActiveKey="1" onChange={this.callback}>
            {toolbarItems.map((item,i) => 
              <TabPane tab={item.text} key={i}>
                {item.subMenu.map((sub,i) => 
                  <div  key={i} className="App-toolbar-item text-center">
                    <Icon className={`App-toolbar-item-icon ${sub.classExt}`} type={sub.iconType} />
                    <p className="App-toolbar-item-text">{sub.name}</p>
                  </div>
                )}
          
              </TabPane>
            )}
        </Tabs>  
      </div>
    );
  }
}

TableToolbar.propTypes = {
  // TODO
  someAction: PropTypes.func
};

export default TableToolbar;