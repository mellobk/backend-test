/* eslint-disable unicorn/filename-case */
import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddingMoviesLikesDisLikes1714363366733
  implements MigrationInterface
{
  name = 'AddingMoviesLikesDisLikes1714363366733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ADD "likes" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ADD "dis_likes" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "dis_likes"`);
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "likes"`);
  }
}
