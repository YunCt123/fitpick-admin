import type { Rule } from 'antd/lib/form';

export const ValidationRules = {
  // Required field validation
  required: (message?: string): Rule => ({
    required: true,
    message: message || 'This field is required!',
  }),

  // Email validation
  email: [
    { required: true, message: 'Please enter email!' },
    { type: 'email', message: 'Please enter a valid email address!' },
  ] as Rule[],

  // Password validation
  password: [
    { required: true, message: 'Please enter password!' },
    { min: 6, message: 'Password must be at least 6 characters long!' },
    { max: 50, message: 'Password cannot exceed 50 characters!' },
  ] as Rule[],

  // Confirm password validation
  confirmPassword: (form: any): Rule[] => [
    { required: true, message: 'Please confirm your password!' },
    {
      validator: (_, value) => {
        if (!value || form.getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The confirm password does not match!'));
      },
    },
  ],

  // Full name validation
  fullName: [
    { required: true, message: 'Please enter full name!' },
    { min: 2, message: 'Full name must be at least 2 characters!' },
    { max: 100, message: 'Full name cannot exceed 100 characters!' },
    { pattern: /^[a-zA-ZÀ-ỹ\s]+$/, message: 'Full name can only contain letters and spaces!' },
  ] as Rule[],

  // Age validation
  age: [
    { type: 'number', min: 1, max: 150, message: 'Age must be between 1 and 150!' },
  ] as Rule[],

  // Height validation (in cm)
  height: [
    { type: 'number', min: 50, max: 300, message: 'Height must be between 50 and 300 cm!' },
  ] as Rule[],

  // Weight validation (in kg)
  weight: [
    { type: 'number', min: 1, max: 1000, message: 'Weight must be between 1 and 1000 kg!' },
  ] as Rule[],

  // URL validation
  url: [
    { type: 'url', message: 'Please enter a valid URL!' },
  ] as Rule[],

  // Country/City validation
  location: [
    { required: true, message: 'This field is required!' },
    { min: 2, message: 'Must be at least 2 characters!' },
    { max: 50, message: 'Cannot exceed 50 characters!' },
  ] as Rule[],

  // Phone number validation
  phone: [
    { pattern: /^[+]?[\d\s()-]{8,15}$/, message: 'Please enter a valid phone number!' },
  ] as Rule[],
};

// Form field options
export const FormOptions = {
  gender: [
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
    { value: null, label: 'Prefer not to say' },
  ],

  role: [
    { value: 1, label: 'Guest' },
    { value: 2, label: 'User' },
    { value: 3, label: 'Premium' },
    { value: 4, label: 'Admin' },
  ],

  status: [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
  ],
};