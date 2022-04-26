var azure = require('azure-storage');
var tableService = azure.createTableService(
    process.env.STORAGE_NAME,
    process.env.STORAGE_KEY
);