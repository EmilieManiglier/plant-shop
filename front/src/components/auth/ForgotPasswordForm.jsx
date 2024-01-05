import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FormInput } from 'components';
import { mailRegex } from 'constants';
import { routes } from 'router';

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const { register, errors, isValid, isLoading, onSubmit, request, submitClasses } = useFormContext();

  return (
    <>
      {!request.success && (
        <>
          <h2>{t('auth:forgotPassword.title')}</h2>
          <form onSubmit={onSubmit}>
            <FormInput
              name="email"
              label={t('form:email')}
              type="email"
              register={register}
              rules={{
                required: true,
                pattern: {
                  value: mailRegex,
                  message: 'emailInvalid'
                }
              }}
              errors={errors}
              className="mt-6 is-block"
            />
            <button type="submit" disabled={!isValid || isLoading} className={submitClasses}>
              {t('form:submit')}
            </button>
          </form>
        </>
      )}

      {request.success && (
        <>
          <p>{t('auth:forgotPassword.successTitle', { email: request.email })}</p>
          <p>{t('auth:forgotPassword.successContent')}</p>
          <Link to={routes.login.path} className="button is-primary mt-5">
            {t('auth:login.button')}
          </Link>
        </>
      )}
    </>
  );
};

export default ForgotPasswordForm;
