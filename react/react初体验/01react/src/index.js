import App from './App';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux'
import { HashRouter } from 'react-router-dom';
import { Suspense } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HashRouter>
            <Suspense>
                <App />
            </Suspense>
        </HashRouter>
    </Provider>
);
