/* eslint-disable max-len */
import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class InsertMovies1714454718221 implements MigrationInterface {
  name = 'InsertMovies1714454718221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "movies" ("title", "year", "director", "genres", "cover", "likes", "dis_likes") VALUES
('Inception', '2010', 'Christopher Nolan', 'Action, Sci-Fi', 'https://images.bauerhosting.com/legacy/empire-tmdb/films/27205/images/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=undefined&q=80', 0, 0),
('The Matrix', '1999', 'Lana Wachowski, Lilly Wachowski', 'Action, Sci-Fi', 'https://i.blogs.es/8b8798/06-06-matrix/840_560.jpg', 0, 0),
('Interstellar', '2014', 'Christopher Nolan', 'Sci-Fi, Drama', 'https://www.hollywoodreporter.com/wp-content/uploads/2014/09/interstellar_poster_0.jpg', 0, 0),
('Pulp Fiction', '1994', 'Quentin Tarantino', 'Crime, Drama', 'https://cdn-3.expansion.mx/dims4/default/df8ef4c/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F25%2F08%2Ff27f600d407abcb25addad1a2d11%2Fs109495915.JPG', 0, 0),
('The Shawshank Redemption', '1994', 'Frank Darabont', 'Drama', 'https://media.vanityfair.com/photos/5d8535de6879fa00082e6ed9/16:9/w_2000,h_1124,c_limit/the-Shawshank-Redemption-movie-lede.png', 0, 0),
('The Godfather', '1972', 'Francis Ford Coppola', 'Crime, Drama', 'https://cdn.britannica.com/55/188355-050-D5E49258/Salvatore-Corsitto-The-Godfather-Marlon-Brando-Francis.jpg', 0, 0),
('Forrest Gump', '1994', 'Robert Zemeckis', 'Drama, Romance', 'https://cdn.aarp.net/content/dam/aarp/entertainment/movies-for-grownups/2022/03/1140-forrest-gump-bench-esp.jpg', 0, 0),
('Fight Club', '1999', 'David Fincher', 'Drama', 'https://media.gq.com.mx/photos/5e69038a2a39380009f0e186/16:9/w_2560%2Cc_limit/fight.jpg', 0, 0),
('Gladiator', '2000', 'Ridley Scott', 'Action, Drama', 'https://www.lavanguardia.com/files/article_main_microformat/uploads/2020/05/05/5fa919dcf0a85.jpeg', 0, 0),
('Jurassic Park', '1993', 'Steven Spielberg', 'Adventure, Sci-Fi', 'https://www.mundodeportivo.com/alfabeta/hero/2024/01/jurassic-park-7_2025.jpg?width=768&aspect_ratio=16:9&format=nowebp', 0, 0),
('Titanic', '1997', 'James Cameron', 'Drama, Romance', 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/07/titanic.jpg?tf=3840x', 0, 0),
('The Lord of the Rings: The Fellowship of the Ring', '2001', 'Peter Jackson', 'Adventure, Fantasy', 'https://d1nslcd7m2225b.cloudfront.net/Pictures/1024x536/4/7/7/1252477_fellowship.jpg', 0, 0),
('Star Wars: Episode IV - A New Hope', '1977', 'George Lucas', 'Action, Adventure', 'https://m.media-amazon.com/images/M/MV5BMTUzNDY0NjY4Nl5BMl5BanBnXkFtZTgwNjY4MTQ0NzE@._V1_.jpg', 0, 0),
('Avatar', '2009', 'James Cameron', 'Action, Adventure, Fantasy', 'https://i.blogs.es/531940/edhbabdegbcurd5az4s7x2rnci/1366_2000.jpeg', 0, 0),
('The Lion King', '1994', 'Roger Allers, Rob Minkoff', 'Animation, Adventure, Drama', 'https://drgrobsanimationreview.com/wp-content/uploads/2020/11/the-lion-king-c2a9-walt-disney.jpg', 0, 0),
('Back to the Future', '1985', 'Robert Zemeckis', 'Adventure, Comedy, Sci-Fi', 'https://revistabyte.es/wp-content/uploads/2018/10/back-to-the-future.jpg', 0, 0),
('The Dark Knight', '2008', 'Christopher Nolan', 'Action, Crime, Drama', 'https://www.futuro.cl/wp-content/uploads/2020/07/the-dark-knight-5055eed99355e-card.jpg', 0, 0),
('The Silence of the Lambs', '1991', 'Jonathan Demme', 'Crime, Drama, Thriller', 'https://m.media-amazon.com/images/S/pv-target-images/24e7c3c6a82c271ee22878110757feffabd1fa9ac8ad5b8547687db44e63c1fb.jpg', 0, 0),
('Saving Private Ryan', '1998', 'Steven Spielberg', 'Drama, War', 'https://www.intofilm.org/intofilm-production/scaledcropped/970x546https%3A/s3-eu-west-1.amazonaws.com/images.cdn.filmclub.org/film__2925-saving-private-ryan--hi_res-67979936.jpg/film__2925-saving-private-ryan--hi_res-67979936.jpg', 0, 0),
('Schindler’s List', '1993', 'Steven Spielberg', 'Biography, Drama, History', 'https://i.guim.co.uk/img/media/208d00c732eeed823ec55afe35faf252843e0c59/0_47_2520_1512/master/2520.jpg?width=1200&quality=85&auto=format&fit=max&s=ead61e9d36b0cb652bb0e71da28aadd2', 0, 0);
`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "movies"`);
  }
}
