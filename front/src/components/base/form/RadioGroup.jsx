import { array, string } from 'prop-types';

import { FormRadio } from 'components';

const RadioGroup = ({ radioOptions, groupLabel = '', ...props }) => {
  return (
    <fieldset>
      <legend>{groupLabel}</legend>
      {radioOptions.map((option) => (
        <FormRadio key={option.uuid} {...option} {...props} />
      ))}
    </fieldset>
  );
};

RadioGroup.propTypes = {
  radioOptions: array.isRequired,
  groupLabel: string
};

export default RadioGroup;
