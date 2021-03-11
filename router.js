import Vue from 'vue';
import Router from 'vue-router';

import formatRoutes from "@/utils/formatRoutes";

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: formatRoutes(),
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    selector: to.hash
                }
            }
            if (savedPosition) {
                return savedPosition
            } else {
                return {x: 0, y: 0}
            }
        }
    })
}
