import getPackage from './getPackage';

export default function (routes, resolve) {
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
            var route = {
                path: item.path,
                component: resolve(`@/package/${project}/${item.app}`)
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
    Object.assign(routes, pageRouter(paths));
}
