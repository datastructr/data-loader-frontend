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
      BaseComponent: props.BaseComponent || (() => ''), // the render function a user must define
      rowClassName: props.rowClassName || "",
      rowIconClassName: props.rowIconClassName || "",
      rowOpenClassName: props.rowOpenClassName || "",
      rowCloseClassName: props.rowCloseClassName || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({},this.state, {
      selfLevelObject: nextProps.newLevel || this.state.selfLevelObject, // the current level object containing all rows and their data/children
    }));
  }

  // This is our toggle open/close method
  // if row is already open, close it
  // uniqueSelector is unique per row, and also a key
  // in the selfLevelObject (could be a name, id)
  toggleOpenClose(uid) {
    // simple ternary assignment
    this.setState({
      openLevelRow: this.state.openLevelRow !== uid ? uid : ""
    });
  }

  generateAccordionBody(row) {
    const {
      childSelector,
      uniqueSelector,
      BaseComponent
    } = this.state;

    if(!row[childSelector]) {
      // this will be whatever body the user wants to pass 
      return (<BaseComponent base={row} />);
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
      childSelector,
      rowClassName,
      rowIconClassName,
      rowOpenClassName,
      rowCloseClassName
    } = this.state;

    return (
      <div>
          {selfLevelObject.map((row, i) => {
            console.log(">>>>>>>>>>>>>>>>")
            console.log(selfLevelObject)
            let rowOpen = this.state.openLevelRow === row[uniqueSelector];

            return (
              <div>
                <div className={rowClassName} key={i} >
                  {/* This is an individual collapsable Row */}
                  <div className="accordion-title-row" onClick={this.toggleOpenClose.bind(this, row[uniqueSelector])}>
                    <div> 
                      <span className={rowOpen ? rowOpenClassName : rowCloseClassName }></span>
                      <span className={rowIconClassName}></span> 
                      {' ' + row[uniqueSelector]}
                    </div>
                  </div>
                </div> 
                  {/* 
                      When iterating the list, find out if a row has been opened
                  */}
                  {rowOpen &&
                      /* 
                        This code block is called if the current row is opened
                        now we to need to find out if there are children,
                        if not, then we are at the bottom, do what ever 
                        you'd like with the bottom row
                      */
                      this.generateAccordionBody(row)
                  }
              </div> 
            );
            })}
        </div>
    );
  }
}

Accordion.propTypes = {
  newLevel: PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array
  ]),
  uniqueSelector: PropTypes.string.isRequired,
  BaseComponent: PropTypes.func.isRequired,
  childSelector: PropTypes.string,
  rowClassName: PropTypes.string,
  rowIconClassName: PropTypes.string,
  rowOpenClassName: PropTypes.string,
  rowCloseClassName: PropTypes.string
};

export default Accordion;