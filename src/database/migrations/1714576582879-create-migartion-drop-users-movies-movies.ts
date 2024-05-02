/* eslint-disable @typescript-eslint/no-empty-function */
import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateMigartionDropUsersMoviesMovies1714576582879
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(): Promise<void> {}
}
