import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Pass file to parent
    onImageSelect(file);

    // Clean up the preview URL when component unmounts
    return () => URL.revokeObjectURL(previewUrl);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div 
      className={`card shadow-sm ${dragActive ? 'border-primary' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="card-body p-4 text-center">
        {preview ? (
          <div className="position-relative mb-3">
            <img 
              src={preview} 
              alt="Preview" 
              className="img-fluid rounded"
              style={{ 
                maxHeight: '300px',
                width: '100%',
                objectFit: 'cover'
              }}
            />
            <button 
              type="button"
              className="btn btn-sm btn-primary position-absolute top-0 end-0 m-2"
              onClick={handleButtonClick}
            >
              Change Image
            </button>
          </div>
        ) : (
          <div 
            className="py-5 border-2 border-dashed rounded-3 mb-3 upload-area"
            style={{ borderColor: dragActive ? 'var(--bs-primary)' : 'var(--bs-border-color)' }}
          >
            <Upload size={48} className="text-primary mb-3 upload-icon" />
            <h5>Drag and drop your image here</h5>
            <p className="text-muted mb-3">or</p>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleButtonClick}
            >
              Browse Files
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          className="d-none"
          accept="image/*"
          onChange={handleChange}
        />
        <p className="text-muted small mb-0">
          Supported formats: JPG, PNG, GIF (Max size: 5MB)
        </p>
      </div>
    </div>
  );
}