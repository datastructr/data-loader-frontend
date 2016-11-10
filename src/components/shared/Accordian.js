/* 
  Accordian Class
  mdramos
  Dynamic/Recursive a parent->child->child... relationship is required the whole object can be 
  named however you like, but each child object needs to be identified as "children" (to change)
*/

import React, {Component, PropTypes} from 'react';

class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLevelRow: "", // this is the current open level row in an accordian
      selfLevelObject: props.newLevel, // the current level object containing all rows and their data/children
      childSelector: props.childSelector,
      uniqueSelector: props.uniqueSelector
    };
  }

  // This is our toggle open/close method
  // if row is already open, close it
  // uniqueSelector is unique per row, and also a key
  // in the selfLevelObject (could be a name, id)
  toggleOpenClose(uid) {
    // simple ternary assignment
    this.setState({
      openLevelRow: this.state.openLevelRow != uid ? uid : ""
    });
  }

  generateAccordianBody(row) {
    const {
      childSelector,
      uniqueSelector
    } = this.state;

    if(!row[childSelector]) {
      // this will be whatever body the user wants to pass
      return (<pre>hey test</pre>);
    } else {
      return (<Accordian newLevel={row[uniqueSelector][childSelector]} />);
    }
  }
    
  render () {  
    // deconstruct assignment from state
    const { 
      selfLevelObject, 
      openLevelRow, 
      uniqueSelector,
      childSelector
    } = this.state;
    
    return (
      <div>
          {selfLevelObject.map((row, i) =>

              <div className="accordian-hold-self-level" key={i} >
                {/* This is an individual collapsable Row */}
                <div onClick={this.toggleOpenClose.bind(this, row[uniqueSelector])} className="accordian-title-row">
                  <p className="accordian-title"> {row[uniqueSelector]}</p>
                </div>
                {/* 
                    When iterating the list, find out if a row has been opened
                */}
                {this.state.openLevelRow != row[uniqueSelector] ? <span></span> : 
                    /* 
                      This code block is called if the current row is opened
                      now we to need to find out if there are children,
                      if not, then we are at the bottom, do what ever 
                      you'd like with the bottom row
                    */
                    this.generateAccordianBody(row)
                }
              </div> 
          )}
        </div>
    );
  }
}

Accordian.propTypes = {
  newLevel: PropTypes.object.isRequired,
  uniqueSelector: PropTypes.string.isRequired,
  childSelector: PropTypes.string
};

export default Accordian;