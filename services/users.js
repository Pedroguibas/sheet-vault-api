import { User } from "../models/user.js";

export const createUser = async ({
  username,
  email,
  password,
  sheets = [],
}) => {
  const new_user = new User({ username, email, password, sheets });
  return await new_user.save();
};

export const getUsers = async () => {
  return await User.find({});
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const updateUser = async (id, { username, email, password }) => {
  return await User.findByIdAndUpdate(
    { _id: id },
    { $set: { username, email, password } },
    { new: true }
  );
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete({ _id: id });
};
