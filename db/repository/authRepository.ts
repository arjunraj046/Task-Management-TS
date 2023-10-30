import { FindOneOptions, getRepository } from "typeorm";
import { UserSchema } from "../models/user";

export const registerUser_DB = async (Username: string, saltPassword: string) => {
  const userRepository = getRepository(UserSchema);

  const newUser = userRepository.create({
    username: Username,
    password: saltPassword,
  });

  try {
    const savedUser = await userRepository.save(newUser);
    return savedUser;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

export const findUser_DB = async (username: string) => {
  const userRepository = getRepository(UserSchema);
  try {
    const options: FindOneOptions<UserSchema> = {
      where: { username: username },
    };
    const response = await userRepository.findOne(options);
    return response;
  } catch (error) {
    throw error;
  }
};
