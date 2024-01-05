import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from 'components';

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const { register, errors, watch, isValid, trigger, isLoading, onSubmit, request, submitClasses } = useFormContext();
  const reset = watch('password');
  const confirm = watch('passwordConfirmation');

  useEffect(() => {
    const isPasswordValid = (reset?.length > 0 || confirm?.length > 0) && reset === confirm;
    isPasswordValid && trigger('password') && trigger('passwordConfirmation');
  }, [reset, confirm, trigger]);

  const validatePasswords = (value, match) => {
    return (value.length > 0 && value === match) || 'passwordConfirmationInvalid';
  };

  return (
    <>
      {!request.success && (
        <form onSubmit={onSubmit}>
          <FormInput
            name="password"
            label={t('form:password')}
            type="password"
            register={register}
            rules={{
              required: true,
              validate: (value) => validatePasswords(value, confirm),
              minLength: 6
            }}
            length="6"
            errors={errors}
            className="mt-6 is-block"
          />
          <FormInput
            name="passwordConfirmation"
            label={t('form:passwordConfirmation')}
            type="password"
            register={register}
            rules={{
              required: true,
              validate: (value) => validatePasswords(value, reset),
              minLength: 6
            }}
            length="6"
            errors={errors}
            className="mt-6 is-block"
          />

          <button type="submit" disabled={!isValid || isLoading} className={submitClasses}>
            {t('form:submit')}
          </button>
        </form>
      )}

      {request.success && <p>{t('auth:resetPassword.successTitle')}</p>}
    </>
  );
};

export default ResetPasswordForm;
