// User interfaces
export interface Register {
  id: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Login {
  email: string;
  password: string;
}

export type Actions =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "manage"
  | "all";
export type PageAccess = "todo" | "book" | "about" | "all" | "user" | "home";

export interface UserAbility {
  action: Actions;
  access: PageAccess;
}

export type UserRole = "admin" | "manager" | "user"

export interface User {
  id: string;
  fullName?: string;
  username: string;
  password: string;
  avatar?: string;
  email: string;
  role: UserRole;
  abilities: UserAbility[];
}
