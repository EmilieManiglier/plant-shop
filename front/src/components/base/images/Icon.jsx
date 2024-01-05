import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { flatten, keys } from 'lodash';
import { array, object, oneOfType, string } from 'prop-types';
import { useMemo } from 'react';

/* FontAwesome icons */
import { faIconsList } from 'services/fontAwesomeLibrary';

/* Custom icons */
import * as customIcons from 'assets/img/icons';

const Icon = ({ name, classes = '', libraryIconProps = null }) => {
  const isLibraryIcon = useMemo(() => {
    const flattenFaIconsList = flatten(keys(faIconsList).map((k) => keys(faIconsList[k])));
    return flattenFaIconsList.includes(name[1]) || flattenFaIconsList.includes(name);
  }, [name]);

  const renderIcon = useMemo(() => {
    if (isLibraryIcon) {
      return (
        <FontAwesomeIcon
          className={`fa ${classes}`}
          icon={name}
          aria-hidden="true"
          focusable="false"
          {...(libraryIconProps && libraryIconProps)}
        />
      );
    } else if (!isLibraryIcon && customIcons[name]) {
      return (
        <svg
          className={`custom ${classes}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <use href={`${customIcons[name]}#icon-${name}`} />
        </svg>
      );
    } else {
      return (
        <span className={`no-icon ${classes}`} aria-hidden="true">
          &#10074;
        </span>
      );
    }
  }, [name]);

  return renderIcon;
};

Icon.propTypes = {
  name: oneOfType([string, array]).isRequired,
  classes: string,
  libraryIconProps: object /* See FontAwesomeIcon component props or current icon library component */
};

export default Icon;
