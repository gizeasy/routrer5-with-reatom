import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { router } from './modules/router';
import { context } from '@reatom/react';
import { createStore } from '@reatom/core';
import { router5WithReatom, getInitRouterAtomState } from './router5reatom/plugin';

function Root({ router }) {
    const store = createStore(getInitRouterAtomState(router));
    router5WithReatom(store, router);
    return (
        <context.Provider value={store}>
            <RouterProvider router={router}>
                <App router={router} />
            </RouterProvider>
        </context.Provider>
    );
}

router.start(() => {
    ReactDOM.render(<Root router={router} />, document.getElementById('root'));
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
