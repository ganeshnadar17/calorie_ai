import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
      <p className="text-red-700">{message}</p>
    </div>
  );
}