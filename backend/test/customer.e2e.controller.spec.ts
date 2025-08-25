import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from '../src/modules/controllers/customer.controller';
import * as customerRepo from '../src/storage/repositories/customer.repositories';
import { HttpException } from '@nestjs/common';

describe('CustomerController', () => {
  let customerController: CustomerController;

  const mockCustomer = {
    _id: "689b4f247c0288904157a4c3",
    name: "3D COMERCIAL LTDA",
    address: "RUA AFONSO NOGUEIRA SOARES, 1",
    district: "JARDIM SAO JOÃO",
    city: "ALÉM",
    state: "SP",
    cep: "12345-123",
    cnpj: "05.845.493/0001-84",
    ie: "392215330113",
    phone: "(12) 0000-0000",
    seller: "Pedro",
    createdAt: new Date("2025-08-12T14:26:44.988Z"),
    updatedAt: new Date("2025-08-12T14:28:20.908Z"),
    hidden: false,
    __v: 0
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
  });

  describe('findAll', () => {
    it('should return all customers', async () => {
      jest.spyOn(customerRepo, 'readAllCustomers').mockResolvedValue([mockCustomer]);
      const data = await customerController.findAll();
      expect(data).toEqual([mockCustomer]);
    });
  });

  describe('createCustomer', () => {
    it('should create a customer successfully', async () => {
      jest.spyOn(customerRepo, 'createCustomer').mockResolvedValue(mockCustomer);
      const data = await customerController.createCustomer(mockCustomer);
      expect(data).toEqual({ "New Customer Created!": { createCustomerDto: mockCustomer } });
    });

    it('should throw Forbidden if CNPJ or IE exists', async () => {
      jest.spyOn(customerRepo, 'createCustomer').mockResolvedValue("ERROR! cnpj and ie must be unique");
      await expect(customerController.createCustomer(mockCustomer)).rejects.toThrow(HttpException);
    });
  });

  describe('remove', () => {
    it('should delete a customer', async () => {
      jest.spyOn(customerRepo, 'deleteOneById').mockResolvedValue(mockCustomer);
      const data = await customerController.remove(mockCustomer._id);
      expect(data).toEqual(mockCustomer);
    });

    it('should throw BadRequest if ID does not exist', async () => {
      jest.spyOn(customerRepo, 'deleteOneById').mockResolvedValue("This Customer ID does not Exist, try a different ID!");
      await expect(customerController.remove(mockCustomer._id)).rejects.toThrow(HttpException);
    });
  });

  describe('updateCustomer', () => {
    it('should update a customer', async () => {
      jest.spyOn(customerRepo, 'updateOneById').mockResolvedValue(mockCustomer);
      const data = await customerController.updateCustomer(mockCustomer._id, {
        name: "New Name",
        address: "",
        district: "",
        city: "",
        state: "",
        cep: "",
        cnpj: "",
        ie: "",
        phone: "",
        seller: "",
        updatedAt:  new Date("2025-08-12T14:28:20.908Z"),
        hidden: false
      });
      expect(data).toEqual({ "customer Updated Successfully!": { data: mockCustomer } });
    });

    it('should throw BadRequest if ID does not exist', async () => {
      jest.spyOn(customerRepo, 'updateOneById').mockResolvedValue("This Customer ID does not Exist, try a different ID!");
      await expect(customerController.updateCustomer(mockCustomer._id, {
        name: "New Name",
        address: "",
        district: "",
        city: "",
        state: "",
        cep: "",
        cnpj: "",
        ie: "",
        phone: "",
        seller: "",
        updatedAt:  new Date("2025-08-12T14:28:20.908Z"),
        hidden: false
      })).rejects.toThrow(HttpException);
    });

    it('should throw Forbidden if a field cannot be changed', async () => {
      jest.spyOn(customerRepo, 'updateOneById').mockResolvedValue("This field cannot be Changed!");
      await expect(customerController.updateCustomer(mockCustomer._id, {
        ie: "123",
        name: "",
        address: "",
        district: "",
        city: "",
        state: "",
        cep: "",
        cnpj: "",
        phone: "",
        seller: "",
        updatedAt: new Date("2025-08-12T14:28:20.908Z"),
        hidden: false
      })).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a customer by ID', async () => {
      jest.spyOn(customerRepo, 'readOneById').mockResolvedValue(mockCustomer);
      const data = await customerController.findOne(mockCustomer._id);
      expect(data).toEqual(mockCustomer);
    });

    it('should throw BadRequest if ID does not exist', async () => {
      jest.spyOn(customerRepo, 'readOneById').mockResolvedValue("This Customer ID does not Exist, try a different ID!");
      await expect(customerController.findOne(mockCustomer._id)).rejects.toThrow(HttpException);
    });
  });

  describe('getByCode', () => {
    it('should return a customer by CNPJ', async () => {
      jest.spyOn(customerRepo, 'readOneByCnpj').mockResolvedValue(mockCustomer);
      const data = await customerController.getByCode(mockCustomer.cnpj);
      expect(data).toEqual(mockCustomer);
    });
  });

  describe('countAllCustomers', () => {
    it('should return the total customer count', async () => {
      jest.spyOn(customerRepo, 'readCustomerCount').mockResolvedValue(10);
      const data = await customerController.countAllCustomers();
      expect(data).toEqual(10);
    });
  });
});
