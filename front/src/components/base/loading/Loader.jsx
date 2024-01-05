import clsx from 'clsx';
import { bool, string } from 'prop-types';

/**
 * @description if `fullScreen` is false, please place your parent node in :
 * `position: relative;`
 */
const Loader = ({
  isInline = true,
  fullScreen = false,
  hasOverlay = false,
  sizeClass = null,
  containerClass = null
}) => {
  const containerClassList = clsx('loader-container', {
    'is-full-screen': fullScreen,
    'is-in-line': isInline,
    'has-overlay': hasOverlay,
    [containerClass]: containerClass
  });

  return (
    <div className={containerClassList}>
      <span className={clsx('loader is-loading', sizeClass ?? 'w-7 h-7')}></span>
    </div>
  );
};

Loader.propTypes = {
  fullScreen: bool,
  isInline: bool,
  hasOverlay: bool,
  sizeClass: string,
  containerClass: string
};

export default Loader;
