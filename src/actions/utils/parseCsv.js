import _ from 'lodash';

export default class ParseCSV {
  constructor(data) {
    this.initialRead = data;
    this.parsedData = {
      tableData: {},
      headerData: {}
    };
  }

  /**
   * 
   **/
  _parseDataFromLoadedCsv() {
    let self = this;
    let rowIndex = 0;
    // use the first object to determine the headers
    _.forIn(self.initialRead[0], (value,column) => {
      // create a header object
      self.parsedData.headerData[rowIndex++] = {
        id: column,
        validated: false,
        validating: false,
        validatePass: false,
        validateFail: false,
        validateMessage: '',
        rowsPassedCount: 0,
        rowsPassedFailed: 0,
        valueDefinedType: '',
        headerDragging: false,
        headerMapped: false,
        headerMap: {},
      };
    });

    // restructure each table cell
    _.each(self.initialRead, (row,i) => {
      // init row map
      self.parsedData.tableData[i] = {};
      // add cells to row
      _.forIn(row, (value, column) => {
        self.parsedData.tableData[i][`c:${column}-r:${i}`] = {
          id: `c:${column}-r:${i}`,
          column: column,
          row: i,
          value: value,
          validated: false,
          validating: false,
          validateFail: false,
          validatePass: false,
          validateMessage: '',
          contentEditing: false,
          rulesPassed: [],
          rulesFailed: []
        }
      });

      return self.parsedData.tableData;
    });
    
  }

  shapeCsvAndRetrieve(){
    this._parseDataFromLoadedCsv();

    return this.parsedData;
  }

} 