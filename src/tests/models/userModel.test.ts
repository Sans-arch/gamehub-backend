import { User } from '../../app/models/userModel';

describe('User model test suite', () => {

  it('should have a non-empty name', () => {
    const sut = new User({
      name: "Carlos",
      email: "",
      password: "",
      createdAt: new Date(),
    });

    const actual = sut.name;

    expect(actual.length).toBeGreaterThanOrEqual(1);
  });

  it('should have a non-empty password', () => {
    const sut = new User({
      name: "",
      email: "",
      password: "abc1234",
      createdAt: new Date(),
    });

    const actual = sut.password;

    expect(actual.length).toBeGreaterThanOrEqual(1);
  });

  it('should be able to not have an ID', () => {
    const sut = new User({
      name: "",
      email: "",
      password: "abc1234",
      createdAt: new Date(),
    });

    expect(sut).not.toHaveProperty("id");
  });

  it('should be able to have an ID', () => {
    const sut = new User({
      id: 123,
      name: "",
      email: "",
      password: "abc1234",
      createdAt: new Date(),
    });

    expect(sut).toHaveProperty("id");
  });

  it('should be able to create an new User without pass the createdAt argument', () => {
    const sut = new User({
      name: "",
      email: "",
      password: "",
    });

    expect(sut).toHaveProperty("createdAt");
  });

});
