import mongoose from "mongoose";

const { Schema } = mongoose;

export const order_list = new Schema({
  numeroPedido: { type: String, required: true, unique: true },
  name: { type: mongoose.Schema.Types.String, ref: "Customer", required: true },
  emissao: { type: Date, required: true },
  prazoEntrega: { type: Date },
  status: { type: String, enum: ["OK", "PENDENTE", "CANCELADO"], default: "PENDENTE" },
  valorTotal: { type: Number, required: true },

  observacoes: { type: String },

  parts: [
    {
      cod: { type: mongoose.Schema.Types.String, ref: "Part", required: true },
      quantidade: { type: Number, required: true },
      unidade: { type: String },
      statusItem: { type: String, enum: ["OP", "ESTOQUE"], required: true },
      precoUnitario: { type: Number },
    }
  ],

}, { timestamps: true });