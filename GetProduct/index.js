const azure = require('azure-storage');
const { queryEntities } = require('../service/tableService');

module.exports = async function (context, req) {
    
    try {
        const { product, id } = context.bindingData;
        var query = new azure.TableQuery().where("PartitionKey eq ? and RowKey eq ?", product , id.toString());
        const result = await queryEntities("products", query);
        context.res = {
            status: 500,
            body: result,
        }; 
    } catch (error) {
        context.res = {
            status: 500, 
            body: error.message
        };  
    }
   
}