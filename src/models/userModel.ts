class User {
  private id: number;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }
}
