import _ from 'lodash';

export default class ParseCSV {
  constructor(data) {
    this.initialRead = data;
    this.parsedData = {
      tableData: [],
      headerData: []
    };
  }

  /**
   * 
   **/
  _parseDataFromLoadedCsv() {
    let self = this;

    // use the first object to determine the headers
    _.forIn(self.initialRead[0], (value,column) => {
      self.parsedData.headerData.push({
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
      });
    });

    // restructure each table cell
    self.parsedData.tableData = _.map(self.initialRead, (row,i) => {
      let rowList = [];
      _.forIn(row, (value, column) => {
        rowList.push({
          id: `${column}:row:${i}`,
          value: value,
          validated: false,
          validating: false,
          validateFail: false,
          validatePass: false,
          validateMessage: '',
          contentEditing: false
        });
      });

      return rowList;
    });
    
  }

  shapeCsvAndRetrieve(){
    this._parseDataFromLoadedCsv();

    return this.parsedData;
  }

} 