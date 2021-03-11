export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
        // console.log(to.path, from);
        next();
    })
    app.router.afterEach((to, from) => {
        // console.log(to.path)
    })
}
