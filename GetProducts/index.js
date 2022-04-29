const azure = require('azure-storage');
const { queryEntities } = require("../service/tableService");

module.exports = async function (context, req) {
    
    try {
        const product = context.bindingData.product; 
        var query = new azure.TableQuery().where('PartitionKey eq ?', product);
        const result = await queryEntities("products", query);
        context.res = {
            status: 200,
            body: result
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        }
    }
}