export default function () {
    let args = process.argv;
    let project = '';
    for (const arg of args) {
        if (arg.indexOf('--package:') > -1) {
            let Package = arg.split(':');
            project = Package[1];
            break;
        }
    }
    if (process.browser) {
        project = __NUXT__.config.package;
    }
    return project;
}
