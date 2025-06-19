import React from 'react';
import { useNavigate } from 'react-router-dom';

const BotonInicio = () => {
  const navigate = useNavigate();
  return (
    <button
      className="fixed top-4 left-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
      onClick={() => navigate('/inicio')}
      aria-label="Volver a inicio"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
      </svg>
      Inicio
    </button>
  );
};

export default BotonInicio; 