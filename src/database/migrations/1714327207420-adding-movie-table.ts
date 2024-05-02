/* eslint-disable max-len */
import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddingMovieTable1714327207420 implements MigrationInterface {
  name = 'AddingMovieTable1714327207420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying, "year" character varying, "director" character varying, "genres" character varying, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users_movies_movies" ("users_id" uuid NOT NULL, "movies_id" uuid NOT NULL, CONSTRAINT "PK_53d256462b6419ed32ac7313c1b" PRIMARY KEY ("users_id", "movies_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e5ba548895f30c29153711b3cc" ON "users_movies_movies" ("users_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd3de7c0c5fcf87ebd1b8c9af5" ON "users_movies_movies" ("movies_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" ADD CONSTRAINT "FK_e5ba548895f30c29153711b3cc1" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" ADD CONSTRAINT "FK_fd3de7c0c5fcf87ebd1b8c9af54" FOREIGN KEY ("movies_id") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" DROP CONSTRAINT "FK_fd3de7c0c5fcf87ebd1b8c9af54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" DROP CONSTRAINT "FK_e5ba548895f30c29153711b3cc1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd3de7c0c5fcf87ebd1b8c9af5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e5ba548895f30c29153711b3cc"`,
    );
    await queryRunner.query(`DROP TABLE "users_movies_movies"`);
    await queryRunner.query(`DROP TABLE "movies"`);
  }
}
