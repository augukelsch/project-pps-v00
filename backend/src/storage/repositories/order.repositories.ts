import mongoose from "mongoose";
import { order_list } from "../schemas/order.schema";
import { CreateOrderDTO } from "src/modules/dto/orders.dto";


const orderModel = mongoose.model('Order', order_list);

const partFieldsToBeDisplayed = 'cod description unit';
const customerFieldsToBeDisplayed = 'name cnpj address district city state cep cnpj ie phone'

export async function createOrder(creatOrderDto: CreateOrderDTO) {
    mongoose.model('Order', order_list);

    const valorTotalCalculado = creatOrderDto.parts.reduce((total, item) => total = total + (item.quantidade * item.precoUnitario), 0)
    const order = new orderModel({
        numeroPedido: creatOrderDto.numeroPedido,
        customerId: creatOrderDto.customerId,
        prazoEntrega: creatOrderDto.prazoEntrega,
        status: creatOrderDto.status,
        valorTotal: valorTotalCalculado,
        observacoes: creatOrderDto.observacoes,
        marca: creatOrderDto.marca,
        parts: creatOrderDto.parts,
        createdAt: new Date(),
        updatedAt: new Date(),
        hidden: creatOrderDto.hidden,
    });
    try {
        await order.save()
    } catch (err) {
        console.log('ERROR!', err.message)
        return "ERROR! Something wrong on Order"
    }
}

export async function readAllOrder() {
    const query = await orderModel.find().populate('customerId', customerFieldsToBeDisplayed).populate('parts.part', partFieldsToBeDisplayed).exec();
    return query;
}

export async function readOneById(id) {
    const query = await orderModel.findById(id).populate('customerId', customerFieldsToBeDisplayed).populate('parts.part', partFieldsToBeDisplayed).exec()
    if (!query) {
        return "This Order ID does not Exist, try a different ID!"
    }
    return query;
}

export async function readOrderCount() {
    const orderTotalCounter = await orderModel.countDocuments().exec()
    const orderStatusOK = await orderModel.countDocuments({ status: 'OK' }).exec()
    const orderStatusPENDENTE = await orderModel.countDocuments({ status: 'PENDENTE' }).exec()
    const orderStatusCANCELADO = await orderModel.countDocuments({ status: 'CANCELADO' }).exec()

    return {
        total: orderTotalCounter,
        OK: orderStatusOK,
        PENDENTE: orderStatusPENDENTE,
        CANCELADO: orderStatusCANCELADO
    };
}

export async function readOneByNumOrder(numeroPedido) {
    const query = await orderModel.find({ numeroPedido: numeroPedido }).populate('customerId', customerFieldsToBeDisplayed).populate('parts.part', partFieldsToBeDisplayed).exec()
    return query;
}
export async function deleteOneById(id) {
    const query = await orderModel.deleteOne({ _id: id }).exec()
    if (query.deletedCount == 0) {
        return "This Order ID does not Exist, try a different ID!"
    }
    return query;
}
export async function updateOneById(id, updateOrderDto) {
    let query = await orderModel.findById(id).exec();
    if (updateOrderDto.numeroPedido != query?.numeroPedido) {
        return "This field cannot be Changed!"
    }
    if (!query) {
        return "This Order ID does not Exist, try a different ID!"
    }
    const valorTotalCalculado = updateOrderDto.parts.reduce((total, item) => total = total + (item.quantidade * item.precoUnitario), 0)
    query.customerId = updateOrderDto.customerId
    query.prazoEntrega = updateOrderDto.prazoEntrega
    query.status = updateOrderDto.status
    query.valorTotal = valorTotalCalculado
    query.observacoes = updateOrderDto.observacoes
    query.marca = updateOrderDto.marca
    query.parts = updateOrderDto.parts
    query.updatedAt = new Date()
    query.hidden = updateOrderDto.hidden || false;

    await query.save()
    return query
}
