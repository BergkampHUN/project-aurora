export interface UserResponseObj {
  user: User
}
export interface User {
  id: number;
  name: string;
  email: string;
  note: string;
  archived: boolean;
  role: string;
  language: string;
  created_at: string;
  updated_at: string;
}