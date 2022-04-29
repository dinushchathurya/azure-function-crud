var azure = require('azure-storage');
var tableService = azure.createTableService(
    process.env.STORAGE_NAME,
    process.env.STORAGE_KEY
);

/* insert new entity */
const insertEntity = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableService.insertEntity(
          tableName,
          entity,
          {
            echoContent: true,
            payloadFormat: "application/json;odata=nometadata",
          },
          (error, result, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response.body);
            }
          }
        );
    });
}

/* get all entities */
const queryEntities = (tableName, query) => {
    return new Promise((resolve, reject) => {
        tableService.queryEntities(
          tableName,
          query,
          null,
          {
            echoContent: true,
            payloadFormat: "application/json;odata=nometadata",
          },
          (error, result, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response.body);
            }
          }
        );
    });
}

exports.insertEntity = insertEntity;
exports.queryEntities = queryEntities;