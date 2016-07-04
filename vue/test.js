
var vm = new Vue({
	el: $container.find( '.comments' )[0],
    data: {
        newsid: cid,
        count: data.count,
        isSignin: data.is_signin,
        info: data.comment
    }
})