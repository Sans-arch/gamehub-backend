import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import { UserRepository } from "./UserRepository";

export class AuthService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  register(name: string, email: string, password: string) {
    const userExists = this.repository.findByEmail(email);

    if (userExists) throw new Error("This email was already used by another user.");

    const newUser = new User({ name, email, password });
    newUser.password = bcrypt.hashSync(newUser.password, 10);

    this.repository.save(newUser);

    return newUser;
  }

  login(email: string, password: string) {
    const user = this.repository.findByEmail(email);
    if (!user) throw new Error("User not found.");

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) throw new Error("Wrong password.");

    const token = jwt.sign({ id: user.id, email: user.email }, "segredo-do-jwt", { expiresIn: "1d" });

    return { token, user };
  }

  verifyToken(token: any) {
    const decodedToken = jwt.verify(token, "segredo-do-jwt") as any;
    const user = this.repository.findByEmail(decodedToken.email);

    return user;
  }
}
