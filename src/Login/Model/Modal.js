import React from 'react';
import '../../App.css'; // Ensure this import is present

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with transparent shadow */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-500"
        onClick={onClose} // Close modal on backdrop click
      />
      {/* Modal content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md transition-transform duration-300 transform scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-500 dark:bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-600 dark:hover:bg-gray-900"
          >
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
