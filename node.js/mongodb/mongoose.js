const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useMongoClient: true,
}, (err) => {
    if (err) return console.log(err);

    // 创建数据类型模型
    const kittySchema = mongoose.Schema({
        name: String,
        cute: Number,
    });

    // 注册模型
    const Kitten = mongoose.model('collection_name', kittySchema);

    // 生成文档对象
    const silence = new Kitten({
        name: 'Silence',
        cute: 9
    });

    // 操作对象，保存到数据库
    console.log( silence )
    silence.save((err, silence) => {
        if (err) {
            console.log(err);
        }
        console.log('保存成功')
    });
});