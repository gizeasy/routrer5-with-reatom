import createRouter from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';

export const ROUTES_NAMES = {
    ROOT: 'ROOT',
    SECTION_1: 'SECTION_1',
    SECTION_1_PAGE: 'SECTION_1.PAGE',
    SECTION_2: 'SECTION_2',
    SECTION_2_PAGE: 'SECTION_2.PAGE',
};

export const routes = [
    { name: ROUTES_NAMES.ROOT, path: '/' },
    { name: ROUTES_NAMES.SECTION_1, path: '/section-1' },
    { name: ROUTES_NAMES.SECTION_1_PAGE, path: '/page?:param' },
    { name: ROUTES_NAMES.SECTION_2, path: '/section-2' },
    { name: ROUTES_NAMES.SECTION_2_PAGE, path: '/page:param' },
];

export function configRouter() {
    const router = createRouter(routes, {
        defaultRoute: ROUTES_NAMES.ROOT,
    });

    router.usePlugin(loggerPlugin);
    router.usePlugin(
        browserPlugin()
    );

    return router;
}

export const router = configRouter();
