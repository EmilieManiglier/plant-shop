import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormInput, PasswordModal } from 'components';
import { useCurrentUser, useFetch, useSafeState } from 'hooks';

const UserContactForm = () => {
  const { t } = useTranslation();
  const { user, updateStoredUser } = useCurrentUser();
  const [passwordModalOpen, setPasswordModalOpen] = useSafeState(false);
  const { call: updateUserCall } = useFetch();
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      phoneNumber: user?.phoneNumber || '',
      street: user?.street || '',
      city: user?.city || '',
      zipCode: user?.zipCode || '',
      country: user?.country || ''
    }
  });

  const formProviderValues = { register, trigger, getValues, errors, isValid };

  const validatePassword = () => {
    if (!isValid) trigger();
    setPasswordModalOpen(true);
  };

  const updateUserContact = async (userPassword) => {
    setPasswordModalOpen(false);

    const { status } = await updateUserCall({
      url: '/users/account_update',
      method: 'put',
      params: { user: { ...getValues(), currentPassword: userPassword } }
    });

    if (status === 200) {
      updateStoredUser(getValues());
      toast.success(t('auth:user.updateInformationsSuccess'));
    }
  };

  return (
    <>
      <h1 className="h2 mb-12">{t('auth:user.contactTitle')}</h1>

      <FormProvider {...formProviderValues}>
        <form onSubmit={handleSubmit(validatePassword)}>
          <FormInput name="phoneNumber" label={t('form:phone')} type="tel" className="mb-6" />
          <FormInput name="street" label={t('form:street')} className="mb-6" />

          <div className="flex-center-between gap-4">
            <FormInput name="zipCode" label={t('form:zipCode')} className="w-1/2 mb-6" />
            <FormInput name="city" label={t('form:city')} className="w-1/2 mb-6" />
          </div>
          <FormInput name="country" label={t('form:country')} className="mb-6" />

          <button type="submit" className="btn">
            {t('buttons.save')}
          </button>
        </form>
      </FormProvider>

      <PasswordModal isOpen={passwordModalOpen} onClose={updateUserContact} setIsOpen={setPasswordModalOpen} />
    </>
  );
};

export default UserContactForm;
