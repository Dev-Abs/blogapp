import React from 'react';

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  return (
    <div
      id="info-popup"
      className={`fixed top-0 left-0 w-full h-full z-50 ${show ? 'block' : 'hidden'}`}
      tabIndex="-1"
    >
      <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
          <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Confirm Deletion</h3>
            <p>Are you sure you want to delete this blog? This action cannot be undone.</p>
          </div>
          <div className="flex justify-between items-center space-y-4 sm:space-y-0 sm:flex-row">
            <button
              id="close-modal"
              type="button"
              className="py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              id="confirm-button"
              type="button"
              className="py-2 px-4 w-full text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-auto hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
