import { IUser } from "../types";

export class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      name: user.name,
      role: user.role,
    };
  }
  public toManyResponse(users: IUser[]) {
    return users.map(this.toResponse);
  }
}

export const userMapper = new UserMapper();
