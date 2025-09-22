import MovieDetailClient from './MovieDetailClient';

const movieData = {
  1: {
    title: "The Shawshank Redemption",
    rating: 9.3,
    year: 1994,
    runtime: "142 min",
    genre: "Drama",
    director: "Frank Darabont",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600",
    backdrop: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imdbUrl: "https://www.imdb.com/title/tt0111161/"
  }
};

const similarMovies = [
  {
    id: 13,
    title: "The Green Mile",
    rating: 8.6,
    likes: 45200,
    poster: "https://images.pexels.com/photos/8263345/pexels-photo-8263345.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1999,
    genre: "Drama",
    imdbUrl: "https://www.imdb.com/title/tt0120689/"
  },
  {
    id: 14,
    title: "Forrest Gump",
    rating: 8.8,
    likes: 52300,
    poster: "https://images.pexels.com/photos/7991669/pexels-photo-7991669.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1994,
    genre: "Drama",
    imdbUrl: "https://www.imdb.com/title/tt0109830/"
  },
  {
    id: 15,
    title: "One Flew Over the Cuckoo's Nest",
    rating: 8.7,
    likes: 38900,
    poster: "https://images.pexels.com/photos/8263317/pexels-photo-8263317.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1975,
    genre: "Drama",
    imdbUrl: "https://www.imdb.com/title/tt0073486/"
  },
  {
    id: 16,
    title: "The Godfather",
    rating: 9.2,
    likes: 67400,
    poster: "https://images.pexels.com/photos/7991686/pexels-photo-7991686.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1972,
    genre: "Crime",
    imdbUrl: "https://www.imdb.com/title/tt0068646/"
  },
  {
    id: 17,
    title: "Schindler's List",
    rating: 8.9,
    likes: 41800,
    poster: "https://images.pexels.com/photos/8263283/pexels-photo-8263283.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1993,
    genre: "Drama",
    imdbUrl: "https://www.imdb.com/title/tt0108052/"
  },
  {
    id: 18,
    title: "12 Angry Men",
    rating: 8.9,
    likes: 29600,
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1957,
    genre: "Drama",
    imdbUrl: "https://www.imdb.com/title/tt0050083/"
  }
];

export async function generateStaticParams() {
  // Return all possible movie IDs for static generation
  return [
    { id: '1' },
    { id: '13' },
    { id: '14' },
    { id: '15' },
    { id: '16' },
    { id: '17' },
    { id: '18' }
  ];
}

export default function MovieDetails({ params }: { params: { id: string } }) {
  const movieId = params.id;
  const movie = movieData[movieId as keyof typeof movieData] || movieData[1];

  return <MovieDetailClient movie={movie} similarMovies={similarMovies} />;
}