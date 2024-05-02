/* eslint-disable max-len */
import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class UserMovies1714576355801 implements MigrationInterface {
  name = 'UserMovies1714576355801';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user-movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "likes" boolean NOT NULL DEFAULT false, "dis_likes" boolean NOT NULL DEFAULT false, "favorite" boolean NOT NULL DEFAULT false, "user_id" uuid, "movie_id" uuid, CONSTRAINT "PK_901deba4e9451c1c9669c5390e7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-movies" ADD CONSTRAINT "FK_6e3b3f0174efd736e8150eeafed" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-movies" ADD CONSTRAINT "FK_e891b32a0a54347ad865ef25150" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-movies" DROP CONSTRAINT "FK_e891b32a0a54347ad865ef25150"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-movies" DROP CONSTRAINT "FK_6e3b3f0174efd736e8150eeafed"`,
    );
    await queryRunner.query(`DROP TABLE "user-movies"`);
  }
}
