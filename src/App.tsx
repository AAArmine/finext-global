import Routes from './routes';
import './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ScrollToTop from 'components/ScrollToTopOnMount';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop>
              <Routes />
            </ScrollToTop>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
