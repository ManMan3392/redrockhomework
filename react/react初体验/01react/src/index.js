import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { UserContext, ThemeContext } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HashRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <UserContext.Provider value={{ name: 'zmy', age: 18 }}>
                    <ThemeContext.Provider value={{ color: 'red', size: 30 }}>
                        <App />
                    </ThemeContext.Provider>
                </UserContext.Provider>
            </Suspense>
        </HashRouter>
    </Provider>
);
