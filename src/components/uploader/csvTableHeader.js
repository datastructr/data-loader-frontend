import React, {Component, PropTypes} from 'react';

/** 
 * this is the  draggable source 
 *  the target will be the schema 
 */


class CSVTableHeader extends Component {
  render() {
    return (
        <th className="Uploader-table-header">
          {this.props.value}
        </th>
    );
  }
}

CSVTableHeader.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ])
};

export default CSVTableHeader;