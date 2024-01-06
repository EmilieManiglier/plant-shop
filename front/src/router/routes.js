import { roles } from 'constants/roles';

const routes = {
  default: {
    path: '/'
  },
  forgotPassword: {
    path: '/mot-de-passe-oublie'
  },
  home: {
    path: '/accueil',
    authorize: [roles.user]
  },
  login: {
    path: '/connexion'
  },
  products: {
    path: '/plantes',
    authorize: [roles.user]
  },
  resetPassword: {
    path: '/nouveau-mot-de-passe'
  }
};

export default routes;
