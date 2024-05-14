import { resetUser, store } from 'store';

export const logoutUser = () => {
  store.dispatch(resetUser());
};
