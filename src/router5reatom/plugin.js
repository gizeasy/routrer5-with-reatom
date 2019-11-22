import { declareAction, declareAtom } from '@reatom/core';

export const start = declareAction();
export const stop = declareAction();
export const transitionStart = declareAction();
export const transitionCancel = declareAction();
export const transitionError = declareAction();
export const transitionSuccess = declareAction();
export const navigateTo = declareAction();
export const cancelTransition = declareAction();
export const canDeactivate = declareAction();
export const canActivate = declareAction();
export const clearErrors = declareAction();

const initState = {
    route: null,
    previousRoute: null,
    transitionRoute: null,
    transitionError: null,
};

export const routerAtom = declareAtom(initState, (on) => [
    on(transitionStart, (state, { toState, fromState }) => ({
        ...state,
        transitionRoute: toState,
        transitionError: null,
    })),
    on(transitionSuccess, (state, { toState, fromState }) => ({
        ...state,
        route: toState,
        transitionRoute: null,
        transitionError: null,
        previousRoute: fromState,
    })),
    on(transitionError, (state, { toState, fromState, err }) => ({
        ...state,
        transitionRoute: toState,
        transitionError: err,
    })),
    on(clearErrors, (state, { toState, fromState }) => ({
        ...state,
        transitionRoute: null,
        transitionError: null,
    })),
]);

const plugin = (dispatch) => {
    return () => ({
        onStart() {
            dispatch(start());
        },
        onStop() {
            dispatch(stop());
        },
        onTransitionStart(toState, fromState) {
            dispatch(transitionStart({ toState, fromState }));
        },
        onTransitionCancel(toState, fromState) {
            dispatch(transitionCancel({ toState, fromState }));
        },
        onTransitionSuccess(toState, fromState) {
            dispatch(transitionSuccess({ toState, fromState }));
        },
        onTransitionError(toState, fromState, err) {
            dispatch(transitionError({ toState, fromState, err }));
        },
    });
};

export function getAtomName(atom) {
    return Object.keys(atom())[0]; // как еще можно достать имя атома?
}

export function getActionType(action) {
    return action().type; // так ли достовать тип ?
}

export function router5WithReatom(store, router) {
    const dispatch = store.dispatch;
    const navigateToType = getActionType(navigateTo);
    const cancelTransitionType = getActionType(cancelTransition);
    const canDeactivateType = getActionType(canDeactivate);
    const canActivateType = getActionType(canActivate);

    // в этом месте dispatch не срабатывает, ни ошибки ни чего
    // хотел тут задиспачить начальный стейт роутера
    // вместо этого пришлось создавать getInitRouterAtomState

    router.usePlugin(plugin(dispatch));

    store.subscribe((action) => {
        switch (action.type) {
            case navigateToType:
                router.navigate(action.payload.name, action.payload.params, action.payload.opts);
                break;
            case cancelTransitionType:
                router.cancel();
                break;
            case canDeactivateType:
                router.canDeactivate(action.payload.name, action.payload.canDeactivate);
                break;
            case canActivateType:
                router.canActivate(action.payload.name, action.payload.canDeactivate);
                break;
            default:
                break;
        }
    });
}

export function getInitRouterAtomState(router) {
    return {
        [getAtomName(routerAtom)]: {
            ...initState,
            route: router.getState(),
        },
    };
}
