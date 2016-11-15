import _ from 'lodash';

export default class ParseSchema {
  constructor(data) {
    this.initialRead = data; 
    this.parsedData = {
      availableSchemas: []
    };
  }

  /**
   * 
   **/
  _parseDataFromSchemas() {
    let self = this;

    // use the first object to determine the headers
    self.parsedData.availableSchemas = self.initialRead.availableSchemas
      .reduce( (newList,schema) => {
          newList = newList || [];
          newList.push({
            name: schema.name,
            properties: _.map(schema.properties, (prop) => {
              return Object.assign({}, prop, {
                fieldMapped: false,
                fieldMapping: false,
                fieldMap: {},
                belongsTo: schema.name
              });
            }) 
          });
          return newList;
      }, [])
  }

  shapeSchemasAndRetrieve(){
    this._parseDataFromSchemas();

    return this.parsedData;
  }

} 