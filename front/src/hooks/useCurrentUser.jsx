import { useDispatch, useSelector } from 'react-redux';

import { useFetch } from 'hooks';
import { resetUser } from 'store';

export const useCurrentUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { call: logoutCall, loading: logoutLoading } = useFetch();

  const logoutUser = async () => {
    const { status } = await logoutCall({ url: '/users/sign_out', method: 'delete' });
    if (status === 204) dispatch(resetUser());
  };

  return { isLoggedIn: user.isLoggedIn, user, logoutUser, logoutLoading };
};
