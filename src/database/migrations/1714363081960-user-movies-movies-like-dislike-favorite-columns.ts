import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class UserMoviesMoviesLikeDislikeFavoriteColumns1714363081960
  implements MigrationInterface
{
  name = 'UserMoviesMoviesLikeDislikeFavoriteColumns1714363081960';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" ADD "like" boolean  NOT NULL DEFAULT false`,
    );

    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" ADD "dis_like" boolean  NOT NULL DEFAULT false`,
    );

    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" ADD "favorite" boolean  NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" DROP COLUMN "like"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" DROP COLUMN "dis_like"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_movies_movies" DROP COLUMN "favorite"`,
    );
  }
}
