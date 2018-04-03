require('../../models/connect_db');

const HouseModel = require('../../models/house');

// 分页填充没有 createAt 字段的文档
async function fillCreateAtField() {
    const count = await HouseModel.find({
        entryTime: {$exists: true},
        createAt: {$exists: false}
    }).count();

    const limit = 100;
    const times = Math.ceil(count / limit);

    for (let i = 0; i < times; i++) {
        console.log(`匹配第 ${i} 页数据，共 ${times} 页`);
        const skipTotal = i * limit;
        const list = await HouseModel.find().limit(limit).skip(skipTotal);
        for (const data of list) {
            await HouseModel.findByIdAndUpdate(data.id, {
                createAt: data.entryTime
            }).catch(console.log);
        }
    }

    process.exit(0);
}

try {
    fillCreateAtField();
} catch (e) {
    console.error(e);
}