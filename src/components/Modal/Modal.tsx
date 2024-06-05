import React from 'react';
import cn from 'classnames';
import './Modal.scss';

type Props = {
  isModalActive: boolean;
  setIsModalActive: (i: boolean) => void;
};

export const Modal: React.FC<Props> = ({ isModalActive, setIsModalActive }) => (
  <div
    className={cn('Modal', {
      'Modal--active': isModalActive,
    })}
  >
    <div className="Modal__content">
      <h3>Error</h3>
      <h4 className="Modal__text">
        We are sorry, but this feature is not implemented yet
      </h4>

      <button
        type="button"
        className="Modal__close"
        aria-label="Delete"
        onClick={() => setIsModalActive(false)}
      />

      <button
        type="button"
        className="Modal__button"
        onClick={() => setIsModalActive(false)}
      >
        Close
      </button>
    </div>
  </div>
);
