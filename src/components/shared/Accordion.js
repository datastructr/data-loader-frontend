/* 
  Accordion Class
  mdramos
  Dynamic/Recursive a parent->child->child... relationship is required the whole object can be 
  named however you like. User defined how to render a base of each accordian level 

  todo: add onclick events for each levels
*/

import React, {Component, PropTypes} from 'react';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openLevelRow: "", // this is the current open level row in an accordion
      selfLevelObject: props.newLevel, // the current level object containing all rows and their data/children
      childSelector: props.childSelector,
      uniqueSelector: props.uniqueSelector,
      renderBaseFunc: props.renderBaseFunc || (() => '') // the render function a user must define
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

  generateAccordionBody(row) {
    const {
      childSelector,
      uniqueSelector,
      renderBaseFunc
    } = this.state;

    if(!row[childSelector]) {
      // this will be whatever body the user wants to pass
      return renderBaseFunc(row);
    } else {
      return (<Accordion newLevel={row[uniqueSelector][childSelector]} />);
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

              <div className="accordion-hold-self-level" key={i} >
                {/* This is an individual collapsable Row */}
                <div onClick={this.toggleOpenClose.bind(this, row[uniqueSelector])} className="accordion-title-row">
                  <p className="accordion-title"> {row[uniqueSelector]}</p>
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
                    this.generateAccordionBody(row)
                }
              </div> 
          )}
        </div>
    );
  }
}

Accordion.propTypes = {
  newLevel: PropTypes.object.isRequired,
  uniqueSelector: PropTypes.string.isRequired,
  renderBaseFunc: PropTypes.func.isRequired,
  childSelector: PropTypes.string
};

export default Accordion;