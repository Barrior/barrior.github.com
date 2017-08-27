module.exports = {
    key: 'koa:sess',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
};