const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
    // 房间缩略图地址
    thumbnailUrl: String,
    // 房间详情页地址
    detailPageUrl: String,
    // 标题
    title: String,
    // 相对入库时间的发布时间
    releaseTime: String,
    // 创建时间
    createAt: {type: Date, default: Date.now},
    // 入库时间
    entryTime: {type: Date, default: Date.now},
    // 价格
    price: String,
    // 支付方式
    payWay: String,
    // 租赁方式
    leaseWay: String,
    // 户型
    houseType: String,
    // 房间面积
    area: String,
    // 朝向
    orientation: String,
    // 所属楼层，及总楼层
    floor: String,
    // 小区名
    estateName: String,
    // 所在市区
    district: String,
    // 所在街道
    street: String,
    // 详细地址
    address: String,
    // 家电设备
    appliances: [String],
    // 房间特色
    feature: [String],
    // 出租要求
    claim: [String],
    // 描述
    descriptions: String,
    // 房屋照片
    pictures: [String],
    // 联系信息
    contact: {
        // 姓名
        name: String,
        // 头像
        avatar: String,
        // 电话
        phone: String,
    }
});

module.exports = mongoose.model('House', houseSchema);