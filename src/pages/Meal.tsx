import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import type { Meal } from '../models/MealModel';
import { useMeals, useMealStats } from '../hooks/useMealManagement';
import { 
  CreateMeal, 
  UpdateMeal, 
  DeleteMeal, 
  MealDetails,
  MealStats,
  MealActions,
  MealTable
} from '../components/meal';

const MealManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedDietType, setSelectedDietType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDietType, selectedStatus]);

  // Use API hooks
  const {
    meals,
    loading,
    error,
    refetch
  } = useMeals({
    search: debouncedSearch || undefined,
    diettype: selectedDietType || undefined,
    statusId: selectedStatus ? parseInt(selectedStatus) : undefined
  });

  const { stats, loading: statsLoading } = useMealStats();

  // Use all meals from API (filtering is handled by API)
  const filteredMeals = meals;

  // Client-side pagination
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);
  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleView = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowViewModal(true);
  };

  const handleEdit = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowEditModal(true);
  };

  const handleDelete = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowDeleteModal(true);
  };

  const handleSuccess = () => {
    refetch(); // Refresh the meal list
    // Reset modal states
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedMeal(null);
  };

  // Remove full page loading - now handled by individual components

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex flex-col justify-center items-center h-64">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-600 text-lg font-medium mb-2">Error Loading Meals</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => refetch()}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meal Management</h1>
        <p className="text-gray-600">Manage meals list in the system</p>
      </div>

      {/* Stats Cards */}
      <MealStats stats={stats} loading={statsLoading} />

      {/* Actions */}
      <MealActions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDietType={selectedDietType}
        setSelectedDietType={setSelectedDietType}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onAddMeal={() => setShowCreateModal(true)}
      />

      {/* Meals Table */}
      <MealTable
        meals={paginatedMeals}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Meal CRUD Modals */}
      <CreateMeal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleSuccess}
      />

      <UpdateMeal
        meal={selectedMeal}
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleSuccess}
      />

      <MealDetails
        meal={selectedMeal}
        visible={showViewModal}
        onClose={() => setShowViewModal(false)}
        onEdit={() => {
          setShowViewModal(false);
          setShowEditModal(true);
        }}
      />

      <DeleteMeal
        meal={selectedMeal}
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onMealDeleted={handleSuccess}
      />
    </div>
  );
};

export default MealManagement;
