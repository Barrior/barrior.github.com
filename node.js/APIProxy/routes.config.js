module.exports = {
    'director/task/get-task-list': {
        method: 'get',
        filepath: 'getTaskList'
    },
    'get-bee-list': {
        method: 'post',
        filepath: 'getBeeList'
    },
    getMembers: {
        // 没有 method 默认 get
        // 没有 filepath 默认与路由名一致，如这个对应 getMembers 文件
        // filepath 对应 routes 目录下的文件
    },
    versionInfo: {}/*,
    'getMembers.html': {
        method: 'get',
        filepath: 'getMembers'
    }*/
};