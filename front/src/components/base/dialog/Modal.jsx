import clsx from 'clsx';
import { bool, func, node } from 'prop-types';

const Modal = ({ isOpen, body, header = null, footer = null, onClickOutside = null, onClose = null }) => {
  return (
    <div className={clsx('modal', isOpen && 'is-active')}>
      <div className="modal-background" onClick={() => onClickOutside && onClickOutside()}></div>
      {header || footer ? (
        <div className="modal-card">
          {header && <header className="modal-card-head">{header}</header>}

          <section className="modal-card-body">{body}</section>
          {footer && <footer className="modal-card-foot">{footer}</footer>}
        </div>
      ) : (
        <>
          <div className="modal-content">{body}</div>
          {onClose && <button className="modal-close is-large" aria-label="close" onClick={() => onClose()}></button>}
        </>
      )}
    </div>
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
