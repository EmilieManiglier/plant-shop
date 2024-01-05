# Form

- [Description](#description)
- [How to use](#how-to-use)
- [Examples](#examples)
  - [Simple form with password confirmation](#simple-form-with-password-confirmation)
  - [Form with radio and checkbox](#form-with-radio-and-checkbox)
  - [Form with select](#form-with-select)
- [Styles](#styles)

## Description

This boilerplate includes components needed to build forms such as input, textarea, radio, checkbox, and select. You can find them in `components/base/form`.

Form validation is managed by [react-hook-form](https://react-hook-form.com/get-started).

Some useful examples can be found in [📃 react-hook docs](https://github.com/react-hook-form/react-hook-form/tree/master/examples).

## How to use

1. Initialize form
- Call `useForm()` and initialize form defaultValues. `useForm` takes other optional arguments ([📃 Read more about form options](https://react-hook-form.com/api/useform))


2. Set component props for form validation

| Props name | Type  | Description |
|---|---|---|
|  register (required) | function from `useForm()` | FormInput, FormTextArea, FormCheckbox and FormRadio must receive `register` as props in order to activate form validation. Each field is registered by its `name` props which should correspond to a key inside form defaultValues  |
| rules (optional)  |  object  | Used to set form validations rules. Example: `{ required: true, minLength: 3 }`. If the field has a min/max length you must also pass `length` to the component in order to display the error message |
| errors (optional)  |  object from `useForm()` | Used to show an error message. The i18nKey must corresponds to `errors[fieldName].type`  |

3. Submit form
- On form submission, call `handleSubmit` and pass your own function

## Examples

### Simple form with password confirmation

```jsx
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from 'components';
import { mailRegex } from 'constants';

const Form = () => {
  const { t } = useTranslation();
  const formOptions = {
    mode: 'all', // onSubmit (default) || onTouched || onChange || onBlur || all
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm(formOptions);

  const onSubmit = (data) => {
    // data: form data with user input
    console.log(data);

    if (!isValid) return;
    // Handle submit here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="email"
        label={t('form:email')}
        type="email"
        register={register}
        rules={{
          required: true,
          pattern: {
            value: mailRegex,
            /* Default error key is `pattern` but you can also add your custom message (i18nKey) */
            message: 'emailInvalid'
          }
        }}
        errors={errors}
      />
      <FormInput
        name="password"
        label={t('form:password')}
        type="password"
        register={register}
        rules={{ required: true, minLength: 3 }}
        errors={errors}
        length="3"
      />
      <FormInput
        name="passwordConfirmation"
        type="password"
        label={t('form:passwordConfirmation')}
				errors={errors}
        length="3"
        register={register}
        rules={{
          required: true,
          minLength: 3,
          validate: (val) => {
            if (watch('password') !== val) {
              // i18nKey for the error message
              return 'passwordConfirmationInvalid';
            }
          }
        }}
      />

      <button type="submit" disabled={!isValid}>
        {t('form:submit')}
      </button>
    </form>
  );
};

export default Form;

```

### Form with radio and checkbox

**Radio**

You can use the component `RadioGroup` to display a group of radio buttons (recommended) or you can also use the `FormRadio` component.

As there may be several groups of radio buttons on the same page, it is recommended to use the `addUuid` helper to add a unique ID to each radio. This ID will then be used for the key inside the `map` loop.

If you want to check a value by default, you have to set it inside form defaultValues.

**Checkbox**

You can add a link inside checkbox label (for terms validation for example) by giving the `link` props.

```jsx
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { addUuid } from 'helpers';
import { RadioGroup, FormCheckbox } from 'components';

const Form = () => {
  const { t } = useTranslation();
  const radioOptions = useMemo(
    () =>
      addUuid(
        [
          { name: 'pet', value: 'dog', label: 'Chien' },
          { name: 'pet', value: 'cat', label: 'Chat' },
          { name: 'pet', value: 'bird', label: 'Oiseau' }
        ],
        'input-radio-'
      ),
    []
  );

  const formOptions = {
    mode: 'all',
    defaultValues: {
      pet: 'cat', // Default checked
      terms: false
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm(formOptions);

  const onSubmit = (data) => {
    // data: form data with user input
    console.log(data);

    if (!isValid) return;
    // Handle submit here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioGroup radioOptions={radioOptions} register={register} />

      <FormCheckbox
        name="terms"
        labeli18nKey="form:termsLabel"
        register={register}
        rules={{ required: true }}
        errors={errors}
        link={{ url: 'https://test.fr', labelKey: 'form:terms' }}
      />

      <button type="submit" disabled={!isValid}>
        {t('form:submit')}
      </button>
    </form>
  );
};

export default Form;
```

### Form with select

FormSelect is a custom component made without `<select></select>` tag in order to apply your own styles more easily.

To use it, you must
- Wrap `FormSelect` inside `Controller`
- Pass `control`, `onChange` and `trigger` methods to allow form validation
- ⚠️ No need to register the component again !
- Don't forget to use `addUuid` to generate unique Ids for each select option

```jsx
import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormSelect } from 'components';
import { addUuid } from 'helpers';

const Form = () => {
  const { t } = useTranslation();
  const selectOptions = useMemo(
    () =>
      addUuid(
        [
          { value: 'dog', label: 'Chien' },
          { value: 'cat', label: 'Chat' },
          { value: 'bird', label: 'Oiseau' }
        ],
        'select-option-'
      ),
    []
  );

  const formOptions = {
    mode: 'all',
    defaultValues: { pet: '' }
  };

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid }
  } = useForm(formOptions);

  const onSubmit = (data) => {
    // data: form data with user input
    console.log(data);

    if (!isValid) return;
    // Handle submit here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field: { onChange } }) => (
          <FormSelect
            options={selectOptions}
            onChange={onChange}
            trigger={trigger}
            name="pet"
            defaultOption={t('form:defaultSelectLabel')}
          />
        )}
        name="pet"
        control={control}
        rules={{ required: true }}
      />

      <button type="submit" disabled={!isValid}>
        {t('form:submit')}
      </button>
    </form>
  );
};

export default Form;
```

### Form with datepicker

`DatePicker` is a component made with [react-datepicker](https://github.com/Hacker0x01/react-datepicker).

To use it, you must
- Wrap `DatePicker` inside `Controller`
- Pass `control`, `onChange` and `value` to allow form validation
- ⚠️ No need to register the component again !

```jsx
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { DatePicker } from 'components';

const Form = () => {
  const { t } = useTranslation();

  const formOptions = {
    mode: 'all',
    defaultValues: { birthday: new Date() }
  };

  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm(formOptions);

  const onSubmit = (data) => {
    // data: form data with user input
    console.log(data);

    if (!isValid) return;
    // Handle submit here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="birthday"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => <DatePicker selected={value} onChange={onChange} name="birthday" />}
      />

      <button type="submit" disabled={!isValid}>
        {t('form:submit')}
      </button>
    </form>
  );
};

export default Form;
```

**Localization**

If you have more than one language, you can import the language inside `DatePicker`.

```jsx
import { useState } from 'react';
import { func, instanceOf } from 'prop-types';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { fr, enGB } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('fr', fr);
registerLocale('en', enGB);

const DatePicker = ({ selected, onChange, ...props }) => {
  // Or get locale from localStorage
  const [locale, setLocale] = useState('fr');

  return (
    <>
      <ReactDatePicker selected={selected} onChange={onChange} {...props} locale={locale} />
      <button type="button" onClick={() => setLocale('fr')}>
        FR
      </button>
      <button type="button" onClick={() => setLocale('en')}>
        EN
      </button>
    </>
  );
};

DatePicker.propTypes = {
  selected: instanceOf(Date).isRequired,
  onChange: func.isRequired
};

export default DatePicker;
```

## Styles

`FormSelect` has some default styles that you can delete or override in `assets/styles/_form.scss`. The other components have no default style, feel free to add your own design ! 💅
