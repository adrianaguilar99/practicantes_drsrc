import { useState } from 'react'

function Administradores() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [newName, setNewName] = useState('')
  const [editName, setEditName] = useState('')
  
  const [newPasswordValue, setNewPasswordValue] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const handleAddClick = () => {
    setShowAddModal(true)
  }

  const handleSaveAdd = () => {
    setShowAddModal(false)
    setNewName('')
  }

  const handleCancelAdd = () => {
    setShowAddModal(false)
    setNewName('')
  }

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin)
    setEditName(admin.nombre)
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    setShowEditModal(false)
    setSelectedAdmin(null)
    setEditName('')
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setSelectedAdmin(null)
    setEditName('')
  }

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    setShowDeleteModal(false)
    setSelectedAdmin(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedAdmin(null)
  }

  const handlePasswordClick = (admin) => {
    setSelectedAdmin(admin)
    setShowPasswordModal(true)
  }

  const handleSavePassword = () => {
    setShowPasswordModal(false)
    setSelectedAdmin(null)
    setNewPasswordValue('')
    setRepeatPassword('')
    setShowNewPassword(false)
    setShowRepeatPassword(false)
  }

  const handleCancelPassword = () => {
    setShowPasswordModal(false)
    setSelectedAdmin(null)
    setNewPasswordValue('')
    setRepeatPassword('')
    setShowNewPassword(false)
    setShowRepeatPassword(false)
  }

  const administradores = [
    { id: 1, nombre: 'ADMINISTRADOR 1', color: 'bg-blue-900', initial: 'A' },
    { id: 2, nombre: 'ADMINISTRADOR 2', color: 'bg-red-600', initial: 'G' },
    { id: 3, nombre: 'ADMINISTRADOR 3', color: 'bg-green-500', initial: 'I' },
  ]

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        Home &gt; Practicantes
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar encargado..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <button className="px-6 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
        </button>
        <button 
          className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          onClick={handleAddClick}
        >
          Agregar
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">Nombre del encargado</div>
        <div className="text-sm font-medium text-gray-700 mr-1">Acciones</div>
      </div>

      {/* Administradores List */}
      <div className="space-y-4">
        {administradores.map((admin) => (
          <div key={admin.id} className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`${admin.color} text-white rounded-full w-10 h-10 flex items-center justify-center font-bold`}>
                {admin.initial}
              </div>
              <span className="font-medium">{admin.nombre}</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                className="text-gray-400 hover:text-blue-500"
                onClick={() => handleEditClick(admin)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handlePasswordClick(admin)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </button>
              <button 
                className="text-gray-400 hover:text-red-500"
                onClick={() => handleDeleteClick(admin)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button className="px-3 py-1 border border-gray-300 rounded">1</button>
        <button className="px-3 py-1 border border-gray-300 rounded">2</button>
        <button className="px-3 py-1 border border-gray-300 rounded">3</button>
        <span className="px-3 py-1">...</span>
        <button className="px-3 py-1 border border-gray-300 rounded">10</button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Editar administrador</h2>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
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
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Registrar un nuevo administrador</h2>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Desactivar cuenta de administrador</h2>
            <p className="text-gray-700 mb-8">
              ¿Estas seguro que deseas desactivar la cuenta de este administrador?
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
    </div>
  )
}

export default Administradores
