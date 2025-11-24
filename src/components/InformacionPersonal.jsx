import { useState } from 'react'

function InformacionPersonal() {
  const [activeTab, setActiveTab] = useState('informacion')

  const usuario = {
    nombre: 'OSCAR ADRIAN AGUILAR POOT',
    departamento: 'Sistemas',
    tipo: 'Practicante externo',
    telefono: '998316688',
    email: '202000064@estudiantes.upqroo.edu.mx',
    fechaInicio: '18 de agosto del 2025',
    fechaFin: '28 de noviembre del 2025',
    totalHoras: '600 horas',
    institucion: 'UNIVERSIDAD POLITECNICA DE Q...',
    carrera: 'INGENIERIA EN SOFTWARE',
    matricula: '202000064'
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8">
          {/* Sidebar izquierdo */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-5xl font-bold">O</span>
              </div>
              <h2 className="text-center text-sm font-bold text-gray-800 mb-6">
                {usuario.nombre}
              </h2>

              {/* Botones de navegación */}
              <div className="w-full space-y-3">
                <button
                  onClick={() => setActiveTab('informacion')}
                  className={`w-full py-2 px-4 rounded-lg text-left text-sm font-medium transition-colors ${
                    activeTab === 'informacion'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Informacion
                </button>
                <button
                  onClick={() => setActiveTab('progreso')}
                  className={`w-full py-2 px-4 rounded-lg text-left text-sm font-medium transition-colors ${
                    activeTab === 'progreso'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Progreso
                </button>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Header con icono y título */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-800">MI PERFIL</h1>
              </div>

              {activeTab === 'informacion' && (
                <>
                  {/* Grid de información - Primera sección */}
                  <div className="grid grid-cols-2 gap-x-16 gap-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Departamento:</span>
                      <span className="text-gray-800">{usuario.departamento}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Fecha de inicio:</span>
                      <span className="text-gray-800">{usuario.fechaInicio}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Tipo:</span>
                      <span className="text-gray-800">{usuario.tipo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Fecha de fin:</span>
                      <span className="text-gray-800">{usuario.fechaFin}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Tel:</span>
                      <span className="text-gray-800">{usuario.telefono}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Total de horas a cubrir:</span>
                      <span className="text-gray-800">{usuario.totalHoras}</span>
                    </div>

                    <div className="flex justify-between col-span-2">
                      <span className="text-gray-700 font-medium">Email:</span>
                      <span className="text-gray-800">{usuario.email}</span>
                    </div>
                  </div>

                  {/* Botón Horario */}
                  <div className="mb-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                      <span className="text-sm">Horario</span>
                    </button>
                  </div>

                  {/* Grid de información - Segunda sección */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Institución de procedencia:</span>
                      <span className="text-gray-800">{usuario.institucion}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Carrera:</span>
                      <span className="text-gray-800">{usuario.carrera}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-700 font-medium">Matrícula:</span>
                      <span className="text-gray-800">{usuario.matricula}</span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'progreso' && (
                <div className="py-8">
                  {/* Header con icono */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">MI PROGRESO</h2>
                  </div>

                  <div className="flex gap-12 items-center">
                    {/* Gráfica circular */}
                    <div className="flex-shrink-0">
                      <div className="relative w-64 h-64">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Círculo de fondo (gris) */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#D1D5DB"
                            strokeWidth="8"
                          />
                          {/* Círculo de progreso (verde) */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="8"
                            strokeDasharray={`${65 * 2.513} ${251.3 - 65 * 2.513}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Porcentaje en el centro */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl font-bold text-green-600">
                            65%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Barras de progreso */}
                    <div className="flex-1 flex gap-6">
                      {/* Tiempo por cubrir - Naranja */}
                      <div className="flex-1">
                        <div className="bg-orange-200 rounded-lg p-6 h-56 flex flex-col justify-between">
                          <div>
                            <p className="text-sm text-gray-700 mb-2">Tiempo por cubrir</p>
                            <p className="text-3xl font-bold text-orange-600">600 horas</p>
                          </div>
                        </div>
                      </div>

                      {/* Tiempo cubierto - Azul/Morado */}
                      <div className="flex-1">
                        <div className="bg-gradient-to-b from-blue-100 to-purple-100 rounded-lg p-6 h-56 flex flex-col justify-between">
                          <div>
                            <p className="text-sm text-gray-700 mb-2">Tiempo cubierto</p>
                            <p className="text-3xl font-bold text-blue-600">258 horas</p>
                          </div>
                        </div>
                      </div>

                      {/* Espacio vacío - Verde claro */}
                      <div className="flex-1">
                        <div className="bg-green-50 rounded-lg p-6 h-56">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformacionPersonal
