import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'default-secret-key',
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

const requireManager = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || user.role !== 'Manager') {
      res.status(401).json({ message: 'Unauthorized: Manager access required' });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

const requireFan = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || user.role !== 'Fan') {
      res.status(401).json({ message: 'Unauthorized: Fan access required' });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
};

const requireAdmin = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user || user.role !== 'Admin') {
      res.status(401).json({ message: 'Unauthorized: Admin access required' });
    } else {
      req.user = user;
      next();
    }
  })(req, res, next);
}

export {requireManager, requireFan, requireAdmin};