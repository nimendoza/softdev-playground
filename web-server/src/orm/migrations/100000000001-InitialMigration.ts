import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration100000000001 implements MigrationInterface {
  name = '100000000001';

  public async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `);

    await q.query(`
      CREATE TABLE "users" (
        "id"              UUID NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
        "email"           TEXT NOT NULL UNIQUE,
        "hashed_password" TEXT NOT NULL
      )
    `)
  }

  public async down(q: QueryRunner): Promise<void> {
    await q.query('DROP TABLE "users"');
    await q.query('DROP EXTENSION "uuid-ossp"');
  }
};
