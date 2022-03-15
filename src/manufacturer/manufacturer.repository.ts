import { Manufacturer } from './manufacturer.entity';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

export class ManufacturerRepository {
  private pool;

  constructor() {
    this.pool = new Pool({
      database: process.env.DATABASE,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    });
    this.pool.connect();
  }

  public async getAll(): Promise<Manufacturer[]> {
    try {
      const queryText = `SELECT * FROM manufacturers`;

      const query = await this.pool.query(queryText, []);

      return Promise.resolve(query.rows);
    } catch (err) {
      console.log(err);
      return Promise.reject();
    }
  }

  public async getById(id: string): Promise<Manufacturer | null> {
    try {
      const queryText = `SELECT * FROM manufacturers WHERE id = $1`;

      const query = await this.pool.query(queryText, [id]);

      return Promise.resolve(query.rows[0] ? query.rows[0] : null);
    } catch (err) {
      console.log(err);
      return Promise.reject();
    }
  }

  public async getByName(name: string): Promise<Manufacturer | null> {
    try {
      const queryText = `SELECT * FROM manufacturers WHERE name = $1`;

      const query = await this.pool.query(queryText, [name]);

      return Promise.resolve(query.rows[0] ? query.rows[0] : null);
    } catch (err) {
      console.log(err);
      return Promise.reject();
    }
  }

  public async create(name: string): Promise<Manufacturer> {
    try {
      const queryText = `INSERT INTO manufacturers(id, name) VALUES ($1, $2) RETURNING *`;

      const query = await this.pool.query(queryText, [uuidv4(), name]);

      return Promise.resolve(query.rows[0]);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  public async update(input: UpdateManufacturerDto): Promise<Manufacturer> {
    try {
      const queryText = `UPDATE manufacturers SET name = $1 WHERE id = $2 RETURNING *`;

      const query = await this.pool.query(queryText, [input.name, input.id]);

      return Promise.resolve(query.rows[0]);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const queryText = `DELETE FROM manufacturers WHERE id = $1`;

      const query = await this.pool.query(queryText, [id]);

      return Promise.resolve(query.rows[0]);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}
