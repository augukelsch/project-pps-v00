import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createPart, readAllPart, readOneById, readOneByCod, readOneByDesc, deleteOneById, updateOneById, readPartCount } from 'src/storage/repositories/part.repositories';
import { UpdatePartDto,CreatePartDto } from '../dto/part.dto';

@Controller('part')
export class PartController {
    @Post()
    @HttpCode(201)
    async createPart(@Body() createPartDto: CreatePartDto) {
        const data = await createPart(createPartDto);
        if(data == "ERROR! cod must be unique"){
            throw new HttpException('Forbidden! COD already exist!', HttpStatus.FORBIDDEN);
        }
        const response = {
            "New Part Created!": {
                createPartDto
            }
        }
        return response;
    }
    @Delete(':id')
    @HttpCode(200)
    async remove(@Param('id') id) {
        const data = await deleteOneById(id);
        if(data == "This Item ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    @Patch(':id')
    @HttpCode(200)
    async updatePart(@Param('id') id,@Body() updatePartDto: UpdatePartDto) {
        let data = await updateOneById(id,updatePartDto);
        if(data == "This Item ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        if(data == "This field cannot be Changed!" ){
            throw new HttpException('Bad Request! Field cannot be modified!', HttpStatus.FORBIDDEN);
        }
        const response = {
            "Part Updated Successfully!": {
                data
            }
        }
        return response;
    }

    @Get()                                  // http://localhost:3000/part
    @HttpCode(200)
    async findAll() {
        const data = await readAllPart()
        return data;
    }
    @Get('/count')                                  // http://localhost:3000/part
    @HttpCode(200)
    async totalPartCount() {
        const data = await readPartCount()
        return data;
    }

    @Get(':id')                             // http://localhost:3000/part/68936b6a3211b2623962584a
    @HttpCode(200)
    async findOne(@Param('id') id) {
        const data = await readOneById(id);
        if(data == "This Item ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    @Get('/cod/:cod')                       // http://localhost:3000/part/cod/100%2F027
    @HttpCode(200)
    async getByCode(@Param('cod') cod) {
        const data = await readOneByCod(cod)
        return data;
    }

    @Get('/description/:description')       // http://localhost:3000/part/description/AMORTECEDOR%20HUSQVARNA%20281%2F288
    @HttpCode(200)
    async getByDescription(@Param('description') description) {
        const data = await readOneByDesc(description)
        return data;
    }


}
