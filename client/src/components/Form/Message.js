import React from 'react';

export default function Message({ message, error }) {
  return (
    <div>
      {(error || message) && (
        <div
          className={`bg-${
            error ? 'red-100' : 'blue-100'
          } border-t border-b border-blue text-${
            error ? 'red-900' : 'blue-900'
          } px-4 py-3 rounded my-3`}
          role="alert"
        >
          <span className="font-bold">{error ? 'Error!' : 'Info:'}</span>{' '}
          <span className="text-sm">{error ? error : message}</span>
        </div>
      )}
    </div>
  );
}
