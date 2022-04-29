const { updateEntity } = require("../service/tableService");

module.exports = async function (context, req) {
   
    try {
        if(!req.body) {
            context.res = {
                status: 400,
                body: error.message,
            };
            return;
        }

        const { title, content} = req.body;

        if (!title && !content) {
            context.res = {
                status: 400,
                body: "Title and content are required.",
            };
            return;
        }

        const { product, id } = context.bindingData;
        
        const entity = {
            PartitionKey: { '_': product },
            RowKey: { '_': id.toString() }
        }

        if(title) {
            entity.title = { _: title };
        }
        
        if(content) {
            entity.content = { _: content };
        }

        await updateEntity("Products", entity);

    } catch (error) {
        context.res = {
            status: 500,
            body: error.message
        };
    }
}