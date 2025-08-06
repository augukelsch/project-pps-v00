import { part_list } from "../schema/partListSchema";
import mongoose from 'mongoose';

const partModel = mongoose.model('PartList', part_list);

export async function createPart(cod,unit,distributionValue,storeValue,cost,hidden=false) {
    mongoose.model('PartList', part_list);
    const part = new partModel({
      cod: cod,
      unit: unit,
      distributionValue:distributionValue,
      storeValue:storeValue,
      cost:cost ,
      createdAt: new Date(),
      updatedAt: new Date(),
      hidden: hidden
    });
    await part.save()
}
export async function readAllPart() {
    const query = partModel.find()
    return await query.find();
}

/* 
CLASSE ? >
    - CRIAR PART
    - UPDATE PART
    - DELETAR PART
    - BUSCAR PART
    - LISTAR TODAS PART
*/
