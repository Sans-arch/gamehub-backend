import { UserDTO } from "../../app/dtos/UserDTO";

describe('UserDTO test suite', () => {
  it('should create an instance of UserDTO with correctly token and user', () => {
    const userData: UserDTO = {
      token: 'myToken',
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
    };

    const sut = new UserDTO(userData);

    expect(sut.token).toEqual(userData.token);
    expect(sut.user.name).toEqual(userData.user.name);
    expect(sut.user.email).toEqual(userData.user.email);
  });
});

