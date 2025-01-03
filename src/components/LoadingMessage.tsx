import React from 'react';

export function LoadingMessage() {
  return (
    <div className="alert alert-info d-flex align-items-center mt-3" role="alert">
      <div className="spinner-border spinner-border-sm me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      Analyzing your image...
    </div>
  );
}