import { CreateCustomerDto } from "../../../src/modules/dto/customer.dto";
import { customer_list } from "../schemas/customer.schema";
import mongoose from 'mongoose';

export const customerModel = mongoose.model('Customer', customer_list);

export async function createCustomer(createCustomerDto: CreateCustomerDto) {
    mongoose.model('Customer', customer_list);
    const customer = new customerModel({
        name:createCustomerDto.name,
        address:createCustomerDto.address,
        district:createCustomerDto.district,
        city:createCustomerDto.city,
        state:createCustomerDto.state,
        cep:createCustomerDto.cep,
        cnpj:createCustomerDto.cnpj,
        ie:createCustomerDto.ie,
        phone:createCustomerDto.phone,
        seller:createCustomerDto.seller,
        createdAt: new Date(),
        updatedAt: new Date(),
        hidden: createCustomerDto.hidden
    });
    try {
        await customer.save()
    } catch (err) {
        console.log('ERROR!',err.message)
        return "ERROR! cnpj and ie must be unique"
    }
}
export async function readAllCustomers() {
    const query = await customerModel.find()
    return query;
}
export async function readCustomerCount() {
    const query = await customerModel.countDocuments().exec()
    return query;
}

export async function readOneById(id) {
    const query = await customerModel.findById(id)
    if (!query) {
        return "This Customer ID does not Exist, try a different ID!"
    }
    return query;
}
export async function readOneByCnpj(cnpj) {
    const query = await customerModel.find({ cnpj: cnpj }).exec()
    return query;
}

export async function deleteOneById(id) {
    const query = await customerModel.deleteOne({ _id: id }).exec()
    if (query.deletedCount == 0) {
        return "This Customer ID does not Exist, try a different ID!"
    }
    return query;
}
export async function updateOneById(id, updateCustomerDto) {
    let query = await customerModel.findById(id).exec();

    if(updateCustomerDto.cnpj != query?.cnpj || updateCustomerDto.ie != query?.ie){
        return "This field cannot be Changed!"
    }
    if (!query) {
        return "This Customer ID does not Exist, try a different ID!"
    }
    query.name = updateCustomerDto.name;
    query.address = updateCustomerDto.address;
    query.district = updateCustomerDto.district;
    query.city = updateCustomerDto.city;
    query.state = updateCustomerDto.state;
    query.cep = updateCustomerDto.cep;
    query.phone = updateCustomerDto.phone;
    query.seller = updateCustomerDto.seller;
    query.updatedAt =  new Date();
    query.hidden =  updateCustomerDto.hidden || false;
    await query.save()
    return query
}
