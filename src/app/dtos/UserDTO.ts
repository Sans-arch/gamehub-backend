export interface UserRequestDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserPersistDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  name?: string;
  email?: string;
  token: string;
  isValid?: boolean;
}
