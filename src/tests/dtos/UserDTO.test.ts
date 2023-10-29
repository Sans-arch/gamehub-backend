import { UserResponseDTO } from "../../app/dtos/UserDTO";

describe('UserDTO test suite', () => {
  it('should create an instance of UserResponseDTO with correctly token and user', () => {
    const userData: UserResponseDTO = {
      token: 'asqasasfqeqw',
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
    };

    const sut: UserResponseDTO = userData;

    expect(sut.token).toEqual(userData.token);
    expect(sut.user.name).toEqual(userData.user.name);
    expect(sut.user.email).toEqual(userData.user.email);
  });
});

