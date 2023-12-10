import UserModel from "../model/user.js";
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
              res.json({ token, username: tryGetUsername.username});
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
  try{
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await UserModel.findOne({ _id: decoded.sub });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(decoded.sub, req.body, {new: true});
    res.status(200).json({ updatedUser });
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export {signIn, logout, getDetailsByUsername, updateDetails};
