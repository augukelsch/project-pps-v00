import { CreatePartDto } from "src/modules/dto/part.dto";
import { part_list } from "../schemas/part.schema";
import mongoose from 'mongoose';

const partModel = mongoose.model('PartList', part_list);

export async function createPart(createPartDto: CreatePartDto) {
    mongoose.model('PartList', part_list);
    const part = new partModel({
        cod: createPartDto.cod,
        description: createPartDto.description,
        unit: createPartDto.unit,
        distributionValue: createPartDto.distributionValue,
        storeValue: createPartDto.storeValue,
        cost: createPartDto.cost,
        createdAt: new Date(),
        updatedAt: new Date(),
        hidden: createPartDto.hidden
    });
    try {
        const result = await part.save()
        return result
    } catch (err) {
        console.log('ERROR!',err.message)
        return "ERROR! cod must be unique"
    }
}
export async function readAllPart() {
    const query = await partModel.find()
    return query;
}

export async function readOneById(id) {
    const query = await partModel.findById(id)
    if (!query) {
        return "This Item ID does not Exist, try a different ID!"
    }
    return query;
}
export async function readOneByCod(cod) {
    const query = await partModel.find({ cod: cod }).exec()
    return query;
}
export async function readOneByDesc(description) {
    const query = await partModel.find({ description: description }).exec()
    return query;
}
export async function deleteOneById(id) {
    const query = await partModel.deleteOne({ _id: id }).exec()
    if (query.deletedCount == 0) {
        return "This Item ID does not Exist, try a different ID!"
    }
    return query;
}
export async function updateOneById(id, updatePartDto) {
    let query = await partModel.findById(id).exec();
    if(updatePartDto.cod != query?.cod){
       return "This field cannot be Changed!"
    }

    if (!query) {
        return "This Item ID does not Exist, try a different ID!"
    }
    query.description = updatePartDto.description
    query.unit = updatePartDto.unit
    query.distributionValue = updatePartDto.distributionValue
    query.storeValue = updatePartDto.storeValue
    query.cost = updatePartDto.cost
    query.updatedAt = new Date()
    query.hidden = updatePartDto.hidden || false;
    await query.save()
    return query
}
