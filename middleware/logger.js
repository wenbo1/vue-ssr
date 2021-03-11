/**
 * 服务器级中间件
 * @param req
 * @param res
 * @param next
 */
export default function (req, res, next) {
    // console.log(req)
    // console.log(req.url)
    const host = req.headers['host'];

    next()
}
