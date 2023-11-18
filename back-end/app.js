import express from 'express';
import mongoose from 'mongoose';

const dbUrl = 'mongodb://localhost:27017/admin';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

