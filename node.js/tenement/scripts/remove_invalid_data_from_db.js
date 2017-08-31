const connectDB = require('../models/connect_db');
const HouseModel = require('../models/house');

// 删除无效数据
async function removeInvalidData() {
    await HouseModel.remove({
        title: '',
        area: 'NaN',
    });
    console.log('remove invalid data completed.');
}

// 分页删除重复数据
async function removeDuplicateData() {
    const duplicateId = {};
    const count = await HouseModel.count();
    const limit = 200;
    const times = Math.ceil(count / limit);

    for (let i = 0; i < times; i++) {
        console.log(`匹配第 ${i} 页数据，共 ${times} 页`);
        const skipIndex = i * limit;
        const list = await HouseModel.find().limit(limit).skip(skipIndex);
        for (const data of list) {

            // 不在已经重复的 id 列表，才查找重复项
            if (!duplicateId[data.id]) {
                const duplicateData = await HouseModel.find({
                    title: data.title,
                    releaseTime: data.releaseTime,
                    price: data.price,
                });

                // 跳过自身
                if (duplicateData.length > 1) {
                    duplicateData.forEach((item) => {
                        if (item.id !== data.id) {
                            duplicateId[item.id] = true;
                        }
                    });
                }
            }
        }
    }

    const someId = Object.keys(duplicateId);
    for (const _id of someId) {
        await HouseModel.remove({_id});
    }

    console.log('remove duplicate data completed.');
    process.exit();
}

async function start() {
    try {
        await connectDB();
        await removeInvalidData();
        removeDuplicateData();
    } catch (e) {
        console.error(e);
    }
}

start();