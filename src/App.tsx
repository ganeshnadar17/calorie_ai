import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { AppContent } from './components/AppContent';
import { EntriesList } from './components/EntriesList';
import { ImageUpload } from './components/ImageUpload';
import { useFoodStore } from './store/foodStore';
import { ContactPage } from './components/ContactPage';

function App() {
  const { entries } = useFoodStore();

  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <Header />
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/entries" element={<EntriesList entries={entries} />} />
          <Route path="/upload" element={
            <div className="container py-5">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <ImageUpload onImageSelect={() => {}} />
                </div>
              </div>
            </div>
          } />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;