import fs from 'fs';
import { CreatePartDto } from 'src/modules/dto/part.dto';
import dotenv from 'dotenv'
import { createPart } from 'src/storage/repositories/part.repositories';

dotenv.config().parsed

export async function readMyCSVFile(path) {
    console.log(path)
    const initialFile = fs.readFileSync(path).toString().split('\r\n')
    for (let i = 1; i < initialFile.length; i++) {
        const item = initialFile[i].split(',')
    if (item[0] == undefined || item[0] == '' || item[0].length < 1) {
      i++
    } else {
      let inputFile: CreatePartDto = {
        cod: item[0],
        description: item[1] || "Unknown",
        unit: "UN",
        distributionValue: Number(item[2]) || 0,
        storeValue: Number(item[3]) || 0,
        cost: 0,
        hidden: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      console.log(inputFile)
      /* await createPart(inputFile) */

    }
  }
}
