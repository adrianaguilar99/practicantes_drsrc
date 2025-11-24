import { useState } from 'react'

function GenerarCredencial() {
  // Datos del practicante (vendrían del estado o props)
  const practicante = {
    nombre: 'OSCAR ADRIAN AGUILAR POOT',
    telefono: '(998) 3166888',
    tipoSangre: 'O+',
    direccion: 'Av. zona Federal, Mza. 9, Lote 1119-33...',
    universidad: 'UNIVERSIDAD POLITECNICA DE QUINTANA ROO',
    telInstitucional: '(998) 763 6635',
    hotel: 'DREAMS SAPPHIRE RESORTS & SPA',
    departamento: 'SISTEMAS',
    codigoBarras: '0111407590'
  }

  const handleImprimir = () => {
    window.print()
  }

  const handleCancelar = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'informacion-practicante' }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 font-medium">
          Home &gt; Practicantes &gt; {practicante.nombre}
        </div>

        {/* Contenedor de credenciales */}
        <div className="bg-gray-700 rounded-lg p-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Credencial Frontal */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              {/* Header con logos */}
              <div className="flex justify-between items-start mb-4">
                <div className="text-xs font-bold">
                  <div className="mb-1">WORK</div>
                  <div>DREAMS</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold mb-1">Inclusión</div>
                  <div className="text-xs">laboral</div>
                  <div className="text-xs font-bold text-purple-600">DREAMS</div>
                </div>
              </div>

              {/* Nombre */}
              <h2 className="text-center font-bold text-sm mb-4">{practicante.nombre}</h2>

              {/* Foto del practicante */}
              <div className="flex justify-center mb-4">
                <div className="w-48 h-48 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/api/placeholder/200/200"
                    alt="Foto del practicante"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Código de barras */}
              <div className="flex justify-center">
                <div className="bg-white p-2">
                  <svg width="180" height="60" viewBox="0 0 180 60">
                    {/* Simulación de código de barras */}
                    <rect x="0" y="0" width="3" height="50" fill="black"/>
                    <rect x="5" y="0" width="2" height="50" fill="black"/>
                    <rect x="9" y="0" width="4" height="50" fill="black"/>
                    <rect x="15" y="0" width="2" height="50" fill="black"/>
                    <rect x="19" y="0" width="3" height="50" fill="black"/>
                    <rect x="24" y="0" width="2" height="50" fill="black"/>
                    <rect x="28" y="0" width="4" height="50" fill="black"/>
                    <rect x="34" y="0" width="2" height="50" fill="black"/>
                    <rect x="38" y="0" width="3" height="50" fill="black"/>
                    <rect x="43" y="0" width="2" height="50" fill="black"/>
                    <rect x="47" y="0" width="4" height="50" fill="black"/>
                    <rect x="53" y="0" width="3" height="50" fill="black"/>
                    <rect x="58" y="0" width="2" height="50" fill="black"/>
                    <rect x="62" y="0" width="4" height="50" fill="black"/>
                    <rect x="68" y="0" width="2" height="50" fill="black"/>
                    <rect x="72" y="0" width="3" height="50" fill="black"/>
                    <rect x="77" y="0" width="2" height="50" fill="black"/>
                    <rect x="81" y="0" width="4" height="50" fill="black"/>
                    <rect x="87" y="0" width="3" height="50" fill="black"/>
                    <rect x="92" y="0" width="2" height="50" fill="black"/>
                    <rect x="96" y="0" width="4" height="50" fill="black"/>
                    <rect x="102" y="0" width="2" height="50" fill="black"/>
                    <rect x="106" y="0" width="3" height="50" fill="black"/>
                    <rect x="111" y="0" width="2" height="50" fill="black"/>
                    <rect x="115" y="0" width="4" height="50" fill="black"/>
                    <rect x="121" y="0" width="3" height="50" fill="black"/>
                    <rect x="126" y="0" width="2" height="50" fill="black"/>
                    <rect x="130" y="0" width="4" height="50" fill="black"/>
                    <rect x="136" y="0" width="2" height="50" fill="black"/>
                    <rect x="140" y="0" width="3" height="50" fill="black"/>
                    <rect x="145" y="0" width="2" height="50" fill="black"/>
                    <rect x="149" y="0" width="4" height="50" fill="black"/>
                    <rect x="155" y="0" width="3" height="50" fill="black"/>
                    <rect x="160" y="0" width="2" height="50" fill="black"/>
                    <rect x="164" y="0" width="4" height="50" fill="black"/>
                    <rect x="170" y="0" width="3" height="50" fill="black"/>
                    <rect x="175" y="0" width="2" height="50" fill="black"/>
                    <text x="90" y="58" fontSize="10" textAnchor="middle" fill="black">
                      {practicante.codigoBarras}
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Credencial Reverso */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              {/* Nombre en el reverso */}
              <h2 className="text-center font-bold text-sm mb-6">{practicante.nombre}</h2>

              {/* Sección: Datos generales */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-600 mb-3 border-b pb-1">Datos generales</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tel:</span>
                    <span className="font-medium">{practicante.telefono}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo de sangre:</span>
                    <span className="font-medium">{practicante.tipoSangre}</span>
                  </div>
                  <div className="text-gray-600">Av. zona Federal, Mza. 9, Lote 1119-33...</div>
                </div>
              </div>

              {/* Universidad */}
              <div className="mb-6 text-center">
                <p className="text-xs font-semibold">{practicante.universidad}</p>
                <p className="text-xs text-gray-600">Tel institucional: {practicante.telInstitucional}</p>
              </div>

              {/* Sección: Datos del hotel */}
              <div>
                <h3 className="text-xs font-semibold text-gray-600 mb-3 border-b pb-1">Datos del hotel</h3>
                <div className="space-y-2 text-xs">
                  <p className="font-semibold">{practicante.hotel}</p>
                  <p className="text-gray-600">{practicante.departamento}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleImprimir}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg"
            >
              Imprimir credencial
            </button>
            <button
              onClick={handleCancelar}
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerarCredencial
