import clsx from 'clsx';
import { bool, func, node } from 'prop-types';

import 'assets/styles/components/_modal.scss';

const Modal = ({ isOpen, body, header = null, footer = null, onClickOutside = null, onClose = null }) => {
  return (
    <>
      <div
        onClick={() => onClickOutside && onClickOutside()}
        className={clsx('fixed w-full h-full inset-0 bg-black opacity-20 z-50', isOpen ? 'block' : 'hidden')}
      ></div>
      <div className={clsx('modal', isOpen && 'open')}>
        <div onClick={() => onClickOutside && onClickOutside()}></div>
        {header || footer ? (
          <div>
            {header && <header>{header}</header>}

            <section>{body}</section>
            {footer && <footer>{footer}</footer>}
          </div>
        ) : (
          <>
            <div>{body}</div>
            {onClose && (
              <button type="button" className="btn mt-4" onClick={onClose}>
                Close
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: bool.isRequired,
  body: node.isRequired,
  header: node,
  footer: node,
  onClose: func,
  onClickOutside: func
};

export default Modal;
