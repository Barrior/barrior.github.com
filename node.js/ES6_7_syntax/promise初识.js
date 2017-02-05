let p1 = new Promise( ( resolve, reject ) => {
    setTimeout( () => {

        //resolve( '成功' );
        reject( '失败' );

    }, 400 )
});

p1.then( ( msg ) => {

    //成功调用这个函数
    console.log( msg )

}, ( msg ) => {

    //失败调用这个函数
    console.log( msg )
    //输出一个未定义的参数，会报错，但是使用了catch()方法捕获错误后，则捕获错误，不影响其他代码执行
    console.log( undefinedParam )

})
.catch( ( error ) => {
    console.log( error )
});