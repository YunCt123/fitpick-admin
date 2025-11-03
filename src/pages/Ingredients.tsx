import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Plus } from 'lucide-react';
import { IngredientTable, CreateIngredient, UpdateIngredient, IngredientDetails, IngredientStats, DeleteIngredient } from '../components/ingredient';
import { ingredientService } from '../services/ingredient.service';
import type { Ingredient } from '../models/IngredientModel';

const Ingredients: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  // Fetch ingredients with pagination
  const fetchIngredients = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const status = statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined;
      const response = await ingredientService.getAllIngredients({
        name: searchTerm || undefined,
        type: typeFilter !== 'all' ? typeFilter : undefined,
        status: status,
        page: page,
        pageSize: pageSize,
        sortBy: 'ingredientid',
        sortDesc: true
      });
      
      if (response.success && response.data) {
        setIngredients(response.data);
        if ((response.data as any).totalItems !== undefined) {
          setTotalItems((response.data as any).totalItems);
          setTotalPages((response.data as any).totalPages || 1);
        }
      } else {
        setError(response.message || 'Failed to fetch ingredients');
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Failed to fetch ingredients';
      setError(errorMessage);
      console.error('Error fetching ingredients:', err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, typeFilter, statusFilter, pageSize]);

  // Fetch when filters change (reset to page 1)
  useEffect(() => {
    setCurrentPage(1);
    fetchIngredients(1);
  }, [searchTerm, typeFilter, statusFilter, fetchIngredients]);

  // Fetch when page changes
  useEffect(() => {
    if (currentPage > 0) {
      fetchIngredients(currentPage);
    }
  }, [currentPage, fetchIngredients]);

  // Calculate ingredient stats (use totalItems if available, otherwise use current ingredients)
  const ingredientStats = useMemo(() => {
    // For stats, we might need to fetch total separately, but for now use current data
    const active = ingredients.filter(ing => ing.status === true);
    const inactive = ingredients.filter(ing => ing.status === false);
    const types = new Set(ingredients.map(ing => ing.type).filter(Boolean));
    
    return {
      total: totalItems > 0 ? totalItems : ingredients.length,
      active: active.length, // This is only for current page, total would need separate query
      inactive: inactive.length,
      totalTypes: types.size
    };
  }, [ingredients, totalItems]);

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchIngredients(1);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateSuccess = () => {
    fetchIngredients(currentPage);
    setShowCreateModal(false);
  };

  const handleUpdateSuccess = () => {
    fetchIngredients(currentPage);
    setShowUpdateModal(false);
    setSelectedIngredient(null);
  };

  const handleDeleteSuccess = () => {
    fetchIngredients(currentPage);
    setShowDeleteModal(false);
    setSelectedIngredient(null);
  };

  const handleViewIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setShowDetailsModal(true);
  };

  const handleEditIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setShowUpdateModal(true);
  };

  const handleDeleteIngredient = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setShowDeleteModal(true);
  };

  // Get unique types for filter dropdown (from current page ingredients)
  // Note: In production, you might want to fetch types separately for better accuracy
  const uniqueTypes = useMemo(() => {
    const types = ingredients.map(ing => ing.type).filter(Boolean) as string[];
    return Array.from(new Set(types));
  }, [ingredients]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ingredient Management</h1>
          <p className="text-gray-600 mt-2">
            Manage ingredients list in the system
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-purple-700 flex items-center shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Ingredient
        </button>
      </div>

      {/* Stats */}
      <IngredientStats stats={ingredientStats} loading={loading} />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-1">
              <p className="text-red-800">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-800 hover:text-red-900 ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ingredients by name, type, or unit..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-r-md hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 hover:bg-gray-400"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ingredient Table */}
      <IngredientTable
        ingredients={ingredients}
        loading={loading}
        onEdit={handleEditIngredient}
        onDelete={handleDeleteIngredient}
        onView={handleViewIngredient}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            « Trước
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Trang {currentPage} / {totalPages} (Tổng: {totalItems})
            </span>
          </div>

          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={i}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-2 border border-gray-300 rounded-md transition-all duration-200 ${
                  currentPage === pageNum
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-purple-500 shadow-md'
                    : 'hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Sau »
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateIngredient
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
        loading={loading}
      />

      <UpdateIngredient
        isOpen={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedIngredient(null);
        }}
        onSuccess={handleUpdateSuccess}
        ingredient={selectedIngredient}
        loading={loading}
      />

      <IngredientDetails
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedIngredient(null);
        }}
        ingredient={selectedIngredient}
      />

      <DeleteIngredient
        ingredient={selectedIngredient}
        isVisible={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedIngredient(null);
        }}
        onIngredientDeleted={handleDeleteSuccess}
      />
    </div>
  );
};

export default Ingredients;

