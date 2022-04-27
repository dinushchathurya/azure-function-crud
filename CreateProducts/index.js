const {insertEntity} = require('../service/tableService');

module.exports = async function (context, req) {
    try {

        if (!req.body) {
            context.res = {
                status: 400,
                body: "Request body required",
            };
            return;
        }

        const { product, title, content } = req.body;

        if (!product || !title || !content) {
            context.res = {
                status: 400,
                body: "Please pass product, title and content in the request body",
            };
            return;
        }

        const entity = {
            PartitionKey: { _: product },
            RowKey: { _: new Date().getTime().toString() },
            title: { _: title },
            content: { _: content },
        };

        const result = await insertEntity("Products", entity);

        context.res = {
            status: 200,
            body: result,
        };

    } catch (error) {
        context.res = {
            status: 500,
            body: `Request error. ${error.message}`,
        };
    }
}