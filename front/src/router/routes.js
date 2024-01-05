import { roles } from 'constants/roles';

const routes = {
  home: {
    path: '/'
  },
  designSystem: {
    path: '/design-system'
  },
  login: {
    path: '/connexion'
  },
  forgotPassword: {
    path: '/mot-de-passe-oublie'
  },
  resetPassword: {
    path: '/nouveau-mot-de-passe'
  },
  adminPage: {
    path: '/admin-page',
    authorize: [roles.admin, roles.role1]
  },
  userPage: {
    path: '/user-page',
    authorize: [roles.user, roles.role2]
  }
};

export default routes;
