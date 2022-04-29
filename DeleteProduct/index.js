const { deleteEntity } = require('../service/tableService');

module.exports = async function (context, req) {
    
    try {
        const { product, id } = context.bindingData;

        const entity = {
            PartitionKey: { _: product },
            RowKey: { _: id.toString() },
        };

        await deleteEntity("Products", entity);

    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
        
}