import UserModel from "../model/user.js";
import RequestModel from "../model/request.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

dotenv.config();
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const tryGetUsername = await UserModel.findOne({ username: username });
    if (tryGetUsername) {
      const isPasswordCorrect = await bcrypt.compare(password, tryGetUsername.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ sub: tryGetUsername._id, username: tryGetUsername.username, role: tryGetUsername.role }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '1h',
        });
        res.json({ token, username: tryGetUsername.username, role: tryGetUsername.role });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
    else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDetailsByUsername = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findOne({ _id: decoded.sub });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateDetails = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findOne({ _id: decoded.sub });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(decoded.sub, req.body, { new: true });
    res.status(200).json({ updatedUser });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const checkUserAvailability = async (req, res) => {
  try {
    const tryUsername = req.params.username;
    const user = await UserModel.findOne({ username: tryUsername });
    const requestUser = await RequestModel.findOne({ username: tryUsername })
    res.json({ available: !user && !requestUser }); // Return true if the username is available
  } catch (error) {
    console.error('Error checking username availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteUser = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.role != 'Admin') {
      return res.status(401).json({ message: 'Unauthorized: Admin role required' });
    }
    const user = await UserModel.findById(req.body.id);
    if (user) {
      const deletedUser = await UserModel.findByIdAndDelete(req.body.id);
      res.status(201).json(deletedUser);
    }
    else {
      res.status(404).json({ error: 'User not found' });
    }
  }
  catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.role != 'Admin') {
      return res.status(401).json({ message: 'Unauthorized: Admin role required' });
    }
    const users = await UserModel.find({ role: { $ne: 'Admin' } });
    res.status(201).json(users);
  }
  catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const changePassword = async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findOne({ _id: decoded.sub });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.oldPassword, user.password);
    if (isPasswordCorrect) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
      const updatedUser = await UserModel.findByIdAndUpdate(decoded.sub, { password: hashedPassword }, { new: true });
      res.status(200).json({ updatedUser });
    }
    else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export { signIn, logout, getDetailsByUsername, updateDetails, getAllUsers, deleteUser, checkUserAvailability, changePassword };
