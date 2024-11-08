import React, { useState } from 'react';
import { Scale, Ruler, Calculator } from 'lucide-react';

function App() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;

    if (isNaN(weightNum) || isNaN(heightNum) || heightNum <= 0) {
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue);

    // BMI categories for pregnant women with detailed obesity classification
    if (bmiValue < 18.5) {
      setCategory('Bajo peso');
    } else if (bmiValue < 24.9) {
      setCategory('Peso normal');
    } else if (bmiValue < 29.9) {
      setCategory('Sobrepeso');
    } else if (bmiValue < 35) {
      setCategory('Obesidad grado I');
    } else if (bmiValue < 40) {
      setCategory('Obesidad grado II');
    } else {
      setCategory('Obesidad grado III');
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Bajo peso':
        return 'text-yellow-600';
      case 'Peso normal':
        return 'text-green-600';
      case 'Sobrepeso':
        return 'text-orange-600';
      case 'Obesidad grado I':
        return 'text-red-500';
      case 'Obesidad grado II':
        return 'text-red-600';
      case 'Obesidad grado III':
        return 'text-red-700';
      default:
        return 'text-sky-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-sky-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Calculadora IMC Gestacional
            </h1>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-600 h-5 w-5" />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Peso en kg"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-600 h-5 w-5" />
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Altura en cm"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition"
                />
              </div>

              <button
                onClick={calculateBMI}
                className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition duration-200 font-medium"
              >
                Calcular IMC
              </button>
            </div>

            {bmi !== null && (
              <div className="bg-sky-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-sky-900">Resultados</h3>
                <p className="text-sky-800 mt-2">
                  Su IMC es: <span className="font-bold">{bmi.toFixed(2)}</span>
                </p>
                <p className={`font-bold mt-1 ${getCategoryColor(category)}`}>
                  Categoría: {category}
                </p>
                <div className="mt-3 text-xs text-sky-700">
                  <p>Rangos de IMC:</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Bajo peso: &lt; 18.5</li>
                    <li>• Normal: 18.5 - 24.9</li>
                    <li>• Sobrepeso: 25 - 29.9</li>
                    <li>• Obesidad I: 30 - 34.9</li>
                    <li>• Obesidad II: 35 - 39.9</li>
                    <li>• Obesidad III: ≥ 40</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-sky-800 text-white py-4 text-center">
        <p className="text-sm">Todos los derechos reservados a MimaternoFetal.cl</p>
      </footer>
    </div>
  );
}

export default App;