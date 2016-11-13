export const schemaSamples = {
  activeSchemaId: 1,
  availableSchemas: [
    {
        "name": "leads",
        "properties": [
          { "column_name":"fid","nullable":"False","primary_key":true,"type":"INTEGER" },
          { "column_name":"project_title","nullable":"False","primary_key":false,"type":"TEXT" },
          { "column_name":"project_number","nullable":"False","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"project_size","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"project_description","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"keyword","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"source","nullable":"False","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"project_announced","nullable":"True","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"tender_date","nullable":"True","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"implementing_entity","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"project_pocs","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"post_comments","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"submitting_officer","nullable":"False","primary_key":false,"type":"VARCHAR(255)" },
          { "column_name":"submitting_officer_contact","nullable":"False","primary_key":false,"type":"TEXT" },
          { "column_name":"link_to_project","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"business_url","nullable":"True","primary_key":false,"type":"TEXT" },
          { "column_name":"cleared","nullable":"True","primary_key":false,"type":"BOOLEAN" },
          { "column_name":"archived","nullable":"True","primary_key":false,"type":"BOOLEAN" },
          { "column_name":"auto_archive_date","nullable":"True","primary_key":false,"type":"DATE" },
          { "column_name":"the_geom","nullable":"True","primary_key":false,"type":"geometry(POINT,4326)" },
          { "column_name":"editable","nullable":"True","primary_key":false,"type":"BOOLEAN" },
          { "column_name":"locations","nullable":"True","primary_key":false,"type":"JSON" }
        ]
    },
    {
      "name": "nothing-here1"
    },
    {
      "name": "nothing-here2"
    },
    {
      "name": "nothing-here3"
    }
  ]
  
}

export const testFileData = [
  {"Field1": 25,"Field2": 1,"Field3": 869,"Field4": 2,"Field5": 5,"Field6": 345,"Field7": 54,"Field8": 23,},
  {"Field1": 61235,"Field2": 4784,"Field3": 89,"Field4": 2,"Field5": 45,"Field6": 6,"Field7": 54,"Field8": 324,},
  {"Field1": 325,"Field2": 1,"Field3": 145,"Field4": 2,"Field5": 45,"Field6": 24,"Field7": 54,"Field8": 54567,},
  {"Field1": 4,"Field2": 687,"Field3": 515,"Field4": 5213,"Field5": 45123,"Field6": 1234,"Field7": 54,"Field8": 324,},
  {"Field1": 356,"Field2": 6,"Field3": 145,"Field4":86,"Field5": 6,"Field6": 44,"Field7": 54,"Field8": 896,},
  {"Field1": 125,"Field2": 65,"Field3": 145,"Field4": 2,"Field5": 26,"Field6": 1234,"Field7": 54,"Field8": 324,},
  {"Field1": 65,"Field2": 1,"Field3": 32541,"Field4": 6458,"Field5": 67734,"Field6": 24,"Field7": 54,"Field8": 324,},
  {"Field1": 5,"Field2": 4578,"Field3": 145,"Field4": 2,"Field5": 833,"Field6": 6,"Field7": 54,"Field8": 324,},
  {"Field1": 25,"Field2": 1,"Field3": 145,"Field4": 2,"Field5": 4365,"Field6": 1234,"Field7": 54,"Field8": 324,},
];