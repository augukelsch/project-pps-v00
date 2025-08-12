import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createOrder, readAllOrder, readOneById, deleteOneById, updateOneById, readOrderCount } from 'src/storage/repositories/order.repositories';
import { UpdateOrderDTO, CreateOrderDTO } from '../dto/orders.dto';

@Controller('order')
export class OrderController {
    @Post()
    @HttpCode(201)
    async createOrder(@Body() createOrderDto: CreateOrderDTO) {
        const data = await createOrder(createOrderDto);
        if(data == "ERROR! Something wrong on Order"){
            throw new HttpException('Forbidden! Order Number already exist!', HttpStatus.FORBIDDEN);
        }
        const response = {
            "New Order Created!": {
                createOrderDto
            }
        }
        return response;
    }
    @Delete(':id')
    @HttpCode(200)
    async remove(@Param('id') id) {
        const data = await deleteOneById(id);
        if(data == "This Order ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        return data;
    }
    @Patch(':id')
    @HttpCode(200)
    async updateOrder(@Param('id') id,@Body() updateOrderDto: UpdateOrderDTO) {
        let data = await updateOneById(id,updateOrderDto);
        if(data == "This Order ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        if(data == "This field cannot be Changed!" ){
            throw new HttpException('Bad Request! Field cannot be modified!', HttpStatus.FORBIDDEN);
        }

        const response = {
            "Order Updated Successfully!": {
                data
            }
        }
        return response;
    }

    @Get()                                  // http://localhost:3000/order
    @HttpCode(200)
    async findAll() {
        const data = await readAllOrder()
        return data;
    }
    @Get('count')                                  // http://localhost:3000/order/count
    @HttpCode(200)
    async countAllOrders() {
        const data = await readOrderCount()
        return data;
    }

    @Get(':id')                             // http://localhost:3000/order/68936b6a3211b2623962584a
    @HttpCode(200)
    async findOne(@Param('id') id) {
        const data = await readOneById(id);
        if(data == "This Order ID does not Exist, try a different ID!" ){
            throw new HttpException('Bad Request! Check if the ID Exist!', HttpStatus.BAD_REQUEST);
        }
        return data;
    }

}
