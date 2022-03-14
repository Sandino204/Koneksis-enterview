import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerService } from '../manufacturer.service';
import { Manufacturer } from '../manufacturer.entity';
import { Equipment } from '../../equipment/equipment.entity';
import { EquipmentRepository } from '../../equipment/equipment.repository';
import { ManufacturerRepository } from '../manufacturer.repository';
import { ManufacturerController } from '../manufacturer.controller';

const getAll: Manufacturer[] = [
  {
    id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
    name: 'Humans',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Elves',
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Dwarves',
  },
];

const getById: Manufacturer = {
  id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  name: 'Humans',
};

const getByName: Manufacturer = {
  id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  name: 'Humans',
};

const create: Manufacturer = {
  id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  name: 'Humans',
};

const update: Manufacturer = {
  id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  name: 'Human',
};

const getByManufacturer: Equipment[] = [
  {
    id: '123e4567-e89b-12d3-a456-42661417400a',
    model: 'The Anduril Sword',
    serial_number: '000001A',
    manufacturer_id: 'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
  },
];

describe('Manufacturer', () => {
  let manufacturerController: ManufacturerController;
  let manufacturerRepository: ManufacturerRepository;
  let equipmentRepository: EquipmentRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [
        ManufacturerService,
        ManufacturerRepository,
        EquipmentRepository,
      ],
    }).compile();

    manufacturerController = app.get<ManufacturerController>(
      ManufacturerController,
    );

    manufacturerRepository = app.get(ManufacturerRepository);
    equipmentRepository = app.get(EquipmentRepository);
  });

  describe('createManufacturer', () => {
    it('should create a new manufacturer', async () => {
      jest.spyOn(manufacturerRepository, 'create').mockResolvedValue(create);
      jest.spyOn(manufacturerRepository, 'getByName').mockResolvedValue(null);
      expect(
        manufacturerController.createNewManufacturer({ name: 'Humans' }),
      ).resolves.toBe(create);
    });

    it('should not create because have already the name', async () => {
      jest.spyOn(manufacturerRepository, 'create').mockResolvedValue(create);
      jest
        .spyOn(manufacturerRepository, 'getByName')
        .mockResolvedValue(getByName);
      expect(
        manufacturerController.createNewManufacturer({ name: 'Humans' }),
      ).rejects.toThrow();
    });
  });

  describe('getAllManufacturers', () => {
    it('Should return all values', async () => {
      jest
        .spyOn(manufacturerRepository, 'getAll')
        .mockResolvedValueOnce(getAll);
      await expect(manufacturerController.getAllManufacturers()).resolves.toBe(
        getAll,
      );
    });
  });

  describe('read', () => {
    it('Should return value', async () => {
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getById);

      await expect(
        manufacturerController.read('ea5a2cd3-a355-4a81-b94c-5e669a8c61cd'),
      ).resolves.toBe(getById);
    });
  });

  describe('update', () => {
    it('should update value', async () => {
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getById);
      jest
        .spyOn(manufacturerRepository, 'update')
        .mockResolvedValueOnce(update);

      await expect(
        manufacturerController.updateManufacturer(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
          'Human',
        ),
      ).resolves.toBe(update);
    });

    it('should not update value because not found', async () => {
      jest.spyOn(manufacturerRepository, 'getById').mockResolvedValueOnce(null);
      jest
        .spyOn(manufacturerRepository, 'update')
        .mockResolvedValueOnce(update);

      await expect(
        manufacturerController.updateManufacturer(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
          'Human',
        ),
      ).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should return void', async () => {
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getById);
      jest.spyOn(manufacturerRepository, 'delete').mockResolvedValueOnce();
      jest
        .spyOn(equipmentRepository, 'deleteByManufacturer')
        .mockResolvedValueOnce();
      await expect(
        manufacturerController.deleteManufacturer(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).resolves;
    });

    it('reject because not found', async () => {
      jest.spyOn(manufacturerRepository, 'getById').mockResolvedValueOnce(null);
      jest.spyOn(manufacturerRepository, 'delete').mockResolvedValueOnce();
      jest
        .spyOn(equipmentRepository, 'deleteByManufacturer')
        .mockResolvedValueOnce();
      await expect(
        manufacturerController.deleteManufacturer(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).rejects.toThrow();
    });
  });

  describe('list equipments of manufacturer', () => {
    it('should return equipments', async () => {
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getById);
      jest
        .spyOn(equipmentRepository, 'getByManufacturer')
        .mockResolvedValueOnce(getByManufacturer);
      expect(
        manufacturerController.getEquipmentsByManufacturerId(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).resolves.toBe(getByManufacturer);
    });

    it('should not return equipments manufacturer not found', async () => {
      jest
        .spyOn(manufacturerRepository, 'getById')
        .mockResolvedValueOnce(getById);
      jest
        .spyOn(equipmentRepository, 'getByManufacturer')
        .mockResolvedValueOnce(getByManufacturer);
      expect(
        manufacturerController.getEquipmentsByManufacturerId(
          'ea5a2cd3-a355-4a81-b94c-5e669a8c61cd',
        ),
      ).rejects.toThrow();
    });
  });
});
