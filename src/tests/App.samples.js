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

export const testCsvData = {
      headerData: ['Field1','Field2','Field3','Field4','Field5','Field6','Field7','Field8'],
      tableData: [
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5],
        [25,1,4,5,25,1,4,5]
      ]
    }