let getcategory = async function (req, res) {
    let queryArray = [];
    let query = req.query,
        options;
    let typeID = req.body.id;
    if (typeID) query.push({ ["id"]: typeID });
    options = {
        table: schema.product_values.table,
        query: queryArray,
        limit: query.length || "",
    };
    let and;
    if (query && query.search && query.search.value) {
        console.log(query.search.value);
        and = {
            condition: "OR",
            nest: [
                {
                    query: [
                        {
                            name: `%${query.search.value}%`,
                            operator: "like",
                            condition: "OR",
                        },
                        {
                            description: `%${query.search.value}%`,
                            operator: "like",
                            condition: "OR",
                        },
                        {
                            status: `%${query.search.value}%`,
                            operator: "like",
                            condition: "OR",
                        },
                    ],
                },
            ],
        };
    }
    //console.log( query.search.value);
    if (query && query.search.value) {
        queryArray.push({ id: 0, operator: "!=", and });
    }
    let totalCount = 0;
    if (query.count) {
        totalCount = await new Promise((resolve, reject) => {
            options.limit = "";
            options.count = true;
            databaseHelper.getRecord(options, async function (response) {
                resolve(response);
            });
        });
    }
    // options reset for complete data
    options.limit = query.length || "";
    options.offset = query.start;
    options.count = false;
    databaseHelper.getRecord(options, async function (response) {
        console.log(response);
        let errMsg =
            response && Object.keys(response).length === 0
                ? config.messages.messages.success.EMPTY_DATA
                : config.messages.messages.success;
        let resMsg = utils.generateResponse(
            config.statusCodes.OK,
            config.messages.messages.success.SUCCESS_MESSAGE,
            {
                status: config.statusCodes["OK"],
                message: errMsg,
                total_record: totalCount,
                data: response,
            }

        );
        res.send(resMsg);
    });
}