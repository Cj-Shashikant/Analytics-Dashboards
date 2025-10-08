import React from 'react';

interface SettingFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingFilter: React.FC<SettingFilterProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-lg font-semibold mb-4">Settings Filter</h2>
        <p className="text-gray-600 mb-4">
          Settings filter functionality coming soon...
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingFilter;
