import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentService } from '../equipment.service';
import { Manufacturer } from '../../manufacturer/manufacturer.entity';
import { Equipment } from '../equipment.entity';
import { EquipmentRepository } from '../equipment.repository';
import { ManufacturerRepository } from '../../manufacturer/manufacturer.repository';
import { EquipmentController } from '../equipment.controller';

const getByIdManufacturer: Manufacturer = {
  id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  name: 'Humans',
};

const getAll: Equipment[] = [
  {
    id: '4a9b3564-6e0e-4c41-9769-f241c768f678',
    manufacturer_id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
    model: 'mitril',
    serial_number: 'A00001',
  },
];

const getByModel: Equipment = {
  id: '4a9b3564-6e0e-4c41-9769-f241c768f678',
  manufacturer_id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  model: 'mitril',
  serial_number: 'A00001',
};

const getById: Equipment = {
  id: '4a9b3564-6e0e-4c41-9769-f241c768f678',
  manufacturer_id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  model: 'mitril',
  serial_number: 'A00001',
};

const create: Equipment = {
  id: '4a9b3564-6e0e-4c41-9769-f241c768f678',
  manufacturer_id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  model: 'mitril',
  serial_number: 'A00001',
};

const update: Equipment = {
  id: '4a9b3564-6e0e-4c41-9769-f241c768f678',
  manufacturer_id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  model: 'mitril sword',
  serial_number: 'A00001',
};

describe('Manufacturer', () => {
  let equipmentController: EquipmentController;
  let manufacturerRepository: ManufacturerRepository;
  let equipmentRepository: EquipmentRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentController],
      providers: [
        EquipmentService,
        ManufacturerRepository,
        EquipmentRepository,
      ],
    }).compile();

    equipmentController = app.get(EquipmentController);

    manufacturerRepository = app.get(ManufacturerRepository);
    equipmentRepository = app.get(EquipmentRepository);
  });

  describe('create equipment', () => {
    it('should create a new manufacturer', async () => {
      jest.spyOn(equipmentRepository, 'create').mockResolvedValue(create);
      jest.spyOn(equipmentRepository, 'getByModel').mockResolvedValue(null);
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValue(getByIdManufacturer);
      expect(
        equipmentController.createNewEquipment({
          manufacturerId: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
          model: 'mitril',
          serialNumber: 'A00001',
        }),
      ).resolves.toBe(create);
    });

    it('should not create because have already the model', async () => {
      jest.spyOn(equipmentRepository, 'create').mockResolvedValue(create);
      jest
        .spyOn(equipmentRepository, 'getByModel')
        .mockResolvedValue(getByModel);
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValue(getByIdManufacturer);
      expect(
        equipmentController.createNewEquipment({
          manufacturerId: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
          model: 'mitril',
          serialNumber: 'A00001',
        }),
      ).rejects.toThrow();
    });

    it('should not create because manufacturer not found', async () => {
      jest.spyOn(equipmentRepository, 'create').mockResolvedValue(create);
      jest.spyOn(equipmentRepository, 'getByModel').mockResolvedValue(null);
      jest.spyOn(manufacturerRepository, 'getById').mockResolvedValue(null);
      expect(
        equipmentController.createNewEquipment({
          manufacturerId: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
          model: 'mitril',
          serialNumber: 'A00001',
        }),
      ).rejects.toThrow();
    });
  });

  describe('get all equipments', () => {
    it('Should return all values', async () => {
      jest.spyOn(equipmentRepository, 'getAll').mockResolvedValueOnce(getAll);
      await expect(equipmentController.getAllEquipments()).resolves.toBe(
        getAll,
      );
    });
  });

  describe('read', () => {
    it('Should return value', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(getById);

      await expect(
        equipmentController.read('ea5a2cd3-a355-4a81-b94c-5e669a8c61cd'),
      ).resolves.toBe(getById);
    });
  });

  describe('update', () => {
    it('should update value', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(getById);
      jest.spyOn(equipmentRepository, 'update').mockResolvedValueOnce(update);
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getByIdManufacturer);

      await expect(
        equipmentController.updateEquipment(
          '4a9b3564-6e0e-4c41-9769-f241c768f678',
          'mitril sword',
          'A00001',
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).resolves.toBe(update);
    });

    it('should not update value because not found', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(null);
      jest.spyOn(equipmentRepository, 'update').mockResolvedValueOnce(update);
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getByIdManufacturer);

      await expect(
        equipmentController.updateEquipment(
          '4a9b3564-6e0e-4c41-9769-f241c768f678',
          'mitril sword',
          'A00001',
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).rejects.toThrow();
    });

    it('should not update value because not found manufacturer', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(getById);
      jest.spyOn(equipmentRepository, 'update').mockResolvedValueOnce(update);
      jest.spyOn(manufacturerRepository, 'getById').mockResolvedValueOnce(null);

      await expect(
        equipmentController.updateEquipment(
          '4a9b3564-6e0e-4c41-9769-f241c768f678',
          'mitril sword',
          'A00001',
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(getById);
      jest.spyOn(equipmentRepository, 'delete').mockResolvedValueOnce();
      await expect(
        equipmentController.deleteEquipment(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).resolves;
    });

    it('reject because not found', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(null);
      jest.spyOn(equipmentRepository, 'delete').mockResolvedValueOnce();
      await expect(
        equipmentController.deleteEquipment(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).rejects.toThrow();
    });
  });

  describe('get manufacturer by equipment', () => {
    it('should return manufacturer', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(getById);
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getByIdManufacturer);
      expect(
        equipmentController.getManufacturerByEquipment(
          '4a9b3564-6e0e-4c41-9769-f241c768f678',
        ),
      ).resolves.toBe(getByIdManufacturer);
    });

    it('should not return equipments manufacturer not found', async () => {
      jest.spyOn(equipmentRepository, 'getById').mockResolvedValueOnce(null);
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getByIdManufacturer);
      expect(
        equipmentController.getManufacturerByEquipment(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).rejects.toThrow();
    });
  });
});
