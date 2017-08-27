// get login state
app.use(async (ctx, next) => {
    const loginState = ctx.cookies.get('loginState', {signed: true});
    try {
        const uid = encryption.decipher(loginState);
        await User.findOne({_id: uid}).then((userInfo) => {
            if (userInfo) {
                Object.freeze(userInfo);
                utils.defineReadOnlyProperty(ctx, 'logined', userInfo);
            }
        });
    } catch (e) {

    }
    await next();
});