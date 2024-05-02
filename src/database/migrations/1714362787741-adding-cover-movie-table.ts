import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddingCoverMovieTable1714362787741 implements MigrationInterface {
  name = 'AddingCoverMovieTable1714362787741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movies" ADD "cover" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "cover"`);
  }
}
