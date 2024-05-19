import { bool, func } from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput, Modal } from 'components';

const PasswordModal = ({ isOpen, setIsOpen, onClose }) => {
  const { t } = useTranslation();
  const {
    register,
    getValues,
    reset,
    trigger,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: { password: '' }
  });

  const providerValues = { register, getValues, errors };

  const onCancel = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = () => {
    if (!isValid) trigger();
    onClose(getValues('password'));
  };

  return (
    <Modal
      isOpen={isOpen}
      header={<div className="mb-12 h3 underlined">{t('auth:user.passwordModalTitle')}</div>}
      body={
        <FormProvider {...providerValues}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              type="password"
              name="password"
              label={t('form:password')}
              placeholder={t('form:placeholders.password')}
              icon="lock"
              rules={{ required: true }}
              className="mb-12"
            />

            <div className="flex-center-between">
              <button type="button" className="btn outlined" onClick={onCancel}>
                {t('buttons.cancel')}
              </button>
              <button type="submit" className="btn">
                {t('buttons.submit')}
              </button>
            </div>
          </form>
        </FormProvider>
      }
      onClickOutside={() => setIsOpen(false)}
    />
  );
};

PasswordModal.propTypes = {
  isOpen: bool.isRequired,
  setIsOpen: func.isRequired,
  onClose: func.isRequired
};

export default PasswordModal;
