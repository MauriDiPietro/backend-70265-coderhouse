import userDao from "../daos/mongodb/user.dao.js";
import { createHash, isValidPassword } from "../utils.js";

export const getUserByEmail = async (email) => {
  try {
    return await userDao.getByEmail(email);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async (id) => {
  try {
    return await userDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (user) => {
  try {
    const { email, password, isGithub } = user;
    const existUser = await getUserByEmail(email);
    if (existUser) throw new Error("User already exists");
    if (isGithub) {
      const newUser = await userDao.register(user);
      return newUser;
    }
    const newUser = await userDao.register({
      ...user,
      password: createHash(password),
    });
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (email, password) => {
  try {
    // const { email, password } = user;
    const userExist = await getUserByEmail(email);
    if (!userExist) throw new Error("User not found");
    const passValid = isValidPassword(password, userExist);
    if (!passValid) throw new Error("incorrect credentials");
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
