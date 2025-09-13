import type { PaginationResponse } from "./PageModel";



export interface BlogAuthor {
  userId: number;
  userName: string;
}
export interface BlogMedia {
  mediaId: number;
  blogId: number;
  mediaUrl: string;
  mediaType: string;
  orderIndex: number;
}

export interface BlogCategory {
  categoryid: number;
  categoryName: string;
}

export interface BlogPost {
  postid: number;
  title: string;
  content: string;
  authorid: number;
  categoryid: number;
  status: boolean;
  createdat: string; // ISO date string
  updatedat: string; // ISO date string
  author: string;
  blogMedia: BlogMedia[];
  category: BlogCategory;
}

export interface Blog {
  postid: number;
  title: string;
  content: string;
  categoryid: number;
  status: boolean;
  createdat: string; // ISO string
  updatedat: string; // ISO string
  medias: BlogMedia[];
  author: BlogAuthor;
}

// Response chuẩn hóa theo API
export interface BlogListResponse {
  success: boolean;
  message: string;
  data: PaginationResponse<Blog>;
  error: string[] | null;
}