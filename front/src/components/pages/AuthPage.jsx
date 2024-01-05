import clsx from 'clsx';
import { oneOf } from 'prop-types';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordForm, LoginForm, ResetPasswordForm } from 'components';
import { roles } from 'constants';
import { useSafeState } from 'hooks';
import { routes } from 'router';
import { setUser } from 'store';

const AuthPage = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useSafeState(false);
  const [requestPassword, setRequestPassword] = useSafeState({ success: false, email: '' });

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
  } = useForm({ mode: 'all', defaultValues });

  const buttonClassList = useMemo(() => {
    return clsx('mt-6 button is-primary is-borderless', {
      'cursor-disallow is-light': !isValid,
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

  const logUser = async (/* data */) => {
    try {
      setIsLoading(true);
      // TODO : remove this and insert authentication logic here
      await new Promise((res) => setTimeout(res, 1500));
      const data = { token: 'testToken', firstname: 'Obiwan', lastname: 'Kenobi', role: 'user' };

      if (data) {
        dispatch(setUser({ ...data, isLoggedIn: true }));
        const path = data?.role === roles.admin ? routes.adminPage.path : routes.userPage.path;
        navigate(path, { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const requestNewPassword = async ({ email }) => {
    try {
      setIsLoading(true);
      // TODO: Remove this and insert authentication logic here (example: send email to user)
      await new Promise((res) => setTimeout(res, 1500));
      setRequestPassword((prev) => ({ ...prev, success: true, email: email }));
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (/* data */) => {
    try {
      setIsLoading(true);
      // TODO: Remove this and insert authentication logic here
      await new Promise((res) => setTimeout(res, 1500));
      setRequestPassword((prev) => ({ ...prev, success: true }));
    } finally {
      setIsLoading(false);
    }
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
    <div className="columns">
      <div className="column is-one-quarter-desktop">
        <FormProvider {...formProviderValues}>
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
