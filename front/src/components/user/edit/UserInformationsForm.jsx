import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormInput, PasswordModal } from 'components';
import { mailRegex } from 'constants';
import { useCurrentUser, useFetch, useSafeState } from 'hooks';

const UserInformationsForm = () => {
  const { t } = useTranslation();
  const [passwordModalOpen, setPasswordModalOpen] = useSafeState(false);
  const { user, updateStoredUser } = useCurrentUser();
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
      email: user?.email || '',
      firstname: user?.firstname || '',
      lastname: user?.lastname || ''
    }
  });

  const formProviderValues = { register, trigger, getValues, errors, isValid };

  const validatePassword = () => {
    if (!isValid) trigger();
    setPasswordModalOpen(true);
  };

  const updateUser = async (userPassword) => {
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
      <h1 className="h2 mb-12">{t('auth:user.profileTitle')}</h1>
      <FormProvider {...formProviderValues}>
        <form onSubmit={handleSubmit(validatePassword)}>
          <FormInput
            name="email"
            label={t('form:email')}
            type="email"
            rules={{
              required: true,
              pattern: {
                value: mailRegex,
                message: 'emailInvalid'
              }
            }}
            className="mb-6"
            autoComplete="email"
            placeholder={t('form:placeholders.email')}
            icon="envelope"
          />

          <div className="flex-center-between gap-4 mb-6">
            <FormInput
              name="lastname"
              label={t('form:lastname')}
              className="w-1/2"
              placeholder={t('form:placeholders.lastname')}
              icon="user"
            />
            <FormInput
              name="firstname"
              label={t('form:firstname')}
              className="w-1/2"
              placeholder={t('form:placeholders.firstname')}
              icon="user"
            />
          </div>

          <button type="submit" className="btn">
            {t('buttons.save')}
          </button>
        </form>
      </FormProvider>

      <PasswordModal isOpen={passwordModalOpen} onClose={updateUser} setIsOpen={setPasswordModalOpen} />
    </>
  );
};

export default UserInformationsForm;
