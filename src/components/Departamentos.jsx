import { useState } from 'react'
import arhiveIcon from '../assets/Arhive.svg'

function Departamentos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedDepartamento, setSelectedDepartamento] = useState(null)
  const [editName, setEditName] = useState('')
  const [newName, setNewName] = useState('')
  
  const handleDeleteClick = (departamento) => {
    setSelectedDepartamento(departamento)
    setShowDeleteModal(true)
  }

  const handleEditClick = (departamento) => {
    setSelectedDepartamento(departamento)
    setEditName(departamento.name)
    setShowEditModal(true)
  }

  const handleAddClick = () => {
    setShowAddModal(true)
  }

  const handleConfirmDelete = () => {
    setShowDeleteModal(false)
    setSelectedDepartamento(null)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setSelectedDepartamento(null)
  }

  const handleSaveEdit = () => {
    setShowEditModal(false)
    setSelectedDepartamento(null)
    setEditName('')
  }

  const handleCancelEdit = () => {
    setShowEditModal(false)
    setSelectedDepartamento(null)
    setEditName('')
  }

  const handleSaveAdd = () => {
    setShowAddModal(false)
    setNewName('')
  }

  const handleCancelAdd = () => {
    setShowAddModal(false)
    setNewName('')
  }
  
  const departamentos = [
    { id: 1, name: 'Recursos humanos', color: 'bg-pink-200' },
    { id: 2, name: 'Sistemas', color: 'bg-yellow-100' },
    { id: 3, name: 'Cocina', color: 'bg-green-200' },
    { id: 4, name: 'Finanzas', color: 'bg-purple-200' },
    { id: 5, name: 'Entretenimiento', color: 'bg-pink-200' }
  ]

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        Home &gt; Departamentos
      </div>

      {/* Search and Action Bar */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-white rounded-full shadow-md px-6 py-3 flex items-center">
          <input 
            type="text" 
            placeholder="Buscar departamento..."
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
          <img src={arhiveIcon} alt="Archive" className="w-5 h-5 brightness-0 invert" />
        </button>
      </div>

      {/* Table Header */}
      <div className="flex mb-4 px-4">
        <div className="flex-1 text-sm font-semibold text-gray-700">Nombre del departamento</div>
        <div className="text-sm font-semibold text-gray-700 mr-2">Acciones</div>
      </div>

      {/* Table Rows */}
      <div className="space-y-4">
        {departamentos.map((departamento) => (
          <div key={departamento.id} className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
            {/* Name Column */}
            <div>
              <span className={`${departamento.color} px-6 py-2 rounded-full text-sm text-gray-800`}>
                {departamento.name}
              </span>
            </div>

            {/* Actions Column */}
            <div className="flex gap-3">
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleEditClick(departamento)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleDeleteClick(departamento)}
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Eliminar departamento</h2>
            <p className="text-gray-700 mb-8">
              ¿Estas seguro que deseas eliminar este departamento?
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-6">Editar departamento</h2>
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
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
            <h2 className="text-2xl font-semibold mb-6">Registrar a un nuevo departamento</h2>
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
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
    </div>
  )
}

export default Departamentos
