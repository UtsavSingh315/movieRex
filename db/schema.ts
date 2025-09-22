import { text, pgTable } from 'drizzle-orm/pg-core';

export const userMovieRec = pgTable('user_movie_rec', {
  userid: text('userid').notNull(),
  movieid: text('movieid').notNull(),
  rating: text('rating').notNull(),
});

export const movies = pgTable('movies', {
  movieid: text('movieid').notNull().primaryKey(),
  title: text('title').notNull(),
  genres: text('genres'),
  imdbid: text('imdbid'),
  tmdbid: text('tmdbid'),
});