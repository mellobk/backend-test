import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddingCreatedByColumn1714569203762 implements MigrationInterface {
  name = 'AddingCreatedByColumn1714569203762';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "created_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ADD "created_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "created_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD "created_by" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_by" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_by"`);
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "created_by"`,
    );
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "created_by"`);
  }
}
