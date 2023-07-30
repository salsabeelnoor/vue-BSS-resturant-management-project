export default (to, from, next) => {
    let user = localStorage.getItem('user');
    if(user != null && user.length > 0){
        next()
    }
    else {
        localStorage.removeItem('user')
        next('/login')
    }
}