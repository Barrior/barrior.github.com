const HouseModel = require('../models/house');

const defaultRes = Object.freeze({
    code: 0,
    message: '成功',
});

// get house list by some params
exports.list = async (ctx) => {
    const res = Object.assign({}, defaultRes);
    const query = ctx.request.query;

    console.log(query);

    // 当前页码，页码不能小于 1
    let pageIndex = Math.max(Number(query.pageIndex) || 1, 1);
    // 每页记录条数，不能小于 1
    let pageSize = Math.max(Number(query.pageSize) || 20, 1);
    // 总页码
    let pageCount;
    // 总记录数
    let total;

    try {
        total = await HouseModel.count();
        pageCount = Math.ceil(total / pageSize);

        // 不能跳过最大总页码
        pageIndex = Math.min(pageIndex, pageCount);

        const skipTotal = (pageIndex - 1) * pageSize;

        let list = [];
        if (query.sort) {
            list = await HouseModel.find()
                .skip(skipTotal).limit(pageSize)
                .sort({
                    [query.sort]: query.sortType === 'asc' ? 1 : -1
                });
        } else {
            list = await HouseModel.find().skip(skipTotal).limit(pageSize);
        }

        res.data = {list, pageCount};
    } catch (err) {
        res.code = 1;
        res.message = err;
    }

    ctx.body = res;
};