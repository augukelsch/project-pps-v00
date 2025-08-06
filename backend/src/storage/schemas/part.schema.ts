import mongoose from 'mongoose';

const { Schema } = mongoose;

export const part_list = new Schema({
  cod: {
    type: String,
    unique: [true, 'cod must be unique']
  },
  description: String,
  unit: String,
  distributionValue: Number,
  storeValue: Number,
  cost: Number,
  createdAt: Date,
  updatedAt: Date,
  hidden: Boolean,
});

