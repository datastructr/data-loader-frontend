import _ from 'lodash';

import colors from './colors';

export default class ParseCSV {
  constructor(data) {
    this.initialRead = data; // data to apply weights and averages on
    this.parsedData = {
      tableData: [],
      headerData: []
    };
    this.colorScheme = colors; // availible color scheme to generate coloring
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
        colorScheme: self._generateColorForHeader(),
        fieldMapped: false,
        fieldMapping: {}
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

  _generateColorForHeader() {
    let self = this;
    let result = false;
    while(!result){
    let rnd = Math.floor(Math.random()*self.colorScheme.length)
      if(self.colorScheme[rnd].free) {
        self.colorScheme[rnd].free = false;
        result = self.colorScheme[rnd];
      }
    }

    return result;
  }

  shapeCsvAndRetrieve(){
    this._parseDataFromLoadedCsv();

    return this.parsedData;
  }

} 