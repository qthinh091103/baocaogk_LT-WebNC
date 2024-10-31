import express from "express";
import userModel from "../models/userModel";
const getAllUser = async (req, res) => {
  let userlist = await userModel.getAllUser();
  res.render("home", {
    date: { title: "List User", page: "listUsers", row: userList },
  });
};
const createUser = (req, res) => {
  res.render("home", {
    date: { title: "Create New User", page: "createNewUser" },
  });
};
export default { getAllUser, createUser };
