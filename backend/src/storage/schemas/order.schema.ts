import mongoose from "mongoose";

const { Schema } = mongoose;

export const order_list = new Schema({
  numeroPedido: { type: String, required: true, unique: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  createdAt: { type: Date, required: true },
  prazoEntrega: Date,
  status: { type: String, enum: ["OK", "PENDENTE", "CANCELADO"], default: "PENDENTE" },
  valorTotal: { type: Number},
  observacoes: String,
  marca: String,
  parts: [
    {
      part: { type: Schema.Types.ObjectId, ref: "Part", required: true },
      quantidade: { type: Number, required: true },
      statusItem: { type: String, enum: ["OP", "ESTOQUE"], required: true },
      precoUnitario: Number,
    }
  ],
  updatedAt: Date,
  hidden: Boolean,
}, { timestamps: true });