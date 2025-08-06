import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createCustomer, readAllCustomers, readOneById, readOneByCod, readOneByDesc, deleteOneById, updateOneById } from 'src/storage/repositories/customer.repositories';
import { UpdateCustomerDto,CreateCustomerDto } from '../dto/customer.dto';

@Controller('customer')
export class CustomerController {
    @Post()
    @HttpCode(201)
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        const data = await createCustomer(createCustomerDto);
        if(data == "ERROR! cnpj and ie must be unique"){
            throw new HttpException('Forbidden! CNPJ or IE already exist!', HttpStatus.FORBIDDEN);
        }
        const response = {
            "New Customer Created!": {
                createCustomerDto
            }
        }
        return response;
    }
    @Delete(':id')
    @HttpCode(200)
    async remove(@Param('id') id) {
        const data = await deleteOneById(id);
        if(data == "This Customer ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    @Patch(':id')
    @HttpCode(200)
    async updateCustomer(@Param('id') id,@Body() updateCustomerDto: UpdateCustomerDto) {
        let data = await updateOneById(id,updateCustomerDto);
        if(data == "This Customer ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        const response = {
            "customer Updated Successfully!": {
                data
            }
        }
        return response;
    }

    @Get()                                  // http://localhost:3000/customer
    @HttpCode(200)
    async findAll() {
        const data = await readAllCustomers()
        return data;
    }

    @Get(':id')                             // http://localhost:3000/customer/68936b6a3211b2623962584a
    @HttpCode(200)
    async findOne(@Param('id') id) {
        const data = await readOneById(id);
        if(data == "This Customer ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

    @Get('/cod/:cod')                       // http://localhost:3000/customer/cod/100%2F027
    @HttpCode(200)
    async getByCode(@Param('cod') cod) {
        const data = await readOneByCod(cod)
        return data;
    }

    @Get('/description/:description')       // http://localhost:3000/customer/description/AMORTECEDOR%20HUSQVARNA%20281%2F288
    @HttpCode(200)
    async getByDescription(@Param('description') description) {
        const data = await readOneByDesc(description)
        return data;
    }


}
