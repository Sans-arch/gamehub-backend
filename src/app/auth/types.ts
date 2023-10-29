export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface RetrieveUserRequest {
  token: string;
}

export interface RevogueTokenRequest {
  token: string;
}
