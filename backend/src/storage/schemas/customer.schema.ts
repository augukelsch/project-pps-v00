import mongoose from 'mongoose';

const { Schema } = mongoose;

export const customer_list = new Schema({
  name: String,
  address: String,
  district: String,
  city: String,
  state: String,
  cep: String,
  cnpj: {
    type: String,
    unique: [true, 'CNPJ must be unique']
  },
  ie: {
    type: String,
    unique: [true, 'IE must be unique']
  },
  phone: String,
  seller: String,
  createdAt: Date,
  updatedAt: Date,
  hidden: Boolean,
});

