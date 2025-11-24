function MiPerfil() {
  const usuario = {
    nombre: 'OSCAR ADRIAN AGUILAR POOT',
    progreso: 65
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Título de bienvenida */}
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-12">
          BIENVENIDO {usuario.nombre}
        </h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Columna izquierda - Cards en horizontal */}
          <div className="flex gap-6 items-center">
            {/* Card Mi perfil */}
            <div 
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-48 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'informacion-personal' }))}
            >
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mb-3">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-800 font-medium text-sm">Mi perfil</span>
            </div>

            {/* Card Notificaciones */}
            <div 
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-48 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'notificaciones' }))}
            >
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mb-3">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <span className="text-gray-800 font-medium text-sm">Notificaciones</span>
            </div>
          </div>

          {/* Columna derecha - Gráfica de progreso */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Fondo de colores */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 -z-10">
                <div className="bg-orange-200"></div>
                <div className="bg-gray-300"></div>
                <div className="bg-blue-200"></div>
                <div className="bg-green-200"></div>
              </div>

              {/* Contenedor de la gráfica */}
              <div className="relative p-12">
                <div className="text-right mb-2">
                  <span className="text-sm font-semibold text-gray-700">TU: PROGRESO</span>
                </div>

                {/* Gráfica circular */}
                <div className="relative w-80 h-80">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Círculo de fondo (gris) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#D1D5DB"
                      strokeWidth="12"
                    />
                    {/* Círculo de progreso (verde) */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="12"
                      strokeDasharray={`${usuario.progreso * 2.513} ${251.3 - usuario.progreso * 2.513}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  {/* Porcentaje en el centro */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-white drop-shadow-lg">
                      {usuario.progreso}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiPerfil
