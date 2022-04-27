var azure = require('azure-storage');
var tableService = azure.createTableService(
    process.env.STORAGE_NAME,
    process.env.STORAGE_KEY
);

const insertEntity = (tableName, entity) => {
    return new Promise((resolve, reject) => {
        tableService.insertEntity(
            tableName, 
            entity, {
                echoContent: true, 
                payloadFormat: "application/json;odata=nometadata" 
            }, (error, result, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

exports.insertEntity = insertEntity;