import clsx from 'clsx';
import { node, oneOf, string } from 'prop-types';

import 'assets/styles/components/_banner.scss';

const Banner = ({ children, type = 'info', className = '' }) => {
  return (
    <div className={clsx('banner', type, className)} role="alert">
      {children}
    </div>
  );
};

Banner.propTypes = {
  children: node.isRequired,
  type: oneOf(['info', 'success', 'warning', 'error']),
  className: string
};

export default Banner;
