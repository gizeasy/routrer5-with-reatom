import React from 'react';
import './App.css';
import logo from './logo.svg';
import { useAction, useAtom } from '@reatom/react';
import { navigateTo } from './router5reatom/plugin';
import { ConnectedLink, Link } from 'react-router5';
import { ROUTES_NAMES } from './modules/router';
import { routerAtom } from './router5reatom/plugin';

export function App() {
    const routerName = useAtom(routerAtom, (state) => state.route && state.route.name);
    const routerTitle = useAtom(routerAtom, (state) => state.route && state.route.title);

    const handleNavigateToSection1Page = useAction(() =>
        navigateTo({ name: ROUTES_NAMES.SECTION_1_PAGE, params: {param: 'foo'} })
    );
    const handleNavigateToSection2 = useAction(() => navigateTo({ name: ROUTES_NAMES.SECTION_2 }));

    return (
        <div className="App">
            <header className="App-header">
                <p className="App-PageTitle">{routerTitle || routerName}</p>
                <img src={logo} className="App-logo" alt="logo" />
                <Link className="App-link" routeName={ROUTES_NAMES.ROOT}>
                    ROOT - Link
                </Link>
                <ConnectedLink className="App-link" routeName={ROUTES_NAMES.SECTION_1}>
                    SECTION_1 - ConnectedLink
                </ConnectedLink>
                <p onClick={handleNavigateToSection1Page} className="App-link">
                    SECTION_1_PAGE - onClick
                </p>
                <p onClick={handleNavigateToSection2} className="App-link">
                    SECTION_2 - onClick
                </p>
            </header>
        </div>
    );
}

export default App;
