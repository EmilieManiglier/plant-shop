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
  resetPassword: {
    path: '/nouveau-mot-de-passe'
  }
};

export default routes;
