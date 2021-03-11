import getPackage from './getPackage';

export default function (path) {
    let project = getPackage();
    if (project) {
        path += `/${project}`;
        return path;
    }
    return path + '/normal';
}
