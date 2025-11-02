import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { filterService } from '../../services/filter.service';

interface MealActionsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedDietType: string;
  setSelectedDietType: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  onAddMeal: () => void;
}

const MealActions: React.FC<MealActionsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDietType,
  setSelectedDietType,
  selectedStatus,
  setSelectedStatus,
  onAddMeal,
}) => {
  const [dietTypes, setDietTypes] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<Array<{ id: number; name: string }>>([]);
  const [loadingDietTypes, setLoadingDietTypes] = useState(false);
  const [loadingStatuses, setLoadingStatuses] = useState(false);

  useEffect(() => {
    fetchDietTypes();
    fetchStatuses();
  }, []);

  const fetchDietTypes = async () => {
    try {
      setLoadingDietTypes(true);
      const response = await filterService.getDietTypes();
      if (response.success && response.data) {
        setDietTypes(response.data);
      }
    } catch (error) {
      console.error('Error fetching diet types:', error);
      // Fallback to default values
      setDietTypes(['Non-Vegetarian', 'Vegetarian', 'Vegan']);
    } finally {
      setLoadingDietTypes(false);
    }
  };

  const fetchStatuses = async () => {
    try {
      setLoadingStatuses(true);
      const response = await filterService.getMealStatuses();
      if (response.success && response.data) {
        setStatuses(response.data);
      }
    } catch (error) {
      console.error('Error fetching meal statuses:', error);
      // Fallback to default values
      setStatuses([{ id: 1, name: 'Active' }, { id: 2, name: 'Inactive' }]);
    } finally {
      setLoadingStatuses(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedDietType}
              onChange={(e) => setSelectedDietType(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loadingDietTypes}
            >
              <option value="">All Types</option>
              {dietTypes.length > 0 ? (
                dietTypes.map((dietType) => (
                  <option key={dietType} value={dietType}>
                    {dietType}
                  </option>
                ))
              ) : (
                <>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </>
              )}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={loadingStatuses}
            >
              <option value="">All Status</option>
              {statuses.length > 0 ? (
                statuses.map((status) => (
                  <option key={status.id} value={status.id.toString()}>
                    {status.name}
                  </option>
                ))
              ) : (
                <>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </>
              )}
            </select>
          </div>
        </div>

        <button
          onClick={onAddMeal}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Meal
        </button>
      </div>
    </div>
  );
};

export default MealActions;