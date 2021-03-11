import getPackage from './getPackage';

export default function () {
    let paths = [];
    let project = getPackage();
    if (project) {
        try {
            paths = [
                {
                    path: '/', app: '',
                    child: require(`../package/${project}/router`)
                },
            ]
        } catch (e) {
            paths = [];
        }
    }
    function pageRouter(paths) {
        let routes = []
        paths.forEach(item => {
            if (item.app.indexOf('/') !== 0) {
                item.app = '/' + item.app;
            }
            let cpn = require(`../package/${project}${item.app}`).default;
            let route = {
                path: item.path,
                component: cpn
            };
            if (item.child)
            {
                route.children = pageRouter(item.child);
            }
            if (item.rct)
            {
                route.redirect = item.rct;
            }
            routes.push(route);
        })
        return routes;
    }
    return pageRouter(paths);
}
