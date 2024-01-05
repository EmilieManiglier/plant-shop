import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import { routes } from 'router';
import { setUser, store } from 'store';

import App from './App';
import Providers from './Providers';

/* Mocking I18n because we want to only display I18n keys, not translations */
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

/* Mocking BrowserRouter because we want to manually manipulate routing history for tests */
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => children
}));

/* Creating the test environment for rendering the web app */
beforeAll(() => {
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
  window.root = ReactDOM.createRoot(document.getElementById('root'));
});

/* A tool to render the web app with an independent routing history for each test */
const renderApp = (initialEntries) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Providers>
        <App />
      </Providers>
    </MemoryRouter>
  );
};

// /* Route Unit tests */
describe('When accessing the private route, if not authenticated', () => {
  it('redirects to the Login Page', () => {
    renderApp([routes.userPage.path]);

    expect(screen.getByText('form:submit')).toBeInTheDocument();
  });
});

describe('When rendering the App if authenticated', () => {
  it('redirects to requested route', () => {
    act(() => {
      store.dispatch(
        setUser({ token: 'testToken', firstname: 'Obiwan', lastname: 'Kenobi', role: 'user', isLoggedIn: true })
      );
    });
    renderApp([routes.userPage.path]);

    expect(screen.getByText('User Page')).toBeInTheDocument();
  });
});

describe('When accessing a route which leads nowhere', () => {
  it('renders a 404 Page', () => {
    renderApp(['/route-which-does-not-exist']);
    expect(screen.getByText(/notFound/i)).toBeInTheDocument();
  });
});
