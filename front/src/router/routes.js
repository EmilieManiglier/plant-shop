const routes = {
  default: {
    path: '/'
  },
  forgotPassword: {
    path: '/mot-de-passe-oublie'
  },
  home: {
    path: '/accueil',
    private: true
  },
  login: {
    path: '/connexion'
  },
  products: {
    path: '/plantes',
    private: true
  },
  productAdd: {
    path: '/plantes/nouveau',
    private: true
  },
  productShow: {
    path: '/plante/:id',
    private: true
  },
  userDashboard: {
    path: '/tableau-de-bord',
    private: true
  },
  userInformations: {
    path: '/tableau-de-bord/informations',
    private: true
  },
  userContact: {
    path: '/tableau-de-bord/informations-contact',
    private: true
  },
  userFavorites: {
    path: '/tableau-de-bord/favoris',
    private: true
  },
  resetPassword: {
    path: '/nouveau-mot-de-passe'
  },
  signUp: {
    path: '/inscription'
  }
};

export default routes;
