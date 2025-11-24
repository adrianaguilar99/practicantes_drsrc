import { useState } from 'react'

function AgregarPracticante() {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [correo, setCorreo] = useState('')
  const [telPersonal, setTelPersonal] = useState('')
  const [tipoPracticante, setTipoPracticante] = useState('INTERNO')
  const [direccion, setDireccion] = useState('')
  const [tipoSangre, setTipoSangre] = useState('')
  const [departamentoPracticas, setDepartamentoPracticas] = useState('')
  const [departamentoProcedencia, setDepartamentoProcedencia] = useState('')
  const [codigoEmpleado, setCodigoEmpleado] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [propiedad, setPropiedad] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [totalHoras, setTotalHoras] = useState('')
  
  // Schedule state
  const [horario, setHorario] = useState({
    lunes: { inicio: '09:00', fin: '18:00' },
    martes: { inicio: '09:00', fin: '18:00' },
    miercoles: { inicio: '09:00', fin: '18:00' },
    jueves: { inicio: '09:00', fin: '18:00' },
    viernes: { inicio: '09:00', fin: '18:00' },
    sabado: { inicio: '09:00', fin: '18:00' },
    domingo: { inicio: '', fin: '' }
  })

  // Emergency contacts
  const [contactos, setContactos] = useState([])

  // Modal state for schedule
  const [showHorarioModal, setShowHorarioModal] = useState(false)
  const [diasSeleccionados, setDiasSeleccionados] = useState({
    lunes: true,
    martes: true,
    miercoles: true,
    jueves: true,
    viernes: true,
    sabado: true,
    domingo: true
  })
  const [horaEntrada, setHoraEntrada] = useState('09:00')
  const [horaSalida, setHoraSalida] = useState('18:00')

  // Modal state for emergency contact
  const [showContactoModal, setShowContactoModal] = useState(false)
  const [nuevoContacto, setNuevoContacto] = useState({
    nombre: '',
    parentesco: '',
    telefono: '',
    cargo: ''
  })

  const handleAddContact = () => {
    setShowContactoModal(true)
  }

  const handleAceptarContacto = () => {
    if (nuevoContacto.nombre || nuevoContacto.parentesco || nuevoContacto.telefono || nuevoContacto.cargo) {
      setContactos([...contactos, nuevoContacto])
      setNuevoContacto({ nombre: '', parentesco: '', telefono: '', cargo: '' })
    }
    setShowContactoModal(false)
  }

  const handleCancelarContacto = () => {
    setNuevoContacto({ nombre: '', parentesco: '', telefono: '', cargo: '' })
    setShowContactoModal(false)
  }

  const handleRemoveContact = (index) => {
    setContactos(contactos.filter((_, i) => i !== index))
  }

  const handleContactChange = (index, field, value) => {
    const newContactos = [...contactos]
    newContactos[index][field] = value
    setContactos(newContactos)
  }

  const handleHorarioChange = (dia, field, value) => {
    setHorario({
      ...horario,
      [dia]: { ...horario[dia], [field]: value }
    })
  }

  const handleDiaToggle = (dia) => {
    setDiasSeleccionados({
      ...diasSeleccionados,
      [dia]: !diasSeleccionados[dia]
    })
  }

  const handleAceptarHorario = () => {
    setShowHorarioModal(false)
  }

  const handleCancelarHorario = () => {
    setShowHorarioModal(false)
  }

  const handleSave = () => {
    const practicanteData = {
      nombres,
      apellidos,
      correo,
      telPersonal,
      tipoPracticante,
      direccion,
      tipoSangre,
      departamentoPracticas,
      departamentoProcedencia,
      codigoEmpleado,
      contrasena,
      propiedad,
      fechaInicio,
      fechaFin,
      totalHoras,
      horario,
      contactos
    }
    console.log('Practicante data:', practicanteData)
    // Aquí se enviaría la data al backend
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'informacion-practicante' }))
  }

  const handleCancel = () => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'practicantes' }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-700 mb-8">
          INICIO &gt; PRACTICANTES &gt; REGISTRAR A UN PRACTICANTE
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg p-10">
          <div className="grid grid-cols-3 gap-x-8 gap-y-6">
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Nombres:</label>
                <input
                  type="text"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Apellidos:</label>
                <input
                  type="text"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Correo:</label>
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Tel Personal:</label>
                <input
                  type="text"
                  value={telPersonal}
                  onChange={(e) => setTelPersonal(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Tipo de practicante:</label>
                <select
                  value={tipoPracticante}
                  onChange={(e) => setTipoPracticante(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="INTERNO">INTERNO</option>
                  <option value="EXTERNO">EXTERNO</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Dirección:</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Tipo de sangre:</label>
                <select
                  value={tipoSangre}
                  onChange={(e) => setTipoSangre(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Departamento de practicas:</label>
                <select
                  value={departamentoPracticas}
                  onChange={(e) => setDepartamentoPracticas(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione un departamento</option>
                  <option value="Sistemas">Sistemas</option>
                  <option value="Cocina">Cocina</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Finanzas">Finanzas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Departamento de procedencia:</label>
                <select
                  value={departamentoProcedencia}
                  onChange={(e) => setDepartamentoProcedencia(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione un departamento</option>
                  <option value="Sistemas">Sistemas</option>
                  <option value="Cocina">Cocina</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Finanzas">Finanzas</option>
                </select>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Codigo de empleado:</label>
                <input
                  type="text"
                  value={codigoEmpleado}
                  onChange={(e) => setCodigoEmpleado(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Contraseña:</label>
                <input
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Propiedad:</label>
                <select
                  value={propiedad}
                  onChange={(e) => setPropiedad(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="Dreams Sapphire">Dreams Sapphire</option>
                  <option value="Dreams Jade">Dreams Jade</option>
                  <option value="Dreams Vista">Dreams Vista</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Fecha de inicio:</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Fecha de fin:</label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Total de horas a cubrir:</label>
                <input
                  type="number"
                  value={totalHoras}
                  onChange={(e) => setTotalHoras(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Horario Section */}
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-800">Horario</label>
                  <button 
                    onClick={() => setShowHorarioModal(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    📅 Agregar un horario
                  </button>
                </div>
                <div className="space-y-3">
                  {Object.keys(horario).map((dia) => (
                    <div key={dia} className="flex items-center justify-between">
                      <span className="w-28 capitalize text-sm font-medium text-gray-700">{dia}</span>
                      <div className="flex gap-2 items-center">
                        <input
                          type="time"
                          value={horario[dia].inicio}
                          onChange={(e) => handleHorarioChange(dia, 'inicio', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <span className="text-gray-500">-</span>
                        <input
                          type="time"
                          value={horario[dia].fin}
                          onChange={(e) => handleHorarioChange(dia, 'fin', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              {/* Archivos Section */}
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-800">📄 Archivos del practicante</label>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-gray-500 hover:border-blue-400 transition-colors">
                  Arrastra o selecciona el archivo
                </div>
                <div className="mt-3 text-sm font-medium text-gray-700">Archivos:</div>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-gray-500 mt-2 hover:border-blue-400 transition-colors">
                  Arrastra o selecciona el archivo
                </div>
              </div>

              {/* Contactos de emergencia */}
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-800">☎️ Contactos de emergencia</label>
                  <button
                    onClick={handleAddContact}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    👥 Agregar un contacto
                  </button>
                </div>
                {contactos.length > 0 ? (
                  <div className="space-y-3">
                    {contactos.map((contacto, index) => (
                      <div key={index} className="border border-gray-200 rounded-md p-4 relative bg-gray-50">
                        <button
                          onClick={() => handleRemoveContact(index)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 text-lg"
                        >
                          ➖
                        </button>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-base">👤</span>
                          <input
                            type="text"
                            placeholder="Nombre"
                            value={contacto.nombre}
                            onChange={(e) => handleContactChange(index, 'nombre', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="text-sm text-gray-600">
                          Parentesco: {contacto.parentesco || 'N/A'} | Tel: {contacto.telefono || 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 text-center py-3">
                    No hay contactos agregados
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleSave}
            className="px-16 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg"
          >
            Aceptar
          </button>
          <button
            onClick={handleCancel}
            className="px-16 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg"
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Modal Registrar Horario */}
      {showHorarioModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-6 text-center">Registrar a un horario</h3>
            
            {/* Encabezados */}
            <div className="grid grid-cols-12 gap-4 mb-3 font-medium text-sm text-gray-700">
              <div className="col-span-3">Días:</div>
              <div className="col-span-4 text-center">Hora de entrada:</div>
              <div className="col-span-4 text-center">Hora de salida:</div>
            </div>

            {/* Días con checkboxes y horas */}
            <div className="mb-6 space-y-3">
              {[
                { key: 'lunes', label: 'Lunes:' },
                { key: 'martes', label: 'Martes:' },
                { key: 'miercoles', label: 'Miercoles:' },
                { key: 'jueves', label: 'Jueves:' },
                { key: 'viernes', label: 'Viernes:' },
                { key: 'sabado', label: 'Sabado:' },
                { key: 'domingo', label: 'Domingo:' }
              ].map(({ key, label }) => (
                <div key={key} className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={key}
                      checked={diasSeleccionados[key]}
                      onChange={() => handleDiaToggle(key)}
                      className="w-5 h-5 accent-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor={key} className="text-sm font-medium text-gray-700">
                      {label}
                    </label>
                  </div>
                  <div className="col-span-4">
                    <input
                      type="time"
                      value={horario[key].inicio}
                      onChange={(e) => handleHorarioChange(key, 'inicio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="time"
                      value={horario[key].fin}
                      onChange={(e) => handleHorarioChange(key, 'fin', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleAceptarHorario}
                className="px-12 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Aceptar
              </button>
              <button
                onClick={handleCancelarHorario}
                className="px-12 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Registrar Contacto de Emergencia */}
      {showContactoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-6 text-center">Registrar a un contacto de emergencia</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Nombres:</label>
                <input
                  type="text"
                  value={nuevoContacto.nombre}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, nombre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Parentesco:</label>
                <input
                  type="text"
                  value={nuevoContacto.parentesco}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, parentesco: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Número de tel:</label>
                <input
                  type="text"
                  value={nuevoContacto.telefono}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, telefono: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Cargo:</label>
                <input
                  type="text"
                  value={nuevoContacto.cargo}
                  onChange={(e) => setNuevoContacto({ ...nuevoContacto, cargo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleAceptarContacto}
                className="px-12 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Agregar
              </button>
              <button
                onClick={handleCancelarContacto}
                className="px-12 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
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

export default AgregarPracticante
