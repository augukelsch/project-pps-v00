import { Test, TestingModule } from '@nestjs/testing';
import { PartController } from '../src/modules/controllers/part.controller';
import * as partRepo from '../src/storage/repositories/part.repositories';
import { HttpException } from '@nestjs/common';

describe('PartController', () => {
    let partController: PartController;

    const mockPart = {
        _id: "689b4f247c0288904157a4c3",
        cod: "100/027",
        description: "AMORTECEDOR HUSQVARNA 281/288",
        unit: "UN",
        distributionValue: 0,
        storeValue: 120,
        cost: 80,
        createdAt: new Date("2025-08-12T14:26:44.988Z"),
        updatedAt: new Date("2025-08-12T14:28:20.908Z"),
        hidden: false
    } as any;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PartController],
        }).compile();

        partController = module.get<PartController>(PartController);
    });

    describe('findAll', () => {
        it('should return all parts', async () => {
            jest.spyOn(partRepo, 'readAllPart').mockResolvedValue([mockPart]);
            const data = await partController.findAll();
            expect(data).toEqual([mockPart]);
        });
    });

    describe('createPart', () => {
        it('should create a part successfully', async () => {
            jest.spyOn(partRepo, 'createPart').mockResolvedValue(mockPart);
            const data = await partController.createPart(mockPart);
            expect(data).toEqual({ "New Part Created!": { createPartDto: mockPart } });
        });

        it('should throw Forbidden if cod already exists', async () => {
            jest.spyOn(partRepo, 'createPart').mockResolvedValue("ERROR! cod must be unique");
            await expect(partController.createPart(mockPart)).rejects.toThrow(HttpException);
        });
    });

    describe('remove', () => {
        it('should delete a part', async () => {
            jest.spyOn(partRepo, 'deleteOneById').mockResolvedValue(mockPart);
            const data = await partController.remove(mockPart._id);
            expect(data).toEqual(mockPart);
        });

        it('should throw BadRequest if ID does not exist', async () => {
            jest.spyOn(partRepo, 'deleteOneById').mockResolvedValue("This Item ID does not Exist, try a different ID!");
            await expect(partController.remove(mockPart._id)).rejects.toThrow(HttpException);
        });
    });

    describe('updatePart', () => {
        it('should update a part', async () => {
            jest.spyOn(partRepo, 'updateOneById').mockResolvedValue(mockPart);
            const data = await partController.updatePart(mockPart._id, {
                description: "New Desc",
                cod: '',
                unit: '',
                distributionValue: 0,
                storeValue: 120,
                cost: 80,
                updatedAt: new Date("2025-08-12T14:28:20.908Z"),
                hidden: false
            });
            expect(data).toEqual({ "Part Updated Successfully!": { data: mockPart } });
        });

        it('should throw BadRequest if ID does not exist', async () => {
            jest.spyOn(partRepo, 'updateOneById').mockResolvedValue("This Item ID does not Exist, try a different ID!");
            await expect(partController.updatePart(mockPart._id, {
                description: "New Desc",
                cod: '',
                unit: '',
                distributionValue: 0,
                storeValue: 120,
                cost: 80,
                updatedAt: new Date("2025-08-12T14:28:20.908Z"),
                hidden: false
            })).rejects.toThrow(HttpException);
        });

        it('should throw Forbidden if a field cannot be changed', async () => {
            jest.spyOn(partRepo, 'updateOneById').mockResolvedValue("This field cannot be Changed!");
            await expect(partController.updatePart(mockPart._id, {
                cod: "NEWCOD",
                description: '',
                unit: '',
                distributionValue: 0,
                storeValue: 120,
                cost: 80,
                updatedAt: new Date("2025-08-12T14:28:20.908Z"),
                hidden: false
            })).rejects.toThrow(HttpException);
        });
    });

    describe('findOne', () => {
        it('should return a part by ID', async () => {
            jest.spyOn(partRepo, 'readOneById').mockResolvedValue(mockPart);
            const data = await partController.findOne(mockPart._id);
            expect(data).toEqual(mockPart);
        });

        it('should throw BadRequest if ID does not exist', async () => {
            jest.spyOn(partRepo, 'readOneById').mockResolvedValue("This Item ID does not Exist, try a different ID!");
            await expect(partController.findOne(mockPart._id)).rejects.toThrow(HttpException);
        });
    });

    describe('getByCode', () => {
        it('should return a part by cod', async () => {
            jest.spyOn(partRepo, 'readOneByCod').mockResolvedValue(mockPart);
            const data = await partController.getByCode(mockPart.cod);
            expect(data).toEqual(mockPart);
        });
    });

    describe('getByDescription', () => {
        it('should return a part by description', async () => {
            jest.spyOn(partRepo, 'readOneByDesc').mockResolvedValue(mockPart);
            const data = await partController.getByDescription(mockPart.description);
            expect(data).toEqual(mockPart);
        });
    });

    describe('totalPartCount', () => {
        it('should return the total part count', async () => {
            jest.spyOn(partRepo, 'readPartCount').mockResolvedValue(10);
            const data = await partController.totalPartCount();
            expect(data).toEqual(10);
        });
    });
});
