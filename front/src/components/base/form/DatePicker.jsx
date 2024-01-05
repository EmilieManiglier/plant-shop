import { fr } from 'date-fns/locale';
import { func, instanceOf } from 'prop-types';
import { useMemo } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import i18n from 'translations';

registerLocale('fr', fr);

const DatePicker = ({ selected, onChange, ...props }) => {
  const language = useMemo(() => {
    if (i18n.resolvedLanguage === 'fr') return { locale: fr, dateFormat: 'dd/MM/yyyy' };
  }, []);

  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      locale={language.locale}
      dateFormat={language.dateFormat}
      {...props}
    />
  );
};

DatePicker.propTypes = {
  selected: instanceOf(Date).isRequired,
  onChange: func.isRequired
};

export default DatePicker;
