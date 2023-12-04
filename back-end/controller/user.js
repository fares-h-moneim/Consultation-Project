import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';


const signIn = async (req, res) => {
    try {
      const { username, password } = req.body;
        const tryGetUsername = await UserModel.findOne({ username: username });
        if (tryGetUsername) {
            const isPasswordCorrect = await bcrypt.compare(password, tryGetUsername.password);
            if (isPasswordCorrect) {
              const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h',
              });
              res.json({ token });
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  };

export default signIn;