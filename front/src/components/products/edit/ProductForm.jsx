import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { FormInput, FormTextArea } from 'components';
import { useFetch } from 'hooks';

const ProductForm = () => {
  const { t } = useTranslation();
  const { call: addCall } = useFetch();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      image: null
    }
  });

  const formProviderValues = {
    register,
    handleSubmit,
    reset,
    getValues,
    errors
  };

  const addPlant = async () => {
    if (!isValid) return;
    const { status } = await addCall({
      url: '/products',
      method: 'post',
      params: {
        product: getValues()
      }
    });

    if (status === 201) {
      toast.success(t('products:add.success'));
      reset();
    }
  };

  return (
    <FormProvider {...formProviderValues}>
      <h1 className="h1 mb-12">{t('products:add.title')}</h1>

      <form className="flex flex-col gap-12 mb-12 md:w-[35rem] md:mx-auto" onSubmit={handleSubmit(addPlant)}>
        <FormInput name="name" label={t('form:name')} />
        <FormTextArea name="description" label={t('form:description')} />
        <FormInput name="price" type="number" label={t('form:price')} />
        <FormInput name="stock" type="number" label={t('form:quantity')} />

        <button type="submit" className="btn w-fit ml-auto">
          {t('buttons.submit')}
        </button>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
