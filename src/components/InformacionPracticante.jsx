import { useState } from 'react'

function InformacionPracticante() {
  const [activeTab, setActiveTab] = useState('informacion')
  const [showHorarioModal, setShowHorarioModal] = useState(false)
  const [showReporteModal, setShowReporteModal] = useState(false)
  const [showEncargadosModal, setShowEncargadosModal] = useState(false)
  const [showContactosModal, setShowContactosModal] = useState(false)
  const [showArchivosModal, setShowArchivosModal] = useState(false)
  const [showEditarArchivosModal, setShowEditarArchivosModal] = useState(false)
  const [tipoFecha, setTipoFecha] = useState('semana') // 'semana', 'mes', 'total'
  const [fechaInicial, setFechaInicial] = useState('')
  const [fechaFinal, setFechaFinal] = useState('')
  const [horario, setHorario] = useState({
    lunes: { activo: false, entrada: '', salida: '' },
    martes: { activo: false, entrada: '', salida: '' },
    miercoles: { activo: false, entrada: '', salida: '' },
    jueves: { activo: false, entrada: '', salida: '' },
    viernes: { activo: false, entrada: '', salida: '' },
    sabado: { activo: false, entrada: '', salida: '' },
    domingo: { activo: false, entrada: '', salida: '' }
  })

  // Lista de encargados de ejemplo
  const encargados = [
    { id: 1, nombre: 'BRIAN ROMERO', inicial: 'B', color: 'bg-blue-600' },
    { id: 2, nombre: 'ENCARGADO 2', inicial: 'E', color: 'bg-green-600' }
  ]

  // Contactos de emergencia de ejemplo
  const contactosEmergencia = [
    { id: 1, nombre: 'Carolina Lopez', parentesco: 'Madre', telefono: '994435678' },
    { id: 2, nombre: 'Mario Delgado', parentesco: 'Abuelo', telefono: '5587635467' }
  ]

  // Archivos del practicante de ejemplo
  const archivosPracticante = [
    { id: 1, nombre: 'IMG-PHOTO PROFILE-INTERN' },
    { id: 2, nombre: 'IMG-PHOTO PROFILE-INTERN' }
  ]

  // Datos del practicante (estos vendrían del estado o props)
  const practicante = {
    nombre: 'OSCAR ADRIAN AGUILAR POOT',
    tipo: 'EXTERNO',
    correo: 'adrian.aguilar@gmail.com',
    telPersonal: '9983847481',
    direccion: 'Av. Arco Bincentenario, Mza. 11, Lote 1119-33...',
    tipoSangre: 'A+',
    departamentoPracticas: 'SISTEMAS',
    codigoPracticante: '675833',
    fechaInicio: '18 de septiembre del 2025',
    fechaFin: '28 de noviembre del 2025',
    totalHoras: '600',
    horasCubiertas: '258'
  }

  const informacionEscolar = {
    institucion: 'UNIVERSIDAD POLITECNICA DE Q...',
    carrera: 'INGENIERIA EN SOFTWARE',
    matricula: '202000064',
    telInstitucional: '(997) 535 6243'
  }

  const handleBack = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'practicantes' }))
  }

  // Horario de ejemplo (lunes a viernes morado, fines de semana gris)
  const horarioSemana = [
    { dia: 'Lunes', activo: false },
    { dia: 'Martes', activo: true },
    { dia: 'Miércoles', activo: true },
    { dia: 'Jueves', activo: true },
    { dia: 'Viernes', activo: true },
    { dia: 'Sábado', activo: true },
    { dia: 'Domingo', activo: false }
  ]

  const horas = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4 font-medium">
          INICIO &gt; PRACTICANTES &gt; {practicante.nombre}
        </div>

        {/* Header con Badge y Título */}
        <div className="flex items-center mb-6">
          <div className="bg-gray-700 text-white px-6 py-2 font-bold text-sm">
            PRACTICANTE {practicante.tipo}
          </div>
          <div className="bg-gray-400 text-white px-8 py-2 font-bold text-lg ml-2 relative" 
               style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%)' }}>
            INFORMACIÓN DEL PRACTICANTE
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('informacion')}
              className={`px-8 py-4 font-medium relative ${
                activeTab === 'informacion'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Información
              {activeTab === 'informacion' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('horario')}
              className={`px-8 py-4 font-medium relative ${
                activeTab === 'horario'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Horario
              {activeTab === 'horario' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-10">
            {activeTab === 'informacion' && (
              <div className="grid grid-cols-3 gap-12">
                {/* Column 1 - Información Personal */}
                <div>
                  {/* Avatar Circle */}
                  <div className="flex justify-center mb-8">
                    <div className="w-28 h-28 bg-green-800 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                      O
                    </div>
                  </div>

                  <h2 className="text-lg font-bold mb-8">{practicante.nombre}</h2>

                  <div className="space-y-5">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Correo:</label>
                      <p className="font-medium text-sm">{practicante.correo}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Tel personal:</label>
                      <p className="font-medium text-sm">{practicante.telPersonal}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Dirección:</label>
                      <p className="font-medium text-sm">{practicante.direccion}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Tipo de sangre:</label>
                      <p className="font-medium text-sm">{practicante.tipoSangre}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Departamento de practicas:</label>
                      <p className="font-medium text-sm">{practicante.departamentoPracticas}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Encargado:</label>
                      <button 
                        onClick={() => setShowEncargadosModal(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Ver todos
                      </button>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Contactos de emergencia:</label>
                      <button 
                        onClick={() => setShowContactosModal(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Ver todos
                      </button>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Archivos del practicante:</label>
                      <button 
                        onClick={() => setShowArchivosModal(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Ver todos
                      </button>
                    </div>
                  </div>
                </div>

                {/* Column 2 - Información de Práctica */}
                <div>
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Codigo de practicante:</label>
                      <p className="font-bold text-base">{practicante.codigoPracticante}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Fecha de inicio:</label>
                      <p className="font-bold text-sm">{practicante.fechaInicio}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Fecha de fin:</label>
                      <p className="font-bold text-sm">{practicante.fechaFin}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Total de horas a cubrir:</label>
                      <p className="font-bold text-base">{practicante.totalHoras}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Tiempo de horas cubierta:</label>
                      <p className="font-bold text-base">{practicante.horasCubiertas}</p>
                    </div>
                  </div>

                  {/* Información escolar */}
                  <div className="mt-10">
                    <h3 className="font-bold text-base mb-5">Información escolar</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Institucion de procedencia:</label>
                        <p className="font-bold text-sm">{informacionEscolar.institucion}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Carrera:</label>
                        <p className="font-bold text-sm">{informacionEscolar.carrera}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Matricula escolar:</label>
                        <p className="font-bold text-sm">{informacionEscolar.matricula}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 block mb-1">Tel institucional:</label>
                        <p className="font-bold text-sm">{informacionEscolar.telInstitucional}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3 - Action Buttons */}
                <div className="space-y-4">
                  <button className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 shadow">
                    Editar
                  </button>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'generar-credencial' }))}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow"
                  >
                    Generar credencial
                  </button>
                  <button 
                    onClick={() => setShowReporteModal(true)}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow"
                  >
                    Generar reporte
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'horario' && (
              <div className="p-8">
                <div className="flex justify-between items-start">
                  {/* Calendario de horario */}
                  <div className="flex-1">
                    <div className="grid grid-cols-8 gap-1">
                      {/* Header vacío */}
                      <div className="bg-gray-400 h-12"></div>
                      {/* Headers de días */}
                      {horarioSemana.map((dia, idx) => (
                        <div key={idx} className="bg-gray-400 h-12"></div>
                      ))}

                      {/* Filas de horas */}
                      {horas.map((hora, horaIdx) => (
                        <>
                          {/* Columna de hora */}
                          <div key={`hora-${horaIdx}`} className="bg-gray-400 h-12"></div>
                          {/* Celdas de cada día */}
                          {horarioSemana.map((dia, diaIdx) => (
                            <div
                              key={`${horaIdx}-${diaIdx}`}
                              className={`h-12 ${
                                dia.activo && horaIdx >= 2 && horaIdx <= 7
                                  ? 'bg-purple-300'
                                  : 'bg-gray-300'
                              }`}
                            ></div>
                          ))}
                        </>
                      ))}
                    </div>
                  </div>

                  {/* Botón modificar horario */}
                  <div className="ml-8">
                    <button 
                      onClick={() => setShowHorarioModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow whitespace-nowrap"
                    >
                      Modificar horario
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Horario */}
      {showHorarioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4">
            <h2 className="text-xl font-bold mb-6">Agregar un horario</h2>
            
            <div className="grid grid-cols-3 gap-x-8 gap-y-4 mb-6">
              {/* Encabezados */}
              <div className="font-semibold text-gray-700">Día</div>
              <div className="font-semibold text-gray-700">Hora de entrada</div>
              <div className="font-semibold text-gray-700">Hora de salida</div>

              {/* Lunes */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.lunes.activo}
                  onChange={(e) => setHorario({...horario, lunes: {...horario.lunes, activo: e.target.checked}})}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Lunes</span>
              </div>
              <input
                type="time"
                value={horario.lunes.entrada}
                onChange={(e) => setHorario({...horario, lunes: {...horario.lunes, entrada: e.target.value}})}
                disabled={!horario.lunes.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
              <input
                type="time"
                value={horario.lunes.salida}
                onChange={(e) => setHorario({...horario, lunes: {...horario.lunes, salida: e.target.value}})}
                disabled={!horario.lunes.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />

              {/* Martes */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.martes.activo}
                  onChange={(e) => setHorario({...horario, martes: {...horario.martes, activo: e.target.checked}})}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Martes</span>
              </div>
              <input
                type="time"
                value={horario.martes.entrada}
                onChange={(e) => setHorario({...horario, martes: {...horario.martes, entrada: e.target.value}})}
                disabled={!horario.martes.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
              <input
                type="time"
                value={horario.martes.salida}
                onChange={(e) => setHorario({...horario, martes: {...horario.martes, salida: e.target.value}})}
                disabled={!horario.martes.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />

              {/* Miércoles */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.miercoles.activo}
                  onChange={(e) => setHorario({...horario, miercoles: {...horario.miercoles, activo: e.target.checked}})}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Miércoles</span>
              </div>
              <input
                type="time"
                value={horario.miercoles.entrada}
                onChange={(e) => setHorario({...horario, miercoles: {...horario.miercoles, entrada: e.target.value}})}
                disabled={!horario.miercoles.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
              <input
                type="time"
                value={horario.miercoles.salida}
                onChange={(e) => setHorario({...horario, miercoles: {...horario.miercoles, salida: e.target.value}})}
                disabled={!horario.miercoles.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />

              {/* Jueves */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.jueves.activo}
                  onChange={(e) => setHorario({...horario, jueves: {...horario.jueves, activo: e.target.checked}})}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Jueves</span>
              </div>
              <input
                type="time"
                value={horario.jueves.entrada}
                onChange={(e) => setHorario({...horario, jueves: {...horario.jueves, entrada: e.target.value}})}
                disabled={!horario.jueves.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
              <input
                type="time"
                value={horario.jueves.salida}
                onChange={(e) => setHorario({...horario, jueves: {...horario.jueves, salida: e.target.value}})}
                disabled={!horario.jueves.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />

              {/* Viernes */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.viernes.activo}
                  onChange={(e) => setHorario({...horario, viernes: {...horario.viernes, activo: e.target.checked}})}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Viernes</span>
              </div>
              <input
                type="time"
                value={horario.viernes.entrada}
                onChange={(e) => setHorario({...horario, viernes: {...horario.viernes, entrada: e.target.value}})}
                disabled={!horario.viernes.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
              <input
                type="time"
                value={horario.viernes.salida}
                onChange={(e) => setHorario({...horario, viernes: {...horario.viernes, salida: e.target.value}})}
                disabled={!horario.viernes.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />

              {/* Sábado */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.sabado.activo}
                  onChange={(e) => setHorario({...horario, sabado: {...horario.sabado, activo: e.target.checked}})}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Sábado</span>
              </div>
              <input
                type="time"
                value={horario.sabado.entrada}
                onChange={(e) => setHorario({...horario, sabado: {...horario.sabado, entrada: e.target.value}})}
                disabled={!horario.sabado.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
              <input
                type="time"
                value={horario.sabado.salida}
                onChange={(e) => setHorario({...horario, sabado: {...horario.sabado, salida: e.target.value}})}
                disabled={!horario.sabado.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />

              {/* Domingo */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={horario.domingo.activo}
                  onChange={(e) => setHorario({...horario, domingo: {...horario.domingo, activo: e.target.checked}})}
                  className="w-4 h-4 accent-blue-600"
                />
                <span>Domingo</span>
              </div>
              <input
                type="time"
                value={horario.domingo.entrada}
                onChange={(e) => setHorario({...horario, domingo: {...horario.domingo, entrada: e.target.value}})}
                disabled={!horario.domingo.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
              <input
                type="time"
                value={horario.domingo.salida}
                onChange={(e) => setHorario({...horario, domingo: {...horario.domingo, salida: e.target.value}})}
                disabled={!horario.domingo.activo}
                className="border border-gray-300 rounded px-3 py-2 disabled:bg-gray-100"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowHorarioModal(false)}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aquí guardarías el horario
                  setShowHorarioModal(false)
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Reporte */}
      {showReporteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4">
            {/* Botones de selección de período */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setTipoFecha('semana')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium ${
                  tipoFecha === 'semana'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Hace una semana
              </button>
              <button
                onClick={() => setTipoFecha('mes')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium ${
                  tipoFecha === 'mes'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Hace un mes
              </button>
              <button
                onClick={() => setTipoFecha('total')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium ${
                  tipoFecha === 'total'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Total
              </button>
            </div>

            {/* Fechas personalizadas */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-4 pb-2 border-b">Fechas personalizadas</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Fecha inicial</label>
                  <input
                    type="date"
                    value={fechaInicial}
                    onChange={(e) => setFechaInicial(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Fecha final</label>
                  <input
                    type="date"
                    value={fechaFinal}
                    onChange={(e) => setFechaFinal(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Aquí generarías el reporte
                  console.log('Generar reporte:', { tipoFecha, fechaInicial, fechaFinal })
                  setShowReporteModal(false)
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowReporteModal(false)}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Encargados */}
      {showEncargadosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-lg font-bold mb-4">Encargados</h2>
            
            <div className="space-y-3">
              {encargados.map((encargado) => (
                <div key={encargado.id} className="flex items-center gap-3">
                  <div className={`${encargado.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {encargado.inicial}
                  </div>
                  <span className="font-medium text-gray-800">{encargado.nombre}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowEncargadosModal(false)}
              className="w-full mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Contactos de Emergencia */}
      {showContactosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-4">Contactos de emergencia</h2>
            
            <div className="space-y-3 mb-6">
              {contactosEmergencia.map((contacto) => (
                <div key={contacto.id} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {contacto.nombre} | {contacto.parentesco} | {contacto.telefono}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowContactosModal(false)}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Agregar
              </button>
              <button
                onClick={() => setShowContactosModal(false)}
                className="flex-1 px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-medium"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Archivos del Practicante */}
      {showArchivosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-6">Archivos del practicante</h2>
            
            <div className="space-y-4 mb-6">
              {archivosPracticante.map((archivo) => (
                <div key={archivo.id} className="flex items-center gap-3">
                  <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-800">{archivo.nombre}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowArchivosModal(false)
                  setShowEditarArchivosModal(true)
                }}
                className="px-12 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-medium"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar Archivos */}
      {showEditarArchivosModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-bold mb-6">Archivos del practicante</h2>
            
            <div className="space-y-6">
              {/* Foto */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Foto:</label>
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-gray-100">
                  <input 
                    type="file" 
                    id="foto-upload"
                    className="hidden"
                    accept="image/*"
                  />
                  <label 
                    htmlFor="foto-upload"
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                  >
                    Arrastra o selecciona el archivo
                  </label>
                </div>
              </div>

              {/* Archivos */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Archivos:</label>
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-gray-100">
                  <input 
                    type="file" 
                    id="archivos-upload"
                    className="hidden"
                    multiple
                  />
                  <label 
                    htmlFor="archivos-upload"
                    className="cursor-pointer text-gray-600 hover:text-gray-800"
                  >
                    Arrastra o selecciona el archivo
                  </label>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  // Aquí guardarías los archivos
                  setShowEditarArchivosModal(false)
                }}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowEditarArchivosModal(false)}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InformacionPracticante
