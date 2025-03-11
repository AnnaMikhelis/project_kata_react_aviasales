import { createRoot } from 'react-dom/client';
import './index.module.scss';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
