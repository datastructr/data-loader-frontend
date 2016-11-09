import React, {Component, PropTypes} from 'react';

import CSVTableRow from './csvTableRow';

class CSVTable extends Component {

  render() {
    const {
      tableData,
      headerData
    } = this.props;

    var rows = [];

    let header = <CSVTableRow values={headerData} isHeader={true}/>
    
    tableData.forEach((row,i) => {
      rows.push(<CSVTableRow key={i} values={row} isHeader={false}/>);
    });

    return (
      <table>
        <thead>
          {header}
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

CSVTable.propTypes = {
  tableData: PropTypes.array.isRequired,
  headerData: PropTypes.array.isRequired
};

export default CSVTable;