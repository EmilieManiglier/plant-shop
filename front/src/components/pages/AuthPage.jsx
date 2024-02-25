import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { oneOf } from 'prop-types';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Banner, ForgotPasswordForm, LoginForm, ResetPasswordForm } from 'components';
import { useFetch, useSafeState } from 'hooks';
import { routes } from 'router';
import { setUser } from 'store';

import authBackground from 'assets/img/background_1.jpg';
import 'assets/styles/pages/_auth-page.scss';

const AuthPage = ({ type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [requestPassword, setRequestPassword] = useSafeState({ success: false, email: '' });
  const [authError, setAuthError] = useSafeState({ login: '' });

  const { call: loginCall, loading: loginLoading } = useFetch();
  const { loading: forgotPasswordLoading } = useFetch();
  const { loading: resetPasswordLoading } = useFetch();

  const defaultValues = useMemo(() => {
    switch (type) {
      case 'forgotPassword':
        return { email: '' };
      case 'resetPassword':
        return { password: '', passwordConfirmation: '' };
      default:
        return { email: '', password: '' };
    }
  }, [type]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    clearErrors,
    trigger,
    getValues,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur', defaultValues });

  const isLoading = useMemo(
    () => loginLoading || forgotPasswordLoading || resetPasswordLoading,
    [loginLoading, forgotPasswordLoading, resetPasswordLoading]
  );

  const buttonClassList = useMemo(() => {
    return clsx('mt-6 btn', {
      'cursor-disallow': !isValid,
      'is-loading': isLoading
    });
  }, [isLoading, isValid]);

  useEffect(() => {
    return () => resetForm();
  }, [type, defaultValues]);

  const resetForm = () => {
    setRequestPassword({ success: false, email: '' });
    reset({ ...defaultValues });
  };

  const logUser = async () => {
    setAuthError((prev) => ({ ...prev, login: '' }));

    const { data, error, headers } = await loginCall({
      url: '/users/sign_in',
      method: 'post',
      params: {
        user: getValues()
      }
    });

    if (error?.status === 401) {
      setAuthError((prev) => ({ ...prev, login: t('auth:login.invalidCredentials') }));
    }

    if (!isEmpty(data)) {
      dispatch(setUser({ ...data, token: headers.authorization, isLoggedIn: true }));
      navigate(routes.home.path);
    }
  };

  const requestNewPassword = async ({ email }) => {
    // TODO: Remove this and insert authentication logic here (example: send email to user)
    await new Promise((res) => setTimeout(res, 1500));
    setRequestPassword((prev) => ({ ...prev, success: true, email: email }));
  };

  const resetPassword = async () => {
    // TODO: Remove this and insert authentication logic here
    await new Promise((res) => setTimeout(res, 1500));
    setRequestPassword((prev) => ({ ...prev, success: true }));
  };

  const formProviderValues = useMemo(() => {
    let submitCallback;

    switch (type) {
      case 'login':
        submitCallback = logUser;
        break;
      case 'forgotPassword':
        submitCallback = requestNewPassword;
        break;
      case 'resetPassword':
        submitCallback = resetPassword;
        break;
      default:
        break;
    }

    return {
      trigger,
      getValues,
      clearErrors,
      watch,
      register,
      isValid,
      errors,
      isLoading,
      submitClasses: buttonClassList,
      onSubmit: handleSubmit(submitCallback),
      request: requestPassword
    };
  }, [type, isValid, isLoading, errors]);

  return (
    <div className="min-h-screen relative">
      <div className="auth-page-img">
        <img src={authBackground} alt="" height="600" width="300" className="w-full h-full object-cover" />
      </div>

      <div className="auth-form">
        <FormProvider {...formProviderValues}>
          {authError?.[type] && <Banner type="error">{authError[type]}</Banner>}
          {type === 'login' && <LoginForm />}
          {type === 'forgotPassword' && <ForgotPasswordForm />}
          {type === 'resetPassword' && <ResetPasswordForm />}
        </FormProvider>
      </div>
    </div>
  );
};

AuthPage.propTypes = {
  type: oneOf(['login', 'forgotPassword', 'resetPassword']).isRequired
};

export default AuthPage;
