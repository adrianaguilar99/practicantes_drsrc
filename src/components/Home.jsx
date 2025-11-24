function Home() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-8">BIENVENIDO ADMINISTRADOR</h2>

      {/* Top Section */}
      <div className="flex gap-6 mb-8">
        {/* Left Group - 3 Cards */}
        <div className="flex gap-6 bg-white rounded-xl shadow-md p-6">
          {/* Card 1 - Practicantes activos */}
          <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-6 w-40">
            <h3 className="text-xs text-gray-700 mb-3 text-center">Practicantes activos</h3>
            <p className="text-5xl font-bold text-orange-600">10</p>
          </div>

          {/* Card 2 - Generar reporte */}
          <div className="flex items-center justify-center w-40">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm">
              Generar reporte
            </button>
          </div>

          {/* Card 3 - Practicantes próximos a terminar */}
          <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 w-40">
            <h3 className="text-xs text-gray-700 mb-3 text-center">Practicantes próximos a terminar</h3>
            <div className="space-y-2">
              <p className="text-blue-600 text-xs hover:underline cursor-pointer text-center">Leonardo Daniel</p>
              <p className="text-blue-600 text-xs hover:underline cursor-pointer text-center">Martin Martinez</p>
            </div>
          </div>
        </div>

        {/* Right - Pie Chart Card */}
        <div className="bg-white rounded-xl shadow-md p-6 w-80 flex flex-col">
          <h3 className="text-xs text-gray-700 mb-4 text-center">Usuarios registrados por rol</h3>
          <div className="flex justify-center items-center flex-1">
            <svg width="180" height="180" viewBox="0 0 200 200">
              {/* Blue segment (top) */}
              <path d="M 100 100 L 100 10 A 90 90 0 0 1 170 70 Z" fill="#4169E1" />
              {/* Orange segment (right) */}
              <path d="M 100 100 L 170 70 A 90 90 0 0 1 170 130 Z" fill="#FF8C42" />
              {/* Light blue segment (bottom) */}
              <path d="M 100 100 L 170 130 A 90 90 0 0 1 100 190 Z" fill="#87CEEB" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Section - Charts */}
      <div className="flex gap-6">
        {/* Bar Chart 1 - Practicantes registrados por fechas */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1">
          <h3 className="text-xs text-gray-700 mb-6">Practicantes registrados por fechas</h3>
          <div className="flex items-end justify-center gap-4 h-56 border-l-2 border-b-2 border-gray-400 pl-8 pb-2">
            <div className="w-20 bg-blue-400 rounded-t" style={{ height: '70%' }}></div>
            <div className="w-20 bg-blue-400 rounded-t" style={{ height: '50%' }}></div>
            <div className="w-20 bg-blue-400 rounded-t" style={{ height: '85%' }}></div>
          </div>
        </div>

        {/* Bar Chart 2 - Practicantes por departamentos */}
        <div className="bg-white rounded-xl shadow-md p-6 flex-1">
          <h3 className="text-xs text-gray-700 mb-6">Practicantes por departamentos</h3>
          <div className="flex items-end justify-center gap-4 h-56 border-l-2 border-b-2 border-gray-400 pl-8 pb-2">
            <div className="w-20 bg-green-400 rounded-t" style={{ height: '60%' }}></div>
            <div className="w-20 bg-green-400 rounded-t" style={{ height: '80%' }}></div>
            <div className="w-20 bg-green-400 rounded-t" style={{ height: '45%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
