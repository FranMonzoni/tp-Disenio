import React from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import BotonInicio from './BotonInicio';

ChartJS.register(ArcElement, Tooltip, Legend);

const Resumen = () => {
  const navigate = useNavigate();
  const gastos = useSelector(state => state.expenses.expenses) || [];
  const categorias = gastos.reduce((acc, gasto) => {
    const cat = gasto.categoryId || gasto.categoria || 'Otros';
    acc[cat] = (acc[cat] || 0) + (gasto.amount || gasto.monto || 0);
    return acc;
  }, {});
  const labels = Object.keys(categorias);
  const data = Object.values(categorias);
  const totalGastos = data.reduce((a, b) => a + b, 0);
  const colores = [
    '#4F46E5', '#F59E42', '#10B981', '#F43F5E', '#FBBF24', '#6366F1', '#A21CAF', '#0EA5E9', '#F472B6', '#22D3EE', '#F87171'
  ];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-2 py-4">
      <BotonInicio />
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">Resumen de Gastos</h1>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center mb-6">
        <Pie
          data={{
            labels,
            datasets: [
              {
                data,
                backgroundColor: colores,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: true, position: 'right' },
              tooltip: { enabled: true },
            },
          }}
          className="w-60 h-60 md:w-72 md:h-72"
        />
        <div className="mt-6 text-center">
          <div className="text-lg text-gray-500">Total de gastos:</div>
          <div className="text-3xl font-extrabold text-red-600">${totalGastos.toLocaleString()}</div>
        </div>
      </div>
      <button
        className="mt-4 w-full max-w-md bg-indigo-600 text-white text-lg font-bold py-3 rounded-xl shadow hover:bg-indigo-700 transition-colors"
        onClick={() => navigate('/inicio')}
      >
        Volver a Inicio
      </button>
    </div>
  );
};

export default Resumen; 