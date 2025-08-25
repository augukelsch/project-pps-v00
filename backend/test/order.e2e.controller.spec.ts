import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../src/modules/controllers/order.controller';
import * as orderRepo from '../src/storage/repositories/order.repositories';
import { HttpException } from '@nestjs/common';

describe('OrderController', () => {
  let orderController: OrderController;

  const mockOrder = {
    _id: "689b4f247c0288904157a4c3",
    numeroPedido: "100027",
    customerId: "689b4f247c0288904157a4c3",
    createdAt: new Date("2025-08-12T14:26:44.988Z"),
    prazoEntrega: new Date("2025-08-20T00:00:00.000Z"),
    status: "PENDENTE",
    valorTotal: 1500,
    observacoes: "Entrega urgente",
    marca: "Marca X",
    parts: [
      {
        part: "689b4f247c0288904157a4c4",
        quantidade: 10,
        statusItem: "OP",
        precoUnitario: 150
      }
    ],
    updatedAt: new Date("2025-08-12T14:28:20.908Z"),
    hidden: false
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      jest.spyOn(orderRepo, 'readAllOrder').mockResolvedValue([mockOrder]);
      const data = await orderController.findAll();
      expect(data).toEqual([mockOrder]);
    });
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      jest.spyOn(orderRepo, 'createOrder').mockResolvedValue(mockOrder);
      const data = await orderController.createOrder(mockOrder);
      expect(data).toEqual({ "New Order Created!": { createOrderDto: mockOrder } });
    });

    it('should throw Forbidden if order creation fails', async () => {
      jest.spyOn(orderRepo, 'createOrder').mockResolvedValue("ERROR! Something wrong on Order");
      await expect(orderController.createOrder(mockOrder)).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should delete an order', async () => {
      jest.spyOn(orderRepo, 'deleteOneById').mockResolvedValue(mockOrder);
      const data = await orderController.remove(mockOrder._id);
      expect(data).toEqual(mockOrder);
    });

    it('should throw BadRequest if ID does not exist', async () => {
      jest.spyOn(orderRepo, 'deleteOneById').mockResolvedValue("This Order ID does not Exist, try a different ID!");
      await expect(orderController.remove(mockOrder._id)).rejects.toThrow(HttpException);
    });
  });

  describe('updateOrder', () => {
    it('should update an order', async () => {
      jest.spyOn(orderRepo, 'updateOneById').mockResolvedValue(mockOrder);
      const data = await orderController.updateOrder(mockOrder._id, {
        status: "OK",
        numeroPedido: '',
        customerId: '',
        valorTotal: 0,
        marca: '',
        itens: [],
        updatedAt: new Date("2025-08-12T14:28:20.908Z"),
        hidden: false
      });
      expect(data).toEqual({ "Order Updated Successfully!": { data: mockOrder } });
    });

    it('should throw BadRequest if ID does not exist', async () => {
      jest.spyOn(orderRepo, 'updateOneById').mockResolvedValue("This Order ID does not Exist, try a different ID!");
      await expect(orderController.updateOrder(mockOrder._id, {
        status: "OK",
        numeroPedido: '',
        customerId: '',
        valorTotal: 0,
        marca: '',
        itens: [],
        updatedAt: new Date("2025-08-12T14:28:20.908Z"),
        hidden: false
      })).rejects.toThrow(HttpException);
    });

    it('should throw Forbidden if a field cannot be changed', async () => {
      jest.spyOn(orderRepo, 'updateOneById').mockResolvedValue("This field cannot be Changed!");
      await expect(orderController.updateOrder(mockOrder._id, {
        numeroPedido: "123456",
        customerId: '',
        status: 'OK',
        valorTotal: 0,
        marca: '',
        itens: [],
        updatedAt: new Date("2025-08-12T14:28:20.908Z"),
        hidden: false
      })).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return an order by ID', async () => {
      jest.spyOn(orderRepo, 'readOneById').mockResolvedValue(mockOrder);
      const data = await orderController.findOne(mockOrder._id);
      expect(data).toEqual(mockOrder);
    });

    it('should throw BadRequest if ID does not exist', async () => {
      jest.spyOn(orderRepo, 'readOneById').mockResolvedValue("This Order ID does not Exist, try a different ID!");
      await expect(orderController.findOne(mockOrder._id)).rejects.toThrow(HttpException);
    });
  });

  describe('getByCode', () => {
    it('should return an order by numeroPedido', async () => {
      jest.spyOn(orderRepo, 'readOneByNumOrder').mockResolvedValue(mockOrder);
      const data = await orderController.getByCode("100027");
      expect(data).toEqual(mockOrder);
    });

    it('should throw BadRequest if numeroPedido length is invalid', async () => {
      await expect(orderController.getByCode("123")).rejects.toThrow(HttpException);
    });
  });

  describe('countAllOrders', () => {
    it('should return the total order count', async () => {
      const mockCount = {
        total: 5,
        OK: 2,
        PENDENTE: 2,
        CANCELADO: 1
      };
      jest.spyOn(orderRepo, 'readOrderCount').mockResolvedValue(mockCount);
      const data = await orderController.countAllOrders();
      expect(data).toEqual(mockCount);
    });
  });
});
