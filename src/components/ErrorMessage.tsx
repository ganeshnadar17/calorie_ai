import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="alert alert-danger mt-3" role="alert">
      {message}
    </div>
  );
}