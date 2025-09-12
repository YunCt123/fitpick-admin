import React from 'react';
import { Search } from 'lucide-react';

interface UserSearchProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch, loading = false }) => {
  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => onSearch(e.target.value)}
              disabled={loading}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
