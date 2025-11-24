import { useState } from 'react'

function Supervisores() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedSupervisor, setSelectedSupervisor] = useState(null)
  const [editFirstName, setEditFirstName] = useState('')
  const [editLastName, setEditLastName] = useState('')
  const [editPhone, setEditPhone] = useState('')
  
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newDepartment, setNewDepartment] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newPrivileges, setNewPrivileges] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [newPasswordValue, setNewPasswordValue] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const handleEditClick = (supervisor) => {
    setSelectedSupervisor(supervisor)
    const names = supervisor.name.split(' ')
    setEditFirstName(names[0] || '')
    setEditLastName(names.slice(1).join(' ') || '')
    setEditPhone('') // Aquí se cargaría el teléfono real del supervisor
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    setShowEditModal(false)
    setSelectedSupervisor(null)
    setEditFirstName('')
    setEditLastName('')
    setEditPhone('')
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setSelectedSupervisor(null)
    setEditFirstName('')
    setEditLastName('')
    setEditPhone('')
  }

  const handleAddClick = () => {
    setShowAddModal(true)
  }

  const handleSaveAdd = () => {
    setShowAddModal(false)
    setNewFirstName('')
    setNewLastName('')
    setNewEmail('')
    setNewDepartment('')
    setNewPhone('')
    setNewPrivileges('')
    setNewPassword('')
  }

  const handleCancelAdd = () => {
    setShowAddModal(false)
    setNewFirstName('')
    setNewLastName('')
    setNewEmail('')
    setNewDepartment('')
    setNewPhone('')
    setNewPrivileges('')
    setNewPassword('')
  }

  const handlePasswordClick = (supervisor) => {
    setSelectedSupervisor(supervisor)
    setShowPasswordModal(true)
  }

  const handleSavePassword = () => {
    setShowPasswordModal(false)
    setSelectedSupervisor(null)
    setNewPasswordValue('')
    setRepeatPassword('')
    setShowNewPassword(false)
    setShowRepeatPassword(false)
  }

  const handleCancelPassword = () => {
    setShowPasswordModal(false)
    setSelectedSupervisor(null)
    setNewPasswordValue('')
    setRepeatPassword('')
    setShowNewPassword(false)
    setShowRepeatPassword(false)
  }

  const handleDeleteClick = (supervisor) => {
    setSelectedSupervisor(supervisor)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    setShowDeleteModal(false)
    setSelectedSupervisor(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedSupervisor(null)
  }
  
  const supervisores = [
    { id: 1, name: 'CARLOS MENDOZA', department: 'Recursos humanos', departmentColor: 'bg-pink-200', initial: 'C', initialColor: 'bg-green-700' },
    { id: 2, name: 'ANA GARCÍA', department: 'Sistemas', departmentColor: 'bg-yellow-100', initial: 'A', initialColor: 'bg-blue-600' },
    { id: 3, name: 'ROBERTO LÓPEZ', department: 'Cocina', departmentColor: 'bg-green-200', initial: 'R', initialColor: 'bg-orange-600' },
    { id: 4, name: 'MARÍA TORRES', department: 'Finanzas', departmentColor: 'bg-purple-200', initial: 'M', initialColor: 'bg-yellow-700' },
    { id: 5, name: 'PEDRO SÁNCHEZ', department: 'Entretenimiento', departmentColor: 'bg-pink-200', initial: 'P', initialColor: 'bg-purple-600' }
  ]

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        Home &gt; Supervisores
      </div>

      {/* Search and Action Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white rounded-full shadow-md px-6 py-3 flex items-center">
          <input 
            type="text" 
            placeholder="Buscar encargado..."
            className="flex-1 outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button className="bg-white rounded-full shadow-md px-6 py-3 flex items-center gap-2 text-gray-700 hover:bg-gray-50">
          <span>Filtros</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md px-8 py-3 flex items-center gap-2 font-medium"
          onClick={handleAddClick}
        >
          <span>Agregar</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
          </svg>
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 mb-4 px-4">
        <div className="text-sm font-semibold text-gray-700">Nombre del encargado</div>
        <div className="text-sm font-semibold text-gray-700">Departamento</div>
        <div className="text-sm font-semibold text-gray-700">Acciones</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4">
        {supervisores.map((supervisor) => (
          <div key={supervisor.id} className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-3 gap-4 items-center">
            {/* Name Column */}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full ${supervisor.initialColor} flex items-center justify-center text-white font-bold text-xl`}>
                {supervisor.initial}
              </div>
              <span className="font-semibold text-gray-800">{supervisor.name}</span>
            </div>

            {/* Department Column */}
            <div>
              <span className={`${supervisor.departmentColor} px-6 py-2 rounded-full text-sm text-gray-800`}>
                {supervisor.department}
              </span>
            </div>

            {/* Actions Column */}
            <div className="flex gap-3">
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleEditClick(supervisor)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handlePasswordClick(supervisor)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </button>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleDeleteClick(supervisor)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">1</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">2</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">3</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">...</button>
        <button className="w-10 h-10 border border-gray-300 rounded bg-white hover:bg-gray-50">10</button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Editar supervisor</h2>
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nombres:</label>
                  <input
                    type="text"
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Apellidos:</label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Teléfono:</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleSaveEdit}
                className="px-12 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-12 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Registrar a un nuevo supervisor</h2>
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nombres:</label>
                  <input
                    type="text"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Apellidos:</label>
                  <input
                    type="text"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Correo:</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Departamento:</label>
                  <select
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
                  >
                    <option value="">Seleccione uno</option>
                    <option value="Recursos humanos">Recursos humanos</option>
                    <option value="Sistemas">Sistemas</option>
                    <option value="Cocina">Cocina</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Teléfono:</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Privilegios:</label>
                  <select
                    value={newPrivileges}
                    onChange={(e) => setNewPrivileges(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-100"
                  >
                    <option value="">Seleccione uno</option>
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Usuario">Usuario</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contraseña:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleSaveAdd}
                className="px-12 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelAdd}
                className="px-12 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Cambiar contraseña</h2>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nueva contraseña:</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPasswordValue}
                    onChange={(e) => setNewPasswordValue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showNewPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Repite contraseña:</label>
                <div className="relative">
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showRepeatPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleSavePassword}
                className="px-12 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg"
              >
                Guardar
              </button>
              <button
                onClick={handleCancelPassword}
                className="px-12 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Desactivar supervisor</h2>
            <p className="text-gray-700 mb-8">
              ¿Estas seguro que deseas desactivar la cuenta de este supervisor?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmDelete}
                className="px-12 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-12 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 shadow-lg"
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

export default Supervisores
