import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createCustomer, readAllCustomers, readOneById, deleteOneById, updateOneById, readOneByCnpj, readCustomerCount } from '../../storage/repositories/customer.repositories';
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
        if(data == "This field cannot be Changed!" ){
            throw new HttpException('Bad Request! Field cannot be modified!', HttpStatus.FORBIDDEN);
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
    @Get('count')                                  // http://localhost:3000/customer/count
    @HttpCode(200)
    async countAllCustomers() {
        const data = await readCustomerCount()
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

    @Get('/cnpj/:cnpj')                       // http://localhost:3000/customer/cnpj/00.000.000%2F0001-01
    @HttpCode(200)
    async getByCode(@Param('cnpj') cnpj) {
        const data = await readOneByCnpj(cnpj)
        return data;
    }

}
