export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface RetrieveUserRequest {
  token: string;
}
