import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './equipment.entity';

export class EquipmentRepository {
  private pool;

  constructor() {
    this.pool = new Pool({
      database: process.env.PROD_DATABASE,
      host: process.env.PROD_DATABASE_HOST,
      port: Number(process.env.PROD_DATABASE_PORT),
      user: process.env.PROD_DATABASE_USERNAME,
      password: process.env.PROD_DATABASE_PASSWORD,
    });
    this.pool.connect();
  }

  public async getAll(): Promise<Equipment[]> {
    try {
      const queryText = `SELECT * FROM equipments`;

      const query = await this.pool.query(queryText, []);

      return Promise.resolve(query.rows);
    } catch (err) {
      console.log(err);
      Promise.reject();
    }
  }

  public async getById(id: string): Promise<Equipment | null> {
    try {
      const queryText = `SELECT * FROM equipments WHERE id = $1`;

      const query = await this.pool.query(queryText, [id]);

      return Promise.resolve(query.rows[0] ? query.rows[0] : null);
    } catch (err) {
      console.log(err);
      Promise.reject();
    }
  }

  public async getByModel(model: string): Promise<Equipment | null> {
    try {
      const queryText = `SELECT * FROM equipments WHERE model = $1`;

      const query = await this.pool.query(queryText, [model]);

      return Promise.resolve(query.rows[0] ? query.rows[0] : null);
    } catch (err) {
      console.log(err);
      Promise.reject();
    }
  }

  public async getByManufacturer(manufacturerId: string): Promise<Equipment[]> {
    try {
      const queryText = `SELECT * FROM equipments WHERE manufacturer_id = $1`;

      const query = await this.pool.query(queryText, [manufacturerId]);

      return Promise.resolve(query.rows);
    } catch (err) {
      console.log(err);
      Promise.reject();
    }
  }

  public async create(input: CreateEquipmentDto): Promise<Equipment> {
    try {
      const queryText = `INSERT INTO equipments(id, model, serial_number, manufacturer_id) 
        VALUES ($1, $2, $3, $4) RETURNING *`;
      console.log('teste');
      const query = await this.pool.query(queryText, [
        uuidv4(),
        input.model,
        input.serialNumber,
        input.manufacturerId,
      ]);

      return Promise.resolve(query.rows[0]);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async update(input: UpdateEquipmentDto) {
    try {
      const queryText = `UPDATE equipments SET (model, serial_number, manufacturer_id) = ($1, $2, $3) WHERE id = $4 RETURNING *`;

      const query = await this.pool.query(queryText, [
        input.model,
        input.serialNumber,
        input.manufacturerId,
        input.id,
      ]);

      return Promise.resolve(query.rows[0]);
    } catch (err) {
      console.log(err);
      Promise.reject();
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const queryText = `DELETE FROM equipments WHERE id = $1`;

      const query = await this.pool.query(queryText, [id]);

      return Promise.resolve(query.rows[0]);
    } catch (err) {
      console.log(err);
      Promise.reject();
    }
  }

  public async deleteByManufacturer(manufacturerId: string): Promise<void> {
    try {
      const queryText = `DELETE FROM equipments WHERE manufacturer_id = $1`;

      const query = await this.pool.query(queryText, [manufacturerId]);

      return Promise.resolve(query.rows[0]);
    } catch (err) {
      console.log(err);
      Promise.reject();
    }
  }
}
