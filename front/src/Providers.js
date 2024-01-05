import { node } from 'prop-types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'store';
import i18n from 'translations';

const Providers = ({ children }) => {
  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <StoreProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <HelmetProvider>{children}</HelmetProvider>
            </PersistGate>
          </StoreProvider>
        </BrowserRouter>
      </I18nextProvider>
    </React.StrictMode>
  );
};

Providers.propTypes = {
  children: node
};

export default Providers;
