import type { BlogPost } from "./BlogModel";

export interface CreateUserRequest {
  fullname: string;
  email: string;
  password: string;
  genderId: number | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  country: string;
  city: string;
  roleId: number;
  avatarUrl?: string | null;
}

export interface UpdateUserForm {
  fullname: string;
  email: string;
  roleId: number;
  genderId: number;
  status: boolean;
  age: number | null;
  height: number | null;
  weight: number | null;
  country: string | null;
  city: string | null;
}

export interface Gender {
  id: number;
  name: string;
}

export interface NotificationType {
  id: number;
  name: string;
  notifications: string[];
}

export interface Notification {
  notificationid: number;
  userid: number;
  title: string;
  message: string;
  typeId: number;
  isread: boolean;
  createdat: string;
  scheduledat: string;
  type: NotificationType;
  user: string;
}

export interface SpendingLog {
  spendingid: number;
  userid: number;
  date: string; // YYYY-MM-DD
  amount: number;
  note: string;
  user: string;
}

export interface User {
  userid: number;
  fullname: string;
  email: string;
  passwordhash: string;
  genderId: number | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  country: string | null;
  roleId: number;
  status: boolean;
  createdat: string;   // ISO date string
  updatedat: string;   // ISO date string
  avatarUrl: string | null;
  isEmailVerified: boolean;
  blogposts: BlogPost[];       
  gender: Gender | null;
  notifications: Notification[];
  spendinglogs: SpendingLog[];
}

export interface UsersResponse {
  items: User[];
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}
