import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const GastoItem = ({ gasto, categoriasMap }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-b-0">
    <div className="flex-1">
      <span className="font-semibold text-gray-800">{categoriasMap[gasto.categoryId] || gasto.categoria || 'Otros'}:</span> <span className="text-blue-700 font-bold">${(gasto.amount || gasto.monto || 0).toLocaleString()}</span>
      {gasto.description || gasto.detalle ? <span className="ml-2 text-gray-500 text-xs">{gasto.description || gasto.detalle}</span> : null}
    </div>
    <div className="text-xs text-gray-400 ml-2">{gasto.date ? new Date(gasto.date).toLocaleDateString() : gasto.fecha}</div>
  </div>
);

const ChartComponent = ({ saldo, saldoInicial, totalGastos }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="mb-2 text-center">
        <span className="text-lg text-gray-500 font-semibold">Saldo inicial: </span>
        <span className="text-xl font-bold text-indigo-700">${saldoInicial.toLocaleString()}</span>
      </div>
      <Doughnut
        data={{
          labels: ['Gastos', 'Saldo restante'],
          datasets: [
            {
              data: [totalGastos, saldo],
              backgroundColor: ['#F87171', '#4ADE80'],
              borderWidth: 2,
              cutout: '70%',
            },
          ],
        }}
        options={{
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
          },
        }}
        className="w-60 h-60 md:w-72 md:h-72"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-extrabold text-green-600">${saldo.toLocaleString()}</span>
        <span className="text-xs text-gray-500">Saldo restante</span>
      </div>
    </div>
  );
};

const FuncionesMenu = ({ open, onClose, onNavigate }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black bg-opacity-30" onClick={onClose}>
      <div className="bg-white rounded-t-2xl shadow-lg w-full max-w-md p-6 mb-0 animate-fadeInUp" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-4 text-center">Funciones principales</h3>
        <button className="w-full mb-3 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition" onClick={() => onNavigate('/categories')}>Registrar gasto</button>
        <button className="w-full mb-3 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition" onClick={() => onNavigate('/create-category')}>Crear categoría</button>
        <button className="w-full py-3 bg-yellow-400 text-yellow-900 rounded-xl font-semibold hover:bg-yellow-300 transition" onClick={() => onNavigate('/resumen')}>Ver análisis</button>
        <button className="w-full mt-6 py-2 text-gray-500 hover:text-gray-700" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

const Inicio = () => {
  const navigate = useNavigate();
  const saldo = useSelector(state => state.expenses.balance) || 0;
  const saldoInicial = useSelector(state => state.expenses.saldoInicial) || 0;
  const gastos = useSelector(state => state.expenses.expenses) || [];
  const categories = useSelector(state => state.expenses.categories) || [];
  const customCategories = useSelector(state => state.expenses.customCategories) || [];
  const [showFunciones, setShowFunciones] = useState(false);
  const totalGastos = gastos.reduce((sum, g) => sum + (g.amount || g.monto || 0), 0);
  // Crear un mapa de categoryId a nombre
  const categoriasMap = {};
  [...categories, ...customCategories].forEach(cat => {
    categoriasMap[cat.id] = cat.name;
  });
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-2 py-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">Analizador de gastos</h1>
      <div className="flex justify-center mb-4">
        <span className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-full font-semibold text-lg shadow">INICIO</span>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center mb-6">
        <div className="text-center mb-4">
          <div className="text-lg text-gray-500">Saldo actual:</div>
          <div className="text-4xl font-extrabold text-green-600">${saldo.toLocaleString()}</div>
        </div>
        <div className="relative w-full flex justify-center">
          <ChartComponent saldo={saldo} saldoInicial={saldoInicial} totalGastos={totalGastos} />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow hover:bg-yellow-300 transition-all"
            onClick={() => navigate('/resumen')}
            style={{ zIndex: 10 }}
          >
            Detalles
          </button>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 mt-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Últimos gastos</h2>
        <div className="divide-y divide-gray-200">
          {gastos.length === 0 ? (
            <div className="text-gray-400 text-center py-4">No hay gastos registrados.</div>
          ) : (
            gastos.slice(-5).reverse().map((gasto, idx) => <GastoItem key={idx} gasto={gasto} categoriasMap={categoriasMap} />)
          )}
        </div>
        <button
          className="mt-6 w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-xl shadow hover:bg-blue-700 transition-colors"
          onClick={() => setShowFunciones(true)}
        >
          Funciones
        </button>
      </div>
      <FuncionesMenu
        open={showFunciones}
        onClose={() => setShowFunciones(false)}
        onNavigate={ruta => { setShowFunciones(false); navigate(ruta); }}
      />
    </div>
  );
};

export default Inicio; 