import { useEffect } from 'react';

const SubmissionStatus = ({ status, onClose }) => {
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!status) return null;

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 
      ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      <div className="flex justify-between items-center">
        <p>{status.message}</p>
        <button onClick={onClose} className="ml-4">✕</button>
      </div>
    </div>
  );
};

export default SubmissionStatus;