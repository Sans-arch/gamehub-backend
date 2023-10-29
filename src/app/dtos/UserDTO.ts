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
  token?: string;
  user: {
    id?: number;
    email: string;
    name: string;
  },
}
