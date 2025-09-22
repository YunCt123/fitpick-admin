/**
 * Utility functions for handling user roles
 */

export const getRoleName = (roleId: number): string => {
  switch (roleId) {
    case 1: return 'Guest';
    case 2: return 'User';
    case 3: return 'Premium';
    case 4: return 'Admin';
    default: return 'Unknown';
  }
};

export const getRoleColor = (roleId: number): string => {
  switch (roleId) {
    case 1: return '#87d068'; // Guest - Light green
    case 2: return '#108ee9'; // User - Blue
    case 3: return '#f50';    // Premium - Orange/Red
    case 4: return '#722ed1'; // Admin - Purple
    default: return '#d9d9d9'; // Unknown - Gray
  }
};

export const getRoleOptions = () => [
  { value: 1, label: 'Guest' },
  { value: 2, label: 'User' },
  { value: 3, label: 'Premium' },
  { value: 4, label: 'Admin' },
];